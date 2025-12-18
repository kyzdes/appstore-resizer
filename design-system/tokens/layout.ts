/**
 * Design System: Layout Tokens
 * App Store Screenshot Converter
 *
 * Grid system, breakpoints, container widths, and layout patterns
 * for responsive design
 */

// ============================================================================
// BREAKPOINTS
// ============================================================================

// Mobile-first breakpoints for responsive design
export const breakpoints = {
  sm: '640px',    // Small devices (large phones)
  md: '768px',    // Medium devices (tablets)
  lg: '1024px',   // Large devices (laptops)
  xl: '1280px',   // Extra large devices (desktops)
  '2xl': '1536px', // 2X large devices (large desktops)
} as const;

// Breakpoint values in pixels (for JavaScript usage)
export const breakpointValues = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ============================================================================
// CONTAINER WIDTHS
// ============================================================================

// Maximum widths for content containers at each breakpoint
export const containerMaxWidth = {
  sm: '640px',    // 640px
  md: '768px',    // 768px
  lg: '1024px',   // 1024px
  xl: '1280px',   // 1280px
  '2xl': '1536px', // 1536px
} as const;

// Constrained container widths for optimal reading and usability
export const contentMaxWidth = {
  prose: '65ch',       // ~65 characters - optimal for reading text
  narrow: '640px',     // Narrow content (forms, single column)
  standard: '1024px',  // Standard content (most pages)
  wide: '1280px',      // Wide content (dashboards, data tables)
  full: '100%',        // Full width
} as const;

// ============================================================================
// GRID SYSTEM
// ============================================================================

// Grid columns (12-column system)
export const gridColumns = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: '11',
  12: '12',
  none: 'none',
} as const;

// Grid column spans
export const gridColumnSpan = {
  auto: 'auto',
  span1: 'span 1 / span 1',
  span2: 'span 2 / span 2',
  span3: 'span 3 / span 3',
  span4: 'span 4 / span 4',
  span5: 'span 5 / span 5',
  span6: 'span 6 / span 6',
  span7: 'span 7 / span 7',
  span8: 'span 8 / span 8',
  span9: 'span 9 / span 9',
  span10: 'span 10 / span 10',
  span11: 'span 11 / span 11',
  span12: 'span 12 / span 12',
  full: '1 / -1',
} as const;

// Grid gaps (using spacing tokens)
export const gridGap = {
  0: '0',
  xs: '0.5rem',   // 8px
  sm: '1rem',     // 16px
  md: '1.5rem',   // 24px
  lg: '2rem',     // 32px
  xl: '3rem',     // 48px
} as const;

// ============================================================================
// FLEX LAYOUTS
// ============================================================================

// Flex direction
export const flexDirection = {
  row: 'row',
  rowReverse: 'row-reverse',
  col: 'column',
  colReverse: 'column-reverse',
} as const;

// Flex wrap
export const flexWrap = {
  wrap: 'wrap',
  wrapReverse: 'wrap-reverse',
  nowrap: 'nowrap',
} as const;

// Justify content
export const justifyContent = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
} as const;

// Align items
export const alignItems = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  baseline: 'baseline',
  stretch: 'stretch',
} as const;

// ============================================================================
// ASPECT RATIOS
// ============================================================================

// Common aspect ratios for images and media
export const aspectRatio = {
  square: '1 / 1',        // 1:1 - Square
  video: '16 / 9',        // 16:9 - Widescreen video
  portrait: '3 / 4',      // 3:4 - Portrait
  landscape: '4 / 3',     // 4:3 - Landscape
  ultrawide: '21 / 9',    // 21:9 - Ultrawide

  // Apple device aspect ratios (relevant for screenshot tool)
  iphone: '9 / 19.5',     // iPhone (modern, notched)
  iphoneClassic: '9 / 16', // iPhone (classic, pre-X)
  ipad: '3 / 4',          // iPad
  appleWatch: '5 / 6',    // Apple Watch (approximate)
} as const;

