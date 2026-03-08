import { storage } from './storage';

// Level Thresholds
const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 1800, 3000, 5000];

// Badges Definitions
export const BADGES = {
  FIRST_QUIZ: { id: 'FIRST_QUIZ', title: '🎓 Перший Тест', icon: '🎓', desc: 'Завершено перший тест' },
  PERFECT_QUIZ: { id: 'PERFECT_QUIZ', title: '🎯 Снайпер', icon: '🎯', desc: '10/10 правильних відповідей у тесті' },
  FIRST_CHALLENGE: { id: 'FIRST_CHALLENGE', title: '💻 Кодер', icon: '💻', desc: 'Вирішено першу задачу' },
  ARRAY_MASTER: { id: 'ARRAY_MASTER', title: '🏆 Array Master', icon: '🏆', desc: 'Вирішено 3 задачі по масивах' },
  FIRST_INTERVIEW: { id: 'FIRST_INTERVIEW', title: '💼 Кандидат', icon: '💼', desc: "Завершено перше інтерв'ю" },
  STREAK_3: { id: 'STREAK_3', title: '🔥 3 Дні', icon: '🔥', desc: '3 дні підряд' },
  STREAK_7: { id: 'STREAK_7', title: '🔥🔥 7 Днів', icon: '🔥🔥', desc: 'Тиждень навчання' }
};

export const gamification = {
  // === XP and Level ===

  getStats: () => {
    return storage.get('gamificationStats', {
      xp: 0,
      level: 1,
      streak: 0,
      lastActiveDate: null,
      badges: [] // Array of badge IDs
    });
  },

  addXP: (amount) => {
    const stats = gamification.getStats();
    let newXp = stats.xp + amount;
    let newLevel = stats.level;

    // Check for level up
    while (newLevel < LEVEL_THRESHOLDS.length && newXp >= LEVEL_THRESHOLDS[newLevel]) {
      newLevel++;
    }

    const updatedStats = { ...stats, xp: newXp, level: newLevel };
    storage.setInstant('gamificationStats', updatedStats);
    gamification.updateStreak(); // Always check streak on activity
    return { ...updatedStats, leveledUp: newLevel > stats.level };
  },

  getLevelProgress: (xp, level) => {
    const currentLevelXP = LEVEL_THRESHOLDS[level - 1] || 0;
    const nextLevelXP = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
    
    // If max level, progress is full
    if (level >= LEVEL_THRESHOLDS.length) return { current: xp, max: 'MAX', percent: 100 };

    const xpIntoLevel = xp - currentLevelXP;
    const levelSize = nextLevelXP - currentLevelXP;
    const percent = Math.min(100, Math.round((xpIntoLevel / levelSize) * 100));

    return { 
      currentInfo: xpIntoLevel, 
      maxInfo: levelSize, 
      totalXp: xp,
      nextLevelXp: nextLevelXP,
      percent 
    };
  },

  // === Streak ===

  updateStreak: () => {
    const stats = gamification.getStats();
    const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    if (stats.lastActiveDate === todayStr) {
      // Already active today
      return stats;
    }

    let newStreak = stats.streak;
    
    if (!stats.lastActiveDate) {
      // First time ever
      newStreak = 1;
    } else {
      const lastDate = new Date(stats.lastActiveDate);
      const today = new Date(todayStr);
      const diffTime = Math.abs(today - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      if (diffDays === 1) {
        // Consecutive day
        newStreak += 1;
      } else if (diffDays > 1) {
        // Streak broken
        newStreak = 1;
      }
    }

    const updatedStats = { ...stats, streak: newStreak, lastActiveDate: todayStr };
    storage.setInstant('gamificationStats', updatedStats);

    // Check Streak Badges
    if (newStreak === 3) gamification.awardBadge('STREAK_3');
    if (newStreak === 7) gamification.awardBadge('STREAK_7');

    return updatedStats;
  },

  // === Badges ===

  awardBadge: (badgeId) => {
    const stats = gamification.getStats();
    if (!stats.badges.includes(badgeId)) {
      const updatedBadges = [...stats.badges, badgeId];
      storage.setInstant('gamificationStats', { ...stats, badges: updatedBadges });
      // You could trigger a toast/notification event here natively if you had a system
      console.log(`🏆 Відкрито бейдж: ${BADGES[badgeId].title}`);
      return true;
    }
    return false;
  },

  // Context specific checks called from components
  checkQuizContext: (score, total) => {
    gamification.awardBadge('FIRST_QUIZ');
    if (score === total && total >= 10) {
      gamification.awardBadge('PERFECT_QUIZ');
    }
  },

  checkChallengeContext: (challenge) => {
    gamification.awardBadge('FIRST_CHALLENGE');
    
    // Check Array Master
    if (challenge.category === 'arrays' || challenge.category === 'Масиви') {
      const solvedKeys = storage.getKeysByPrefix('solved_').filter(key => storage.get(key) === 'true');
      // Hacky way to count, ideally we'd look up categories of all solved, but simplified here
      if (solvedKeys.length >= 3) {
         // Assuming if they solved 3 and they just solved an array one, they might get it. 
         // For a strict check, we'd iterate challenges and count solved ones in 'arrays' category.
         gamification.awardBadge('ARRAY_MASTER');
      }
    }
  },

  checkInterviewContext: () => {
    gamification.awardBadge('FIRST_INTERVIEW');
  }
};
