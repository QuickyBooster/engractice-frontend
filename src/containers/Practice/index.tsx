import { FC, useRef, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';

import { VocabularyType } from "../../api/types";
import FilterAndPractice from "./FilterAndPractice";

type Props = {
  words: VocabularyType[];
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
  const answerRef = useRef<HTMLInputElement>(null);
  
  const startPractice = (filteredWords: any[]) => {
    setIsPractice(true); 
    setPracticeWords(filteredWords);
    setCurrentWord(filteredWords[0]);
  };

  const handleAnswer = () => {
    if (!currentWord) return;

    const isCorrect = userAnswer.toLowerCase() === currentWord.english.toLowerCase();
    const updatedScore = {
      correct: score.correct + (isCorrect ? 1 : 0),
      wrong: score.wrong + (isCorrect ? 0 : 1),
    };

    const nextIndex = practiceWords.indexOf(currentWord) + 1;

    if (nextIndex < practiceWords.length) {
      setScore(updatedScore);
      setCurrentWord(practiceWords[nextIndex]);
    } else {
      setScore(updatedScore);
      showResultModal(updatedScore);
    }

    setUserAnswer('');
    answerRef?.current?.focus();
  };

  const handleCancel = () => {
    setIsPractice(false);
    setScore({ 
      correct: 0, 
      wrong: 0, 
    });
  };

  const showResultModal = (finalScore: { correct: number, wrong: number }) => {
    confirmDialog({
      group: 'result',
      header: 'Practice Complete!',
      message: (
        <div className="result-wrapper">
          <div className="result-item">
            <CheckCircleFilled />
            <p className="result-text">{finalScore.correct}</p>
          </div>
          <div className="result-item">
            <CloseCircleFilled />
            <p className="result-text">{finalScore.wrong}</p>
          </div>
        </div>
      ),
      style: { width: '400px' },
      acceptLabel: 'Done',
      accept: () => {
        setIsPractice(false);
        setScore({ 
          correct: 0, 
          wrong: 0, 
        });
      },
      rejectClassName: 'reject-btn-practice'
    });
  };

  return (
    <div style={{width: '500px'}}>
      <ConfirmDialog group="result" className="result-dialog" />

      {!isPractice && <FilterAndPractice words={words} onStartPractice={startPractice} />}

      {isPractice && currentWord && (
        <div>
          <div className='practice_input-container'>
            <span>Question</span>
            <Chip
              label={currentWord?.vietnamese}
              className="question_chip"
            />
          </div>
          <div className='practice_input-container'>
            <span>Answer</span>
            <InputText
              ref={answerRef}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer"
              style={{marginBottom: '0px'}}
            />
          </div>
          <div className="formtest_btn">
            <Button 
              text 
              onClick={handleCancel}
              style={{ marginLeft: 'auto' }}
            >Cancel</Button>
            <Button onClick={handleAnswer}>Submit</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Practice
