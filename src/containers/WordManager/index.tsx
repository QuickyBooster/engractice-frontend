import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './styles.css';

type Props = {
  onWordAdded: () => void;
}

const WordManager: React.FC<Props> = ({...props}) => {
  const { onWordAdded } = props;

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
      <h2 style={{paddingBottom: '20px'}}>Add New Word</h2>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
        <InputText
          type="text"
          placeholder="English"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
        />
        <InputText
          type="text"
          placeholder="Vietnamese"
          value={vietnamese}
          onChange={(e) => setVietnamese(e.target.value)}
        />
      </div>
      <InputText
        type="text"
        placeholder="Audio Link"
        value={audioLink}
        onChange={(e) => setAudioLink(e.target.value)}
      />
      <div style={{margin: '10px 0'}}>
        <InputText
          type="text"
          placeholder="Add Tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <Button onClick={addTag} style={{marginLeft: '50px'}}>Add Tag</Button>
      </div>
      <div>
        {tags.map((tag, index) => (
          <span key={index} style={{ marginRight: '5px' }}>
            {tag}
          </span>
        ))}
      </div>
      <Button onClick={addWord}>Add Word</Button>
    </div>
  );
};

export default WordManager;