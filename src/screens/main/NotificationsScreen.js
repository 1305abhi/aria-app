import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { FONTS, SPACING, RADIUS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

const TABS = ['All', 'Suggestions', 'Missed', 'Changes'];

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'suggestion',
    title: 'Quieter mornings',
    time: '2h ago',
    message: 'Your focus blocks land better when they start before 10. Want me to lock that pattern in?',
    icon: '✨',
    color: '#B388FF',
  },
  {
    id: 2,
    type: 'missed',
    title: 'Reading block missed',
    time: '9h ago',
    message: "You skipped last night's reading. Reschedule for tonight or skip the day?",
    icon: '!',
    color: '#FF4D4D',
  },
  {
    id: 3,
    type: 'change',
    title: 'Routine adapted',
    time: 'yesterday',
    message: "I noticed you prefer evening runs on rainy days. I'll switch automatically from now on.",
    icon: '🪄',
    color: '#00C48C',
  },
  {
    id: 4,
    type: 'suggestion',
    title: 'Add a buffer',
    time: 'yesterday',
    message: 'Your 14:30 sync often runs over. I can add a 10-min buffer after.',
    icon: '✨',
    color: '#B388FF',
  }
];

export default function NotificationsScreen() {
  const { COLORS } = useTheme();
  const [activeTab, setActiveTab] = useState('All');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: COLORS.textPrimary }]}>Updates</Text>
      </View>

      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tabButton,
                  { 
                    backgroundColor: isActive ? COLORS.primary : COLORS.backgroundInput,
                    borderColor: COLORS.border
                  }
                ]}
              >
                <Text style={[styles.tabText, { color: isActive ? '#111' : COLORS.textSecondary }]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {NOTIFICATIONS.map((notif) => (
          <View key={notif.id} style={[styles.card, { backgroundColor: COLORS.backgroundCard, borderColor: COLORS.border }]}>
            
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <View style={[styles.iconCircle, { backgroundColor: COLORS.background, borderColor: COLORS.border }]}>
                  <Text style={[styles.icon, { color: notif.color }]}>{notif.icon}</Text>
                </View>
                <Text style={[styles.cardTitle, { color: COLORS.textPrimary }]}>{notif.title}</Text>
              </View>
              <View style={styles.cardTimeRow}>
                <Text style={[styles.cardTime, { color: COLORS.textSecondary }]}>{notif.time}</Text>
                <Text style={[styles.closeIcon, { color: COLORS.textSecondary }]}>✕</Text>
              </View>
            </View>

            <Text style={[styles.cardMessage, { color: COLORS.textSecondary }]}>
              {notif.message}
            </Text>

            {notif.type !== 'change' && (
              <View style={styles.actionRow}>
                <TouchableOpacity style={[styles.actionBtnPrimary, { backgroundColor: COLORS.primary }]}>
                  <Text style={styles.actionBtnTextDark}>
                    {notif.type === 'missed' ? 'Reschedule' : 'Apply'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtnSecondary, { borderColor: COLORS.border }]}>
                  <Text style={[styles.actionBtnTextLight, { color: COLORS.textPrimary }]}>
                    {notif.type === 'missed' ? 'Skip' : 'Dismiss'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontFamily: FONTS.serif,
    fontSize: 28,
  },
  tabContainer: {
    paddingLeft: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  tabButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: 10,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    marginRight: SPACING.sm,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  container: { flex: 1 },
  content: { paddingHorizontal: SPACING.xl, paddingBottom: SPACING.xxxl },
  card: {
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  icon: { fontWeight: 'bold' },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  cardTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTime: {
    fontSize: 12,
    marginRight: SPACING.sm,
  },
  closeIcon: { fontSize: 16 },
  cardMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: SPACING.lg,
    paddingLeft: 40, // align with text
  },
  actionRow: {
    flexDirection: 'row',
    paddingLeft: 40,
    gap: SPACING.sm,
  },
  actionBtnPrimary: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
  },
  actionBtnSecondary: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  actionBtnTextDark: { color: '#111', fontWeight: 'bold', fontSize: 13 },
  actionBtnTextLight: { fontWeight: 'bold', fontSize: 13 },
});
