import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import { challenges } from '../data/challenges';
import { storage } from '../utils/storage';
import { gamification } from '../utils/gamification';

function ChallengeDetail() {
  const { id } = useParams();
  const challenge = challenges.find(c => c.id === id);

  const [code, setCode] = useState(() => {
    return challenge ? storage.get(`code_${challenge.id}`, challenge.starterCode) : '';
  });
  const [results, setResults] = useState([]);
  const [isSolved, setIsSolved] = useState(() => {
    return challenge ? storage.get(`solved_${challenge.id}`, 'false') === 'true' : false;
  });
  const [aiReview, setAiReview] = useState(null);
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const fetchAiReview = async (userCode) => {
    setIsReviewLoading(true);

    // Симуляція "роздумів" ШІ
    setTimeout(() => {
      let complexity = "Час: O(n), Пам'ять: O(1)";
      let hint = "Це хороше рішення! Вбудовані методи часто оптимізовані під капотом.";
      let correctness = "✔ Чудова робота! Код написаний чисто і проходить всі кейси.";
      let isOpt = true;

      // Примітивна евристика для визначення O(n^2) (вкладені цикли)
      if (userCode.includes('for') && (userCode.split('for').length - 1 > 1) || userCode.includes('forEach') && userCode.includes('includes')) {
        complexity = "Час: O(n²), Пам'ять: O(1)";
        hint = "Використання вкладених циклів або методів всередині циклу (як includes) робить алгоритм повільнішим. Спробуйте використати Set або Map для швидкого пошуку.";
        correctness = "⚠ Код правильний, але має проблеми з продуктивністю на великих масивах.";
        isOpt = false;
      } else if (userCode.includes('Set') || userCode.includes('Map')) {
        complexity = "Час: O(n), Пам'ять: O(n)";
        hint = "Використання Set/Map - це чудовий патерн для оптимізації доступу за O(1)!";
      }

      setAiReview({
        isOptimal: isOpt,
        correctness: correctness,
        complexity: complexity,
        hint: hint
      });
      setIsReviewLoading(false);
    }, 1500); // 1.5s delay
  };

  useEffect(() => {
    // If we want to handle code changes from outside (e.g. reset), 
    // but here it's mostly handled by internal state and initialization.
  }, [challenge]);

  if (!challenge) return <div className="error">Задача не знайдена</div>;

  const handleReset = () => {
    if (window.confirm('Скинути код до початкового стану?')) {
      setCode(challenge.starterCode);
      storage.remove(`code_${challenge.id}`);
    }
  };

  const runTests = () => {
    const testResults = [];
    let allPassed = true;

    try {
      // Safe execution using new Function
      // We wrap the user code and then call the function defined in it
      const userFunc = new Function(`
        ${code}
        return ${challenge.functionName};
      `)();

      challenge.tests.forEach((test, index) => {
        try {
          const output = userFunc(...test.input);
          const passed = JSON.stringify(output) === JSON.stringify(test.expected);

          testResults.push({
            id: index,
            passed,
            input: JSON.stringify(test.input),
            expected: JSON.stringify(test.expected),
            actual: JSON.stringify(output)
          });

          if (!passed) allPassed = false;
        } catch (err) {
          allPassed = false;
          testResults.push({
            id: index,
            passed: false,
            error: err.message
          });
        }
      });
    } catch (err) {
      allPassed = false;
      testResults.push({
        id: 'global',
        passed: false,
        error: `Помилка синтаксису або виконання: ${err.message}`
      });
    }

    setResults(testResults);
    if (allPassed) {
      if (!isSolved) {
        // Only award XP if it's the first time solving it
        const difficultyMultipliers = { easy: 20, medium: 50, hard: 100 };
        gamification.addXP(difficultyMultipliers[challenge.difficulty] || 50);
        gamification.checkChallengeContext(challenge);
      }
      setIsSolved(true);
      storage.setInstant(`solved_${challenge.id}`, 'true');

      // Fetch AI review if not fetched
      if (!aiReview) {
        fetchAiReview(code, challenge.description);
      }
    }

    // Save current code
    storage.set(`code_${challenge.id}`, code);
  };

  return (
    <div className="challenge-detail-page animate-fade-in">
      <aside className="challenge-sidebar glass">
        <Link to="/challenges" className="back-link">← До списку задач</Link>
        <div className="challenge-info">
          <h2>{challenge.title}</h2>
          <div className="challenge-meta">
            <span className={`badge ${challenge.difficulty}`}>{challenge.difficulty}</span>
            <span className="category-tag">{challenge.category}</span>
          </div>
          <div className="description">
            {challenge.description.split('\n').map((line, i) => (
              <p key={i} style={{ marginBottom: line.trim() === '' ? '0' : '10px' }}>
                {line}
              </p>
            ))}
          </div>

          {challenge.hint && (
            <div className="hint-section" style={{ marginTop: '15px', marginBottom: '15px' }}>
              <button
                className="btn outline-btn small"
                onClick={() => setShowHint(!showHint)}
                style={{ fontSize: '0.8rem', padding: '5px 10px' }}
              >
                {showHint ? 'Приховати підказку' : '💡 Потрібна підказка?'}
              </button>
              {showHint && (
                <div className="hint-text animate-fade-in" style={{
                  marginTop: '10px',
                  padding: '12px',
                  background: 'rgba(255, 243, 205, 0.1)',
                  borderLeft: '4px solid #ffc107',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  color: '#ffe69c'
                }}>
                  {challenge.hint}
                </div>
              )}
            </div>
          )}

          <div className="examples">
            <h3>Приклади:</h3>
            {challenge.examples.map((ex, i) => (
              <pre key={i}>{ex}</pre>
            ))}
          </div>

          {challenge.leetcodeLinks && challenge.leetcodeLinks.length > 0 && (
            <div className="leetcode-section" style={{ marginTop: '20px', padding: '15px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>🧠 Similar on LeetCode</h3>
              {challenge.leetcodeLinks.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noreferrer" style={{ display: 'block', color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '5px' }}>
                  {link.title} ↗
                </a>
              ))}
            </div>
          )}
        </div>

        {isSolved && (
          <div className="success-badge">
            ✅ Задача вирішена!
          </div>
        )}
      </aside>

      <main className="editor-section">
        <div className="editor-container glass">
          <div className="editor-header">
            <span>index.js</span>
            <div className="editor-actions">
              <button className="btn outline-btn small" onClick={handleReset}>Скинути</button>
              <button className="btn primary-btn small" onClick={runTests}>Запустити тести</button>
            </div>
          </div>
          <Editor
            height="60vh"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => {
              setCode(value);
              storage.set(`code_${challenge.id}`, value);
            }}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
              theme: 'vs-dark'
            }}
          />
        </div>

        <div className="results-panel glass">
          <h3>Результати тестів:</h3>
          <div className="test-list">
            {results.length === 0 ? (
              <p className="no-results">Натисніть "Запустити тести", щоб побачити результат.</p>
            ) : (
              results.map((res, i) => (
                <div key={i} className={`test-item ${res.passed ? 'passed' : 'failed'}`}>
                  <span className="status-icon">{res.passed ? '✅' : '❌'}</span>
                  <div className="test-details">
                    <span className="test-name">Тест {i + 1}</span>
                    {res.error ? (
                      <span className="test-error">{res.error}</span>
                    ) : (
                      !res.passed && (
                        <div className="test-diff">
                          <span>Очікувалось: <code>{res.expected}</code></span>
                          <span>Отримано: <code>{res.actual}</code></span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {isSolved && (
          <div className="ai-review-panel glass animate-fade-in" style={{ marginTop: '20px', padding: '25px', borderRadius: '20px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid var(--primary)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>🤖 AI Code Review</h3>
            {isReviewLoading ? (
              <div style={{ color: 'var(--text-muted)' }}>Аналіз коду ШІ... ⏳ (відповідь може зайняти кілька секунд)</div>
            ) : aiReview ? (
              <div className="ai-feedback" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: aiReview.isOptimal || aiReview.correctness.includes('✔') ? 'var(--success)' : 'var(--warning)' }}>
                  <span>{aiReview.isOptimal || aiReview.correctness.includes('✔') ? '✔' : '⚠'}</span>
                  <span style={{ fontWeight: '500' }}>{aiReview.correctness}</span>
                </div>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', display: 'inline-block', width: 'fit-content' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Складність:</span>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', marginTop: '5px', color: 'var(--text-main)' }}>{aiReview.complexity}</div>
                </div>
                {aiReview.hint && (
                  <div style={{ padding: '15px', background: 'rgba(245, 158, 11, 0.1)', borderLeft: '4px solid var(--warning)', borderRadius: '8px', marginTop: '10px' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--warning)', marginBottom: '5px' }}>💡 Підказка / Порада:</div>
                    <div style={{ color: '#fbbf24', fontSize: '0.95rem', lineHeight: '1.5' }}>{aiReview.hint}</div>
                  </div>
                )}
              </div>
            ) : null}

            <div style={{ marginTop: '25px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <button
                className="btn outline-btn"
                onClick={() => setShowCommunity(!showCommunity)}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {showCommunity ? 'Приховати рішення спільноти' : '👥 Показати рішення спільноти (Community)'}
              </button>

              {showCommunity && challenge.communitySolutions && (
                <div className="community-solutions animate-fade-in" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {challenge.communitySolutions.map((sol, i) => (
                    <div key={i} className="community-solution" style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <span style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>@{sol.author}</span>
                        <span>👍 {sol.likes}</span>
                      </div>
                      <pre style={{ margin: 0, padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', color: '#a5b4fc', fontSize: '0.95rem', overflowX: 'auto', fontFamily: "'Fira Code', monospace" }}>
                        {sol.code}
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ChallengeDetail;
