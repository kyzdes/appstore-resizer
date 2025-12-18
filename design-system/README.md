# App Store Screenshot Converter - Design System

A comprehensive design system for the App Store Screenshot Converter web application, built for developers who need to resize screenshots to Apple App Store dimensions.

---

## Overview

This design system provides a complete set of design tokens, component specifications, and implementation guidelines for building a professional, accessible, and consistent user interface.

### Key Features

- **Complete Design Tokens**: Colors, typography, spacing, effects, and layout tokens
- **Dark/Light Themes**: Full support for theme switching with consistent semantics
- **Accessibility First**: WCAG AA compliance built into every component
- **shadcn/ui Integration**: Designed to work seamlessly with shadcn/ui and Tailwind CSS
- **Developer-Focused**: Clear specifications and implementation guides
- **Bilingual Support**: Designed for English and Russian localization

---

## What's Included

### 1. Design Tokens (`/tokens`)

Complete TypeScript token definitions:

- **`colors.ts`**: Comprehensive color system with light/dark themes
- **`typography.ts`**: Font families, sizes, weights, and semantic styles
- **`spacing.ts`**: Consistent spacing scale based on 4px base unit
- **`effects.ts`**: Shadows, border radius, transitions, animations, z-index
- **`layout.ts`**: Breakpoints, grid system, container widths
- **`index.ts`**: Centralized export for all tokens

### 2. Component Specifications (`/components`)

Detailed component specifications:

- **`button.md`**: Button variants, states, sizes, and usage
- **`file-upload.md`**: File upload zone with drag & drop
- **`checkbox.md`**: Checkbox and checkbox groups for resolution selection
- **`progress.md`**: Progress bars, spinners, and step indicators
- **`toast.md`**: Toast notifications for feedback

### 3. Configuration Files

Ready-to-use configuration:

- **`tailwind.config.ts`**: Extended Tailwind configuration
- **`globals.css`**: CSS custom properties and utility classes

### 4. Documentation

Implementation guides:

- **`IMPLEMENTATION_GUIDE.md`**: Step-by-step setup instructions
- **`ICON_SYSTEM.md`**: Icon library and usage guidelines
- **`README.md`**: This file - overview and quick start

---

## Quick Start

### 1. Install Dependencies

```bash
npm install tailwindcss postcss autoprefixer
npm install clsx tailwind-merge class-variance-authority
npm install -D tailwindcss-animate @tailwindcss/forms
npm install lucide-react next-themes
```

### 2. Copy Design Tokens

```bash
# Copy token files to your project
cp -r design-system/tokens src/lib/design-tokens/
```

### 3. Configure Tailwind

```bash
# Replace your tailwind.config.ts
cp design-system/tailwind.config.ts ./tailwind.config.ts
```

### 4. Set Up Global Styles

```bash
# Copy global CSS
cp design-system/globals.css app/globals.css
```

### 5. Install shadcn/ui

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add progress
```

### 6. Start Building

You're ready to build! Refer to component specifications for detailed usage.

---

## Design Principles

### 1. Developer Experience First

Components are designed to be intuitive and require minimal configuration:

```tsx
// Simple, clear API
<Button variant="primary" size="lg">
  Download ZIP
</Button>

// Composition over configuration
<Button leftIcon={<Download />} loading={isProcessing}>
  Process Images
</Button>
```

### 2. Visual Consistency

All design decisions follow a systematic approach:

- **Colors**: Semantic naming (primary, success, error) not arbitrary names
- **Spacing**: All values are multiples of 4px base unit
- **Typography**: Modular scale (1.25 ratio) for harmonious proportions
- **Shadows**: Progressive elevation scale for depth hierarchy

### 3. Accessibility Built-In

Every component meets WCAG AA standards:

- Minimum 4.5:1 contrast for text
- Keyboard navigation support
- Screen reader optimized
- Focus indicators on all interactive elements
- Semantic HTML throughout

### 4. Scalability

The system grows with your application:

- Composable components
- Consistent naming conventions
- Token-based design (easy to update globally)
- Documentation for every component

---

## Color System

### Semantic Color Tokens

```typescript
// Light theme
background.primary      // Main background
text.primary           // Primary text
brand.primary          // Brand color (blue)
semantic.success       // Success states (green)
semantic.error         // Error states (red)
semantic.warning       // Warning states (orange)

