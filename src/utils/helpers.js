/**
 * helpers.js
 * ─────────────────────────────────────────────
 * General-purpose utility functions.
 * Pure functions — no side effects, easy to test.
 *
 * Usage:
 *   import { formatTime, minutesToDuration } from '../utils/helpers';
 * ─────────────────────────────────────────────
 */

import dayjs from 'dayjs';

// ─── Time & Date ──────────────────────────────

/**
 * formatTime
 * Converts a "HH:MM" string to a readable format.
 * @param {string} time24 - e.g. "14:30"
 * @param {boolean} use12h - if true, returns "2:30 PM"
 * @returns {string}
 */
export function formatTime(time24, use12h = true) {
  if (!time24) return '';
  const [h, m] = time24.split(':').map(Number);
  if (!use12h) return time24;

  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

/**
 * minutesToDuration
 * Converts a number of minutes to a human-readable string.
 * @param {number} mins - e.g. 90
 * @returns {string} - e.g. "1h 30m"
 */
export function minutesToDuration(mins) {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/**
 * getGreeting
 * Returns a time-appropriate greeting.
 * @returns {string} - "Good morning" | "Good afternoon" | "Good evening"
 */
export function getGreeting() {
  const hour = dayjs().hour();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

/**
 * isToday
 * Checks if a date string is today.
 * @param {string} dateStr - ISO date string e.g. "2025-01-15"
 * @returns {boolean}
 */
export function isToday(dateStr) {
  return dayjs(dateStr).isSame(dayjs(), 'day');
}

// ─── Routine & Progress ───────────────────────

/**
 * calcCompletionPercent
 * Calculates how many tasks in a routine are done.
 * @param {Array} tasks - array of { is_completed: boolean }
 * @returns {number} - 0 to 100
 */
export function calcCompletionPercent(tasks = []) {
  if (!tasks.length) return 0;
  const done = tasks.filter((t) => t.is_completed).length;
  return Math.round((done / tasks.length) * 100);
}

/**
 * sortByTime
 * Sorts an array of objects by a time string property.
 * @param {Array}  items    - array of objects
 * @param {string} timeKey  - key on each object that holds "HH:MM"
 * @returns {Array}
 */
export function sortByTime(items, timeKey = 'start_time') {
  return [...items].sort((a, b) => {
    const [ah, am] = (a[timeKey] || '00:00').split(':').map(Number);
    const [bh, bm] = (b[timeKey] || '00:00').split(':').map(Number);
    return (ah * 60 + am) - (bh * 60 + bm);
  });
}

// ─── String Utilities ─────────────────────────

/**
 * capitalise
 * Capitalises the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export function capitalise(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * truncate
 * Shortens a string with an ellipsis.
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
export function truncate(str = '', maxLen = 60) {
  return str.length <= maxLen ? str : str.slice(0, maxLen - 3) + '...';
}

// ─── Validation ───────────────────────────────

/**
 * isValidEmail
 * Basic email format check.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * isValidPassword
 * Checks minimum password requirements.
 * @param {string} password
 * @returns {{ valid: boolean, message: string }}
 */
export function isValidPassword(password = '') {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters.' };
  }
  return { valid: true, message: '' };
}
