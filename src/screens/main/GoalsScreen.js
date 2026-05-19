import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { FONTS, SPACING, RADIUS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

export default function GoalsScreen({ navigation }) {
  const { COLORS } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: COLORS.backgroundCard }]}>
          <Text style={[styles.backIcon, { color: COLORS.textPrimary }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.textPrimary }]}>Goals & routines</Text>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        {/* Expanded Goal Card */}
        <View style={[styles.card, { backgroundColor: COLORS.backgroundCard, borderColor: COLORS.border }]}>
          
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.cardTitle, { color: COLORS.textPrimary }]}>Stay consistently active</Text>
              <Text style={[styles.cardSubtitle, { color: COLORS.textSecondary }]}>5x per week · 3 weeks</Text>
            </View>
            <Text style={[styles.chevron, { color: COLORS.textSecondary }]}>^</Text>
          </View>
          
          <View style={[styles.progressBarBg, { backgroundColor: COLORS.backgroundInput }]}>
            <View style={[styles.progressBarFill, { backgroundColor: COLORS.primary, width: '60%' }]} />
          </View>

          <View style={styles.divider} />

          <View style={styles.routineHeader}>
            <View>
              <Text style={[styles.routineTitle, { color: COLORS.textPrimary }]}>Daily movement</Text>
              <Text style={[styles.routineSubtitle, { color: COLORS.textSecondary }]}>Mornings preferred. Switch to evening when raining.</Text>
            </View>
            <Text style={[styles.routineTime, { color: COLORS.textSecondary }]}>45 min</Text>
          </View>

          <View style={styles.checkboxList}>
            <View style={styles.checkboxItem}>
              <View style={[styles.checkboxChecked, { backgroundColor: COLORS.primary }]}><Text style={styles.checkIcon}>✓</Text></View>
              <Text style={[styles.checkText, { color: COLORS.textSecondary, textDecorationLine: 'line-through' }]}>Warm up — 5 min</Text>
            </View>
            <View style={styles.checkboxItem}>
              <View style={[styles.checkboxChecked, { backgroundColor: COLORS.primary }]}><Text style={styles.checkIcon}>✓</Text></View>
              <Text style={[styles.checkText, { color: COLORS.textSecondary, textDecorationLine: 'line-through' }]}>Main session — 30 min</Text>
            </View>
            <View style={styles.checkboxItem}>
              <View style={[styles.checkboxEmpty, { borderColor: COLORS.border }]} />
              <Text style={[styles.checkText, { color: COLORS.textPrimary }]}>Cool down — 10 min</Text>
            </View>
          </View>

          <View style={[styles.whyBox, { backgroundColor: COLORS.primary + '15' }]}>
            <Text style={[styles.whyTitle, { color: COLORS.primaryDark }]}>WHY THIS MATTERS</Text>
            <Text style={[styles.whyText, { color: COLORS.textPrimary }]}>
              You mentioned wanting steady energy through the day. Short morning movement keeps that baseline.
            </Text>
          </View>
        </View>

        {/* Collapsed Goal Card */}
        <View style={[styles.card, { backgroundColor: COLORS.backgroundCard, borderColor: COLORS.border }]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.cardTitle, { color: COLORS.textPrimary }]}>Read 20 pages a day</Text>
              <Text style={[styles.cardSubtitle, { color: COLORS.textSecondary }]}>Daily · Ongoing</Text>
            </View>
            <Text style={[styles.chevron, { color: COLORS.textSecondary }]}>v</Text>
          </View>
          <View style={[styles.progressBarBg, { backgroundColor: COLORS.backgroundInput }]}>
            <View style={[styles.progressBarFill, { backgroundColor: COLORS.primary, width: '40%' }]} />
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: COLORS.backgroundCard, borderColor: COLORS.border }]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.cardTitle, { color: COLORS.textPrimary }]}>Ship the v2 launch</Text>
              <Text style={[styles.cardSubtitle, { color: COLORS.textSecondary }]}>Project · 9 days</Text>
            </View>
            <Text style={[styles.chevron, { color: COLORS.textSecondary }]}>v</Text>
          </View>
          <View style={[styles.progressBarBg, { backgroundColor: COLORS.backgroundInput }]}>
            <View style={[styles.progressBarFill, { backgroundColor: COLORS.primary, width: '80%' }]} />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    marginRight: SPACING.md,
  },
  backIcon: { fontSize: 24, lineHeight: 28 },
  headerTitle: { fontFamily: FONTS.serif, fontSize: 24 },
  
  container: { flex: 1 },
  content: { padding: SPACING.xl },
  
  card: {
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    marginBottom: SPACING.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  cardTitle: { fontFamily: FONTS.serif, fontSize: 20, marginBottom: 4 },
  cardSubtitle: { fontSize: 12 },
  chevron: { fontSize: 16 },
  
  progressBarBg: { height: 6, borderRadius: 3, width: '100%', overflow: 'hidden' },
  progressBarFill: { height: 6, borderRadius: 3 },
  divider: { height: 1, backgroundColor: '#333', marginVertical: SPACING.xl },
  
  routineHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.lg },
  routineTitle: { fontWeight: 'bold', fontSize: 15, marginBottom: 4 },
  routineSubtitle: { fontSize: 12 },
  routineTime: { fontSize: 12 },
  
  checkboxList: { gap: SPACING.md, marginBottom: SPACING.xl },
  checkboxItem: { flexDirection: 'row', alignItems: 'center' },
  checkboxChecked: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: SPACING.md },
  checkboxEmpty: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, marginRight: SPACING.md },
  checkIcon: { color: '#111', fontSize: 12, fontWeight: 'bold' },
  checkText: { fontSize: 14 },
  
  whyBox: { padding: SPACING.md, borderRadius: RADIUS.lg },
  whyTitle: { fontSize: 10, fontWeight: 'bold', marginBottom: SPACING.sm, letterSpacing: 1 },
  whyText: { fontSize: 14, lineHeight: 20 },
});
