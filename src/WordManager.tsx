import React, { useState } from 'react';

const WordManager: React.FC<{ onWordAdded: () => void }> = ({ onWordAdded }) => {
  const [english, setEnglish] = useState('');
  const [vietnamese, setVietnamese] = useState('');
  const [audioLink, setAudioLink] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const addWord = () => {
    const newWord = { english, vietnamese, audioLink, tags };

    fetch('http://localhost:8080/addVocabulary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWord),
    })
      .then((res) => {
        if (res.ok) {
          onWordAdded();
          setEnglish('');
          setVietnamese('');
          setAudioLink('');
          setTags([]);
        }
      });
  };

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  return (
    <div>
      <h2>Add New Word</h2>
      <input
        type="text"
        placeholder="English"
        value={english}
        onChange={(e) => setEnglish(e.target.value)}
      />
      <input
        type="text"
        placeholder="Vietnamese"
        value={vietnamese}
        onChange={(e) => setVietnamese(e.target.value)}
      />
      <input
        type="text"
        placeholder="Audio Link"
        value={audioLink}
        onChange={(e) => setAudioLink(e.target.value)}
      />
      <div>
        <input
          type="text"
          placeholder="Add Tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <button onClick={addTag}>Add Tag</button>
      </div>
      <div>
        {tags.map((tag, index) => (
          <span key={index} style={{ marginRight: '5px' }}>
            {tag}
          </span>
        ))}
      </div>
      <button onClick={addWord}>Add Word</button>
    </div>
  );
};

export default WordManager;