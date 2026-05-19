import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FONTS, SPACING, RADIUS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { SCREENS } from '../../constants/constants';

const TIMELINE = [
  { time: '07:00', title: 'Morning workout', subtitle: '45 min - Health', color: '#00BFFF', completed: true },
  { time: '09:00', title: 'Deep work — product spec', subtitle: '90 min - Focus', color: '#B388FF', completed: true },
  { time: '11:30', title: 'Reading block', subtitle: '30 min - Learn', color: '#FFB800', completed: true },
  { time: '13:00', title: 'Lunch & walk', subtitle: '45 min - Rest', color: '#00BFFF', completed: true },
  { time: '14:30', title: 'Team sync', subtitle: '30 min - Work', color: '#FF4D4D', completed: false },
];

export default function HomeScreen({ navigation }) {
  const { COLORS } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: COLORS.textSecondary }]}>Good afternoon,</Text>
            <Text style={[styles.name, { color: COLORS.textPrimary }]}>Alex</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={[styles.profileCircle, { backgroundColor: COLORS.backgroundCard, borderColor: COLORS.border, borderWidth: 1 }]}
              onPress={() => navigation.navigate(SCREENS.NOTIFICATIONS)}
            >
              <Ionicons name="notifications-outline" size={20} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Aria Summary Card */}
        <View style={[styles.summaryCard, { backgroundColor: COLORS.backgroundCard, borderColor: COLORS.border }]}>
          <View style={styles.cardTagContainer}>
            <Ionicons name="sparkles" size={12} color={COLORS.primary} style={{ marginRight: 4 }} />
            <Text style={[styles.cardTag, { color: COLORS.primary }]}>ARIA</Text>
          </View>
          <Text style={[styles.cardTitle, { color: COLORS.textPrimary }]}>
            Your day looks balanced. 4 tasks left, with 2 focus blocks held for you.
          </Text>
          <TouchableOpacity style={styles.cardLink}>
            <Text style={[styles.cardLinkText, { color: COLORS.textSecondary }]}>View today's plan  →</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { value: '4', label: 'COMPLETED' },
            { value: '12d', label: 'STREAK' },
            { value: '3.5h', label: 'FOCUS' },
            { value: '3', label: 'GOALS' },
          ].map((stat, i) => (
            <View key={i} style={[styles.statCircle, { backgroundColor: COLORS.backgroundCard, borderColor: COLORS.border }]}>
              <Text style={[styles.statValue, { color: COLORS.textPrimary }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: COLORS.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Schedule Header */}
        <View style={styles.scheduleHeader}>
          <Text style={[styles.sectionTitle, { color: COLORS.textPrimary }]}>Today</Text>
          <Text style={[styles.sectionSubtitle, { color: COLORS.textSecondary }]}>8 blocks</Text>
        </View>

        {/* Timeline */}
        <View style={styles.timeline}>
          {TIMELINE.map((item, index) => (
            <View key={index} style={styles.timelineRow}>
              <Text style={[styles.time, { color: COLORS.textSecondary }]}>{item.time}</Text>
              <View style={[styles.timelineCard, { backgroundColor: COLORS.backgroundCard, borderColor: COLORS.border }]}>
                <View style={[styles.colorBar, { backgroundColor: item.color }]} />
                <View style={styles.cardContent}>
                  <Text style={[styles.cardItemTitle, { color: COLORS.textPrimary }]}>{item.title}</Text>
                  <Text style={[styles.cardItemSub, { color: COLORS.textSecondary }]}>{item.subtitle}</Text>
                </View>
                <View style={[styles.checkCircle, item.completed ? { backgroundColor: COLORS.primary } : { borderColor: COLORS.border, borderWidth: 1 }]} />
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  content: { padding: SPACING.xl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  greeting: { fontSize: FONTS.size.base },
  name: { fontFamily: FONTS.serif, fontSize: 32 },
  headerIcons: { flexDirection: 'row', gap: SPACING.sm },
  iconCircle: { width: 40, height: 40, borderRadius: 20 },
  profileCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  profileText: { color: '#111', fontWeight: 'bold' },
  
  summaryCard: {
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    marginBottom: SPACING.xl,
  },
  cardTagContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  cardTag: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  cardTitle: { fontFamily: FONTS.serif, fontSize: 24, lineHeight: 30, marginBottom: SPACING.xl },
  cardLink: { flexDirection: 'row' },
  cardLinkText: { fontSize: 14 },
  
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xxxl,
  },
  statCircle: {
    width: 75,
    height: 75,
    borderRadius: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: { fontFamily: FONTS.serif, fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 9, textTransform: 'uppercase', marginTop: 2 },
  
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: SPACING.lg,
  },
  sectionTitle: { fontFamily: FONTS.serif, fontSize: 24 },
  sectionSubtitle: { fontSize: 14 },
  
  timelineRow: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  time: {
    width: 50,
    fontSize: 12,
  },
  timelineCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
  },
  colorBar: {
    width: 4,
    height: 32,
    borderRadius: 2,
    marginRight: SPACING.md,
  },
  cardContent: {
    flex: 1,
  },
  cardItemTitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 2 },
  cardItemSub: { fontSize: 12 },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
