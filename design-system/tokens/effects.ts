/**
 * Design System: Effect Tokens
 * App Store Screenshot Converter
 *
 * Shadows, border radius, transitions, and z-index scales
 * for depth, motion, and layering
 */

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  // No shadow
  none: 'none',

  // Subtle elevation (cards, buttons in default state)
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',

  // Standard elevation (hovering cards, dropdowns)
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',

  // Medium elevation (modal overlays, floating elements)
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',

  // Large elevation (popovers, tooltips)
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',

  // Extra large elevation (modals, dialogs)
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',

  // Maximum elevation (full-screen overlays)
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // Inner shadows (pressed states, input fields)
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',

  // Focus rings (accessibility)
  focus: {
    default: '0 0 0 3px rgba(59, 130, 246, 0.5)',        // Blue focus ring
    error: '0 0 0 3px rgba(239, 68, 68, 0.5)',           // Red focus ring
    success: '0 0 0 3px rgba(34, 197, 94, 0.5)',         // Green focus ring
  },
} as const;

// Dark theme shadows (slightly different for visibility)
export const shadowsDark = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
  focus: shadows.focus, // Focus rings remain the same
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '0.125rem',      // 2px - Small elements, badges
  base: '0.25rem',     // 4px - Buttons, inputs (standard)
  md: '0.375rem',      // 6px - Cards, larger buttons
  lg: '0.5rem',        // 8px - Cards with more emphasis
  xl: '0.75rem',       // 12px - Modal corners, hero cards
  '2xl': '1rem',       // 16px - Large cards, images
  '3xl': '1.5rem',     // 24px - Extra large elements
  full: '9999px',      // Fully rounded (pills, circular buttons)
} as const;

// Semantic border radius for specific components
export const semanticBorderRadius = {
  button: borderRadius.base,        // 4px
  input: borderRadius.base,         // 4px
  card: borderRadius.lg,            // 8px
  modal: borderRadius.xl,           // 12px
  badge: borderRadius.full,         // Fully rounded
  uploadZone: borderRadius.xl,      // 12px
  tooltip: borderRadius.md,         // 6px
  dropdown: borderRadius.md,        // 6px
  checkbox: borderRadius.sm,        // 2px
  avatar: borderRadius.full,        // Fully rounded
  image: borderRadius.md,           // 6px
} as const;

// ============================================================================
// BORDER WIDTHS
// ============================================================================

export const borderWidth = {
  0: '0',
  DEFAULT: '1px',      // Standard borders
  2: '2px',            // Emphasized borders
  4: '4px',            // Heavy borders
  8: '8px',            // Extra heavy borders (rare)
} as const;

// ============================================================================
// TRANSITIONS
// ============================================================================

// Duration values
export const transitionDuration = {
  fastest: '75ms',     // Instant feedback (hover states)
  fast: '150ms',       // Quick transitions (buttons, links)
  base: '200ms',       // Standard transitions (most UI elements)
  slow: '300ms',       // Slower transitions (modals, drawers)
  slower: '500ms',     // Deliberate transitions (page transitions)
  slowest: '700ms',    // Very slow transitions (special effects)
} as const;

// Timing functions (easing curves)
export const transitionTiming = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',           // Ease in
  out: 'cubic-bezier(0, 0, 0.2, 1)',          // Ease out
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',      // Ease in-out
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bounce
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',      // Sharp (Material Design)
} as const;

// Pre-composed transitions for common properties
export const transitions = {
  // Default transition (all properties)
  all: `all ${transitionDuration.base} ${transitionTiming.inOut}`,

  // Color transitions (backgrounds, borders, text)
  colors: `background-color ${transitionDuration.fast} ${transitionTiming.out}, border-color ${transitionDuration.fast} ${transitionTiming.out}, color ${transitionDuration.fast} ${transitionTiming.out}`,

  // Opacity transitions (fade in/out)
  opacity: `opacity ${transitionDuration.base} ${transitionTiming.inOut}`,

  // Transform transitions (scale, translate, rotate)
  transform: `transform ${transitionDuration.base} ${transitionTiming.out}`,

  // Shadow transitions (elevation changes)
  shadow: `box-shadow ${transitionDuration.base} ${transitionTiming.out}`,

  // Combined transitions for interactive elements
  interactive: `background-color ${transitionDuration.fast} ${transitionTiming.out}, border-color ${transitionDuration.fast} ${transitionTiming.out}, color ${transitionDuration.fast} ${transitionTiming.out}, box-shadow ${transitionDuration.base} ${transitionTiming.out}, transform ${transitionDuration.base} ${transitionTiming.out}`,

  // None (disable transitions)
  none: 'none',
} as const;

