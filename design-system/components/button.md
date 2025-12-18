# Button Component Specification

## Overview
Buttons are interactive elements that trigger actions when clicked. They come in multiple variants to indicate different levels of importance and different use cases.

## Variants

### Primary Button
**Purpose**: Main call-to-action, highest emphasis
**Use when**: The action is the primary goal of the page/section

**Visual Specifications**:
- Background: `interactive.primaryDefault`
- Text: `text.inverse` (white)
- Border: None
- Border Radius: `borderRadius.button` (4px)
- Shadow: `shadows.sm`

**States**:
- **Default**: As above
- **Hover**:
  - Background: `interactive.primaryHover`
  - Shadow: `shadows.md`
  - Cursor: pointer
- **Active/Pressed**:
  - Background: `interactive.primaryActive`
  - Shadow: `shadows.none`
  - Transform: `scale(0.98)`
- **Disabled**:
  - Background: `interactive.primaryDisabled`
  - Text: `text.disabled`
  - Cursor: not-allowed
  - Opacity: `semanticOpacity.disabled`
- **Focus**:
  - Outline: `shadows.focus.default` (3px blue ring)
  - Outline offset: 2px

### Secondary Button
**Purpose**: Secondary actions, medium emphasis
**Use when**: Supporting actions that complement the primary action

**Visual Specifications**:
- Background: `interactive.secondaryDefault`
- Text: `text.primary`
- Border: 1px solid `border.primary`
- Border Radius: `borderRadius.button` (4px)
- Shadow: None

**States**:
- **Default**: As above
- **Hover**:
  - Background: `interactive.secondaryHover`
  - Border: `border.secondary`
- **Active/Pressed**:
  - Background: `interactive.secondaryActive`
- **Disabled**:
  - Background: `interactive.secondaryDisabled`
  - Text: `text.disabled`
  - Border: `border.primary`
  - Cursor: not-allowed
- **Focus**:
  - Outline: `shadows.focus.default`
  - Outline offset: 2px

### Ghost Button
**Purpose**: Subtle actions, lowest emphasis
**Use when**: Tertiary actions or actions within already-emphasized containers

**Visual Specifications**:
- Background: `interactive.ghostDefault` (transparent)
- Text: `text.primary`
- Border: None
- Border Radius: `borderRadius.button` (4px)
- Shadow: None

**States**:
- **Default**: As above
- **Hover**:
  - Background: `interactive.ghostHover`
- **Active/Pressed**:
  - Background: `interactive.ghostActive`
- **Disabled**:
  - Text: `text.disabled`
  - Cursor: not-allowed
- **Focus**:
  - Outline: `shadows.focus.default`
  - Outline offset: 2px

### Outline Button
**Purpose**: Alternative secondary action style
**Use when**: Need visual separation or on colored backgrounds

**Visual Specifications**:
- Background: `transparent`
- Text: `brand.primary`
- Border: 2px solid `brand.primary`
- Border Radius: `borderRadius.button` (4px)
- Shadow: None

**States**:
- **Default**: As above
- **Hover**:
  - Background: `brand.primarySubtle`
  - Border: 2px solid `brand.primaryHover`
  - Text: `brand.primaryHover`
- **Active/Pressed**:
  - Background: `brand.primarySubtle`
  - Border: 2px solid `brand.primaryActive`
- **Disabled**:
  - Border: 2px solid `border.primary`
  - Text: `text.disabled`
  - Cursor: not-allowed
- **Focus**:
  - Outline: `shadows.focus.default`
  - Outline offset: 2px

### Destructive Button
**Purpose**: Dangerous or irreversible actions
**Use when**: Deleting, removing, or other destructive operations

**Visual Specifications**:
- Background: `semantic.error`
- Text: `text.inverse` (white)
- Border: None
- Border Radius: `borderRadius.button` (4px)
- Shadow: `shadows.sm`

**States**:
- **Default**: As above
- **Hover**:
  - Background: `semantic.errorHover`
  - Shadow: `shadows.md`
