import React, { useState } from 'react';

const FilterAndPractice: React.FC<{ words: any[], onStartPractice: (filteredWords: any[]) => void }> = ({ words, onStartPractice }) => {
  const [selectedTag, setSelectedTag] = useState('');
  const [numWords, setNumWords] = useState(10);

  const uniqueTags = Array.from(new Set(words.flatMap(word => word.tags)));

  const handlePractice = () => {
    let filteredWords = words;

    if (selectedTag) {
      filteredWords = words.filter(word => word.tags.includes(selectedTag));
    }

    filteredWords = filteredWords.slice(0, numWords);
    onStartPractice(filteredWords);
  };

  return (
    <div>
      <h2>Filter and Practice</h2>
      <div>
        <label>Tag:</label>
        <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
          <option value="">All</option>
          {uniqueTags.map((tag, index) => (
            <option key={index} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Number of Words:</label>
        <input
          type="number"
          value={numWords}
          onChange={(e) => setNumWords(Number(e.target.value))}
          min={1}
          max={words.length}
        />
      </div>
      <button onClick={handlePractice}>Start Practice</button>
    </div>
  );
};

export default FilterAndPractice;