/**
 * AuthNavigator.js
 * ─────────────────────────────────────────────
 * Stack navigator for unauthenticated screens:
 *   Login → Onboarding
 *
 * Screens are registered here. The actual UI is in src/screens/auth/.
 * ─────────────────────────────────────────────
 */

import React                          from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../constants/constants';
import LoginScreen      from '../screens/auth/LoginScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.ONBOARDING}
      screenOptions={{
        headerShown:  false,   // custom headers on each screen
        animation:    'fade',  // smooth transition between auth screens
      }}
    >
      <Stack.Screen name={SCREENS.LOGIN}      component={LoginScreen} />
      <Stack.Screen name={SCREENS.ONBOARDING} component={OnboardingScreen} />
    </Stack.Navigator>
  );
}
