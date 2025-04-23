import { FC } from "react";
import FilterAndPractice from "./FilterAndPractice";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

type Props = {
  practiceMode?: 'vietnamese' | 'audio' | null;
  words: any[];
  startPractice: (item: any[]) => void;
  currentWord: any;
  userInput: string;
  setUserInput: Function;
  handleAnswer: () => void;
  score: { correct: number, wrong: number };
}

const Practice: FC<Props> = ({...props}) => {
  const {
    practiceMode,
    words,
    startPractice,
    currentWord,
    userInput,
    setUserInput,
    handleAnswer,
    score
  } = props

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
