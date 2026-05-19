import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTS, SPACING, RADIUS } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function LoginScreen() {
  const [tab, setTab] = useState('Email'); // Email | Phone
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { COLORS } = useTheme();

  const { dummyLogin } = useAuth();

  const handleContinue = () => {
    dummyLogin();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          
          {/* Logo Header */}
          <View style={styles.logoContainer}>
            <View style={[styles.logoCircle, { backgroundColor: COLORS.primary }]}>
              <Text style={styles.logoLetter}>A</Text>
            </View>
            <Text style={[styles.logoText, { color: COLORS.textPrimary }]}>Aria</Text>
          </View>

          {/* Titles */}
          <Text style={[styles.title, { color: COLORS.textPrimary }]}>
            Your day,{'\n'}quietly orchestrated.
          </Text>
          <Text style={[styles.subtitle, { color: COLORS.textSecondary }]}>
            A calm AI that learns your rhythm and arranges the rest of life around it.
          </Text>

          {/* Segmented Control */}
          <View style={[styles.segmentedControl, { backgroundColor: COLORS.backgroundInput, borderColor: COLORS.border }]}>
            <TouchableOpacity 
              style={[styles.segment, tab === 'Email' && [styles.segmentActive, { backgroundColor: COLORS.primary }]]}
              onPress={() => setTab('Email')}
            >
              <Text style={[styles.segmentText, { color: tab === 'Email' ? '#111' : COLORS.textSecondary }]}>Email</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.segment, tab === 'Phone' && [styles.segmentActive, { backgroundColor: COLORS.primary }]]}
              onPress={() => setTab('Phone')}
            >
              <Text style={[styles.segmentText, { color: tab === 'Phone' ? '#111' : COLORS.textSecondary }]}>Phone</Text>
            </TouchableOpacity>
          </View>

          {/* Inputs */}
          <View style={styles.form}>
            <TextInput
              style={[styles.input, { backgroundColor: COLORS.backgroundInput, borderColor: COLORS.border, color: COLORS.textPrimary }]}
              placeholder={tab === 'Email' ? "you@example.com" : "+1 (555) 000-0000"}
              placeholderTextColor={COLORS.textMuted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType={tab === 'Email' ? 'email-address' : 'phone-pad'}
            />
            {tab === 'Email' && (
              <TextInput
                style={[styles.input, { backgroundColor: COLORS.backgroundInput, borderColor: COLORS.border, color: COLORS.textPrimary }]}
                placeholder="Password"
                placeholderTextColor={COLORS.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            )}

            <TouchableOpacity style={[styles.continueButton, { backgroundColor: COLORS.primary }]} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={[styles.divider, { backgroundColor: COLORS.divider }]} />
            <Text style={[styles.dividerText, { color: COLORS.textMuted }]}>OR</Text>
            <View style={[styles.divider, { backgroundColor: COLORS.divider }]} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={[styles.socialPill, { borderColor: COLORS.border, backgroundColor: COLORS.backgroundCard }]}>
              <Text style={[styles.socialPillText, { color: COLORS.textPrimary }]}>G  Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.socialPill, { borderColor: COLORS.border, backgroundColor: COLORS.backgroundCard }]}>
              <Text style={[styles.socialPillText, { color: COLORS.textPrimary }]}>🍎  Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialPill, { borderColor: COLORS.border, backgroundColor: COLORS.backgroundCard }]}>
              <Text style={[styles.socialPillText, { color: COLORS.textPrimary }]}>🔑  SSO</Text>
            </TouchableOpacity>
          </View>
          
        </View>

        <Text style={[styles.footerText, { color: COLORS.textMuted }]}>
          By continuing you agree to Aria's terms and privacy.
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  logoLetter: {
    color: '#111',
    fontFamily: FONTS.serif,
    fontSize: FONTS.size.lg,
  },
  logoText: {
    fontSize: FONTS.size.lg,
    fontWeight: 'bold',
    fontFamily: FONTS.serif,
  },
  title: {
    fontFamily: FONTS.serif,
    fontSize: 34,
    lineHeight: 40,
    marginBottom: SPACING.lg,
  },
  subtitle: {
    fontSize: FONTS.size.base,
    lineHeight: 22,
    marginBottom: SPACING.xxxl,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: RADIUS.pill,
    padding: 4,
    borderWidth: 1,
    marginBottom: SPACING.xl,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: RADIUS.pill,
  },
  segmentActive: {
    shadowColor: '#B388FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  segmentText: {
    fontSize: FONTS.size.sm,
    fontWeight: '600',
  },
  form: {
    gap: SPACING.base,
  },
  input: {
    padding: 16,
    borderRadius: RADIUS.pill,
    fontSize: FONTS.size.base,
    borderWidth: 1,
  },
  continueButton: {
    paddingVertical: 18,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  buttonText: {
    color: '#111',
    fontSize: FONTS.size.base,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xxxl,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: SPACING.lg,
    fontSize: FONTS.size.xs,
    fontWeight: 'bold',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  socialPill: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    alignItems: 'center',
  },
  socialPillText: {
    fontSize: FONTS.size.sm,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    paddingBottom: SPACING.xl,
  },
});
