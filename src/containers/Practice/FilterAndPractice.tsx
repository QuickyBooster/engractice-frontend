import React, { useState } from 'react';
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

  const uniqueTags = Array.from(new Set(words.flatMap(word => word.tags)));
  const selectOptions = [
    ...uniqueTags,
    { name: 'All', value: 'all'},
    { name: 'Tag 1', value: 'tag1'},
  ]

  const handlePractice = () => {
    let filteredWords = words;

    if (selectedTag) {
      filteredWords = words.filter(word => word.tags.includes(selectedTag));
    }

    filteredWords = filteredWords.slice(0, numWords);
    onStartPractice(filteredWords);
  };
  return (
    <div style={{marginBottom: '15px'}}>
      <h2 style={{paddingBottom: '20px'}}>Filter and Practice</h2>
      <div style={{marginBottom: '15px'}}>
        <span>Tag:</span>
        <Dropdown 
          value={selectedTag}
          options={selectOptions}
          optionLabel='name'
          onChange={(e) => setSelectedTag(e.target.value)}
        />
      </div>
      <div style={{marginBottom: '15px'}}>
        <span>Number of Words:</span>
        <InputNumber
          value={numWords}
          onValueChange={(e: InputNumberValueChangeEvent) => setNumWords(Number(e.value))}
          showButtons
          min={1}
          max={words.length || 100}
        />
      </div>
      <Button onClick={handlePractice}>Start Practice</Button>
    </div>
  );
};

export default FilterAndPractice;