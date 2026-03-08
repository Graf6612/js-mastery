import React, { useState } from 'react';
import { useTimer } from '../../hooks/useTimer';
import InterviewIntro from './InterviewIntro';
import InterviewQuiz from './InterviewQuiz';
import InterviewChallenges from './InterviewChallenges';
import InterviewResult from './InterviewResult';
import { storage } from '../../utils/storage';
import './interview.css';

export default function InterviewMode() {
  const [phase, setPhase] = useState('intro'); // 'intro', 'quiz', 'challenges', 'result'
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 30, wrongAnswers: [] });
  const [challengesScore, setChallengesScore] = useState({ correct: 0, total: 3 });

  // 30 minutes = 1800 seconds
  const timer = useTimer(1800, () => {
    // When time is up, jump straight to result screen
    setPhase('result');
  });

  const handleStart = () => {
    setPhase('quiz');
    timer.start();
  };

  const handleQuizComplete = (score) => {
    setQuizScore(score);
    setPhase('challenges');
  };

  const handleChallengesComplete = (score) => {
    setChallengesScore(score);
    timer.pause();

    // Record to history
    const historyEntry = {
      id: Date.now(),
      type: 'interview',
      date: new Date().toISOString(),
      score: quizScore.correct,
      total: quizScore.total,
      challengesScore: score.correct,
      challengesTotal: score.total,
      timeTaken: 1800 - timer.seconds
    };
    const historyMap = storage.get('quizHistory', []);
    storage.setInstant('quizHistory', [historyEntry, ...historyMap]);

    setPhase('result');
  };

  return (
    <div className="interview-mode-wrapper">
      {phase !== 'intro' && phase !== 'result' && (
        <div className={`interview-timer-header ${timer.isLowTime ? 'time-low' : ''}`}>
          <span>Залишилось часу:</span>
          <strong>{timer.formatTime()}</strong>
        </div>
      )}

      <div className="interview-content">
        {phase === 'intro' && <InterviewIntro onStart={handleStart} />}
        {phase === 'quiz' && <InterviewQuiz onComplete={handleQuizComplete} />}
        {phase === 'challenges' && <InterviewChallenges onComplete={handleChallengesComplete} />}
        {phase === 'result' && (
          <InterviewResult
            quizScore={quizScore}
            challengesScore={challengesScore}
            timeRemaining={timer.seconds}
            totalTime={1800}
            onRestart={() => {
              timer.reset();
              setPhase('intro');
            }}
          />
        )}
      </div>
    </div>
  );
}
