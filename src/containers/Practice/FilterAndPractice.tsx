import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import './styles.css';

type Props = {
  words: any[];
  onStartPractice: (filteredWords: any[]) => void;
}
        
const FilterAndPractice: React.FC<Props> = ({...props}) => {
  const { words, onStartPractice } = props;

  const [selectedTag, setSelectedTag] = useState('');
  const [numWords, setNumWords] = useState(10);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const uniqueTags = Array.from(new Set(words.flatMap(word => word.tag)));
  const selectOptions = [
    ...uniqueTags,
    { name: 'all', value: 'all'},
  ]

  const handlePractice = () => {
    let filteredWords = words;

    if (selectedTag) {
      filteredWords = words.filter(word => word.tag.includes(selectedTag));
    }

    filteredWords = filteredWords.slice(0, numWords);
    onStartPractice(filteredWords);
  };

  useEffect(() => {
    if (selectedTag !== '') {
      setIsDisabled(false);
    }
  }, [selectedTag])


  return (
    <div>
      <h2 style={{paddingBottom: '20px', textAlign: 'center'}}>Filter and Practice</h2>
      <div className='practice_input-container'>
        <span>Tag</span>
        <Dropdown 
          id='tag'
          value={selectedTag}
          options={selectOptions}
          optionLabel='name'
          onChange={(e) => setSelectedTag(e.target.value)}
        />
      </div>
      <div className='practice_input-container'>
        <span>Number of Words</span>
        <InputNumber
          value={numWords}
          onValueChange={(e: InputNumberValueChangeEvent) => setNumWords(Number(e.value))}
          showButtons
          min={1}
          max={words.length || 100}
        />
      </div>
      <Button onClick={handlePractice} disabled={isDisabled} className='start-btn'>Start Practice</Button>
    </div>
  );
};

export default FilterAndPractice;