import { FC, useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

import { VocabularyType } from "../../api/types";

import './styles.css';

type Props = {
  words: VocabularyType[];
}

const WordList: FC<Props> = ({...props}) => {
  const { words } = props;

  const [formatWords, setFormatWords] = useState<any[]>([]);

  const handleFormatWords = () => {
    let cloneWords: any = [];
    words?.forEach((item) => {
      cloneWords.push({
        english: item.english,
        vietnamese: item.vietnamese,
        tag: item.tag.join(' / '),
        mp3: item.mp3,
      });
    }); 
    setFormatWords(cloneWords);
  };
 
  useEffect(() => {
    handleFormatWords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words])

  return (
    <div style={{width: '1000px'}}>
      <h2 style={{paddingBottom: '20px', textAlign: 'center'}}>Word List</h2>
      <DataTable
        value={formatWords}
        stripedRows
        scrollable 
        scrollHeight="500px"
        emptyMessage='No Data Found!'
      >
       <Column field="english" sortable header="English" />
        <Column field="vietnamese" header="Vietnamese" />
        <Column field="mp3" header="Audio Link" />
        <Column field="tag" header="Tags" />
      </DataTable>
    </div>
  )
};

export default WordList;