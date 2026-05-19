import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTS, SPACING, RADIUS } from '../../constants/theme';
import { SCREENS } from '../../constants/constants';
import { useTheme } from '../../context/ThemeContext';
// import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Aria builds your daily life\nautomatically.',
    subtitle: 'Tell it what matters. It quietly arranges everything\nelse.',
  },
  {
    id: '2',
    title: 'Your day,\nquietly orchestrated.',
    subtitle: 'A calm AI that learns your rhythm and arranges the rest of life around it.',
  },
  {
    id: '3',
    title: 'Focus on what matters.',
    subtitle: 'We block out the noise and protect your time for deep work.',
  },
  {
    id: '4',
    title: 'Ready to Begin?',
    subtitle: 'Sign in to unlock all features and personalize your experience.',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const { COLORS } = useTheme();

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace(SCREENS.LOGIN);
    }
  };

  const handleSkip = () => {
    navigation.replace(SCREENS.LOGIN);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      {/* Icon Placeholder */}
      <View style={[styles.iconContainer, { backgroundColor: COLORS.backgroundCard, borderColor: COLORS.border }]}>
        <Text style={[styles.iconPlaceholder, { color: COLORS.primary }]}>✨</Text>
      </View>

      <Text style={[styles.title, { color: COLORS.textPrimary }]}>{item.title}</Text>
      <Text style={[styles.subtitle, { color: COLORS.textSecondary }]}>{item.subtitle}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.progressBarContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDash,
                { backgroundColor: currentIndex >= index ? COLORS.primary : COLORS.border },
              ]}
            />
          ))}
        </View>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={[styles.skipText, { color: COLORS.accentLight }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={SLIDES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        ref={flatListRef}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.primary }]} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next \u2192'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
  },
  progressBarContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  progressDash: {
    width: 24,
    height: 3,
    borderRadius: 2,
  },
  skipText: {
    fontSize: FONTS.size.sm,
    fontWeight: '600',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xxxl,
    shadowColor: '#B388FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  iconPlaceholder: {
    fontSize: 48,
  },
  title: {
    fontFamily: FONTS.serif,
    fontSize: 28, // Specific to the screenshot
    marginBottom: SPACING.lg,
    textAlign: 'center',
    lineHeight: 34,
  },
  subtitle: {
    fontSize: FONTS.size.base,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    padding: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  button: {
    paddingVertical: 18,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
  },
  buttonText: {
    color: '#111', // Dark text on light purple pill is standard for these designs
    fontSize: FONTS.size.base,
    fontWeight: 'bold',
  },
});
