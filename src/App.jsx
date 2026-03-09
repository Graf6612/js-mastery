import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { quizData } from './data/quizData';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import ChallengesList from './components/ChallengesList';
import ChallengeDetail from './components/ChallengeDetail';
import InterviewMode from './components/interview/InterviewMode';
import History from './components/History';
import { storage } from './utils/storage';
import { gamification } from './utils/gamification';

// Navigation Component
const Nav = () => {
  const location = useLocation();
  return (
    <nav className="main-nav">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Квіз</Link>
      <Link to="/challenges" className={location.pathname.startsWith('/challenges') ? 'active' : ''}>Задачі</Link>
      <Link to="/interview" className={location.pathname === '/interview' ? 'active' : ''}>Інтерв'ю</Link>
      <Link to="/history" className={location.pathname === '/history' ? 'active' : ''}>Історія</Link>
    </nav>
  );
};

// Login Component
const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '123456781') {
      onLogin();
    } else {
      setError('Невірний пароль');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">🔒</div>
        <h2>Вхід</h2>
        <p>Введіть пароль для доступу до JS Mastery</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="password"
            className="login-input"
            placeholder="Введіть пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button type="submit" className="login-btn">Увійти</button>
          {error && <div className="error-msg">{error}</div>}
        </form>
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => storage.get('isAuth', false));
  const [screen, setScreen] = useState('home');
  const [currentTopic, setCurrentTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState(() =>
    storage.get('quizStats', { totalTests: 0, totalScore: 0, totalQuestions: 0 })
  );

  useEffect(() => {
    // Other effects can go here if needed
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    storage.setInstant('isAuth', true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  const startQuiz = (topicsArray, count = 10, isExam = false) => {
    let allSelectedQuestions = [];
    const passedMap = storage.get('passedQuestions', {});

    // If it's an exam, use all available topics
    const finalTopics = isExam ? Object.keys(quizData) : topicsArray;

    finalTopics.forEach(topic => {
      const allTopicQuestions = quizData[topic] || [];
      const passedForTopic = passedMap[topic] || [];

      let availableQuestions = allTopicQuestions.filter(q => !passedForTopic.includes(q.question));

      if (availableQuestions.length === 0 && allTopicQuestions.length > 0) {
        availableQuestions = allTopicQuestions;
      }

      const taggedQuestions = availableQuestions.map(q => ({ ...q, originalTopic: topic }));
      allSelectedQuestions = [...allSelectedQuestions, ...taggedQuestions];
    });

    const selectedQuestions = [...allSelectedQuestions].sort(() => Math.random() - 0.5).slice(0, count);

    setQuestions(selectedQuestions);
    setCurrentTopic(isExam ? 'exam' : (topicsArray.length === 1 ? topicsArray[0] : 'mixed'));
    setScore(0);
    setScreen('quiz');
  };

  const finishQuiz = (finalScore, mistakes) => {
    setScore(finalScore);
    const correctlyAnswered = questions.filter(currQ => !mistakes.some(m => m.question === currQ.question));

    // Update passed questions based on their original topic
    const passedMap = storage.get('passedQuestions', {});
    correctlyAnswered.forEach(q => {
      if (q.originalTopic) {
        const passedForTopic = passedMap[q.originalTopic] || [];
        if (!passedForTopic.includes(q.question)) {
          passedMap[q.originalTopic] = [...passedForTopic, q.question];
        }
      }
    });
    // Use instant save when finishing a test to prevent data loss on immediate tab close
    storage.setInstant('passedQuestions', passedMap);

    const savedMistakes = storage.get('quizMistakes', []);
    const updatedMistakes = [...mistakes, ...savedMistakes].filter((v, i, a) => a.findIndex(t => t.question === v.question) === i).slice(0, 30);
    storage.setInstant('quizMistakes', updatedMistakes);

    const newStats = {
      totalTests: stats.totalTests + 1,
      totalScore: stats.totalScore + finalScore,
      totalQuestions: stats.totalQuestions + questions.length
    };
    setStats(newStats);
    storage.setInstant('quizStats', newStats);

    // Record detailed history
    const historyEntry = {
      id: Date.now(),
      type: 'quiz',
      date: new Date().toISOString(),
      score: finalScore,
      total: questions.length,
      topics: currentTopic
    };
    const historyMap = storage.get('quizHistory', []);
    storage.setInstant('quizHistory', [historyEntry, ...historyMap]);

    // Gamification
    const xpAwarded = finalScore * 10;
    gamification.addXP(xpAwarded);
    gamification.checkQuizContext(finalScore, questions.length);

    setScreen('result');
  };

  return (
    <Router>
      <div className="app-container">
        <header>
          <div className="header-content">
            <h1>JS Mastery 🚀</h1>
            <Nav />
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="tab-content">
                {screen === 'home' && <Home stats={stats} startQuiz={startQuiz} />}
                {screen === 'quiz' && <Quiz questions={questions} onFinish={finishQuiz} />}
                {screen === 'result' && (
                  <Result
                    score={score}
                    total={questions.length}
                    onRestart={() => setScreen('home')}
                  />
                )}
              </div>
            } />
            <Route path="/challenges" element={<ChallengesList />} />
            <Route path="/challenges/:id" element={<ChallengeDetail />} />
            <Route path="/interview" element={<InterviewMode />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>

        <footer className="footer-mini">
          <p>Created by Yaroslav Horodynskyi</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
