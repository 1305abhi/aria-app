/**
 * ChatScreen.js
 * Phase 3: Static UI placeholder — build the real UI in Phase 3.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chat screen — build in Phase 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  text:      { fontSize: FONTS.size.base, color: COLORS.textSecondary },
});