// ============================================================================
// LAYOUT PATTERNS
// ============================================================================

// Pre-defined layout patterns for common use cases
export const layoutPatterns = {
  // Centered content with max width
  centeredContent: {
    maxWidth: contentMaxWidth.standard,
    marginX: 'auto',
    paddingX: { sm: '1rem', md: '2rem', lg: '3rem' },
  },

  // Sidebar layout (main + sidebar)
  sidebarLayout: {
    container: {
      display: 'grid',
      gridTemplateColumns: { base: '1fr', lg: '250px 1fr' },
      gap: { base: '1rem', lg: '2rem' },
    },
  },

  // Two-column layout
  twoColumn: {
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
    gap: { base: '1rem', md: '2rem' },
  },

  // Three-column layout
  threeColumn: {
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
    gap: { base: '1rem', md: '1.5rem', lg: '2rem' },
  },

  // Hero section
  hero: {
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingY: { base: '3rem', md: '4rem', lg: '6rem' },
  },

  // Card grid (responsive)
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: {
      base: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)',
    },
    gap: { base: '1rem', md: '1.5rem' },
  },

  // Stack (vertical flex layout)
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  // Inline stack (horizontal flex layout)
  inlineStack: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.5rem',
  },
} as const;

// ============================================================================
// APPLICATION-SPECIFIC LAYOUTS
// ============================================================================

// Layout tokens specific to the Screenshot Converter app
export const appLayouts = {
  // Main application container
  appContainer: {
    maxWidth: contentMaxWidth.wide,
    marginX: 'auto',
    paddingX: { base: '1rem', md: '2rem', lg: '3rem' },
    paddingY: { base: '2rem', md: '3rem' },
  },

  // Upload section
  uploadSection: {
    maxWidth: contentMaxWidth.standard,
    marginX: 'auto',
    marginBottom: '2rem',
  },

  // Resolution selection grid
  resolutionGrid: {
    display: 'grid',
    gridTemplateColumns: {
      base: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)',
    },
    gap: { base: '0.75rem', md: '1rem' },
  },

  // Image preview grid
  imagePreviewGrid: {
    display: 'grid',
    gridTemplateColumns: {
      base: 'repeat(2, 1fr)',
      sm: 'repeat(3, 1fr)',
      md: 'repeat(4, 1fr)',
      lg: 'repeat(5, 1fr)',
    },
    gap: { base: '0.5rem', md: '0.75rem' },
  },

  // Processing status section
  processingStatus: {
    maxWidth: contentMaxWidth.narrow,
    marginX: 'auto',
    marginTop: '2rem',
  },
} as const;

// ============================================================================
// VIEWPORT SIZES
// ============================================================================

// Common viewport size constraints
export const viewport = {
  minHeight: {
    screen: '100vh',
    screenDynamic: '100dvh', // Dynamic viewport height (mobile-friendly)
  },
  maxHeight: {
    screen: '100vh',
    screenDynamic: '100dvh',
  },
  minWidth: {
    screen: '100vw',
  },
  maxWidth: {
    screen: '100vw',
  },
} as const;

// ============================================================================
// POSITION VALUES
// ============================================================================

// Common positioning values
export const position = {
  static: 'static',
  fixed: 'fixed',
  absolute: 'absolute',
  relative: 'relative',
  sticky: 'sticky',
} as const;

// Inset values (top, right, bottom, left)
export const inset = {
  0: '0',
  auto: 'auto',
  full: '100%',
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Breakpoint = keyof typeof breakpoints;
export type ContainerWidth = keyof typeof containerMaxWidth;
export type ContentWidth = keyof typeof contentMaxWidth;
export type GridColumns = keyof typeof gridColumns;
export type GridGap = keyof typeof gridGap;
export type AspectRatio = keyof typeof aspectRatio;
