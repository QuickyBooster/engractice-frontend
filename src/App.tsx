import React, { useState, useEffect } from 'react';
import WordManager from './WordManager';
import FilterAndPractice from './Practice/FilterAndPractice';
import WordList from './WordList';
import Practice from './Practice';
import { TabView, TabPanel } from 'primereact/tabview';
import './App.css'

type Word = {
  english: string;
  vietnamese: string;
  audioLink: string;
  tags: string[];
};

const App: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [practiceMode, setPracticeMode] = useState<'vietnamese' | 'audio' | null>(null);
  const [currentWord, setCurrentWord] = useState<any>(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [practiceWords, setPracticeWords] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<'addWord' | 'practice' | 'wordList' | 'profile'>('practice');

  const fetchWords = () => {
    fetch('http://localhost:8080/getVocabularies')
      .then((res) => res.json())
      .then((data) => setWords(data));
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const startPractice = (filteredWords: any[]) => {
    setPracticeMode('vietnamese'); // Default to Vietnamese-to-English mode
    setPracticeWords(filteredWords);
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
            <WordManager onWordAdded={fetchWords} />
          </TabPanel>
          <TabPanel header='Practice'>
            <Practice
              practiceMode={practiceMode}
              words={words}
              startPractice={startPractice}
              currentWord={currentWord}
              userInput={userInput}
              setUserInput={setUserInput}
              handleAnswer={handleAnswer}
              score={score}
            />
          </TabPanel>
          <TabPanel header='Word List'>
            <WordList words={words} />
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
