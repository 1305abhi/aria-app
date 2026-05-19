import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FONTS, SPACING, RADIUS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

const MENU_ITEMS = [
  { title: 'Goals & routines', subtitle: 'Manage what Aria is shaping', icon: 'sparkles' },
  { title: 'Appearance', subtitle: 'Toggle Theme', icon: 'color-palette', isToggle: true },
  { title: 'Notifications', subtitle: 'Adaptive', icon: 'notifications' },
  { title: 'Language', subtitle: 'English', icon: 'globe' },
  { title: 'Connected apps', subtitle: '3 linked', icon: 'link' },
];

export default function ProfileScreen({ navigation }) {
  const { COLORS, isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        <Text style={[styles.headerTitle, { color: COLORS.textPrimary }]}>Profile</Text>

        <View style={[styles.profileCard, { backgroundColor: COLORS.backgroundCard, borderColor: COLORS.border }]}>
          <View style={styles.profileHeader}>
            <View style={[styles.avatar, { backgroundColor: COLORS.primary }]}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <View>
              <Text style={[styles.name, { color: COLORS.textPrimary }]}>Alex</Text>
              <Text style={[styles.email, { color: COLORS.textSecondary }]}>alex@example.com</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            {[{v:'12d', l:'STREAK'}, {v:'3.5h', l:'FOCUS'}, {v:'3', l:'GOALS'}].map((stat, i) => (
              <View key={i} style={[styles.statBox, { backgroundColor: COLORS.background }]}>
                <Text style={[styles.statValue, { color: COLORS.textPrimary }]}>{stat.v}</Text>
                <Text style={[styles.statLabel, { color: COLORS.textSecondary }]}>{stat.l}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, index) => {
            const handlePress = () => {
              if (item.title === 'Goals & routines') {
                navigation.navigate('Goals');
              }
            };

            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.menuItem, { backgroundColor: COLORS.backgroundCard, borderColor: COLORS.border }]}
                disabled={item.isToggle} // the toggle handles interaction
                onPress={handlePress}
              >
                <View style={[styles.menuIconContainer, { backgroundColor: COLORS.background }]}>
                  <Ionicons name={item.icon} size={18} color={COLORS.textPrimary} />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={[styles.menuTitle, { color: COLORS.textPrimary }]}>{item.title}</Text>
                  <Text style={[styles.menuSubtitle, { color: COLORS.textSecondary }]}>
                    {item.isToggle ? (isDark ? 'Dark' : 'Light') : item.subtitle}
                  </Text>
                </View>
                
                {item.isToggle ? (
                  <Switch 
                    value={isDark} 
                    onValueChange={toggleTheme}
                    trackColor={{ false: '#ccc', true: COLORS.primary }}
                  />
                ) : (
                  <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={[styles.signOutButton, { borderColor: COLORS.border }]}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} style={{ marginRight: 8 }} />
          <Text style={[styles.signOutText, { color: COLORS.error }]}>Sign out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  content: { padding: SPACING.xl },
  headerTitle: {
    fontFamily: FONTS.serif,
    fontSize: 32,
    marginBottom: SPACING.xl,
  },
  profileCard: {
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    marginBottom: SPACING.xl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  avatar: {
    width: 60, height: 60, borderRadius: 30,
    alignItems: 'center', justifyContent: 'center',
    marginRight: SPACING.md,
  },
  avatarText: { fontSize: 24, fontFamily: FONTS.serif, color: '#111' },
  name: { fontFamily: FONTS.serif, fontSize: 24, marginBottom: 4 },
  email: { fontSize: 14 },
  
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  statBox: {
    flex: 1,
    padding: SPACING.base,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  statValue: { fontFamily: FONTS.serif, fontSize: 20, marginBottom: 4 },
  statLabel: { fontSize: 10, textTransform: 'uppercase' },

  menuContainer: { gap: SPACING.md, marginBottom: SPACING.xl },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  menuIconContainer: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    marginRight: SPACING.base,
  },
  menuIcon: { fontSize: 18 },
  menuTextContainer: { flex: 1 },
  menuTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
  menuSubtitle: { fontSize: 12 },
  chevron: { fontSize: 20 },
  
  signOutButton: {
    padding: SPACING.base,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signOutText: { fontSize: 15, fontWeight: 'bold' },
});
