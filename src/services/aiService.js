/**
 * aiService.js
 * ─────────────────────────────────────────────
 * All AI API calls go through this file.
 * Currently uses Google Gemini 1.5 Flash (free tier).
 *
 * HOW TO SET UP:
 * 1. Go to https://aistudio.google.com/app/apikey
 * 2. Create a free API key
 * 3. Add to your .env file:
 *      EXPO_PUBLIC_GEMINI_API_KEY=your-key-here
 *
 * Swapping AI providers later:
 * Just change the functions in this file — the rest of the app
 * doesn't need to know which AI is being used.
 *
 * Usage:
 *   import { sendChatMessage, generateRoutine } from '../services/aiService';
 * ─────────────────────────────────────────────
 */

import { AI_CONFIG } from '../constants/constants';

// ─── Environment ──────────────────────────────
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

if (__DEV__ && !GEMINI_API_KEY) {
  console.warn('⚠️  Gemini API key not found. Add EXPO_PUBLIC_GEMINI_API_KEY to your .env file.');
}

// ─── Build the Gemini API Endpoint ────────────
const getEndpoint = () =>
  `${AI_CONFIG.BASE_URL}/models/${AI_CONFIG.MODEL}:generateContent?key=${GEMINI_API_KEY}`;

/**
 * sendChatMessage
 * ─────────────────────────────────────────────
 * Sends a conversation to Gemini and returns the AI's reply.
 *
 * @param {Array}  messages    - Array of { role: 'user'|'model', text: string }
 * @param {Object} userContext - Optional user data to personalise the response
 *                               e.g. { name, goals, missedHabits }
 * @returns {Promise<string>}  - The AI's text reply
 */
export async function sendChatMessage(messages, userContext = {}) {
  try {
    // Build context string to inject user's memory into every request
    const contextNote = userContext.name
      ? `\n\nUser context: Name is ${userContext.name}. ` +
        `Goals: ${(userContext.goals || []).join(', ')}. ` +
        `Recent missed habits: ${(userContext.missedHabits || []).join(', ')}.`
      : '';

    // Convert our message format to Gemini's expected format
    const contents = messages.map((msg) => ({
      role:  msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    const response = await fetch(getEndpoint(), {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: AI_CONFIG.SYSTEM_PROMPT + contextNote }],
        },
        contents,
        generationConfig: {
          temperature:     AI_CONFIG.TEMPERATURE,
          maxOutputTokens: AI_CONFIG.MAX_TOKENS,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err?.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    // Extract text from Gemini's nested response structure
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  } catch (error) {
    console.error('aiService.sendChatMessage error:', error);
    throw error; // re-throw so the UI can show an error state
  }
}

/**
 * generateRoutine
 * ─────────────────────────────────────────────
 * Asks the AI to create a structured routine from a user's description.
 * Returns a parsed JS object ready to save to Supabase.
 *
 * @param {string} userRequest - e.g. "I want a morning skincare routine"
 * @param {Object} userContext - Optional user preferences / constraints
 * @returns {Promise<Object>}  - Parsed routine object:
 *   {
 *     title: string,
 *     category: string,
 *     tasks: [{ title, durationMins, time, notes }]
 *   }
 */
export async function generateRoutine(userRequest, userContext = {}) {
  // Tell the AI to respond ONLY with JSON — no extra text
  const prompt =
    `The user wants: "${userRequest}"\n\n` +
    `Create a practical daily routine for them. ` +
    `Respond ONLY with a valid JSON object in this exact format, no markdown:\n` +
    `{\n` +
    `  "title": "Routine name",\n` +
    `  "category": "health|skincare|fitness|mindset|work|learning|sleep|nutrition",\n` +
    `  "tasks": [\n` +
    `    { "title": "Task name", "durationMins": 10, "time": "07:00", "notes": "Optional tip" }\n` +
    `  ]\n` +
    `}`;

  const rawText = await sendChatMessage(
    [{ role: 'user', text: prompt }],
    userContext
  );

  // Strip any accidental markdown fences before parsing
  const cleaned = rawText.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    console.error('aiService.generateRoutine: Failed to parse JSON response:', rawText);
    throw new Error('AI returned invalid JSON. Please try again.');
  }
}

/**
 * generateAdaptiveSuggestion
 * ─────────────────────────────────────────────
 * Generates a smart suggestion when the user has missed routines.
 * Used by the Notifications screen.
 *
 * @param {Object} stats - { missedCount, routineTitle, lastCompletedDate }
 * @returns {Promise<string>}  - A short, friendly suggestion message
 */
export async function generateAdaptiveSuggestion(stats) {
  const prompt =
    `The user missed their "${stats.routineTitle}" routine ${stats.missedCount} times. ` +
    `Last completed: ${stats.lastCompletedDate}. ` +
    `Write a short (max 2 sentences), warm, non-judgmental suggestion. ` +
    `Offer a lighter alternative or motivation. Do not use emojis.`;

  return sendChatMessage([{ role: 'user', text: prompt }]);
}
