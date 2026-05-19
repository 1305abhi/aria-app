/**
 * CalendarScreen.js
 * Phase 3: Static UI placeholder — build the real UI in Phase 3.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../constants/theme';

export default function CalendarScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.text}>Calendar screen — build in Phase 3</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  text:      { fontSize: FONTS.size.base, color: COLORS.textSecondary },
});
