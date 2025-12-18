/**
 * Design System: Spacing Tokens
 * App Store Screenshot Converter
 *
 * Consistent spacing scale based on 4px base unit
 * for margins, paddings, gaps, and layout spacing
 */

// ============================================================================
// SPACING SCALE
// ============================================================================

// Base unit: 4px - All spacing values are multiples of this
export const BASE_UNIT = 4;

export const spacing = {
  0: '0',           // 0px
  px: '1px',        // 1px - hairline borders
  0.5: '0.125rem',  // 2px - 0.5 * 4px
  1: '0.25rem',     // 4px - 1 * 4px
  1.5: '0.375rem',  // 6px - 1.5 * 4px
  2: '0.5rem',      // 8px - 2 * 4px
  2.5: '0.625rem',  // 10px - 2.5 * 4px
  3: '0.75rem',     // 12px - 3 * 4px
  3.5: '0.875rem',  // 14px - 3.5 * 4px
  4: '1rem',        // 16px - 4 * 4px
  5: '1.25rem',     // 20px - 5 * 4px
  6: '1.5rem',      // 24px - 6 * 4px
  7: '1.75rem',     // 28px - 7 * 4px
  8: '2rem',        // 32px - 8 * 4px
  9: '2.25rem',     // 36px - 9 * 4px
  10: '2.5rem',     // 40px - 10 * 4px
  11: '2.75rem',    // 44px - 11 * 4px
  12: '3rem',       // 48px - 12 * 4px
  14: '3.5rem',     // 56px - 14 * 4px
  16: '4rem',       // 64px - 16 * 4px
  20: '5rem',       // 80px - 20 * 4px
  24: '6rem',       // 96px - 24 * 4px
  28: '7rem',       // 112px - 28 * 4px
  32: '8rem',       // 128px - 32 * 4px
  36: '9rem',       // 144px - 36 * 4px
  40: '10rem',      // 160px - 40 * 4px
  44: '11rem',      // 176px - 44 * 4px
  48: '12rem',      // 192px - 48 * 4px
  52: '13rem',      // 208px - 52 * 4px
  56: '14rem',      // 224px - 56 * 4px
  60: '15rem',      // 240px - 60 * 4px
  64: '16rem',      // 256px - 64 * 4px
  72: '18rem',      // 288px - 72 * 4px
  80: '20rem',      // 320px - 80 * 4px
  96: '24rem',      // 384px - 96 * 4px
} as const;

// ============================================================================
// SEMANTIC SPACING
// ============================================================================

