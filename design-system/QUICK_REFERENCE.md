# Design System Quick Reference Card

One-page reference for the most commonly used design tokens and patterns.

---

## Color Tokens

### Light Theme
```css
--background: 0 0% 100%           /* White */
--foreground: 222 47% 11%          /* Gray 900 */
--primary: 217 91% 60%             /* Blue 600 */
--success: 142 71% 45%             /* Green 600 */
--destructive: 0 72% 51%           /* Red 600 */
--warning: 25 95% 53%              /* Orange 500 */
--muted: 220 14% 96%               /* Gray 100 */
--border: 214 32% 91%              /* Gray 200 */
```

### Dark Theme
```css
--background: 222 84% 5%           /* Gray 950 */
--foreground: 220 9% 98%           /* Gray 50 */
--primary: 217 91% 60%             /* Blue 600 (same) */
--success: 142 71% 45%             /* Green 500 */
--destructive: 0 72% 51%           /* Red 500 */
--warning: 25 95% 53%              /* Orange 500 */
--muted: 217 33% 17%               /* Gray 800 */
--border: 215 28% 17%              /* Gray 700 */
```

### Usage
```tsx
className="bg-primary text-primary-foreground"
className="bg-destructive text-destructive-foreground"
className="text-muted-foreground"
className="border-border"
```

---

## Spacing Scale

```
spacing[0]  = 0px
spacing[1]  = 4px
spacing[2]  = 8px
spacing[3]  = 12px
spacing[4]  = 16px
spacing[5]  = 20px
spacing[6]  = 24px
spacing[8]  = 32px
spacing[10] = 40px
spacing[12] = 48px
spacing[16] = 64px
spacing[20] = 80px
spacing[24] = 96px
```

### Common Patterns
```tsx
className="p-4"        // Padding: 16px all sides
className="px-6 py-3"  // Padding: 24px horizontal, 12px vertical
className="mt-8"       // Margin top: 32px
className="space-y-4"  // Gap between children: 16px
className="gap-2"      // Grid/flex gap: 8px
```

---

## Typography

### Font Sizes
```
text-xs   = 12px
text-sm   = 14px
text-base = 16px
text-lg   = 18px
text-xl   = 20px
text-2xl  = 24px
text-3xl  = 30px
text-4xl  = 36px
```

### Font Weights
```
font-normal   = 400
font-medium   = 500
font-semibold = 600
font-bold     = 700
```

### Common Combinations
```tsx
className="text-3xl font-bold"              // Page heading
className="text-xl font-semibold"           // Section heading
className="text-base"                       // Body text
className="text-sm text-muted-foreground"   // Secondary text
className="text-xs font-medium uppercase"   // Label
className="font-mono text-sm"               // Code/technical
```

---

## Breakpoints

```
sm:  640px   (phone landscape, small tablet)
md:  768px   (tablet)
lg:  1024px  (laptop)
xl:  1280px  (desktop)
2xl: 1536px  (large desktop)
```

### Responsive Patterns
```tsx
// Mobile-first (stack on mobile, grid on larger)
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

// Hide on mobile, show on desktop
className="hidden lg:block"

// Different padding at breakpoints
className="px-4 md:px-8 lg:px-16"

// Responsive text size
className="text-2xl md:text-3xl lg:text-4xl"
```

---

## Effects

### Shadows
```tsx
className="shadow-sm"   // Subtle
className="shadow"      // Default
className="shadow-md"   // Medium (hovering cards)
className="shadow-lg"   // Large (dropdowns)
className="shadow-xl"   // Extra large (modals)
```

### Border Radius
```tsx
className="rounded-sm"   // 2px
className="rounded"      // 4px (default)
className="rounded-md"   // 6px
className="rounded-lg"   // 8px
className="rounded-xl"   // 12px
className="rounded-full" // Fully rounded
```

### Transitions
```tsx
className="transition-all duration-200"
className="transition-colors duration-150"
className="hover:scale-105 transition-transform"
```

---

## Layout Patterns

### Centered Container
```tsx
<div className="container mx-auto px-4 max-w-screen-lg">
  {/* Content */}
</div>
```

### Flex Layouts
```tsx
// Horizontal center
<div className="flex items-center justify-center">

// Space between
<div className="flex items-center justify-between">

// Vertical stack
<div className="flex flex-col gap-4">

// Horizontal inline
<div className="flex items-center gap-2">
```

### Grid Layouts
```tsx
// Responsive card grid
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

// Two columns
<div className="grid md:grid-cols-2 gap-6">

// Sidebar layout
<div className="grid lg:grid-cols-[250px_1fr] gap-8">
```

