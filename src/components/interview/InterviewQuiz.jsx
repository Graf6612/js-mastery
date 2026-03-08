import React, { useState, useEffect } from 'react';
import { quizData } from '../../data/quizData';
import { getRandomItems } from '../../utils/random';

export default function InterviewQuiz({ onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const allQuestions = Object.values(quizData).flat();
    const selected = getRandomItems(allQuestions, 30);
    setQuestions(selected);
    setIsReady(true);
  }, []);

  if (!isReady || questions.length === 0) {
    return <div className="interview-loading">Loading questions...</div>;
  }

  const currentQ = questions[currentIndex];
  const hasAnsweredCurrent = answers[currentIndex] !== undefined;
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectOption = (optionIndex) => {
    setAnswers({ ...answers, [currentIndex]: optionIndex });
  };

  const handleNext = () => {
    if (!hasAnsweredCurrent) return;

    if (!isLastQuestion) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate final score for phase 1
      let correctCount = 0;
      const wrongAnswers = [];

      questions.forEach((q, i) => {
        if (answers[i] === q.correctAnswer) {
          correctCount++;
        } else {
          wrongAnswers.push({
            question: q.question,
            userAnswer: q.options[answers[i]],
            correctAnswer: q.options[q.correctAnswer],
            theory: q.theory,
          });
        }
      });
      onComplete({ correct: correctCount, total: questions.length, wrongAnswers });
    }
  };

  return (
    <div className="quiz-container interview-quiz">
      <div className="quiz-header">
        <div className="question-meta">
          <span className="counter">Питання {currentIndex + 1} з {questions.length}</span>
        </div>
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="question-block">
        <h2 id="question-text">{currentQ.question}</h2>
        <div className="options-container">
          {currentQ.options.map((option, idx) => (
            <button
              key={idx}
              className={`btn option-btn ${answers[currentIndex] === idx ? 'selected-interview-option' : ''}`}
              onClick={() => handleSelectOption(idx)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="interview-actions">
        <button
          className="btn primary-btn submit-btn"
          onClick={handleNext}
          disabled={!hasAnsweredCurrent}
        >
          {isLastQuestion ? 'Завершити фазу теорії' : 'Наступне питання'}
        </button>
      </div>
    </div>
  );
}