// Named spacing tokens for specific use cases
export const semanticSpacing = {
  // Component internal spacing
  component: {
    xs: spacing[1],      // 4px - Minimal internal padding
    sm: spacing[2],      // 8px - Compact components
    md: spacing[3],      // 12px - Standard components
    lg: spacing[4],      // 16px - Comfortable components
    xl: spacing[6],      // 24px - Spacious components
  },

  // Gaps between elements
  gap: {
    xs: spacing[1],      // 4px - Tight grouping
    sm: spacing[2],      // 8px - Close relationship
    md: spacing[4],      // 16px - Standard spacing
    lg: spacing[6],      // 24px - Separated sections
    xl: spacing[8],      // 32px - Major divisions
  },

  // Section spacing (vertical rhythm)
  section: {
    xs: spacing[8],      // 32px
    sm: spacing[12],     // 48px
    md: spacing[16],     // 64px
    lg: spacing[24],     // 96px
    xl: spacing[32],     // 128px
  },

  // Layout containers
  container: {
    xs: spacing[4],      // 16px - Mobile padding
    sm: spacing[6],      // 24px - Small screens
    md: spacing[8],      // 32px - Medium screens
    lg: spacing[12],     // 48px - Large screens
    xl: spacing[16],     // 64px - Extra large screens
  },

  // Button spacing
  button: {
    padding: {
      sm: {
        x: spacing[3],   // 12px horizontal
        y: spacing[1.5], // 6px vertical
      },
      md: {
        x: spacing[4],   // 16px horizontal
        y: spacing[2],   // 8px vertical
      },
      lg: {
        x: spacing[6],   // 24px horizontal
        y: spacing[3],   // 12px vertical
      },
    },
    gap: spacing[2],     // 8px - Gap between icon and text
  },

  // Input spacing
  input: {
    padding: {
      sm: {
        x: spacing[3],   // 12px horizontal
        y: spacing[2],   // 8px vertical
      },
      md: {
        x: spacing[4],   // 16px horizontal
        y: spacing[2.5], // 10px vertical
      },
      lg: {
        x: spacing[4],   // 16px horizontal
        y: spacing[3],   // 12px vertical
      },
    },
  },

  // Card spacing
  card: {
    padding: {
      sm: spacing[4],    // 16px
      md: spacing[6],    // 24px
      lg: spacing[8],    // 32px
    },
    gap: spacing[4],     // 16px - Gap between card elements
  },

  // Modal/Dialog spacing
  modal: {
    padding: spacing[6],    // 24px
    header: spacing[4],     // 16px padding
    body: spacing[6],       // 24px padding
    footer: spacing[4],     // 16px padding
    gap: spacing[6],        // 24px between sections
  },

  // Upload zone spacing
  uploadZone: {
    padding: spacing[8],    // 32px
    gap: spacing[4],        // 16px between icon and text
  },

  // Toast/Alert spacing
  toast: {
    padding: spacing[4],    // 16px
    gap: spacing[3],        // 12px between icon and text
  },

  // Progress indicator spacing
  progress: {
    height: spacing[2],     // 8px - Progress bar height
    gap: spacing[2],        // 8px - Gap to label
  },

  // Checkbox/Radio spacing
  checkbox: {
    size: spacing[5],       // 20px - Checkbox size
    gap: spacing[2],        // 8px - Gap to label
  },

  // Badge spacing
  badge: {
    padding: {
      x: spacing[2],        // 8px horizontal
      y: spacing[1],        // 4px vertical
    },
  },

  // Tooltip spacing
  tooltip: {
    padding: {
      x: spacing[3],        // 12px horizontal
      y: spacing[2],        // 8px vertical
    },
    offset: spacing[2],     // 8px - Distance from trigger
  },

  // Dropdown spacing
  dropdown: {
    padding: spacing[1],    // 4px - Container padding
    itemPadding: {
      x: spacing[3],        // 12px horizontal
      y: spacing[2],        // 8px vertical
    },
    gap: spacing[1],        // 4px between items
  },

  // Grid spacing
  grid: {
    gap: {
      xs: spacing[2],       // 8px
      sm: spacing[4],       // 16px
      md: spacing[6],       // 24px
      lg: spacing[8],       // 32px
    },
  },

  // Form spacing
  form: {
    fieldGap: spacing[4],   // 16px - Gap between form fields
    labelGap: spacing[2],   // 8px - Gap between label and input
    errorGap: spacing[1.5], // 6px - Gap to error message
  },

  // Icon sizes (as spacing tokens)
  icon: {
    xs: spacing[3],         // 12px
    sm: spacing[4],         // 16px
    md: spacing[5],         // 20px
    lg: spacing[6],         // 24px
    xl: spacing[8],         // 32px
    '2xl': spacing[12],     // 48px
  },
} as const;

// ============================================================================
// NEGATIVE SPACING
// ============================================================================

// For negative margins (use sparingly)
export const negativeSpacing = Object.entries(spacing).reduce(
  (acc, [key, value]) => {
    if (key !== '0' && key !== 'px') {
      acc[`-${key}` as keyof typeof acc] = `-${value}`;
    }
    return acc;
  },
  {} as Record<string, string>
);

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Spacing = keyof typeof spacing;
export type SemanticSpacing = typeof semanticSpacing;
