import React, { useState } from 'react';

function Quiz({ questions, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showTheory, setShowTheory] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const currentQuestion = questions[currentIndex];
  const progressPercentage = (currentIndex / questions.length) * 100;

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    setShowTheory(true);

    if (index === currentQuestion.correctAnswer) {
      setScore(score + 1);
    } else {
      setWrongAnswers([
        ...wrongAnswers,
        {
          question: currentQuestion.question,
          userAnswer: currentQuestion.options[index],
          correctAnswer: currentQuestion.options[currentQuestion.correctAnswer],
          theory: currentQuestion.theory,
        },
      ]);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setShowTheory(false);
      setSelectedAnswer(null);
    } else {
      onFinish(score, wrongAnswers);
    }
  };

  return (
    <div id="quiz-screen" className="screen">
      <div className="quiz-header">
        <div className="question-meta">
          <span className="counter">Питання {currentIndex + 1} з {questions.length}</span>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <h2 id="question-text">{currentQuestion.question}</h2>

      <div className="options-container">
        {currentQuestion.options.map((option, index) => {
          let className = 'btn option-btn';
          if (selectedAnswer !== null) {
            if (index === currentQuestion.correctAnswer) className += ' correct';
            else if (index === selectedAnswer) className += ' wrong';
          }
          return (
            <button
              key={index}
              className={className}
              disabled={selectedAnswer !== null}
              onClick={() => handleAnswer(index)}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showTheory && (
        <div className="explanation">
          <strong>💡 Пояснення:</strong><br /><br />
          {currentQuestion.theory}
        </div>
      )}

      {selectedAnswer !== null && (
        <button className="btn next-btn" onClick={nextQuestion}>
          {currentIndex + 1 === questions.length ? 'Завершити тест' : 'Наступне запитання'}
        </button>
      )}
    </div>
  );
}

export default Quiz;
