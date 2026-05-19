/**
 * RootNavigator.js
 * ─────────────────────────────────────────────
 * The top-level navigator. Decides which stack to show:
 *   - AuthStack   → when the user is NOT logged in
 *   - MainTabs    → when the user IS logged in
 *
 * React Navigation reads the user's session from AuthContext
 * and automatically redirects when login state changes.
 * ─────────────────────────────────────────────
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '../context/AuthContext';
import { COLORS } from '../constants/theme';
import { SCREENS } from '../constants/constants';

// ── Navigator instances ──
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// ── Main App Screens (Outside Tabs) ──
import NotificationsScreen from '../screens/main/NotificationsScreen';
import GoalsScreen from '../screens/main/GoalsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, isLoading } = useAuth();

  // ── Show a spinner while checking saved session ──
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // ── Logged in → show main app tabs and inner screens ──
          <Stack.Group>
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen name={SCREENS.NOTIFICATIONS} component={NotificationsScreen} />
            <Stack.Screen name="Goals" component={GoalsScreen} />
          </Stack.Group>
        ) : (
          // ── Not logged in → show auth screens ──
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
