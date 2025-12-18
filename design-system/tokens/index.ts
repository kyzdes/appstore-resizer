/**
 * Design System: Token Index
 * App Store Screenshot Converter
 *
 * Central export for all design tokens
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './effects';
export * from './layout';

// Re-export for convenience
import { primitiveColors, lightTheme, darkTheme } from './colors';
import { fontFamilies, fontSizes, fontWeights, lineHeights, letterSpacing, typography } from './typography';
import { spacing, semanticSpacing } from './spacing';
import { shadows, shadowsDark, borderRadius, transitions, zIndex, opacity } from './effects';
import { breakpoints, containerMaxWidth, contentMaxWidth } from './layout';

export const tokens = {
  colors: {
    primitive: primitiveColors,
    light: lightTheme,
    dark: darkTheme,
  },
  typography: {
    families: fontFamilies,
    sizes: fontSizes,
    weights: fontWeights,
    lineHeights,
    letterSpacing,
    styles: typography,
  },
  spacing: {
    scale: spacing,
    semantic: semanticSpacing,
  },
  effects: {
    shadows,
    shadowsDark,
    borderRadius,
    transitions,
    zIndex,
    opacity,
  },
  layout: {
    breakpoints,
    containerMaxWidth,
    contentMaxWidth,
  },
} as const;

export default tokens;
