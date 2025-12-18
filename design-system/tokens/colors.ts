/**
 * Design System: Color Tokens
 * App Store Screenshot Converter
 *
 * Color system with both light and dark theme support.
 * Organized in three layers: Primitive → Semantic → Component-specific
 */

// ============================================================================
// PRIMITIVE TOKENS - Raw color values
// ============================================================================

export const primitiveColors = {
  // Primary Brand Colors (Professional Blue)
  blue: {
    50: '#eff6ff',   // Lightest
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',  // Base brand color
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',  // Darkest
    950: '#172554',
  },

  // Secondary/Accent Colors (Success Green)
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Base success color
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  // Warning Colors (Apple-inspired Orange)
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',  // Base warning color
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },

  // Error Colors (Alert Red)
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',  // Base error color
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  // Neutral Colors (Grays)
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },

  // True neutrals
  white: '#ffffff',
  black: '#000000',

  // Transparency variants
  alpha: {
    white: {
      10: 'rgba(255, 255, 255, 0.1)',
      20: 'rgba(255, 255, 255, 0.2)',
      30: 'rgba(255, 255, 255, 0.3)',
      40: 'rgba(255, 255, 255, 0.4)',
      50: 'rgba(255, 255, 255, 0.5)',
      60: 'rgba(255, 255, 255, 0.6)',
      70: 'rgba(255, 255, 255, 0.7)',
      80: 'rgba(255, 255, 255, 0.8)',
      90: 'rgba(255, 255, 255, 0.9)',
    },
    black: {
      10: 'rgba(0, 0, 0, 0.1)',
      20: 'rgba(0, 0, 0, 0.2)',
      30: 'rgba(0, 0, 0, 0.3)',
      40: 'rgba(0, 0, 0, 0.4)',
      50: 'rgba(0, 0, 0, 0.5)',
      60: 'rgba(0, 0, 0, 0.6)',
      70: 'rgba(0, 0, 0, 0.7)',
      80: 'rgba(0, 0, 0, 0.8)',
      90: 'rgba(0, 0, 0, 0.9)',
    },
  },
} as const;

// ============================================================================
// SEMANTIC TOKENS - Purpose-based colors
// ============================================================================

export const lightTheme = {
  // Background colors
  background: {
    primary: primitiveColors.white,
    secondary: primitiveColors.gray[50],
    tertiary: primitiveColors.gray[100],
    inverse: primitiveColors.gray[900],
    elevated: primitiveColors.white,
    overlay: primitiveColors.alpha.black[50],
  },

  // Surface colors (for cards, modals, etc.)
  surface: {
    primary: primitiveColors.white,
    secondary: primitiveColors.gray[50],
    tertiary: primitiveColors.gray[100],
    raised: primitiveColors.white,
    sunken: primitiveColors.gray[100],
    overlay: primitiveColors.white,
  },

  // Text colors
  text: {
    primary: primitiveColors.gray[900],
    secondary: primitiveColors.gray[600],
    tertiary: primitiveColors.gray[500],
    disabled: primitiveColors.gray[400],
    inverse: primitiveColors.white,
    link: primitiveColors.blue[600],
    linkHover: primitiveColors.blue[700],
  },

  // Border colors
  border: {
    primary: primitiveColors.gray[200],
    secondary: primitiveColors.gray[300],
    tertiary: primitiveColors.gray[400],
    focus: primitiveColors.blue[500],
    error: primitiveColors.red[500],
    success: primitiveColors.green[500],
  },

  // Brand colors
  brand: {
    primary: primitiveColors.blue[600],
    primaryHover: primitiveColors.blue[700],
    primaryActive: primitiveColors.blue[800],
    primarySubtle: primitiveColors.blue[50],
    primarySubtleBorder: primitiveColors.blue[200],
  },

  // Semantic colors
  semantic: {
    success: primitiveColors.green[600],
    successHover: primitiveColors.green[700],
    successSubtle: primitiveColors.green[50],
    successSubtleBorder: primitiveColors.green[200],

    warning: primitiveColors.orange[500],
    warningHover: primitiveColors.orange[600],
    warningSubtle: primitiveColors.orange[50],
    warningSubtleBorder: primitiveColors.orange[200],

    error: primitiveColors.red[600],
    errorHover: primitiveColors.red[700],
    errorSubtle: primitiveColors.red[50],
    errorSubtleBorder: primitiveColors.red[200],

    info: primitiveColors.blue[500],
    infoHover: primitiveColors.blue[600],
    infoSubtle: primitiveColors.blue[50],
    infoSubtleBorder: primitiveColors.blue[200],
  },

  // Interactive states
  interactive: {
    // Primary actions
    primaryDefault: primitiveColors.blue[600],
    primaryHover: primitiveColors.blue[700],
    primaryActive: primitiveColors.blue[800],
    primaryDisabled: primitiveColors.gray[300],

    // Secondary actions
    secondaryDefault: primitiveColors.gray[100],
    secondaryHover: primitiveColors.gray[200],
    secondaryActive: primitiveColors.gray[300],
    secondaryDisabled: primitiveColors.gray[100],

    // Ghost/subtle actions
    ghostDefault: 'transparent',
    ghostHover: primitiveColors.gray[100],
    ghostActive: primitiveColors.gray[200],

    // Focus states
    focusRing: primitiveColors.blue[500],
    focusRingOffset: primitiveColors.white,
  },

  // Component-specific colors
  component: {
    // File upload zone
    uploadZone: {
      background: primitiveColors.blue[50],
      backgroundHover: primitiveColors.blue[100],
      backgroundActive: primitiveColors.blue[100],
      border: primitiveColors.blue[300],
      borderHover: primitiveColors.blue[400],
      borderDashed: primitiveColors.blue[300],
      icon: primitiveColors.blue[500],
      text: primitiveColors.blue[700],
    },

    // Progress bar
    progress: {
      background: primitiveColors.gray[200],
      fill: primitiveColors.blue[600],
      text: primitiveColors.gray[700],
    },

    // Checkbox/Radio
    checkbox: {
      background: primitiveColors.white,
      backgroundChecked: primitiveColors.blue[600],
      border: primitiveColors.gray[300],
      borderChecked: primitiveColors.blue[600],
      borderHover: primitiveColors.gray[400],
      checkmark: primitiveColors.white,
    },

    // Tooltip
    tooltip: {
      background: primitiveColors.gray[900],
      text: primitiveColors.white,
      border: primitiveColors.gray[800],
    },

    // Badge
    badge: {
      background: primitiveColors.blue[100],
      text: primitiveColors.blue[800],
      border: primitiveColors.blue[200],
    },
  },
} as const;

