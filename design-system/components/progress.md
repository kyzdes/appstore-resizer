# Progress Indicator Component Specification

## Overview
Progress indicators show the completion status of ongoing operations. For the Screenshot Converter, this displays image processing progress.

## Types

### Linear Progress Bar
**Use when**: Determinate progress (known duration/percentage)

### Circular Progress Spinner
**Use when**: Indeterminate progress (unknown duration)

---

## Linear Progress Bar

### Visual Specifications

#### Container (Track)
- Width: 100%
- Height: `semanticSpacing.progress.height` (8px)
- Background: `component.progress.background`
- Border Radius: `borderRadius.full` (fully rounded)
- Position: relative
- Overflow: hidden

#### Progress Fill (Bar)
- Height: 100%
- Background: `component.progress.fill`
- Border Radius: inherit
- Width: Dynamic (0-100%)
- Position: absolute
- Left: 0
- Top: 0
- Transition: `componentTransitions.progress` (width changes smoothly)

#### Label/Percentage
- Font: `typography.bodySmall` (14px)
- Color: `component.progress.text`
- Position: Above or below bar
- Gap: `semanticSpacing.progress.gap` (8px)
- Alignment: Right or Center

### States

#### Default
- As specified above

#### With Gradient (Optional Enhancement)
- Background: Linear gradient
- From: `brand.primary`
- To: `brand.primaryHover`
- Creates more dynamic, polished look

#### Animated (Indeterminate Linear)
**Use when**: Progress percentage is unknown

- Show animated shimmer/stripe
- Animation: Continuous movement from left to right
- Stripe pattern: 45° diagonal stripes
- Colors: Alternating `component.progress.fill` and lighter shade
- Animation duration: `transitionDuration.slower` (500ms)
- Animation timing: `transitionTiming.linear`
- Animation: infinite

#### Success State
- Progress fill: `semantic.success`
- Show checkmark icon at end
- Optional: Brief success animation (scale pulse)

#### Error State
- Progress fill: `semantic.error`
- Show error icon
- Label text: Error message in `semantic.error`

### Sizes

#### Small
- Height: 4px
- Label: `typography.caption` (12px)

#### Medium (Default)
- Height: 8px
- Label: `typography.bodySmall` (14px)

#### Large
- Height: 12px
- Label: `typography.bodyBase` (16px)

---

## Circular Progress Spinner

### Visual Specifications

#### Container
- Size: Variable (default 40px)
- Position: relative

#### Circle Track (Background)
- Stroke: `component.progress.background`
- Stroke width: 3px (for 40px spinner)
- Fill: none
- Stroke linecap: round

#### Circle Progress
- Stroke: `component.progress.fill`
- Stroke width: 3px (for 40px spinner)
- Fill: none
- Stroke linecap: round
- Stroke dasharray: Circumference of circle
- Stroke dashoffset: Calculated based on percentage
- Transition: `componentTransitions.progress`

### Animation (Indeterminate)

#### Spinning Animation
- Rotation: 0deg to 360deg
- Duration: `transitionDuration.slower` (500ms)
- Timing: `transitionTiming.linear`
- Iteration: infinite

#### Growing Arc (Material Design Style)
- Stroke dashoffset animates
- Creates appearance of arc growing/shrinking
- More sophisticated than simple rotation
- Duration: 1.4s
- Timing: cubic-bezier ease

### Sizes

#### Extra Small
- Size: 16px
- Stroke width: 2px

#### Small
- Size: 24px
- Stroke width: 2px

#### Medium (Default)
- Size: 40px
- Stroke width: 3px

#### Large
- Size: 64px
- Stroke width: 4px

---

## Progress with Steps

### Visual Specifications
**Use when**: Multi-step process (e.g., Upload → Process → Package → Download)

#### Container
- Display: Flex horizontal
- Gap: `spacing[2]` (8px)
- Alignment: Center

#### Step Indicator
- Size: 32px × 32px
- Border radius: `borderRadius.full`
- Background: Based on state
- Display: Flex, centered content

**States**:
- **Pending**: Background `surface.secondary`, border `border.primary`, number in `text.secondary`
- **Active**: Background `brand.primary`, number in `text.inverse`, optional pulse animation
- **Completed**: Background `semantic.success`, checkmark icon in `text.inverse`
- **Error**: Background `semantic.error`, X icon in `text.inverse`

#### Step Connector (Line)
- Width: Variable (flex grow)
- Height: 2px
- Background: `border.primary`
- Active/Completed: Background `brand.primary`

#### Step Label
- Font: `typography.labelSmall` (12px)
- Color: `text.secondary`
- Position: Below step indicator
- Gap: `spacing[2]` (8px)
- Active: Color `text.primary`, font weight medium

---

## Accessibility

### Keyboard Navigation
- Progress indicators are not interactive
- No keyboard navigation required

