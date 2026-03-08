import { useState, useEffect, useCallback } from 'react';

export function useTimer(initialSeconds, onComplete) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (isActive && seconds === 0) {
      clearInterval(interval);
      setTimeout(() => {
        setIsActive(false);
        if (onComplete) onComplete();
      }, 0);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, onComplete]);

  const start = useCallback(() => setIsActive(true), []);
  const pause = useCallback(() => setIsActive(false), []);
  const reset = useCallback(() => {
    setSeconds(initialSeconds);
    setIsActive(false);
  }, [initialSeconds]);

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = seconds <= 300; // less than 5 minutes

  return {
    seconds,
    isActive,
    start,
    pause,
    reset,
    formatTime,
    isLowTime
  };
}
