import React, { useState, useEffect } from 'react';
import './App.css';
import WordManager from './WordManager';
import FilterAndPractice from './FilterAndPractice';

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
  const [activeSection, setActiveSection] = useState<'addWord' | 'practice' | 'wordList' | 'profile'>('addWord');

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
      <header className="App-header">
        <h1>English Practice App</h1>
        <nav className="App-nav">
          <button onClick={() => setActiveSection('addWord')}>Add Word</button>
          <button onClick={() => setActiveSection('practice')}>Practice</button>
          <button onClick={() => setActiveSection('wordList')}>Word List</button>
          <button onClick={() => setActiveSection('profile')}>Profile</button>
        </nav>

        <main className="App-main">
          {activeSection === 'addWord' && <WordManager onWordAdded={fetchWords} />}

          {activeSection === 'practice' && (
            <div>
              {!practiceMode && <FilterAndPractice words={words} onStartPractice={startPractice} />}

              {practiceMode && currentWord && (
                <div>
                  <p>{currentWord.vietnamese}</p>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your answer"
                  />
                  <button onClick={handleAnswer}>Submit</button>
                </div>
              )}

              {!currentWord && practiceMode === null && (
                <div>
                  <h2>Practice Complete!</h2>
                  <p>Correct: {score.correct}</p>
                  <p>Wrong: {score.wrong}</p>
                </div>
              )}
            </div>
          )}

          {activeSection === 'wordList' && (
            <div>
              <h2>Word List</h2>
              <ul>
                {words.map((word, index) => (
                  <li key={index}>
                    {word.english} - {word.vietnamese} ({word.tags.join(', ')})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeSection === 'profile' && (
            <div>
              <h2>Profile</h2>
              <p>Welcome to your profile!</p>
            </div>
          )}
        </main>
      </header>
    </div>
  );
};

export default App;
