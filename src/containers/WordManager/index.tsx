import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';

import { VocabularyPayload } from '../../api/types';
import { uploadVocabulary } from '../../api/vocabularyApi';

import './styles.css';

type Props = {
  // onWordAdded: () => void;
}

const WordManager: React.FC<Props> = ({...props}) => {
  // const { onWordAdded } = props;

  const [tagInput, setTagInput] = useState('');
  const [vocabularyForm, setVocabularyForm] = useState<VocabularyPayload>({
    english: '',
    vietnamese: '',
    tag: [],
    mp3: '',
  })
  const toast = useRef<Toast>(null);

  const showSuccess = () => {
    toast?.current?.show({
      severity:'success', 
      summary: 'Success', 
      detail:'Upload new word successfully!', 
      life: 3000,
    });
  }

  const showError = () => {
    toast?.current?.show({
      severity:'error', 
      summary: 'Error', 
      detail:'Upload new word unsuccessfully!', 
      life: 3000
    });
  }

  const handleAddTag = () => {
    if (tagInput && !vocabularyForm.tag.includes(tagInput)) {
      vocabularyForm.tag.push(tagInput);
      setTagInput('');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setVocabularyForm({   
      ...vocabularyForm,
      [name]: value
    })

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await uploadVocabulary(vocabularyForm);
      showSuccess();
      setVocabularyForm({
        english: '',
        vietnamese: '',
        tag: [],
        mp3: '',
      });
    } catch (err) {
      showError();
    }
  };  

  return (
    <div>
      <Toast ref={toast} />
      <h2 style={{paddingBottom: '20px'}}>Add New Word</h2>
      <form id='vocabularyForm' onSubmit={handleSubmit}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
          <InputText
            required
            type="text"
            placeholder="English"
            name='english'
            value={vocabularyForm.english}
            onChange={handleFormChange}
          />
          <InputText
            required
            type="text"
            placeholder="Vietnamese"
            name='vietnamese'
            value={vocabularyForm.vietnamese}
            onChange={handleFormChange}
          />
        </div>
        <InputText
          style={{ width: '100%' }}
          type="text"
          placeholder="Audio Link"
          name='mp3'
          value={vocabularyForm.mp3}
          onChange={handleFormChange}
        />
        <div className='tag-container'>
          <InputText
            type="text"
            placeholder="Add Tag"
            name='tag'
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <div onClick={handleAddTag} className='add-tag-btn'>Add Tag</div>
        </div>
        <div>
          {vocabularyForm.tag.map((tag, index) => (
            <Tag 
              key={index} 
              value={tag} 
              severity='success'
              style={{ marginRight: '8px' }} 
            />
          ))}
        </div>
      </form>
      <Button type='submit' form='vocabularyForm' style={{ marginTop: '15px' }}>Add Word</Button>
    </div>
  );
};

export default WordManager;