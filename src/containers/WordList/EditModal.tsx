import React, { useRef, useState, FC } from 'react';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { CloseCircleOutlined } from '@ant-design/icons';

import { VocabularyPayload } from '../../api/types';
import { VocabularyType } from '../../api/types';
import { updateVocabulary } from '../../api/vocabularyApi';
import { showSuccess, showError } from '../../utils/toastMessage';

import './styles.css';

type Props = {
  vocabulary: VocabularyType;
  reFetch: () => Promise<void>;
};

const EditModal: FC<Props> = ({ vocabulary, reFetch }) => {
  const [tagInput, setTagInput] = useState<string>('');
  const [listTags, setListTags] = useState<string[]>(vocabulary.tag)
  const [vocabularyForm, setVocabularyForm] = useState<VocabularyPayload>({
    english: vocabulary.english,
    vietnamese: vocabulary.vietnamese,
    tag: vocabulary.tag,
    mp3: vocabulary.mp3,
  })
  const toast = useRef<Toast>(null);

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
    const { name, value } = e.target;

    setVocabularyForm({   
      ...vocabularyForm,
      [name]: value
    });

  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = { ...vocabularyForm, tag: listTags };

    try {
      await updateVocabulary(payload, vocabulary.id);
      showSuccess(toast);
      reFetch();
    } catch (err) {
      showError(toast);
    }
  };  

  return (
    <div style={{width: '600px', marginLeft: '-10px'}}>
      <Toast ref={toast} />
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
      <Button type='submit' form='vocabularyForm' className='submit-btn'>Save</Button>
    </div>
  );
};

export default EditModal;