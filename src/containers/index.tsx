import React, { useState, useEffect } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';

import WordManager from './WordManager';
import WordList from './WordList';
import Practice from './Practice';

import { VocabularyType } from '../api/types';
import { getAllVocabulary } from '../api/vocabularyApi';

import './styles.css'

const App: React.FC = () => {
  const [vocabularies, setVocabularies] = useState<VocabularyType[]>([]);

  const fetchVocabulary = async () => {
    try {
      const vocabularyData = await getAllVocabulary();
      setVocabularies(vocabularyData);
    } catch (err) {
      throw(err);
    }
  }

  useEffect(() => {
    fetchVocabulary();
  }, []);

  return (
    <div className="App app-container">
      <h1 className='title'>English Practice App</h1>
      <div>
        <TabView>
          <TabPanel header='Add Word'>
            <WordManager />
          </TabPanel>
          <TabPanel header='Practice'>
            <Practice words={vocabularies} />
          </TabPanel>
          <TabPanel header='Word List'>
            <WordList />
          </TabPanel>
          <TabPanel header='Profile'>
            <div>
              <h2 style={{paddingBottom: '20px'}}>Profile</h2>
              <p>Welcome to your profile!</p>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default App;
