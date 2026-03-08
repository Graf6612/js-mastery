import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { challenges } from '../data/challenges';
import { storage } from '../utils/storage';

const difficultyColors = {
  easy: '#4ade80',
  medium: '#fbbf24',
  hard: '#f87171'
};

function ChallengesList() {
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [solvedTasks] = useState(() => {
    const solvedKeys = storage.getKeysByPrefix('solved_');
    return solvedKeys
      .filter(key => storage.get(key) === 'true')
      .map(key => key.replace('solved_', ''));
  });

  useEffect(() => {
    // Other effects can go here if needed
  }, []);

  const categories = ['all', ...new Set(challenges.map(c => c.category))];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const filteredChallenges = challenges.filter(c => {
    const dMatch = filterDifficulty === 'all' || c.difficulty === filterDifficulty;
    const cMatch = filterCategory === 'all' || c.category === filterCategory;
    return dMatch && cMatch;
  });

  return (
    <div className="challenges-container animate-fade-in">
      <div className="filters">
        <div className="filter-group">
          <label>Складність:</label>
          <div className="filter-options">
            {difficulties.map(d => (
              <button
                key={d}
                className={`filter-btn ${filterDifficulty === d ? 'active' : ''}`}
                onClick={() => setFilterDifficulty(d)}
              >
                {d === 'all' ? 'Всі' : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <label>Категорія:</label>
          <div className="filter-options">
            {categories.map(c => (
              <button
                key={c}
                className={`filter-btn ${filterCategory === c ? 'active' : ''}`}
                onClick={() => setFilterCategory(c)}
              >
                {c === 'all' ? 'Всі' : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="challenges-grid">
        {filteredChallenges.map(challenge => {
          const isSolved = solvedTasks.includes(challenge.id);
          return (
            <Link to={`/challenges/${challenge.id}`} key={challenge.id} className="challenge-card glass">
              <div className="challenge-status">
                {isSolved && <span className="checkmark">✅</span>}
              </div>
              <h3>{challenge.title}</h3>
              <div className="challenge-meta">
                <span className="badge" style={{ backgroundColor: `${difficultyColors[challenge.difficulty]}22`, color: difficultyColors[challenge.difficulty] }}>
                  {challenge.difficulty}
                </span>
                <span className="category-tag">{challenge.category}</span>
              </div>
              <p className="challenge-desc-short">{challenge.description.slice(0, 60)}...</p>
              <div className="card-footer">
                <span>Вирішити задачу →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ChallengesList;
