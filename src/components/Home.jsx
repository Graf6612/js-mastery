import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MistakeReview from './MistakeReview';
import UserStats from './UserStats';
import { storage } from '../utils/storage';
import { challenges } from '../data/challenges';

function Home({ stats, startQuiz }) {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [questionCount, setQuestionCount] = useState(10);
  const topics = [
    { id: 'basics', label: '🧱 База, Змінні та Типи', icon: '🧱' },
    { id: 'operators', label: '🧮 Оператори та Логіка', icon: '🧮' },
    { id: 'loops_functions', label: '🔄 Цикли та Функції', icon: '🔄' },
    { id: 'strings_objects', label: '📦 Об\'єкти, Рядки, ООП', icon: '📦' },
    { id: 'arrays', label: '📚 Масиви та Методи', icon: '📚' },
    { id: 'dom', label: '📄 Робота з DOM', icon: '📄' },
    { id: 'events', label: '🎯 Події та Обробники', icon: '🎯' },
    { id: 'async', label: '⏳ Асинхронність', icon: '⏳' },
    { id: 'es6_plus', label: '⚡ ES6+ Можливості', icon: '⚡' },
    { id: 'prototypes_classes', label: '🧬 Прототипи та Класи', icon: '🧬' },
    { id: 'design_patterns', label: '🏗️ Паттерни Проектування', icon: '🏗️' },
    { id: 'network_web', label: '🌐 Мережа та HTTP', icon: '🌐' },
    { id: 'build_tools', label: '🛠️ Збірка та Інструменти', icon: '🛠️' },
  ];

  const avgScore = stats.totalQuestions > 0 ? Math.round((stats.totalScore / stats.totalQuestions) * 100) : 0;

  const today = new Date();
  const dailyIndex = (today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDate()) % challenges.length;
  const dailyChallenge = challenges[dailyIndex];

  return (
    <div id="topic-screen" className="screen" style={{ paddingBottom: '160px' }}>
      <UserStats />

      {/* Daily Challenge Block */}
      <div className="daily-challenge-card glass" style={{
        padding: '24px',
        borderRadius: '20px',
        marginBottom: '30px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
        border: '1px solid var(--primary)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '8rem', opacity: '0.05', pointerEvents: 'none' }}>🔥</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem' }}>🔥</span>
          <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: '700' }}>Challenge of the day</h3>
          <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>+50 XP</span>
        </div>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.05rem' }}>{dailyChallenge.title}</p>
        <Link to={`/challenges/${dailyChallenge.id}`} className="btn primary-btn" style={{ padding: '12px 24px', marginTop: '10px', fontSize: '1rem', width: 'auto', alignSelf: 'flex-start', borderRadius: '12px' }}>
          Solve today's task
        </Link>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-label">Всього тестів:</span>
          <span className="stat-value">{stats.totalTests}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Сер. бал:</span>
          <span className="stat-value">{avgScore}%</span>
        </div>
      </div>

      {/* Exam Mode Card */}
      <div className="exam-mode-card glass" style={{
        padding: '24px',
        borderRadius: '20px',
        marginBottom: '30px',
        background: 'linear-gradient(135deg, rgba(255, 165, 0, 0.15) 0%, rgba(255, 215, 0, 0.15) 100%)',
        border: '1px solid var(--accent)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '8rem', opacity: '0.05', pointerEvents: 'none' }}>🎓</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem' }}>🎓</span>
          <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: '700' }}>Режим Екзамену</h3>
          <span className="badge" style={{ background: 'rgba(255, 165, 0, 0.2)', color: 'var(--accent)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>Випадкові питання</span>
        </div>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.05rem' }}>Перевір свої знання з усіх тем у випадковому порядку.</p>
        <button
          className="btn primary-btn"
          style={{ padding: '12px 24px', marginTop: '10px', fontSize: '1rem', width: 'auto', alignSelf: 'flex-start', borderRadius: '12px', background: 'var(--accent)', borderColor: 'var(--accent)' }}
          onClick={() => startQuiz([], 30, true)} // Pass true for exam mode
        >
          Почати Екзамен (30 питань)
        </button>
      </div>

      <h3 className="section-title">Обери модулі для тестування (можна кілька):</h3>
      <div className="topics-grid">
        {topics.map((topic) => {
          const isSelected = selectedTopics.includes(topic.id);
          return (
            <button
              key={topic.id}
              className={`btn topic-btn ${isSelected ? 'selected-topic' : ''}`}
              onClick={() => {
                if (isSelected) {
                  setSelectedTopics(selectedTopics.filter(id => id !== topic.id));
                } else {
                  setSelectedTopics([...selectedTopics, topic.id]);
                }
              }}
              style={isSelected ? { borderColor: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', transform: 'scale(1.02)' } : {}}
            >
              <span>{topic.label}</span> {isSelected ? <span>✅</span> : <span></span>}
            </button>
          );
        })}
      </div>

      {selectedTopics.length > 0 && (
        <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: '90%', maxWidth: '600px', background: 'var(--bg)', padding: '20px', borderRadius: '24px', border: '1px solid var(--primary)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-main)', padding: '0 10px' }}>
            <span style={{ fontWeight: 'bold' }}>Кількість питань:</span>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              style={{ padding: '8px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid var(--glass-border)', outline: 'none', cursor: 'pointer', fontSize: '1rem' }}
            >
              <option value={5} style={{ color: 'black' }}>5 питань</option>
              <option value={10} style={{ color: 'black' }}>10 питань</option>
              <option value={15} style={{ color: 'black' }}>15 питань</option>
              <option value={20} style={{ color: 'black' }}>20 питань</option>
              <option value={30} style={{ color: 'black' }}>30 питань</option>
              <option value={50} style={{ color: 'black' }}>50 питань</option>
            </select>
          </div>
          <button
            className="btn primary-btn"
            style={{ width: '100%', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.4)', padding: '18px', borderRadius: '16px' }}
            onClick={() => startQuiz(selectedTopics, questionCount)}
          >
            Почати тест ({selectedTopics.length} тем) 🚀
          </button>
        </div>
      )}

      <MistakeReview />

      <div style={{ marginTop: '40px', opacity: 0.4, textAlign: 'center' }}>
        <button
          onClick={() => {
            if (window.confirm('Скинути прогрес вивчених питань?')) {
              storage.remove('passedQuestions');
              window.location.reload();
            }
          }}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
        >
          🔄 Скинути прогрес вивчених тем
        </button>
      </div>
    </div>
  );
}

export default Home;