export const darkTheme = {
  // Background colors
  background: {
    primary: primitiveColors.gray[950],
    secondary: primitiveColors.gray[900],
    tertiary: primitiveColors.gray[800],
    inverse: primitiveColors.white,
    elevated: primitiveColors.gray[900],
    overlay: primitiveColors.alpha.black[80],
  },

  // Surface colors
  surface: {
    primary: primitiveColors.gray[900],
    secondary: primitiveColors.gray[850] || primitiveColors.gray[800],
    tertiary: primitiveColors.gray[800],
    raised: primitiveColors.gray[800],
    sunken: primitiveColors.gray[950],
    overlay: primitiveColors.gray[800],
  },

  // Text colors
  text: {
    primary: primitiveColors.gray[50],
    secondary: primitiveColors.gray[400],
    tertiary: primitiveColors.gray[500],
    disabled: primitiveColors.gray[600],
    inverse: primitiveColors.gray[900],
    link: primitiveColors.blue[400],
    linkHover: primitiveColors.blue[300],
  },

  // Border colors
  border: {
    primary: primitiveColors.gray[700],
    secondary: primitiveColors.gray[600],
    tertiary: primitiveColors.gray[500],
    focus: primitiveColors.blue[500],
    error: primitiveColors.red[500],
    success: primitiveColors.green[500],
  },

  // Brand colors
  brand: {
    primary: primitiveColors.blue[500],
    primaryHover: primitiveColors.blue[400],
    primaryActive: primitiveColors.blue[600],
    primarySubtle: primitiveColors.blue[950],
    primarySubtleBorder: primitiveColors.blue[800],
  },

  // Semantic colors
  semantic: {
    success: primitiveColors.green[500],
    successHover: primitiveColors.green[400],
    successSubtle: primitiveColors.green[950],
    successSubtleBorder: primitiveColors.green[800],

    warning: primitiveColors.orange[500],
    warningHover: primitiveColors.orange[400],
    warningSubtle: primitiveColors.orange[950],
    warningSubtleBorder: primitiveColors.orange[800],

    error: primitiveColors.red[500],
    errorHover: primitiveColors.red[400],
    errorSubtle: primitiveColors.red[950],
    errorSubtleBorder: primitiveColors.red[800],

    info: primitiveColors.blue[500],
    infoHover: primitiveColors.blue[400],
    infoSubtle: primitiveColors.blue[950],
    infoSubtleBorder: primitiveColors.blue[800],
  },

  // Interactive states
  interactive: {
    // Primary actions
    primaryDefault: primitiveColors.blue[600],
    primaryHover: primitiveColors.blue[500],
    primaryActive: primitiveColors.blue[700],
    primaryDisabled: primitiveColors.gray[700],

    // Secondary actions
    secondaryDefault: primitiveColors.gray[800],
    secondaryHover: primitiveColors.gray[700],
    secondaryActive: primitiveColors.gray[600],
    secondaryDisabled: primitiveColors.gray[800],

    // Ghost/subtle actions
    ghostDefault: 'transparent',
    ghostHover: primitiveColors.gray[800],
    ghostActive: primitiveColors.gray[700],

    // Focus states
    focusRing: primitiveColors.blue[500],
    focusRingOffset: primitiveColors.gray[900],
  },

  // Component-specific colors
  component: {
    // File upload zone
    uploadZone: {
      background: primitiveColors.blue[950],
      backgroundHover: primitiveColors.blue[900],
      backgroundActive: primitiveColors.blue[900],
      border: primitiveColors.blue[800],
      borderHover: primitiveColors.blue[700],
      borderDashed: primitiveColors.blue[800],
      icon: primitiveColors.blue[500],
      text: primitiveColors.blue[300],
    },

    // Progress bar
    progress: {
      background: primitiveColors.gray[800],
      fill: primitiveColors.blue[600],
      text: primitiveColors.gray[300],
    },

    // Checkbox/Radio
    checkbox: {
      background: primitiveColors.gray[800],
      backgroundChecked: primitiveColors.blue[600],
      border: primitiveColors.gray[600],
      borderChecked: primitiveColors.blue[600],
      borderHover: primitiveColors.gray[500],
      checkmark: primitiveColors.white,
    },

    // Tooltip
    tooltip: {
      background: primitiveColors.gray[100],
      text: primitiveColors.gray[900],
      border: primitiveColors.gray[200],
    },

    // Badge
    badge: {
      background: primitiveColors.blue[900],
      text: primitiveColors.blue[200],
      border: primitiveColors.blue[800],
    },
  },
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type PrimitiveColors = typeof primitiveColors;
export type ThemeColors = typeof lightTheme;
export type ColorToken = keyof ThemeColors;
