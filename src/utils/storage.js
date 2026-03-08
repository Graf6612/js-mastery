/**
 * Robust LocalStorage Manager for JS Mastery Quiz
 * Features: In-memory caching, debounced writes, structured JSON parsing, and error catching.
 */

// In-memory cache to prevent constant disk I/O reads
const cache = new Map();

// Timer map for debouncing writes to not block the main JS thread
const writeTimers = new Map();
const DEBOUNCE_MS = 1000; // 1 second delay for writing to disk (great for real-time code editors)

export const storage = {
  /**
   * Retrieves data from cache or falls back to localStorage.
   * @param {string} key 
   * @param {*} defaultValue 
   * @returns {*} Parsed data or undefined/defaultValue
   */
  get: (key, defaultValue = null) => {
    // 1. Check in-memory cache first (Lightning fast)
    if (cache.has(key)) {
      return cache.get(key);
    }

    // 2. Fallback to localStorage
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        // Try to parse JSON, if it fails, it might be a raw string
        try {
          const parsed = JSON.parse(item);
          cache.set(key, parsed);
          return parsed;
        } catch {
          cache.set(key, item);
          return item;
        }
      }
    } catch (error) {
      console.warn(`[Storage] Error reading key "${key}" from localStorage:`, error);
    }

    // 3. Return default if missing
    return defaultValue;
  },

  /**
   * Sets data in cache instantly, and schedules a background write to localStorage.
   * @param {string} key 
   * @param {*} value 
   */
  set: (key, value) => {
    // 1. Update memory cache instantly (UI will feel instant)
    cache.set(key, value);

    // 2. Clear existing timer for this key if rapid changes are happening
    if (writeTimers.has(key)) {
      clearTimeout(writeTimers.get(key));
    }

    // 3. Debounce the actual disk write
    const timerId = setTimeout(() => {
      try {
        const valueToStore = typeof value === 'object' ? JSON.stringify(value) : String(value);
        localStorage.setItem(key, valueToStore);
      } catch (error) {
        console.warn(`[Storage] Error writing key "${key}" to localStorage. Storage might be full or blocked.`, error);
      }
      writeTimers.delete(key);
    }, DEBOUNCE_MS);

    writeTimers.set(key, timerId);
  },

  /**
   * Instantly forces a write to localStorage (bypassing debounce).
   * Useful for critical saves before page unload.
   * @param {string} key 
   * @param {*} value 
   */
  setInstant: (key, value) => {
    cache.set(key, value);
    if (writeTimers.has(key)) {
      clearTimeout(writeTimers.get(key));
      writeTimers.delete(key);
    }
    
    try {
      const valueToStore = typeof value === 'object' ? JSON.stringify(value) : String(value);
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.warn(`[Storage] Error instant-writing key "${key}":`, error);
    }
  },

  /**
   * Removes an item from both cache and localStorage.
   * @param {string} key 
   */
  remove: (key) => {
    cache.delete(key);
    
    if (writeTimers.has(key)) {
      clearTimeout(writeTimers.get(key));
      writeTimers.delete(key);
    }

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`[Storage] Error removing key "${key}":`, error);
    }
  },

  /**
   * Finds all keys in localStorage matching a prefix.
   * @param {string} prefix 
   * @returns {string[]} Array of matching keys
   */
  getKeysByPrefix: (prefix) => {
    const keys = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          keys.push(key);
        }
      }
    } catch(error) {
      console.warn("[Storage] Could not read localStorage keys.", error);
    }
    return keys;
  }
};
