import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

function MistakeReview() {
  const [mistakes, setMistakes] = useState(() => storage.get('quizMistakes', []));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Other effects can go here if needed
  }, []);

  if (mistakes.length === 0) return null;

  return (
    <div className="mistakes-container">
      <h3 className="section-title">Твої помилки для закріплення:</h3>

      <button
        className="btn action-btn"
        style={{ marginBottom: '20px' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Приховати помилки ⬆️' : `Показати мої помилки (${mistakes.length}) 🔍`}
      </button>

      {isOpen && (
        <div id="mistakes-list">
          {mistakes.map((item, index) => (
            <div key={index} className="mistake-item">
              <p className="mistake-q">{item.question}</p>
              {item.code && (
                <div className="code-block" style={{ fontSize: '0.8rem', padding: '10px', marginBottom: '10px' }}>
                  <code className="code-text">{item.code}</code>
                </div>
              )}
              <p className="mistake-a">❌ Твоя відповідь: {item.userAnswer}</p>
              <p className="mistake-c">✅ Правильна: {item.correctAnswer}</p>
              <p className="mistake-theory">💡 {item.theory}</p>
            </div>
          ))}

          <button
            className="btn"
            style={{ marginTop: '10px', fontSize: '0.8rem', opacity: 0.6 }}
            onClick={() => {
              if (window.confirm('Очистити список помилок?')) {
                storage.remove('quizMistakes');
                setMistakes([]);
              }
            }}
          >
            🗑️ Очистити історію помилок
          </button>
        </div>
      )}
    </div>
  );
}

export default MistakeReview;
