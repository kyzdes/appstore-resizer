# Toast Notification Component Specification

## Overview
Toast notifications provide brief, non-intrusive feedback about operations. They appear temporarily and disappear automatically.

## Visual Specifications

### Container
- Position: Fixed
- Location: Bottom-right of viewport (desktop), bottom-center (mobile)
- Max Width: 400px
- Z-index: `zIndex.toast` (2000)
- Margin: `spacing[4]` (16px) from edges
- Stack: Multiple toasts stack vertically with `spacing[2]` (8px) gap

### Toast Card
- Background: `surface.overlay`
- Border: 1px solid `border.primary`
- Border Radius: `semanticBorderRadius.tooltip` (6px)
- Padding: `semanticSpacing.toast.padding` (16px)
- Shadow: `shadows.lg`
- Backdrop Blur: Optional, for glassmorphism effect
- Min Height: 56px

### Layout (Internal)
- Display: Flex horizontal
- Alignment: Center
- Gap: `semanticSpacing.toast.gap` (12px)

**Elements**:
1. Icon (left) - 20px
2. Content (middle, flex-grow)
3. Close button (right) - 20px

### Animation

#### Enter Animation
- From: `transform: translateY(100%) scale(0.9), opacity: 0`
- To: `transform: translateY(0) scale(1), opacity: 1`
- Duration: `transitionDuration.base` (200ms)
- Timing: `transitionTiming.bounce`

#### Exit Animation
- From: `transform: scale(1), opacity: 1`
- To: `transform: scale(0.9), opacity: 0`
- Duration: `transitionDuration.fast` (150ms)
- Timing: `transitionTiming.out`

#### Stacking Animation
When new toast appears, existing toasts slide up smoothly.

## Variants

### Success Toast
- Icon: Checkmark circle (green)
- Icon Color: `semantic.success`
- Border Color: `semantic.successSubtleBorder`
- Background: `semantic.successSubtle` (tinted background, optional)

### Error Toast
- Icon: X circle / Alert circle (red)
- Icon Color: `semantic.error`
- Border Color: `semantic.errorSubtleBorder`
- Background: `semantic.errorSubtle` (tinted background, optional)

### Warning Toast
- Icon: Warning triangle (orange)
- Icon Color: `semantic.warning`
- Border Color: `semantic.warningSubtleBorder`
- Background: `semantic.warningSubtle` (tinted background, optional)

### Info Toast
- Icon: Info circle (blue)
- Icon Color: `semantic.info`
- Border Color: `semantic.infoSubtleBorder`
- Background: `semantic.infoSubtle` (tinted background, optional)

### Loading Toast
- Icon: Spinner (animated)
- Icon Color: `text.secondary`
- No close button (prevent dismissal during operation)

## Content

### Title (Optional)
- Font: `typography.label` (14px, medium weight)
- Color: `text.primary`
- Line Height: `lineHeights.tight`
- Margin Bottom: `spacing[1]` (4px) if description present

### Description/Message
- Font: `typography.bodySmall` (14px, normal weight)
- Color: `text.secondary`
- Line Height: `lineHeights.normal`
- Max Lines: 3 (truncate with ellipsis)

### Action Button (Optional)
- Variant: Ghost button (small)
- Appears below message
- Margin Top: `spacing[2]` (8px)

### Close Button
- Size: 20px × 20px
- Icon: X (12px)
- Color: `text.secondary`
- Hover: `text.primary`
- Position: Absolute top-right
- Offset: `spacing[2]` (8px) from edges
- Only show on hover (desktop) or always (mobile)

## Behavior

### Duration
- **Default**: 5000ms (5 seconds)
- **Success**: 4000ms (4 seconds)
- **Error**: 7000ms (7 seconds) - users need more time to read errors
- **Warning**: 6000ms (6 seconds)
- **Info**: 5000ms (5 seconds)
- **Loading**: Infinite (must be manually dismissed or programmatically closed)

### Auto-dismiss
- Progress bar (optional): Shows remaining time
- Pause on hover: Auto-dismiss timer pauses when user hovers
- Resume on mouse leave: Timer resumes when mouse leaves

### User Dismissal
- Click close button: Instant dismissal
- Swipe (mobile): Swipe right to dismiss
- Click anywhere on toast (optional): Dismiss on click

### Stacking Limit
- Maximum visible toasts: 3
- Older toasts are removed when limit exceeded
- FIFO (First In, First Out) removal

## Progress Bar (Optional)

### Visual
- Position: Bottom of toast card
- Height: 2px
- Background: Transparent
- Fill: Variant color (success green, error red, etc.)
- Animation: Width decreases from 100% to 0% over duration

## Accessibility

### Keyboard Navigation
- Toasts are not focusable by default
- If action button present, it should be focusable
- Close button is focusable
- Tab key cycles through interactive elements

### ARIA Attributes
```typescript
role="status" // For info, success
role="alert" // For error, warning (interrupts screen reader)
aria-live="polite" // For status
aria-live="assertive" // For alert
aria-atomic="true"
aria-label="Notification: {title}"
```

### Screen Reader
- Announce toast content when it appears
- Don't announce every toast (can be overwhelming)
- Provide context: "Success: Files uploaded" not just "Files uploaded"

