import React, { useState, useEffect } from 'react';
import { gamification, BADGES } from '../utils/gamification';

export default function UserStats() {
  const [stats, setStats] = useState(gamification.getStats());

  // Listen for storage changes if multiple tabs are open, 
  // or just refresh on mount for single-page nav
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'gamificationStats' && e.newValue) {
        setStats(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const progress = gamification.getLevelProgress(stats.xp, stats.level);

  return (
    <div className="user-stats-container glass animate-fade-in" style={{
      padding: '20px',
      borderRadius: '20px',
      marginBottom: '30px',
      background: 'linear-gradient(145deg, rgba(30,30,40,0.8) 0%, rgba(20,20,30,0.9) 100%)',
      border: '1px solid rgba(255,255,255,0.05)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    }}>
      <div className="stats-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            Level {stats.level} 🚀
          </h2>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {stats.streak > 0 ? `🔥 ${stats.streak} дн${stats.streak === 1 ? 'ень' : stats.streak > 1 && stats.streak < 5 ? 'і' : 'ів'} підряд` : 'Почніть свій стрік сьогодні!'}
          </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
            XP: {stats.xp} / {progress.nextLevelXp === 'MAX' ? 'MAX' : progress.nextLevelXp}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {progress.maxInfo === 'MAX' ? 'Максимальний рівень!' : `До наступного рівня: ${progress.maxInfo - progress.currentInfo} XP`}
          </div>
        </div>
      </div>

      <div className="progress-bar-bg" style={{
        height: '12px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '25px'
      }}>
        <div className="progress-bar-fill" style={{
          height: '100%',
          width: `${progress.percent}%`,
          background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)',
          borderRadius: '10px',
          transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 0 10px var(--primary)'
        }}></div>
      </div>

      {stats.badges && stats.badges.length > 0 && (
        <div className="badges-section">
          <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '15px' }}>Ваші досягнення:</h3>
          <div className="badges-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {stats.badges.map(badgeId => {
              const badge = BADGES[badgeId];
              if (!badge) return null;
              return (
                <div key={badgeId} className="badge-item glass" title={badge.desc} style={{
                  padding: '8px 12px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'help',
                  transition: 'transform 0.2s',
                  ':hover': { transform: 'translateY(-2px)' }
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{badge.icon}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{badge.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
