export const lightTheme = {
  background: '#FFFFFF',
  backgroundCard: '#F7F7FA',
  backgroundInput: '#F0F0F5',

  primary: '#B388FF', // Soft glowing purple
  primaryLight: '#D1B3FF',
  primaryDark: '#9050FF',

  accent: '#00BFFF',
  accentLight: '#40D4FF',

  success: '#00C48C',
  warning: '#FFB800',
  error: '#FF4D4D',

  textPrimary: '#111111',
  textSecondary: '#666677',
  textMuted: '#A0A0B0',

  border: '#E0E0EA',
  divider: '#EEEEF5',

  aiBubble: '#F4F4FA',
  userBubble: '#B388FF',
  isDark: false,
};

export const darkTheme = {
  background: '#09090B', // Deep black
  backgroundCard: '#13131A',
  backgroundInput: '#1A1A24',

  primary: '#B388FF', // Soft glowing purple (same as light for branding)
  primaryLight: '#D1B3FF',
  primaryDark: '#9050FF',

  accent: '#00BFFF',
  accentLight: '#40D4FF',

  success: '#00C48C',
  warning: '#FFB800',
  error: '#FF4D4D',

  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0B0',
  textMuted: '#55556A',

  border: '#22222E',
  divider: '#1A1A26',

  aiBubble: '#1A1A2E',
  userBubble: '#B388FF',
  isDark: true,
};

// Provide a static default for unmigrated screens (like RootNavigator, ChatScreen)
export const COLORS = lightTheme;

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  serif: 'serif', // Used for premium headings
  mono: 'SpaceMono',

  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    xxl: 30,
    hero: 38,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  pill: 99,
  circle: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  glow: {
    shadowColor: '#B388FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
};
