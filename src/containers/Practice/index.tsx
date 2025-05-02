import { FC, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import FilterAndPractice from "./FilterAndPractice";

type Props = {
  words: any[];
}

const Practice: FC<Props> = ({...props}) => {
  const { words } = props

  // const [practiceMode, setPracticeMode] = useState<'translate' | 'listen' | null>(null);
  const [isPractice, setIsPractice] = useState<boolean>(false);
  const [practiceWords, setPracticeWords] = useState<any[]>([]);  
  const [score, setScore] = useState<{ correct: number, wrong: number }>({ 
    correct: 0, 
    wrong: 0, 
  });
  const [currentWord, setCurrentWord] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState('');
  
  const startPractice = (filteredWords: any[]) => {
    setIsPractice(true); 
    setPracticeWords(filteredWords);
    setCurrentWord(filteredWords[0]);
  };

  const handleAnswer = () => {
    if (!currentWord) return;

    if (userAnswer.toLowerCase() === currentWord.english.toLowerCase()) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
    }

    const nextIndex = practiceWords.indexOf(currentWord) + 1;
    if (nextIndex < practiceWords.length) {
      setCurrentWord(practiceWords[nextIndex]);
    } else {
      setIsPractice(false);
      setScore({ 
        correct: 0, 
        wrong: 0, 
      });
    }

    setUserAnswer('');
  };

  const handleCancel = () => {
    setIsPractice(false);
    setScore({ 
      correct: 0, 
      wrong: 0, 
    });
  }

  return (
    <div>
      {!isPractice && <FilterAndPractice words={words} onStartPractice={startPractice} />}

      {isPractice && currentWord && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <span style={{ marginRight: '20px' }}>Question: </span>
            <InputText 
              value={currentWord?.vietnamese}
              disabled
            />
          </div>
          <InputText
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer"
            className="answer-input"
          />
          <Button onClick={handleAnswer}>Submit</Button>
          <Button 
            text 
            onClick={handleCancel}
            style={{ marginLeft: '10px' }}
          >Cancel</Button>
        </div>
      )}

      {isPractice && (
        <div style={{marginTop: '20px'}}>
          <h2 style={{paddingBottom: '10px'}}>Practice Complete!</h2>
          <p style={{paddingBottom: '5px'}}>Correct: {score.correct}</p>
          <p>Wrong: {score.wrong}</p>
        </div>
      )}
    </div>
  )
}

export default Practice