### ARIA Attributes
```typescript
// Linear progress
role="progressbar"
aria-valuenow={percentage}
aria-valuemin={0}
aria-valuemax={100}
aria-label="Image processing progress"
aria-busy="true"

// Indeterminate
role="progressbar"
aria-label="Processing images"
aria-busy="true"
aria-valuetext="Processing"
```

### Screen Reader
- Announce progress updates (throttled to avoid spam)
- Example: "Image processing: 45% complete"
- Announce completion: "Processing complete"
- Announce errors: "Processing failed"

### Live Regions
```typescript
aria-live="polite"
aria-atomic="true"
```

### Visual Accessibility
- Progress fill contrast: Minimum 3:1 against background
- Don't rely solely on color for state
- Use icons + text for states
- Ensure sufficient size for visibility

---

## Usage Guidelines

### Do's
- Show progress for operations longer than 1 second
- Provide percentage/status text when possible
- Update progress smoothly (not in large jumps)
- Show completion state briefly before hiding
- Use indeterminate for unknown durations
- Provide cancel/abort option for long operations

### Don'ts
- Don't show progress for instant operations
- Don't make progress jump backwards
- Don't use for decorative purposes
- Don't forget to handle errors
- Don't block the entire UI unnecessarily

---

## Component API

### Linear Progress Bar
```typescript
interface ProgressBarProps {
  // Progress value
  value?: number; // 0-100, undefined for indeterminate

  // State
  variant?: 'default' | 'gradient' | 'success' | 'error';

  // Size
  size?: 'sm' | 'md' | 'lg';

  // Label
  showLabel?: boolean;
  label?: string;
  showPercentage?: boolean;

  // Styling
  className?: string;

  // Accessibility
  'aria-label'?: string;
  'aria-labelledby'?: string;
}
```

### Circular Progress Spinner
```typescript
interface ProgressSpinnerProps {
  // Progress value
  value?: number; // 0-100, undefined for indeterminate

  // Size
  size?: 'xs' | 'sm' | 'md' | 'lg';

  // Style
  variant?: 'default' | 'success' | 'error';

  // Thickness
  strokeWidth?: number;

  // Styling
  className?: string;

  // Accessibility
  'aria-label'?: string;
}
```

### Step Progress
```typescript
interface StepProgressProps {
  // Steps
  steps: Array<{
    label: string;
    status: 'pending' | 'active' | 'completed' | 'error';
  }>;

  // Current step index
  currentStep?: number;

  // Orientation
  orientation?: 'horizontal' | 'vertical';

  // Styling
  className?: string;
}
```

---

## Examples

### Linear Progress (Determinate)
```tsx
<ProgressBar
  value={processingProgress}
  showPercentage
  label="Processing images"
  aria-label="Image processing progress"
/>
```

### Linear Progress (Indeterminate)
```tsx
<ProgressBar
  label="Preparing download..."
  aria-label="Preparing download"
/>
```

### Circular Spinner (Loading)
```tsx
<ProgressSpinner
  size="lg"
  aria-label="Loading"
/>
```

### Step Progress (Image Processing)
```tsx
<StepProgress
  steps={[
    { label: 'Upload', status: 'completed' },
    { label: 'Resize', status: 'active' },
    { label: 'Package', status: 'pending' },
    { label: 'Download', status: 'pending' },
  ]}
  currentStep={1}
/>
```

### With Message Updates
```tsx
<div className="space-y-2">
  <ProgressBar value={progress} showPercentage />
  <p className="text-sm text-secondary">
    {message || `Processing image ${currentImage} of ${totalImages}...`}
  </p>
</div>
```

---

## Integration with Screenshot Converter

### Image Processing Flow

```typescript
// Processing states
type ProcessingState = {
  total: number;
  current: number;
  percentage: number;
  message: string;
  step: 'resizing' | 'packaging' | 'complete' | 'error';
};

// Example usage
<div className="space-y-4">
  {/* Step indicator */}
  <StepProgress
    steps={[
      { label: 'Resize Images', status: getStepStatus('resizing') },
      { label: 'Create ZIP', status: getStepStatus('packaging') },
      { label: 'Download Ready', status: getStepStatus('complete') },
    ]}
  />

  {/* Progress bar */}
  <ProgressBar
    value={state.percentage}
    showPercentage
    label={state.message}
  />

  {/* Detailed info */}
  <div className="text-sm text-secondary text-center">
    Processing {state.current} of {state.total} images
  </div>
</div>
```

### States to Handle
- **Validating files**: Indeterminate spinner
- **Resizing images**: Determinate progress (0-80%)
- **Creating ZIP archive**: Determinate progress (80-95%)
- **Finalizing download**: Indeterminate or determinate (95-100%)
- **Complete**: Success state, show download button
- **Error**: Error state with retry option
