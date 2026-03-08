import React from 'react';

function Result({ score, total, onRestart }) {
  const percentage = Math.round((score / total) * 100);
  let message = '';
  if (percentage === 100) message = 'Ідеально! Ти справжній майстер JS! 🥇';
  else if (percentage >= 80) message = 'Чудовий результат! Так тримати! 🌟';
  else if (percentage >= 50) message = 'Непогано, але є куди рости. 👍';
  else message = 'Варто ще трохи підовчити теорію. 📚';

  return (
    <div id="result-screen" className="screen">
      <div className="score-card">
        <h2>Модуль завершено! 🎉</h2>
        <div className="score-circle">
          <span className="score-value">{score}</span>
          <span className="score-total">з {total}</span>
        </div>
        <p className="subtitle">{message}</p>
      </div>

      <div className="result-actions">
        <button className="btn restart-btn" onClick={onRestart}>Повернутися до вибору тем</button>
      </div>
    </div>
  );
}

export default Result;
