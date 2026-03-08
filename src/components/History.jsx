import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export default function History() {
  const [history] = useState(() => storage.get('quizHistory', []));

  useEffect(() => {
    // Other effects can go here if needed
  }, []);

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleString('uk-UA', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const formatTimeInfo = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}хв ${s}с`;
  };

  return (
    <div className="quiz-container history-container" style={{ minHeight: '80vh' }}>
      <header>
        <h2>Історія результатів 📊</h2>
        <p className="subtitle">Ваші попередні тестування та інтерв'ю</p>
      </header>

      {history.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--text-muted)' }}>
          <p>Ви ще не пройшли жодного тесту. Ваші результати з'являться тут!</p>
        </div>
      ) : (
        <div className="history-list" style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {history.map((item) => (
            <div key={item.id} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${item.type === 'interview' ? 'var(--secondary)' : 'var(--primary)'}`,
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '5px' }}>
                  {item.type === 'interview' ? '🕒 Режим Інтерв\'ю' : '📚 Тестування по темах'}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {formatDate(item.date)}
                  {item.type === 'quiz' && item.topics && ` • Теми: ${Array.isArray(item.topics) ? item.topics.join(', ') : item.topics}`}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                {item.type === 'interview' ? (
                  <>
                    <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Теорія: {item.score}/{item.total}</div>
                    <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>Практика: {item.challengesScore}/{item.challengesTotal}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Час: {formatTimeInfo(item.timeTaken)}</div>
                  </>
                ) : (
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    {item.score} / {item.total}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
