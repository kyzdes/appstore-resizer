# Design System Implementation Guide

## Overview

This guide provides step-by-step instructions for implementing the App Store Screenshot Converter design system in your Next.js/React application with Tailwind CSS and shadcn/ui.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Using Design Tokens](#using-design-tokens)
5. [Component Integration](#component-integration)
6. [Theme Switching](#theme-switching)
7. [Accessibility](#accessibility)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Dependencies

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "next": "^14.0.0",
    "tailwindcss": "^3.4.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "tailwindcss-animate": "^1.0.0",
    "@tailwindcss/forms": "^0.5.0"
  }
}
```

### Installation Commands

```bash
# Install Tailwind CSS and dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install shadcn/ui CLI
npx shadcn-ui@latest init

# Install additional dependencies
npm install clsx tailwind-merge class-variance-authority
npm install -D tailwindcss-animate @tailwindcss/forms
```

---

## Configuration

### 1. Tailwind Configuration

Replace your `tailwind.config.ts` with the provided configuration:

```typescript
// Copy the contents from design-system/tailwind.config.ts
```

**Key Features**:
- Extended color palette with CSS variables
- Custom spacing scale
- Animation keyframes
- Z-index scale
- Custom aspect ratios for Apple devices
- Responsive breakpoints

### 2. Global CSS Setup

Create or update `app/globals.css`:

```css
/* Copy the contents from design-system/globals.css */
```

**What this provides**:
- CSS custom properties for theme switching
- Light and dark theme variables
- Base styles and resets
- Component utility classes
- Accessibility utilities

### 3. Import Global Styles

In your root layout (`app/layout.tsx`):

```typescript
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### 4. TypeScript Configuration

Add the design tokens to your project:

```typescript
// Copy design-system/tokens/*.ts to src/lib/design-tokens/
```

Directory structure:
```
src/
  lib/
    design-tokens/
      colors.ts
      typography.ts
      spacing.ts
      effects.ts
      layout.ts
      index.ts
```

---

## Using Design Tokens

### Accessing Tokens in Components

#### Method 1: Import Tokens Directly (TypeScript)

```typescript
import { tokens } from '@/lib/design-tokens'

// Use in JavaScript/TypeScript
const buttonPadding = tokens.spacing.semantic.button.padding.md.x
const primaryColor = tokens.colors.light.brand.primary
```

#### Method 2: Use Tailwind Classes (Recommended)

```tsx
// Most common approach
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
  Click Me
</button>
```

#### Method 3: CSS Custom Properties

```tsx
<div style={{ backgroundColor: 'hsl(var(--primary))' }}>
  Styled with CSS variable
</div>
```

### Creating Utility Functions

Create a `cn` utility for merging classes:

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Usage:

```tsx
import { cn } from '@/lib/utils'

<button
  className={cn(
    'px-4 py-2 rounded-md',
    variant === 'primary' && 'bg-primary text-primary-foreground',
    disabled && 'opacity-50 cursor-not-allowed'
  )}
>
  Button
</button>
```

---

## Component Integration

### Setting Up shadcn/ui Components

Initialize shadcn/ui with your custom config:

```bash
# Initialize (if not done)
npx shadcn-ui@latest init

# Add components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add dialog
```

### Customizing shadcn/ui Components

After installing, customize components to match design specs:

#### Example: Button Component

```typescript
// components/ui/button.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-98',
        secondary: 'bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border-2 border-primary bg-transparent text-primary hover:bg-primary/5',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

### Creating Custom Components

#### File Upload Component

```typescript
// components/file-upload.tsx
'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Upload, X } from 'lucide-react'

interface FileUploadProps {
  accept?: string
  maxFiles?: number
  maxFileSize?: number
  onFilesChange?: (files: File[]) => void
  onError?: (error: string) => void
  className?: string
}

export function FileUpload({
  accept = 'image/png,image/jpeg',
  maxFiles = 10,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  onFilesChange,
  onError,
  className,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<File[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      handleFiles(selectedFiles)
    }
  }

  const handleFiles = (newFiles: File[]) => {
    // Validate file count
    if (files.length + newFiles.length > maxFiles) {
      onError?.(`Maximum ${maxFiles} files allowed`)
      return
    }

    // Validate file size and type
    const validFiles = newFiles.filter((file) => {
      if (file.size > maxFileSize) {
        onError?.(`File ${file.name} exceeds ${maxFileSize / 1024 / 1024}MB limit`)
        return false
      }
      return true
    })

    const updatedFiles = [...files, ...validFiles]
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Zone */}
      <div
        className={cn(
          'upload-zone',
          isDragging && 'upload-zone-active'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="h-12 w-12 text-muted-foreground" />
        <div className="text-center">
          <p className="text-lg font-medium text-foreground">
            Drop images here or click to browse
          </p>
          <p className="text-sm text-muted-foreground">
            PNG or JPEG, up to {maxFiles} images
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={handleFileInput}
        />
      </div>

      {/* File Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {files.map((file, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-md border"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => removeFile(index)}
                className="absolute right-1 top-1 rounded-full bg-background/80 p-1 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
                aria-label={`Remove ${file.name}`}
              >
                <X className="h-3 w-3" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 backdrop-blur">
                <p className="truncate text-xs text-foreground">{file.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## Theme Switching

### Dark Mode Implementation

#### 1. Install next-themes

```bash
npm install next-themes
```

#### 2. Create Theme Provider

```typescript
// components/theme-provider.tsx
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

#### 3. Wrap Application

```typescript
// app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

#### 4. Create Theme Toggle Component

```typescript
// components/theme-toggle.tsx
'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="ghost" size="sm" disabled />
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  )
}
```

---

## Accessibility

### Focus Management

All interactive components include focus indicators:

```css
/* Automatic via globals.css */
*:focus-visible {
  @apply outline-none ring-2 ring-ring ring-offset-2;
}
```

### Keyboard Navigation Checklist

- ✅ All interactive elements are focusable
- ✅ Tab order is logical
- ✅ Focus indicators are visible (3:1 contrast minimum)
- ✅ Space/Enter activate buttons
- ✅ Escape closes modals/dropdowns
- ✅ Arrow keys navigate within components

### Screen Reader Support

Use semantic HTML and ARIA attributes:

```tsx
<button
  aria-label="Upload screenshots"
  aria-describedby="upload-help-text"
  aria-busy={isUploading}
>
  Upload
</button>

<div id="upload-help-text" className="sr-only">
  Drop PNG or JPEG files, up to 10 images
</div>
```

### Color Contrast

All color combinations meet WCAG AA standards:

- Text: Minimum 4.5:1 contrast
- Large text (18pt+): Minimum 3:1 contrast
- UI elements: Minimum 3:1 contrast
- Focus indicators: Minimum 3:1 contrast

---

## Best Practices

### 1. Use Design Tokens Consistently

❌ **Don't**:
```tsx
<div style={{ color: '#3b82f6', padding: '16px' }}>
  Content
</div>
```

✅ **Do**:
```tsx
<div className="text-primary p-4">
  Content
</div>
```

### 2. Leverage Semantic Class Names

❌ **Don't**:
```tsx
<div className="bg-blue-600 text-white rounded-md">
  Button
</div>
```

✅ **Do**:
```tsx
<Button variant="primary">
  Button
</Button>
```

### 3. Component Composition

❌ **Don't**:
```tsx
<Button
  showIcon
  iconPosition="left"
  iconName="download"
  isLoading={false}
  variant="primary"
>
  Download
</Button>
```

✅ **Do**:
```tsx
<Button variant="primary" leftIcon={<Download />} loading={isLoading}>
  Download
</Button>
```

### 4. Responsive Design

Use mobile-first approach:

```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
  {/* Content */}
</div>
```

### 5. Accessibility First

Always include:
- Semantic HTML
- ARIA labels for icon-only buttons
- Focus management
- Keyboard navigation
- Screen reader text

---

## Troubleshooting

### Issue: Tailwind classes not applying

**Solution**: Ensure your `content` paths in `tailwind.config.ts` are correct:

```typescript
content: [
  './src/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
]
```

### Issue: Theme not switching

**Solution**: Verify:
1. `suppressHydrationWarning` is on `<html>` tag
2. `ThemeProvider` has `attribute="class"`
3. CSS variables are defined for both light and dark themes

### Issue: Colors look different than expected

**Solution**: Check that you're using HSL color format in CSS variables:

```css
--primary: 217 91% 60%; /* Correct: HSL without hsl() */
--primary: hsl(217, 91%, 60%); /* Wrong: Don't include hsl() */
```

### Issue: Focus rings not showing

**Solution**: Ensure `tailwindcss-animate` is installed and imported in config:

```typescript
plugins: [
  require('tailwindcss-animate'),
]
```

---

## Next Steps

1. **Install dependencies** and configure Tailwind
2. **Copy design tokens** to your project
3. **Install shadcn/ui components** you need
4. **Implement theme switching** for dark mode support
5. **Build custom components** following the specifications
6. **Test accessibility** with keyboard navigation and screen readers
7. **Review responsive behavior** across all breakpoints

For component-specific implementation details, refer to the component specification files in `design-system/components/`.
