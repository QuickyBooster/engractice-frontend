import { FC, useMemo } from "react";
import { Tag } from 'primereact/tag';
import { Table } from "antd";
import type { TableProps } from "antd";

import { VocabularyType } from "../../api/types";

import './styles.css';

type Props = {
  words: VocabularyType[];
}

const WordList: FC<Props> = ({...props}) => {
  const { words } = props;

  const columns = useMemo<TableProps<VocabularyType>['columns']>(() => [
    {
      title: 'English',
      dataIndex: 'english',
      key: 'english',
    },
    {
      title: 'Vietnamese',
      dataIndex: 'vietnamese',
      key: 'vietnamese',
    },
    {
      title: 'Audio Link',
      dataIndex: 'mp3',
      key: 'mp3',
    },
    {
      title: 'Tags',
      dataIndex: 'tag',
      key: 'tag',
      render: (_, { tag }) => (
        <>
          {tag?.map((item, index) => (
            <Tag key={index} severity='info' value={item.toUpperCase()} />
          ))}
        </>
      )
    },
  ], []);

  return (
    <div style={{width: '1000px'}}>
      <h2 style={{paddingBottom: '20px', textAlign: 'center'}}>Word List</h2>
      <Table<VocabularyType> 
        columns={columns}
        dataSource={words} 
        scroll={{ y: 300 }}
      />
    </div>
  )
};

export default WordList;