import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { challenges } from '../../data/challenges';
import { getRandomItems } from '../../utils/random';

export default function InterviewChallenges({ onComplete }) {
  const [interviewData] = useState(() => {
    const easy = challenges.filter(c => c.difficulty === 'easy');
    const medium = challenges.filter(c => c.difficulty === 'medium');
    const hard = challenges.filter(c => c.difficulty === 'hard');

    const picked = [
      ...getRandomItems(easy, 1),
      ...getRandomItems(medium, 1),
      ...getRandomItems(hard, 1)
    ];

    const initialCodes = {};
    picked.forEach((c, idx) => {
      initialCodes[idx] = c.starterCode;
    });

    return { picked, initialCodes };
  });

  const selectedChallenges = interviewData.picked;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [runResults, setRunResults] = useState(null);
  const [editorCodes, setEditorCodes] = useState(interviewData.initialCodes);
  const [solvedStatuses, setSolvedStatuses] = useState({});

  const editorRef = useRef(null);


  if (selectedChallenges.length === 0) return <div>Loading challenges...</div>;

  const challenge = selectedChallenges[currentIndex];
  const isLastChallenge = currentIndex === selectedChallenges.length - 1;

  const handleEditorChange = (value) => {
    setEditorCodes(prev => ({ ...prev, [currentIndex]: value }));
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const runTests = () => {
    const userCode = editorCodes[currentIndex];
    let allPassed = true;
    const currentResults = [];

    try {
      const userFunc = new Function(`
        ${userCode}
return ${challenge.functionName};
`)();

      challenge.tests.forEach((test, index) => {
        try {
          // Clone inputs carefully to avoid mutation issues between tests
          const clonedInputs = JSON.parse(JSON.stringify(test.input));
          const result = userFunc(...clonedInputs);

          let passed = false;
          // Simple strict equality or deep equality for objects/arrays
          if (typeof test.expected === 'object' && test.expected !== null) {
            passed = JSON.stringify(result) === JSON.stringify(test.expected);
          } else if (Number.isNaN(test.expected) && Number.isNaN(result)) {
            passed = true;
          } else {
            passed = result === test.expected;
          }

          if (!passed) allPassed = false;

          currentResults.push({
            name: `Test ${index + 1} `,
            passed,
            expected: JSON.stringify(test.expected),
            actual: JSON.stringify(result)
          });
        } catch (err) {
          allPassed = false;
          currentResults.push({
            name: `Test ${index + 1} `,
            passed: false,
            error: err.message
          });
        }
      });
    } catch (err) {
      allPassed = false;
      currentResults.push({
        name: "Syntax/Execution Error",
        passed: false,
        error: err.message
      });
    }

    setRunResults(currentResults);

    // Update solved status if all passed
    if (allPassed) {
      setSolvedStatuses(prev => ({ ...prev, [currentIndex]: true }));
    }
  };

  const handleNextChallenge = () => {
    setRunResults(null);
    if (!isLastChallenge) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Complete phase
      const correctCount = Object.values(solvedStatuses).filter(Boolean).length;
      onComplete({ correct: correctCount, total: selectedChallenges.length });
    }
  };

  return (
    <div className="interview-challenges-wrapper" style={{ width: '100%', padding: '0 20px' }}>
      <div className="quiz-header" style={{ marginBottom: '20px' }}>
        <div className="question-meta">
          <span className="counter">Задача {currentIndex + 1} з {selectedChallenges.length}</span>
        </div>
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${((currentIndex) / selectedChallenges.length) * 100}% ` }}
          ></div>
        </div>
      </div>

      <div className="challenge-detail-page" style={{ height: 'calc(100vh - 250px)', marginTop: 0 }}>
        {/* Left Sidebar */}
        <div className="challenge-sidebar">
          <div className="challenge-meta">
            <span className={`badge ${challenge.difficulty} `}>{challenge.difficulty}</span>
          </div>
          <div className="challenge-info">
            <h2>{challenge.title}</h2>
          </div>
          <div className="description">
            <p>{challenge.description}</p>
          </div>

          {solvedStatuses[currentIndex] && (
            <div className="success-badge">
              ✓ Задачу вирішено!
            </div>
          )}

          <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <button
              className="btn primary-btn"
              onClick={handleNextChallenge}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {isLastChallenge ? 'Завершити інтерв\'ю' : 'Наступна задача →'}
            </button>
          </div>
        </div>

        {/* Right Editor Area */}
        <div className="editor-section">
          <div className="editor-container">
            <div className="editor-header">
              <span>{challenge.functionName}.js</span>
              <div className="editor-actions">
                <button className="btn small outline-btn" onClick={() => {
                  setEditorCodes(prev => ({ ...prev, [currentIndex]: challenge.starterCode }));
                  setRunResults(null);
                }}>Скинути код</button>
                <button className="btn small primary-btn" onClick={runTests}>Запустити тести</button>
              </div>
            </div>

            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={editorCodes[currentIndex]}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'Fira Code', monospace",
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16 }
              }}
            />
          </div>

          {runResults && (
            <div className="results-panel">
              <h3>Результати тестів</h3>
              <div className="test-list">
                {runResults.map((res, i) => (
                  <div key={i} className={`test - item ${res.passed ? 'passed' : 'failed'} `}>
                    <div className="status-icon">
                      {res.passed ? '✅' : '❌'}
                    </div>
                    <div className="test-details">
                      <div className="test-name">{res.name}</div>
                      {res.error ? (
                        <div className="test-error">{res.error}</div>
                      ) : !res.passed && (
                        <div className="test-diff">
                          Очікувалося: <code>{res.expected}</code> <br />
                          Отримано: <code>{res.actual}</code>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