// Dark theme (same tokens, different values)
background.primary      // Dark background
text.primary           // Light text
// ... same semantic names
```

### Benefits

- **Theme Switching**: Change `light` to `dark` without touching component code
- **Consistency**: Same semantic meaning across themes
- **Maintainability**: Update colors in one place

---

## Typography System

### Font Families

```typescript
sans: System font stack (SF Pro, Segoe UI, Roboto, etc.)
mono: Monospace stack for technical content
```

### Semantic Typography

```typescript
typography.h1          // Page headings
typography.bodyBase    // Body text
typography.label       // Form labels
typography.buttonBase  // Button text
typography.code        // Code/technical content
```

### Application-Specific

```typescript
typography.resolution  // Resolution dimensions (e.g., "1242×2688")
typography.filename    // File names
typography.deviceLabel // Device labels (e.g., "iPhone 6.5\"")
```

---

## Spacing System

### Base Unit: 4px

All spacing is a multiple of 4px for visual harmony:

```typescript
spacing[1]  // 4px
spacing[2]  // 8px
spacing[4]  // 16px
spacing[8]  // 32px
spacing[16] // 64px
```

### Semantic Spacing

```typescript
semanticSpacing.button.padding.md  // Button padding
semanticSpacing.gap.md             // Standard gap
semanticSpacing.section.md         // Section spacing
```

---

## Component Overview

### Button Component

Five variants for different emphasis levels:

- **Primary**: Main call-to-action (blue, high emphasis)
- **Secondary**: Supporting actions (gray, medium emphasis)
- **Ghost**: Subtle actions (transparent, low emphasis)
- **Outline**: Alternative secondary (outlined)
- **Destructive**: Dangerous actions (red)

Three sizes: `sm` (32px), `md` (40px), `lg` (48px)

[Full specification →](components/button.md)

### File Upload Component

Drag-and-drop file upload with:

- Visual drag-over feedback
- File validation (type, size, count)
- Thumbnail previews
- Individual file removal
- Error messaging
- Loading states

[Full specification →](components/file-upload.md)

### Checkbox Component

Selection controls with:

- Standard checked/unchecked states
- Indeterminate state for parent checkboxes
- Checkbox groups
- Error states
- Descriptions

[Full specification →](components/checkbox.md)

### Progress Component

Three types of progress indicators:

- **Linear Progress Bar**: Determinate/indeterminate progress
- **Circular Spinner**: Loading states
- **Step Progress**: Multi-step processes

[Full specification →](components/progress.md)

### Toast Notification

Non-intrusive feedback with:

- Five variants (success, error, warning, info, loading)
- Auto-dismiss with configurable duration
- Action buttons
- Stacking management
- Swipe to dismiss (mobile)

[Full specification →](components/toast.md)

---

## Theme Switching

### Implementation

```tsx
// 1. Wrap app with theme provider
import { ThemeProvider } from 'next-themes'

<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>

// 2. Create theme toggle
import { useTheme } from 'next-themes'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  )
}
```

### CSS Variables

All colors use CSS custom properties:

```css
/* Light theme */
:root {
  --primary: 217 91% 60%;
  --background: 0 0% 100%;
}

/* Dark theme */
.dark {
  --primary: 217 91% 60%;
  --background: 222 84% 5%;
}
```

Components automatically adapt when `dark` class is added to `<html>`.

---

## Accessibility Standards

### WCAG AA Compliance

All components meet or exceed WCAG AA standards:

| Requirement | Standard | Implementation |
|-------------|----------|----------------|
| Text Contrast | 4.5:1 | All text colors tested |
| Large Text Contrast | 3:1 | Headings and large UI text |
| UI Component Contrast | 3:1 | Borders, focus indicators |
| Focus Indicators | 3:1 | Blue ring with 2px offset |

### Keyboard Navigation

All interactive elements are keyboard accessible:

- **Tab**: Navigate between elements
- **Enter/Space**: Activate buttons, toggle checkboxes
- **Escape**: Close modals, dismiss toasts
- **Arrow Keys**: Navigate within components

### Screen Reader Support

- Semantic HTML elements
- ARIA attributes where needed
- Descriptive labels for icon-only buttons
- Live regions for dynamic content
- Status announcements for async operations

---

## Best Practices

### 1. Use Design Tokens

Always use design tokens instead of hardcoded values:

```tsx
// ❌ Don't
<div style={{ color: '#3b82f6', padding: '16px' }} />

// ✅ Do
<div className="text-primary p-4" />
```

### 2. Compose Components

Prefer composition over complex prop APIs:

```tsx
// ❌ Don't
<Button icon="download" iconPosition="left" />

// ✅ Do
<Button leftIcon={<Download />}>Download</Button>
```

### 3. Mobile-First Responsive

Use Tailwind's mobile-first breakpoints:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* Stacks on mobile, 2 cols on tablet, 4 cols on desktop */}
</div>
```

### 4. Accessibility First

Always include accessibility attributes:

```tsx
<button aria-label="Remove image">
  <X className="h-4 w-4" />
</button>
```

---

## Application-Specific Components

### Resolution Selection

Use checkbox groups organized by device:

```tsx
<div className="space-y-8">
  <CheckboxGroup label="iPhone">
    <Checkbox label="6.9\" (1260×2736)" />
    <Checkbox label="6.5\" (1242×2688)" />
    {/* More iPhone sizes */}
  </CheckboxGroup>

  <CheckboxGroup label="iPad">
    <Checkbox label="13\" (2064×2752)" />
    {/* More iPad sizes */}
  </CheckboxGroup>
</div>
```

### Processing Workflow

Show progress through multi-step process:

```tsx
<StepProgress
  steps={[
    { label: 'Upload', status: 'completed' },
    { label: 'Resize', status: 'active' },
    { label: 'Package', status: 'pending' },
    { label: 'Download', status: 'pending' },
  ]}
/>
```

---

## Resources

### Documentation

- [Implementation Guide](IMPLEMENTATION_GUIDE.md) - Step-by-step setup
- [Icon System](ICON_SYSTEM.md) - Icon usage and guidelines
- [Component Specs](components/) - Detailed component specifications

### Design Tokens

- [Colors](tokens/colors.ts) - Color system with themes
- [Typography](tokens/typography.ts) - Font and text styles
- [Spacing](tokens/spacing.ts) - Spacing scale and semantic spacing
- [Effects](tokens/effects.ts) - Shadows, animations, transitions
- [Layout](tokens/layout.ts) - Breakpoints and grid system

### External Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Support

For questions or issues with the design system:

1. Check the [Implementation Guide](IMPLEMENTATION_GUIDE.md)
2. Review component specifications in `/components`
3. Refer to design tokens in `/tokens`

---

## License

This design system is part of the App Store Screenshot Converter project.

---

## Changelog

### Version 1.0.0 (2025-12-17)

Initial release with:
- Complete design token system
- Component specifications for core components
- Tailwind CSS and shadcn/ui integration
- Dark/light theme support
- Comprehensive documentation
- Implementation guides

---

Built with care for developers by developers.
