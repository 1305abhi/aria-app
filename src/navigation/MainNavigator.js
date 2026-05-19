/**
 * MainNavigator.js
 * ─────────────────────────────────────────────
 * Bottom tab navigator shown after login.
 * Tabs: Home · Chat · Calendar · Notifications · Profile
 *
 * Custom tab bar styling matches the dark theme.
 * ─────────────────────────────────────────────
 */

import React        from 'react';
import { Text }     from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SCREENS }  from '../constants/constants';
import { FONTS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

// ── Tab screens ──
import HomeScreen          from '../screens/main/HomeScreen';
import ChatScreen          from '../screens/main/ChatScreen';
import CalendarScreen      from '../screens/main/CalendarScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';
import ProfileScreen       from '../screens/main/ProfileScreen';
import GoalsScreen         from '../screens/main/GoalsScreen';

const Tab = createBottomTabNavigator();

// ─── Tab icon map (emoji for now; swap with SVG icons later) ───
const TAB_ICONS = {
  [SCREENS.HOME]:          { active: '⬡',  inactive: '⬡'  },
  [SCREENS.CHAT]:          { active: '◈',  inactive: '◈'  },
  [SCREENS.CALENDAR]:      { active: '▦',  inactive: '▦'  },
  [SCREENS.NOTIFICATIONS]: { active: '◉',  inactive: '◉'  },
  [SCREENS.PROFILE]:       { active: '◑',  inactive: '◑'  },
};

export default function MainNavigator() {
  const { COLORS } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        // ── Tab bar appearance ──
        tabBarStyle: {
          backgroundColor:  COLORS.backgroundCard,
          borderTopColor:   COLORS.border,
          borderTopWidth:   1,
          paddingBottom:    8,
          paddingTop:       8,
          height:           64,
        },
        tabBarActiveTintColor:   COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: {
          fontSize:   FONTS.size.xs,
          marginTop:  2,
        },

        // ── Tab icon ──
        tabBarIcon: ({ focused, color }) => {
          const icon = TAB_ICONS[route.name] || { active: '?', inactive: '?' };
          return (
            <Text style={{ fontSize: 20, color }}>
              {focused ? icon.active : icon.inactive}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name={SCREENS.HOME}          component={HomeScreen}          options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name={SCREENS.CHAT}          component={ChatScreen}          options={{ tabBarLabel: 'Aria' }} />
      <Tab.Screen name={SCREENS.CALENDAR}      component={CalendarScreen}      options={{ tabBarLabel: 'Schedule' }} />
      <Tab.Screen name={SCREENS.NOTIFICATIONS} component={NotificationsScreen} options={{ tabBarLabel: 'Updates' }} />
      <Tab.Screen name={SCREENS.PROFILE}       component={ProfileScreen}       options={{ tabBarLabel: 'Profile' }} />
      
      {/* Hidden screen accessible via Profile */}
      <Tab.Screen 
        name="Goals" 
        component={GoalsScreen} 
        options={{ tabBarButton: () => null, tabBarVisible: false }} 
      />
    </Tab.Navigator>
  );
}
