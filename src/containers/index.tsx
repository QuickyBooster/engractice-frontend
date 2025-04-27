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
  const [practiceMode, setPracticeMode] = useState<'vietnamese' | 'audio' | null>(null);
  const [currentWord, setCurrentWord] = useState<any>(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [practiceWords, setPracticeWords] = useState<any[]>([]);

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
  }, [vocabularies]);
  
  const startPractice = (filteredWords: any[]) => {
    setCurrentWord(filteredWords[0]);
    setScore({ correct: 0, wrong: 0 });
  };

  const handleAnswer = () => {
    if (!currentWord) return;

    if (userInput.toLowerCase() === currentWord.english.toLowerCase()) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
    }

    const nextIndex = practiceWords.indexOf(currentWord) + 1;
    if (nextIndex < practiceWords.length) {
      setCurrentWord(practiceWords[nextIndex]);
    } else {
      setPracticeMode(null);
    }
    setUserInput('');
  };

  return (
    <div className="App">
      <h1 className='title'>English Practice App</h1>
      <div>
        <TabView>
          <TabPanel header='Add Word'>
            <WordManager />
          </TabPanel>
          <TabPanel header='Practice'>
            <Practice
              words={vocabularies}
              currentWord={currentWord}
              userInput={userInput}
              setUserInput={setUserInput}
              handleAnswer={handleAnswer}
              score={score}
            />
          </TabPanel>
          <TabPanel header='Word List'>
            <WordList words={vocabularies} />
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