- **Active/Pressed**:
  - Background: `semantic.errorHover`
  - Shadow: `shadows.none`
  - Transform: `scale(0.98)`
- **Disabled**:
  - Background: `interactive.primaryDisabled`
  - Text: `text.disabled`
  - Cursor: not-allowed
- **Focus**:
  - Outline: `shadows.focus.error`
  - Outline offset: 2px

## Sizes

### Small
- Height: 32px
- Padding: `semanticSpacing.button.padding.sm` (12px horizontal, 6px vertical)
- Font: `typography.buttonSmall` (12px, semibold)
- Icon size: `semanticSpacing.icon.sm` (16px)
- Gap between icon and text: `semanticSpacing.button.gap` (8px)

### Medium (Default)
- Height: 40px
- Padding: `semanticSpacing.button.padding.md` (16px horizontal, 8px vertical)
- Font: `typography.buttonBase` (14px, semibold)
- Icon size: `semanticSpacing.icon.md` (20px)
- Gap between icon and text: `semanticSpacing.button.gap` (8px)

### Large
- Height: 48px
- Padding: `semanticSpacing.button.padding.lg` (24px horizontal, 12px vertical)
- Font: `typography.buttonLarge` (16px, semibold)
- Icon size: `semanticSpacing.icon.lg` (24px)
- Gap between icon and text: `semanticSpacing.button.gap` (8px)

## Transitions
- Use: `componentTransitions.button`
- Duration: `transitionDuration.fast` (150ms)
- Properties: background-color, border-color, color, box-shadow, transform

## Accessibility

### Keyboard Navigation
- Must be focusable with Tab key
- Must be activatable with Enter or Space key
- Must show clear focus indicator (focus ring)

### ARIA Attributes
- Use `aria-label` when button contains only an icon
- Use `aria-disabled="true"` for disabled state (in addition to `disabled` attribute)
- Use `aria-busy="true"` when button triggers loading state

### Screen Reader
- Button text must be descriptive of the action
- Icon-only buttons must have accessible labels
- Loading states should announce status changes

### Color Contrast
- Text contrast ratio: Minimum 4.5:1 (WCAG AA)
- Focus indicator contrast: Minimum 3:1 against background
- Disabled state should be visually distinct but still meet contrast minimums

## Usage Guidelines

### Do's
- Use clear, action-oriented labels (e.g., "Download ZIP", "Process Images")
- Use primary variant sparingly (only one per section)
- Keep button labels short (1-3 words ideal)
- Use consistent button sizes within a group
- Provide loading states for async actions
- Disable buttons during processing

### Don'ts
- Don't use multiple primary buttons in close proximity
- Don't use buttons for navigation (use links instead)
- Don't use vague labels like "Click here" or "Submit"
- Don't make buttons too small for touch targets (minimum 44x44px)
- Don't rely on color alone to convey state

## Component API

```typescript
interface ButtonProps {
  // Visual variant
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';

  // Size
  size?: 'sm' | 'md' | 'lg';

  // State
  disabled?: boolean;
  loading?: boolean;

  // Icon support
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  // Full width
  fullWidth?: boolean;

  // Type (for forms)
  type?: 'button' | 'submit' | 'reset';

  // Event handlers
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;

  // Children (button text)
  children: React.ReactNode;

  // Additional props
  className?: string;
  id?: string;
}
```

## Examples

### Download Button (Primary)
```tsx
<Button variant="primary" size="lg" leftIcon={<DownloadIcon />}>
  Download ZIP
</Button>
```

### Process Images Button with Loading
```tsx
<Button
  variant="primary"
  loading={isProcessing}
  disabled={images.length === 0}
>
  {isProcessing ? 'Processing...' : 'Process Images'}
</Button>
```

### Clear Selection (Secondary)
```tsx
<Button variant="secondary" size="sm" onClick={handleClear}>
  Clear Selection
</Button>
```

### Remove Image (Destructive, Icon Only)
```tsx
<Button
  variant="ghost"
  size="sm"
  aria-label="Remove image"
>
  <TrashIcon />
</Button>
```