---

## Component Patterns

### Button
```tsx
// Primary action
<Button variant="primary" size="md">
  Process Images
</Button>

// With icon
<Button leftIcon={<Download />} variant="primary">
  Download ZIP
</Button>

// Loading state
<Button loading={isProcessing}>
  {isProcessing ? 'Processing...' : 'Process Images'}
</Button>
```

### Card
```tsx
<div className="rounded-lg border bg-card p-6 shadow-sm">
  <h3 className="text-lg font-semibold">Card Title</h3>
  <p className="text-sm text-muted-foreground">Card content</p>
</div>
```

### Upload Zone
```tsx
<div className="upload-zone">
  <UploadCloud className="h-12 w-12 text-muted-foreground" />
  <div className="text-center">
    <p className="text-lg font-medium">Drop images here</p>
    <p className="text-sm text-muted-foreground">or click to browse</p>
  </div>
</div>
```

### Progress Bar
```tsx
<div className="w-full bg-muted rounded-full h-2">
  <div
    className="bg-primary h-2 rounded-full transition-all"
    style={{ width: `${percentage}%` }}
  />
</div>
```

### Loading Spinner
```tsx
<Loader2 className="h-8 w-8 animate-spin text-primary" />
```

---

## Icon Sizes

```tsx
className="h-3 w-3"   // 12px (xs)
className="h-4 w-4"   // 16px (sm)
className="h-5 w-5"   // 20px (md) - DEFAULT
className="h-6 w-6"   // 24px (lg)
className="h-8 w-8"   // 32px (xl)
className="h-12 w-12" // 48px (2xl)
```

### Icon with Text
```tsx
<div className="flex items-center gap-2">
  <Upload className="h-5 w-5" />
  <span>Upload Files</span>
</div>
```

---

## State Utilities

### Hover
```tsx
className="hover:bg-accent"
className="hover:text-primary"
className="hover:shadow-md"
className="hover:scale-105"
```

### Focus
```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

// Shorthand (if using globals.css utilities)
className="focus-ring"
```

### Active/Pressed
```tsx
className="active:scale-95"
className="active:bg-primary/90"
```

### Disabled
```tsx
className="disabled:opacity-50 disabled:cursor-not-allowed"
```

---

## Accessibility Quick Checks

### Buttons
```tsx
// Icon-only buttons need labels
<button aria-label="Remove image">
  <X className="h-4 w-4" />
</button>

// Loading state
<button aria-busy={isLoading}>
  {isLoading ? 'Processing...' : 'Process'}
</button>
```

### Form Fields
```tsx
<label htmlFor="email" className="text-sm font-medium">
  Email
</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-describedby="email-error"
/>
<p id="email-error" className="text-sm text-destructive">
  Please enter a valid email
</p>
```

### Live Regions
```tsx
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

---

## Utility Classes (Custom)

From `globals.css`:

```tsx
// Upload zone
className="upload-zone"
className="upload-zone-active"

// Cards
className="card-elevated"
className="card-interactive"

// Focus ring
className="focus-ring"

// Scrollbar
className="scrollbar-thin"

// Text utilities
className="text-balance"
className="line-clamp-2"

// Backdrop blur (glassmorphism)
className="backdrop-blur-glass"
```

---

## Theme Switching

```tsx
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

---

## Common Imports

```tsx
// Components
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'

// Icons
import {
  Upload, Download, Check, X, Loader2,
  AlertCircle, CheckCircle2, Info,
  Sun, Moon, Settings
} from 'lucide-react'

// Utilities
import { cn } from '@/lib/utils'

// Theme
import { useTheme } from 'next-themes'

// Design tokens
import { tokens } from '@/lib/design-tokens'
```

---

## cn() Utility

```tsx
import { cn } from '@/lib/utils'

// Conditional classes
<div className={cn(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class'
)}>

// Merge with overrides
<Button className={cn('default-styles', customClassName)} />
```

---

## File Size Reference

```tsx
// Human readable file sizes
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
```

---

## Z-Index Reference

```
base          = 0
sticky        = 100
fixed         = 500
dropdown      = 1000
modal-backdrop = 1400
modal         = 1500
popover       = 1600
toast         = 2000
```

---

## Performance Tips

```tsx
// Lazy load images
<img loading="lazy" src={url} alt="..." />

// Optimize next/image
import Image from 'next/image'
<Image src={url} alt="..." width={400} height={300} />

// Code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'))

// Memoization
const memoizedValue = useMemo(() => expensiveCalculation(), [deps])
```

---

Print this page for quick reference while building!
