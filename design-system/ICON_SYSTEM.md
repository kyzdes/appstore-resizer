# Icon System Specification

## Overview

The icon system provides a consistent set of icons for the App Store Screenshot Converter application. Icons are used throughout the UI to enhance visual communication and improve usability.

---

## Icon Library Selection

### Recommended: Lucide React

**Why Lucide**:
- Open source and free
- Consistent design language
- Optimized SVG icons
- Tree-shakeable (only import what you use)
- TypeScript support
- Active maintenance
- 1000+ icons

**Installation**:
```bash
npm install lucide-react
```

**Usage**:
```tsx
import { Upload, Download, Check, X } from 'lucide-react'

<Upload className="h-5 w-5" />
```

### Alternative: Heroicons

**Why Heroicons**:
- Designed by Tailwind CSS team
- Perfect integration with Tailwind
- Two styles: Outline and Solid
- Clean, professional look

**Installation**:
```bash
npm install @heroicons/react
```

---

## Icon Sizes

### Size Scale

| Size | Value | Usage |
|------|-------|-------|
| xs   | 12px  | Small badges, inline text icons |
| sm   | 16px  | Buttons (small), inline actions |
| md   | 20px  | Buttons (default), form inputs |
| lg   | 24px  | Buttons (large), section headers |
| xl   | 32px  | Feature highlights, empty states |
| 2xl  | 48px  | Hero sections, primary illustrations |

### Tailwind Classes

```tsx
// Size utilities
className="h-3 w-3"   // 12px (xs)
className="h-4 w-4"   // 16px (sm)
className="h-5 w-5"   // 20px (md)
className="h-6 w-6"   // 24px (lg)
className="h-8 w-8"   // 32px (xl)
className="h-12 w-12" // 48px (2xl)
```

### Design Token Reference

```typescript
// From spacing.ts
icon: {
  xs: '12px',
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
}
```

---

## Icon Colors

### Color Guidelines

Icons should use semantic color tokens:

```tsx
// Primary/Brand icons
className="text-primary"

// Secondary/Muted icons
className="text-muted-foreground"

// Success icons
className="text-success"

// Error icons
className="text-destructive"

// Warning icons
className="text-warning"

// Info icons
className="text-info"
```

### State Colors

```tsx
// Default state
className="text-foreground"

// Hover state
className="hover:text-primary"

// Active state
className="text-primary"

// Disabled state
className="text-muted-foreground opacity-50"
```

---

## Required Icons

### Core Application Icons

| Icon | Name | Usage | Library (Lucide) |
|------|------|-------|------------------|
| Upload | Upload Cloud | File upload zone | `UploadCloud` |
| Download | Download | Download ZIP button | `Download` |
| Image | Image | Image placeholders, gallery | `Image` |
| Check | Check | Success states, checkboxes | `Check` |
| X | X / Close | Close buttons, remove actions | `X` |
| Settings | Settings | Settings/preferences | `Settings` |
| Info | Info | Info tooltips, help text | `Info` |
| Alert Triangle | Alert | Warnings, alerts | `AlertTriangle` |
| Alert Circle | Error | Error states | `AlertCircle` |
| Check Circle | Success | Success notifications | `CheckCircle2` |
| Loader | Loading | Loading spinners | `Loader2` |
| File | File | File representations | `File` |
| Folder | Folder | Folder/archive representation | `FolderArchive` |
| Trash | Delete | Remove/delete actions | `Trash2` |
| Sun | Light Mode | Theme toggle (light) | `Sun` |
| Moon | Dark Mode | Theme toggle (dark) | `Moon` |
| Menu | Menu | Mobile navigation | `Menu` |
| Chevron Down | Dropdown | Dropdown indicators | `ChevronDown` |
| Chevron Right | Navigation | Forward navigation | `ChevronRight` |
| Chevron Left | Navigation | Back navigation | `ChevronLeft` |
| External Link | External | External links | `ExternalLink` |
| Copy | Copy | Copy to clipboard | `Copy` |
| Smartphone | iPhone | iPhone device indicator | `Smartphone` |
| Tablet | iPad | iPad device indicator | `Tablet` |
| Watch | Apple Watch | Watch device indicator | `Watch` |
| Maximize | Expand | Expand/fullscreen | `Maximize2` |
| Minimize | Collapse | Collapse/minimize | `Minimize2` |
| Grid | Grid View | Grid layout toggle | `Grid3x3` |
| List | List View | List layout toggle | `List` |
| Filter | Filter | Filter options | `Filter` |
| Search | Search | Search functionality | `Search` |
| Refresh | Refresh | Refresh/reload | `RefreshCw` |
| Help Circle | Help | Help/documentation | `HelpCircle` |
| Eye | View | View/preview | `Eye` |
| Eye Off | Hide | Hide/conceal | `EyeOff` |

---

## Icon Component Wrapper

Create a standardized icon wrapper for consistency:

```typescript
// components/ui/icon.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface IconProps {
  icon: LucideIcon
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  'aria-label'?: string
}

const sizeClasses = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  '2xl': 'h-12 w-12',
}

export function Icon({ icon: IconComponent, size = 'md', className, ...props }: IconProps) {
  return (
    <IconComponent
      className={cn(sizeClasses[size], className)}
      aria-hidden={!props['aria-label']}
      {...props}
    />
  )
}
```

**Usage**:
```tsx
import { Icon } from '@/components/ui/icon'
import { Upload } from 'lucide-react'

<Icon icon={Upload} size="lg" className="text-primary" />
```

