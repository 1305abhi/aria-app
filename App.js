/**
 * App.js
 * ─────────────────────────────────────────────
 * App entry point.
 *
 * Responsibilities:
 *  1. Wrap the app in AuthProvider (makes user session available everywhere)
 *  2. Wrap in GestureHandlerRootView (required by React Navigation)
 *  3. Start the RootNavigator (which shows auth or main screens)
 *
 * DO NOT put screen logic or UI here — keep this file as a thin shell.
 * ─────────────────────────────────────────────
 */

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <StatusBar style="auto" />
          <RootNavigator />
        </AuthProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
