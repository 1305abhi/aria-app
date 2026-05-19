/**
 * constants.js
 * ─────────────────────────────────────────────
 * App-wide string constants.
 * Centralising these prevents typos and makes refactoring easy.
 *
 * Usage:
 *   import { SCREENS, STORAGE_KEYS } from '../constants/constants';
 * ─────────────────────────────────────────────
 */

// ─── Screen Names ─────────────────────────────
// Used in React Navigation route definitions
export const SCREENS = {
  // Auth stack
  SPLASH:       'Splash',
  LOGIN:        'Login',
  ONBOARDING:   'Onboarding',

  // Main tab screens
  HOME:         'Home',
  CHAT:         'Chat',
  CALENDAR:     'Calendar',
  NOTIFICATIONS:'Notifications',
  PROFILE:      'Profile',

  // Sub-screens (pushed on the stack)
  ROUTINE:      'Routine',
  ROUTINE_DETAIL: 'RoutineDetail',
  GOAL_CREATE:  'GoalCreate',
  SETTINGS:     'Settings',
};

// ─── AsyncStorage / SecureStore Keys ─────────
// Keys used when saving/reading persistent data
export const STORAGE_KEYS = {
  AUTH_TOKEN:       'aria_auth_token',
  USER_SESSION:     'aria_user_session',
  ONBOARDING_DONE:  'aria_onboarding_done',
  THEME_PREFERENCE: 'aria_theme',
  NOTIFICATION_PREF:'aria_notifications',
};

// ─── Supabase Table Names ─────────────────────
// Matches the table names you create in Supabase dashboard
export const TABLES = {
  USERS:          'users',
  GOALS:          'goals',
  ROUTINES:       'routines',
  ROUTINE_TASKS:  'routine_tasks',
  SCHEDULE_TASKS: 'schedule_tasks',
  CHAT_HISTORY:   'chat_history',
  NOTIFICATIONS:  'notifications',
};

// ─── AI Configuration ─────────────────────────
// Google Gemini (free tier) — swap model name here if needed
export const AI_CONFIG = {
  // Gemini 1.5 Flash: free tier, very fast, long context
  MODEL:        'gemini-1.5-flash',
  BASE_URL:     'https://generativelanguage.googleapis.com/v1beta',
  MAX_TOKENS:   1024,    // keep responses concise
  TEMPERATURE:  0.7,     // 0 = deterministic, 1 = creative

  // Aria's personality — sent as system context on every request
  SYSTEM_PROMPT: `You are Aria, a warm and intelligent personal AI assistant 
    specialising in building healthy daily routines and schedules. 
    You are concise, friendly, and action-oriented. 
    When the user asks for a routine or schedule, always respond with a 
    valid JSON object so the app can parse and save it automatically.
    Never give generic advice — always tailor to what you know about this user.`,
};

// ─── Routine Categories ───────────────────────
export const ROUTINE_CATEGORIES = [
  { id: 'health',    label: 'Health',    icon: '🏃', color: '#00C48C' },
  { id: 'skincare',  label: 'Skincare',  icon: '✨', color: '#FF6B9D' },
  { id: 'fitness',   label: 'Fitness',   icon: '💪', color: '#FF8C42' },
  { id: 'mindset',   label: 'Mindset',   icon: '🧘', color: '#6A5ACD' },
  { id: 'work',      label: 'Work',      icon: '💼', color: '#00BFFF' },
  { id: 'learning',  label: 'Learning',  icon: '📚', color: '#FFB800' },
  { id: 'sleep',     label: 'Sleep',     icon: '🌙', color: '#8A7AED' },
  { id: 'nutrition', label: 'Nutrition', icon: '🥗', color: '#5CC8A8' },
];

// ─── Time Slot Config ─────────────────────────
export const TIME_CONFIG = {
  DAY_START_HOUR:  5,   // 5 AM — earliest slot shown on calendar
  DAY_END_HOUR:    24,  // midnight — latest slot
  SLOT_HEIGHT_PX:  60,  // pixels per hour in the calendar timeline
  MIN_TASK_MINS:   15,  // minimum task duration in minutes
};
