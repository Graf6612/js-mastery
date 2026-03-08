import React from 'react';

export default function InterviewIntro({ onStart }) {
  return (
    <div className="quiz-container interview-intro">
      <header>
        <h1>Режим Інтерв'ю</h1>
        <p className="subtitle">Симулятор реальної технічної співбесіди з JS</p>
      </header>

      <div className="intro-rules">
        <h3>Правила інтерв'ю:</h3>
        <ul>
          <li><strong>Обмеження часу:</strong> У вас є рівно <strong>30 хвилин</strong> на виконання всіх завдань.</li>
          <li><strong>Етап 1: Теорія.</strong> Вам буде запропоновано <strong>30 випадкових питань</strong> з основ JS, Web API та асинхронності. Правильна відповідь не показується одразу.</li>
          <li><strong>Етап 2: Практика.</strong> Після теорії ви маєте вирішити <strong>3 випадкові задачі</strong> у редакторі коду.</li>
          <li><strong>Час суворо контролюється.</strong> Якщо таймер дійде до нуля, ваш поточний прогрес буде автоматично надіслано.</li>
        </ul>
      </div>

      <button className="btn primary-btn start-btn" onClick={onStart}>
        Почати інтерв'ю
      </button>
    </div>
  );
}
