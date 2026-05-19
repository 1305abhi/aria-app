/**
 * MainNavigator.js
 * ─────────────────────────────────────────────
 * Bottom tab navigator shown after login.
 * Tabs: Home · Chat · Calendar · Notifications · Profile
 *
 * Custom tab bar styling matches the dark theme.
 * ─────────────────────────────────────────────
 */

import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SCREENS } from '../constants/constants';
import { FONTS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// ── Tab screens ──
import HomeScreen from '../screens/main/HomeScreen';
import ChatScreen from '../screens/main/ChatScreen';
import CalendarScreen from '../screens/main/CalendarScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import GoalsScreen from '../screens/main/GoalsScreen';

const Tab = createBottomTabNavigator();

// ─── Tab icon map using Ionicons ───
const TAB_ICONS = {
  [SCREENS.HOME]:     { active: 'home',       inactive: 'home-outline' },
  [SCREENS.CHAT]:     { active: 'sparkles',   inactive: 'sparkles-outline' },
  [SCREENS.CALENDAR]: { active: 'calendar',   inactive: 'calendar-outline' },
  [SCREENS.PROFILE]:  { active: 'person',     inactive: 'person-outline' },
};

export default function MainNavigator() {
  const { COLORS } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        // ── Tab bar appearance ──
        tabBarStyle: {
          backgroundColor: COLORS.backgroundCard,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingBottom: Math.max(insets.bottom, 10), // exactly 10px bottom padding (+ system safe area)
          paddingTop: 10, // exactly 10px top padding
          height: 75 + Math.max(insets.bottom, 0), // Increased to prevent clipping
          paddingHorizontal: 16,
        },
        tabBarItemStyle: {
          flex: 1,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: {
          fontSize: FONTS.size.xs,
          marginTop: 3, // exactly 3px gap between icon and text
        },

        // ── Tab icon ──
        tabBarIcon: ({ focused, color }) => {
          const icon = TAB_ICONS[route.name] || { active: 'help', inactive: 'help-outline' };
          return (
            <Ionicons 
              name={focused ? icon.active : icon.inactive} 
              size={24} 
              color={color} 
            />
          );
        },
      })}
    >
      <Tab.Screen name={SCREENS.HOME} component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name={SCREENS.CHAT} component={ChatScreen} options={{ tabBarLabel: 'Aria' }} />
      <Tab.Screen name={SCREENS.CALENDAR} component={CalendarScreen} options={{ tabBarLabel: 'Schedule' }} />
      <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}
