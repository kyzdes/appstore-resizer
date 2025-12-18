/**
 * Design System: Typography Tokens
 * App Store Screenshot Converter
 *
 * Typography scale following a modular scale approach
 * with clear hierarchy for professional developer tools
 */

// ============================================================================
// FONT FAMILIES
// ============================================================================

export const fontFamilies = {
  // Primary font stack - System fonts for clean, professional look
  sans: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(', '),

  // Monospace for technical content (file names, dimensions, etc.)
  mono: [
    'ui-monospace',
    'SFMono-Regular',
    '"SF Mono"',
    'Menlo',
    'Monaco',
    'Consolas',
    '"Liberation Mono"',
    '"Courier New"',
    'monospace',
  ].join(', '),
} as const;

// ============================================================================
// FONT SIZES
// ============================================================================

// Using a modular scale (1.25 ratio) for harmonious proportions
export const fontSizes = {
  xs: '0.75rem',      // 12px - Small labels, badges
  sm: '0.875rem',     // 14px - Secondary text, captions
  base: '1rem',       // 16px - Body text (default)
  lg: '1.125rem',     // 18px - Emphasized body text
  xl: '1.25rem',      // 20px - Small headings
  '2xl': '1.5rem',    // 24px - Section headings
  '3xl': '1.875rem',  // 30px - Page headings
  '4xl': '2.25rem',   // 36px - Hero text
  '5xl': '3rem',      // 48px - Large display text
  '6xl': '3.75rem',   // 60px - Extra large display
} as const;

// ============================================================================
// FONT WEIGHTS
// ============================================================================

export const fontWeights = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// ============================================================================
// LINE HEIGHTS
// ============================================================================

// Optimized for readability and visual balance
export const lineHeights = {
  tight: '1.25',      // 125% - Headings, compact text
  snug: '1.375',      // 137.5% - Subheadings
  normal: '1.5',      // 150% - Body text (optimal readability)
  relaxed: '1.625',   // 162.5% - Comfortable reading
  loose: '1.75',      // 175% - Very spacious
} as const;

// ============================================================================
// LETTER SPACING
// ============================================================================

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// ============================================================================
// SEMANTIC TYPOGRAPHY SCALE
// ============================================================================

// Pre-composed typography styles for common use cases
export const typography = {
  // Display text (hero sections, landing pages)
  displayLarge: {
    fontSize: fontSizes['5xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamilies.sans,
  },

  displayMedium: {
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamilies.sans,
  },

  displaySmall: {
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },

  // Headings
  h1: {
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamilies.sans,
  },

  h2: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.snug,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamilies.sans,
  },

  h3: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.snug,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },

  h4: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },

  h5: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },

  h6: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.wide,
    fontFamily: fontFamilies.sans,
  },

  // Body text
  bodyLarge: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },

  bodyBase: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },

  bodySmall: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },

  // UI text
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.wide,
    fontFamily: fontFamilies.sans,
  },

  labelSmall: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.wider,
    fontFamily: fontFamilies.sans,
  },

  caption: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },

  // Button text
  buttonLarge: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },

  buttonBase: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },

  buttonSmall: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.wide,
    fontFamily: fontFamilies.sans,
  },

  // Monospace (technical content)
  code: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.mono,
  },

  codeBlock: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.mono,
  },

  // Application-specific
  // Resolution dimensions (e.g., "1242x2688")
  resolution: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.mono,
  },

  // File names
  filename: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.mono,
  },

  // Device labels (e.g., "iPhone 6.5\"")
  deviceLabel: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.sans,
  },
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type FontFamily = keyof typeof fontFamilies;
export type FontSize = keyof typeof fontSizes;
export type FontWeight = keyof typeof fontWeights;
export type LineHeight = keyof typeof lineHeights;
export type LetterSpacing = keyof typeof letterSpacing;
export type TypographyStyle = keyof typeof typography;
