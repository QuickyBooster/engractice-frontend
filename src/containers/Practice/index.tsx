import { FC, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import FilterAndPractice from "./FilterAndPractice";

type Props = {
  words: any[];
  currentWord: any;
  userInput: string;
  setUserInput: Function;
  handleAnswer: () => void;
  score: { correct: number, wrong: number };
}

const Practice: FC<Props> = ({...props}) => {
  const {
    words,
    currentWord,
    userInput,
    setUserInput,
    handleAnswer,
    score
  } = props

  const [practiceMode, setPracticeMode] = useState<'translate' | 'listen' | null>(null);
  const [practiceWords, setPracticeWords] = useState<any[]>([]);
  
  const startPractice = (filteredWords: any[]) => {
    setPracticeMode('translate'); 
    setPracticeWords(filteredWords);
  };

  return (
    <div>
      {!practiceMode && <FilterAndPractice words={words} onStartPractice={startPractice} />}

      {practiceMode && currentWord && (
        <div>
          <p style={{paddingBottom: '5px'}}>
            {currentWord?.vietnamese}
          </p>
          <InputText
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your answer"
            className="answer-input"
          />
          <Button onClick={handleAnswer}>Submit</Button>
        </div>
      )}

      {!currentWord && practiceMode === null && (
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