---

## Accessibility Guidelines

### Icon-Only Buttons

Always provide accessible labels:

```tsx
// Bad
<button>
  <X className="h-4 w-4" />
</button>

// Good
<button aria-label="Close">
  <X className="h-4 w-4" aria-hidden="true" />
</button>
```

### Decorative Icons

Hide from screen readers:

```tsx
<div>
  <Check className="h-4 w-4" aria-hidden="true" />
  <span>Success</span>
</div>
```

### Meaningful Icons

Provide context:

```tsx
<Upload className="h-5 w-5" aria-label="Upload files" role="img" />
```

### Focus States

Ensure icons in interactive elements have proper focus:

```tsx
<button className="focus-visible:ring-2 focus-visible:ring-ring">
  <Settings className="h-5 w-5" />
  <span>Settings</span>
</button>
```

---

## Usage Patterns

### Icons in Buttons

```tsx
// Left icon
<Button leftIcon={<Download className="h-4 w-4" />}>
  Download ZIP
</Button>

// Right icon
<Button rightIcon={<ExternalLink className="h-4 w-4" />}>
  Open Documentation
</Button>

// Icon only
<Button variant="ghost" aria-label="Settings">
  <Settings className="h-5 w-5" />
</Button>
```

### Icons in Inputs

```tsx
<div className="relative">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <input className="pl-10" placeholder="Search..." />
</div>
```

### Icons in Alerts/Toasts

```tsx
<div className="flex items-start gap-3">
  <CheckCircle2 className="h-5 w-5 text-success" />
  <div>
    <p className="font-medium">Success!</p>
    <p className="text-sm">Images uploaded successfully.</p>
  </div>
</div>
```

### Icons in Navigation

```tsx
<nav>
  <a href="/upload" className="flex items-center gap-2">
    <Upload className="h-5 w-5" />
    <span>Upload</span>
  </a>
  <a href="/settings" className="flex items-center gap-2">
    <Settings className="h-5 w-5" />
    <span>Settings</span>
  </a>
</nav>
```

### Animated Icons (Loading)

```tsx
import { Loader2 } from 'lucide-react'

<Loader2 className="h-5 w-5 animate-spin" />
```

---

## Best Practices

### Do's
- Use consistent icon sizes within components
- Provide aria-labels for icon-only buttons
- Use semantic colors (success, error, etc.)
- Align icons vertically with text
- Use standard gap spacing (8px, 12px)
- Keep icon stroke width consistent (default: 2px)
- Use icons to enhance, not replace, text

### Don'ts
- Don't mix icon libraries (stick to one)
- Don't use different icon styles in the same context
- Don't make icons too small (minimum 16px for actions)
- Don't rely on icons alone for critical information
- Don't use decorative icons excessively
- Don't forget accessibility attributes
- Don't use complex multi-color icons

---

## Icon Sizing in Context

### Buttons

| Button Size | Icon Size | Class |
|-------------|-----------|-------|
| Small       | 16px (sm) | `h-4 w-4` |
| Medium      | 20px (md) | `h-5 w-5` |
| Large       | 24px (lg) | `h-6 w-6` |

### Form Inputs

| Input Size | Icon Size | Class |
|------------|-----------|-------|
| Small      | 16px (sm) | `h-4 w-4` |
| Medium     | 20px (md) | `h-5 w-5` |
| Large      | 20px (md) | `h-5 w-5` |

### Alerts/Toasts

| Type    | Icon Size | Class |
|---------|-----------|-------|
| Default | 20px (md) | `h-5 w-5` |
| Large   | 24px (lg) | `h-6 w-6` |

### Page Headers

| Level | Icon Size | Class |
|-------|-----------|-------|
| H1    | 32px (xl) | `h-8 w-8` |
| H2    | 24px (lg) | `h-6 w-6` |
| H3    | 20px (md) | `h-5 w-5` |

---

## Custom Icon Creation

If you need custom icons:

### Design Guidelines
- Use 24x24px artboard
- 2px stroke width
- Round line caps and joins
- Center icons within artboard
- Maintain consistent visual weight
- Export as SVG

### SVG Optimization
Use SVGO to optimize:

```bash
npm install -g svgo
svgo custom-icon.svg -o custom-icon.optimized.svg
```

### React Component

```tsx
// components/icons/custom-icon.tsx
export function CustomIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  )
}
```

---

## Integration with Screenshot Converter

### Device Indicators

```tsx
// Show device type with icon
<div className="flex items-center gap-2">
  <Smartphone className="h-4 w-4 text-muted-foreground" />
  <span>iPhone 6.5"</span>
</div>

<div className="flex items-center gap-2">
  <Tablet className="h-4 w-4 text-muted-foreground" />
  <span>iPad 12.9"</span>
</div>

<div className="flex items-center gap-2">
  <Watch className="h-4 w-4 text-muted-foreground" />
  <span>Apple Watch Series 9</span>
</div>
```

### Upload States

```tsx
// Upload zone
<UploadCloud className="h-12 w-12 text-muted-foreground" />

// Processing
<Loader2 className="h-8 w-8 animate-spin text-primary" />

// Success
<CheckCircle2 className="h-8 w-8 text-success" />

// Error
<AlertCircle className="h-8 w-8 text-destructive" />
```

### Action Buttons

```tsx
// Download ZIP
<Download className="h-5 w-5" />

// Remove image
<Trash2 className="h-4 w-4" />

// Refresh/reset
<RefreshCw className="h-4 w-4" />
```