### Focus Management
- Don't steal focus when appearing
- If action button exists, consider moving focus to it for errors
- Return focus appropriately after dismissal

### Reduced Motion
- Disable complex animations
- Simple fade in/out only
- Respect `prefers-reduced-motion`

## Usage Guidelines

### Do's
- Use for brief, actionable feedback
- Keep messages short and clear
- Use appropriate variant for context
- Limit concurrent toasts (max 3)
- Provide close button for user control
- Position consistently
- Use success for confirmations
- Use error for failures with actionable info

### Don'ts
- Don't use for critical errors (use modal instead)
- Don't use for complex information
- Don't auto-dismiss error messages too quickly
- Don't stack too many toasts (overwhelming)
- Don't use for permanent status information
- Don't rely solely on color for meaning
- Don't use for long-form content

## Component API

```typescript
interface ToastProps {
  // Content
  title?: string;
  description: string;

  // Variant
  variant?: 'success' | 'error' | 'warning' | 'info' | 'loading';

  // Behavior
  duration?: number; // milliseconds, undefined for infinite
  dismissible?: boolean; // Show close button
  pauseOnHover?: boolean; // Pause auto-dismiss on hover

  // Action
  action?: {
    label: string;
    onClick: () => void;
  };

  // Callbacks
  onDismiss?: () => void;
  onAutoClose?: () => void;

  // Styling
  className?: string;

  // ID (for programmatic control)
  id?: string;
}

interface ToastManagerProps {
  // Position
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

  // Limits
  maxToasts?: number; // Default: 3

  // Defaults
  defaultDuration?: number; // Default: 5000ms
  pauseOnHover?: boolean; // Default: true
}

// Programmatic API
interface ToastAPI {
  success: (message: string, options?: Partial<ToastProps>) => string;
  error: (message: string, options?: Partial<ToastProps>) => string;
  warning: (message: string, options?: Partial<ToastProps>) => string;
  info: (message: string, options?: Partial<ToastProps>) => string;
  loading: (message: string, options?: Partial<ToastProps>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}
```

## Examples

### Basic Success Toast
```tsx
toast.success('Images processed successfully!')
```

### Error with Action
```tsx
toast.error('Failed to upload files', {
  action: {
    label: 'Retry',
    onClick: () => retryUpload(),
  },
  duration: 7000,
})
```

### Loading Toast
```tsx
const loadingId = toast.loading('Processing images...')

// Later, update to success
toast.dismiss(loadingId)
toast.success('Processing complete!')
```

### Custom Duration
```tsx
toast.info('Resolution selection saved', {
  duration: 3000,
})
```

### Toast with Title and Description
```tsx
toast.error('Upload Failed', {
  description: 'File size exceeds 10MB limit. Please use smaller images.',
  action: {
    label: 'Learn More',
    onClick: () => showSizeHelp(),
  },
})
```

## Integration with Screenshot Converter

### Use Cases

#### File Upload Success
```tsx
toast.success(`${files.length} images uploaded successfully`)
```

#### File Upload Error
```tsx
toast.error('Invalid file type', {
  description: 'Only PNG and JPEG files are supported.',
})
```

#### Processing Progress
```tsx
// Start
const processId = toast.loading('Processing images...')

// Complete
toast.dismiss(processId)
toast.success('ZIP file ready for download!')
```

#### Download Ready
```tsx
toast.success('Download ready!', {
  action: {
    label: 'Download',
    onClick: () => downloadZip(),
  },
  duration: 10000, // Give more time to click
})
```

#### Resolution Selection
```tsx
toast.info(`${selectedCount} resolutions selected`)
```

#### Error Handling
```tsx
toast.error('Processing failed', {
  description: error.message,
  action: {
    label: 'Try Again',
    onClick: () => retryProcessing(),
  },
  duration: 10000,
})
```

## Responsive Behavior

### Mobile (< 640px)
- Position: Bottom-center
- Width: `calc(100vw - 2rem)` (full width with padding)
- Larger touch targets for close button (min 44px)
- Swipe gesture support for dismissal
- Stack limit: 2 toasts maximum

### Tablet (640px - 1024px)
- Position: Bottom-right
- Max Width: 400px
- Default stacking

### Desktop (> 1024px)
- Position: Bottom-right
- Max Width: 400px
- Show close button on hover only
- Keyboard shortcuts: Esc to dismiss topmost

## Implementation Notes

### Recommended Libraries
- **Sonner**: Lightweight, accessible toast library
- **React Hot Toast**: Popular, flexible option
- **Radix UI Toast**: Headless, fully accessible

### State Management
Store toast queue in context or global state:

```typescript
// Using Context
const [toasts, setToasts] = useState<Toast[]>([])

const addToast = (toast: Toast) => {
  setToasts((prev) => [...prev, { ...toast, id: generateId() }])
}

const removeToast = (id: string) => {
  setToasts((prev) => prev.filter((t) => t.id !== id))
}
```

### Portal Rendering
Render toasts in a portal to avoid z-index issues:

```typescript
import { createPortal } from 'react-dom'

export function ToastContainer() {
  return createPortal(
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>,
    document.body
  )
}
```
