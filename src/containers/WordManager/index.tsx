import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { CloseCircleOutlined } from '@ant-design/icons';

import { VocabularyPayload } from '../../api/types';
import { uploadVocabulary } from '../../api/vocabularyApi';

import './styles.css';

const WordManager: React.FC = () => {
  const [tagInput, setTagInput] = useState<string>('');
  const [listTags, setListTags] = useState<string[]>([])
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
    if (tagInput && !listTags.includes(tagInput)) {
      setListTags(prevTags => [...prevTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagIndex: number) => {
    setListTags(prevTags => prevTags.filter((_, index) => index !== tagIndex));
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

    const payload = { ...vocabularyForm, tag: listTags };

    try {
      await uploadVocabulary(payload);
      showSuccess();
      setVocabularyForm({
        english: '',
        vietnamese: '',
        tag: [],
        mp3: '',
      });
      setListTags([]);
    } catch (err) {
      showError();
    }
  };  

  return (
    <div style={{width: '800px'}}>
      <Toast ref={toast} />
      <h2 style={{paddingBottom: '20px', textAlign: 'center'}}>Add New Word</h2>
      <form id='vocabularyForm' onSubmit={handleSubmit}>
        <div className='input-container'>
          <label htmlFor="english">English</label>
          <InputText
            id='english'
            required
            name='english'
            value={vocabularyForm.english}
            onChange={handleFormChange}
          />
        </div>
        <div className='input-container'>
          <label htmlFor="vietnamese">Vietnamese</label>
          <InputText
            id='vietnamese'
            required
            name='vietnamese'
            value={vocabularyForm.vietnamese}
            onChange={handleFormChange}
          />
        </div>
        <div className='input-container'>
          <label htmlFor="mp3">Audio Link</label>
          <InputText
            id='mp3'
            required
            name='mp3'
            value={vocabularyForm.mp3}
            onChange={handleFormChange}
          />
        </div>
        <div className='input-container'>
          <label htmlFor="mp3">Add Tags</label>
          <div className='tag-container'>
            <InputText
              id='tag'
              name='tag'
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              style={{marginBottom: 0, width: '250px'}}
            />
            <div onClick={handleAddTag} className='add-tag-btn'>Add Tag</div>
          </div>
        </div>
        <div style={{marginTop: '10px', display:'flex'}}>
          {listTags.map((tag, index) => (
            <Tag 
              key={index} 
              severity='success'
              style={{marginRight: '8px', fontSize: '14px'}} 
            >
              {tag}
              <CloseCircleOutlined 
                style={{marginLeft: '10px', cursor: 'pointer'}} 
                onClick={() => handleRemoveTag(index)}
              />
            </Tag>
          ))}
        </div>
      </form>
      <Button className='submit-btn' type='submit' form='vocabularyForm'>Add Word</Button>
    </div>
  );
};

export default WordManager;