// Component-specific transitions
export const componentTransitions = {
  button: transitions.interactive,
  input: `border-color ${transitionDuration.fast} ${transitionTiming.out}, box-shadow ${transitionDuration.fast} ${transitionTiming.out}`,
  card: transitions.shadow,
  modal: `opacity ${transitionDuration.slow} ${transitionTiming.out}, transform ${transitionDuration.slow} ${transitionTiming.out}`,
  dropdown: `opacity ${transitionDuration.fast} ${transitionTiming.out}, transform ${transitionDuration.fast} ${transitionTiming.sharp}`,
  tooltip: `opacity ${transitionDuration.base} ${transitionTiming.out}`,
  toast: `opacity ${transitionDuration.base} ${transitionTiming.out}, transform ${transitionDuration.base} ${transitionTiming.bounce}`,
  uploadZone: `background-color ${transitionDuration.fast} ${transitionTiming.out}, border-color ${transitionDuration.fast} ${transitionTiming.out}`,
  progress: `width ${transitionDuration.slow} ${transitionTiming.linear}`,
} as const;

// ============================================================================
// ANIMATIONS
// ============================================================================

// Keyframe animations
export const keyframes = {
  // Fade in/out
  fadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  fadeOut: {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },

  // Slide animations
  slideInUp: {
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' },
  },
  slideInDown: {
    from: { transform: 'translateY(-100%)' },
    to: { transform: 'translateY(0)' },
  },
  slideInLeft: {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' },
  },
  slideInRight: {
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0)' },
  },

  // Scale animations
  scaleIn: {
    from: { transform: 'scale(0.95)', opacity: '0' },
    to: { transform: 'scale(1)', opacity: '1' },
  },
  scaleOut: {
    from: { transform: 'scale(1)', opacity: '1' },
    to: { transform: 'scale(0.95)', opacity: '0' },
  },

  // Spin animation (for loading indicators)
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },

  // Pulse animation (for loading states)
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },

  // Bounce animation
  bounce: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-25%)' },
  },
} as const;

// Animation presets
export const animations = {
  fadeIn: `fadeIn ${transitionDuration.base} ${transitionTiming.out}`,
  fadeOut: `fadeOut ${transitionDuration.base} ${transitionTiming.out}`,
  slideInUp: `slideInUp ${transitionDuration.slow} ${transitionTiming.out}`,
  slideInDown: `slideInDown ${transitionDuration.slow} ${transitionTiming.out}`,
  scaleIn: `scaleIn ${transitionDuration.base} ${transitionTiming.out}`,
  scaleOut: `scaleOut ${transitionDuration.base} ${transitionTiming.out}`,
  spin: `spin ${transitionDuration.slower} linear infinite`,
  pulse: `pulse ${transitionDuration.slower} ${transitionTiming.inOut} infinite`,
  bounce: `bounce ${transitionDuration.slower} ${transitionTiming.inOut} infinite`,
} as const;

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

// Layering system for managing stacking context
export const zIndex = {
  // Base layer (normal content)
  base: 0,

  // Dropdown menus (above content)
  dropdown: 1000,

  // Sticky headers (above content, below dropdowns)
  sticky: 100,

  // Fixed elements (sidebars, headers)
  fixed: 500,

  // Modal backdrop (above fixed elements)
  modalBackdrop: 1400,

  // Modal content (above backdrop)
  modal: 1500,

  // Popover/Tooltip (above modals for contextual info)
  popover: 1600,

  // Toast notifications (highest, always visible)
  toast: 2000,

  // Debug/Development overlays (absolute highest)
  debug: 9999,

  // Behind content (for decorative elements)
  behind: -1,
} as const;

// ============================================================================
// OPACITY SCALE
// ============================================================================

export const opacity = {
  0: '0',
  5: '0.05',
  10: '0.1',
  20: '0.2',
  25: '0.25',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  75: '0.75',
  80: '0.8',
  90: '0.9',
  95: '0.95',
  100: '1',
} as const;

// Semantic opacity values
export const semanticOpacity = {
  disabled: opacity[40],        // 40% - Disabled state
  hover: opacity[90],           // 90% - Hover state
  loading: opacity[60],         // 60% - Loading state
  backdrop: opacity[75],        // 75% - Modal backdrop
  placeholder: opacity[50],     // 50% - Placeholder text
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Shadow = keyof typeof shadows;
export type BorderRadius = keyof typeof borderRadius;
export type BorderWidth = keyof typeof borderWidth;
export type TransitionDuration = keyof typeof transitionDuration;
export type TransitionTiming = keyof typeof transitionTiming;
export type ZIndex = keyof typeof zIndex;
export type Opacity = keyof typeof opacity;
