import React, { useEffect } from 'react';
import { gamification } from '../../utils/gamification';

export default function InterviewResult({ quizScore, challengesScore, timeRemaining, totalTime, onRestart }) {
  const timeTaken = totalTime - timeRemaining; // in seconds
  const mins = Math.floor(timeTaken / 60);
  const secs = timeTaken % 60;

  const quizPercent = Math.round((quizScore.correct / quizScore.total) * 100);

  const isPassed = quizPercent >= 70 && challengesScore.correct >= 2;

  useEffect(() => {
    // Award XP only once when result is shown
    // Let's assume an interview gives 250 XP if passed, 50 XP if failed
    const xpReward = isPassed ? 250 : 50;
    gamification.addXP(xpReward);
    gamification.checkInterviewContext();
  }, [isPassed]);

  return (
    <div className="quiz-container result-container">
      <h2>Інтерв'ю завершено</h2>

      <div className="score-summary" style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '30px 0' }}>
        <div style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '10px' }}>
            {quizScore.correct}/{quizScore.total}
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Теорія (Питання)</p>
        </div>

        <div style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '10px' }}>
            {challengesScore.correct}/{challengesScore.total}
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Практика (Задачі)</p>
        </div>
      </div>

      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px' }}>
        Затрачений час: <strong>{mins}хв {secs}с</strong>
      </p>

      {isPassed ? (
        <div style={{ color: '#4ade80', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px', padding: '20px', background: 'rgba(74, 222, 128, 0.1)', borderRadius: '16px' }}>
          🎉 Чудово! У вас є високі шанси пройти справжню технічну співбесіду!
        </div>
      ) : (
        <div style={{ color: '#f87171', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px', padding: '20px', background: 'rgba(248, 113, 113, 0.1)', borderRadius: '16px' }}>
          Варто ще попрацювати. Перегляньте свої помилки нижче та спробуйте знову!
        </div>
      )}

      {quizScore.wrongAnswers && quizScore.wrongAnswers.length > 0 && (
        <div className="mistakes-container" style={{ marginTop: '0', marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '20px', color: 'var(--text-main)' }}>Де ви помилилися в теорії:</h3>
          {quizScore.wrongAnswers.map((wrong, idx) => (
            <div key={idx} className="mistake-item">
              <div className="mistake-q">{idx + 1}. {wrong.question}</div>
              <div className="mistake-a">❌ Ваша відповідь: {wrong.userAnswer}</div>
              <div className="mistake-c">✅ Правильна відповідь: {wrong.correctAnswer}</div>
              {wrong.theory && <div className="mistake-theory">💡 {wrong.theory}</div>}
            </div>
          ))}
        </div>
      )}

      <button className="btn primary-btn" onClick={onRestart} style={{ justifyContent: 'center' }}>
        Почати нове інтерв'ю
      </button>
    </div>
  );
}
