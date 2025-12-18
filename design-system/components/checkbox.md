# Checkbox Component Specification

## Overview
Checkboxes allow users to select multiple options from a list. In the Screenshot Converter app, they're used for selecting multiple device resolutions.

## Visual Specifications

### Default (Unchecked) State
- Size: `semanticSpacing.checkbox.size` (20px × 20px)
- Background: `component.checkbox.background`
- Border: 2px solid `component.checkbox.border`
- Border Radius: `semanticBorderRadius.checkbox` (2px)
- Cursor: pointer

### Hover State (Unchecked)
- Border: 2px solid `component.checkbox.borderHover`
- Background: `surface.secondary`
- Transition: `transitions.colors`

### Checked State
- Background: `component.checkbox.backgroundChecked`
- Border: 2px solid `component.checkbox.borderChecked`
- Checkmark:
  - Color: `component.checkbox.checkmark`
  - Size: 12px
  - Stroke width: 2px
  - Icon: SVG checkmark (✓)

### Hover State (Checked)
- Background: Slightly lighter shade of checked background
- Filter: `brightness(1.1)`

### Indeterminate State
**Use when**: Parent checkbox representing partially selected children

- Background: `component.checkbox.backgroundChecked`
- Border: 2px solid `component.checkbox.borderChecked`
- Icon: Minus/dash (−) instead of checkmark
- Icon color: `component.checkbox.checkmark`

### Focus State
- Outline: `shadows.focus.default`
- Outline offset: 2px
- Keep on top of checked background

### Disabled State (Unchecked)
- Background: `surface.tertiary`
- Border: 2px solid `border.primary`
- Opacity: `semanticOpacity.disabled`
- Cursor: not-allowed

### Disabled State (Checked)
- Background: `component.checkbox.backgroundChecked`
- Border: 2px solid `component.checkbox.borderChecked`
- Opacity: `semanticOpacity.disabled`
- Cursor: not-allowed
- Checkmark: Visible but dimmed

### Error State
- Border: 2px solid `border.error`
- Background: `semantic.errorSubtle`

## Label Specifications

### Label Layout
- Position: Right of checkbox
- Gap: `semanticSpacing.checkbox.gap` (8px)
- Alignment: Center (vertically aligned with checkbox)
- Cursor: pointer (clickable)

### Label Typography
- Font: `typography.bodyBase` (16px, normal weight)
- Color: `text.primary`
- Line Height: `lineHeights.normal`

### Label Hover
- Color: `text.primary` (no change, but cursor indicates clickable)

### Label Disabled
- Color: `text.disabled`
- Cursor: not-allowed

### Description Text (Optional)
**Use when**: Additional context is needed

- Font: `typography.bodySmall` (14px)
- Color: `text.secondary`
- Margin Top: `spacing[1]` (4px)
- Display: Block (below label)

## Checkbox Group

### Layout
- Display: Flex column
- Gap: `semanticSpacing.form.fieldGap` (16px)

### Group Label
- Font: `typography.label` (14px, medium weight)
- Color: `text.primary`
- Margin Bottom: `spacing[3]` (12px)
- Optional: Required indicator (*)

### Error Message (Group Level)
- Font: `typography.bodySmall`
- Color: `semantic.error`
- Margin Top: `spacing[2]` (8px)
- Icon: Error icon (16px) before text

## Interactions

### Click/Tap
- Toggle checked state
- Trigger `onChange` callback
- Provide haptic feedback (on mobile)

### Keyboard
- **Tab**: Focus next/previous checkbox
- **Space**: Toggle checked state
- **Enter**: Toggle checked state (optional, Space is standard)

### Touch Target
- Minimum size: 44px × 44px (includes padding around checkbox)
- Expand clickable area with padding: `spacing[2]` (8px) on all sides

## Transitions
- State changes: `transitionDuration.fast` (150ms)
- Properties: background-color, border-color
- Timing: `transitionTiming.out`

## Accessibility

### Keyboard Navigation
- Must be focusable with Tab key
- Must be toggleable with Space key
- Focus indicator must be clearly visible

### ARIA Attributes
```typescript
role="checkbox"
aria-checked={checked ? 'true' : indeterminate ? 'mixed' : 'false'}
aria-disabled={disabled ? 'true' : undefined}
aria-invalid={error ? 'true' : undefined}
aria-describedby={description ? descriptionId : undefined}
aria-labelledby={label ? labelId : undefined}
```

### Screen Reader
- Announce state changes: "Checked" / "Unchecked" / "Mixed"
- Read label text
- Read description if present
- Announce errors clearly

### Color Contrast
- Unchecked border: Minimum 3:1 against background
- Checkmark: Minimum 4.5:1 against checked background
- Label text: Minimum 4.5:1 against background
- Focus indicator: Minimum 3:1 against background

## Usage Guidelines

### Do's
- Use for multiple selections
- Group related checkboxes together
- Provide clear, concise labels
- Use indeterminate state for parent checkboxes
- Keep labels short (1-3 words when possible)
- Make the entire label clickable

### Don'ts
- Don't use for mutually exclusive options (use radio buttons)
- Don't use for single yes/no questions (use toggle switch)
- Don't nest checkboxes more than 2 levels deep
- Don't use for actions (use buttons instead)
- Don't rely on color alone to convey state

## Component API

```typescript
interface CheckboxProps {
  // State
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;

  // Validation
  required?: boolean;
  error?: boolean;
  errorMessage?: string;

  // Content
  label?: string;
  description?: string;

  // Event handlers
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  // Form integration
  name?: string;
  value?: string;
  id?: string;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-labelledby'?: string;

  // Styling
  className?: string;
}

interface CheckboxGroupProps {
  // Content
  label?: string;
  description?: string;
  children: React.ReactNode;

  // Validation
  required?: boolean;
  error?: boolean;
  errorMessage?: string;

  // Layout
  orientation?: 'vertical' | 'horizontal';

  // Styling
  className?: string;
}
```

## Examples

### Basic Checkbox
```tsx
<Checkbox
  label="iPhone 6.5\""
  checked={selectedResolutions.includes('iphone-6.5')}
  onChange={(checked) => handleResolutionToggle('iphone-6.5', checked)}
/>
```

### Checkbox with Description
```tsx
<Checkbox
  label="iPhone 6.5\" (1242×2688)"
  description="For iPhone 14 Pro Max, 13 Pro Max, 12 Pro Max"
  checked={isSelected}
  onChange={handleChange}
/>
```

### Checkbox Group (Resolution Selection)
```tsx
<CheckboxGroup
  label="Select iPhone Resolutions"
  description="Choose the screen sizes you want to generate"
  error={selectedCount === 0}
  errorMessage="Please select at least one resolution"
>
  <Checkbox
    label="6.9\" (1260×2736)"
    value="iphone-6.9"
    checked={selections['iphone-6.9']}
    onChange={(checked) => handleToggle('iphone-6.9', checked)}
  />
  <Checkbox
    label="6.5\" (1242×2688)"
    value="iphone-6.5"
    checked={selections['iphone-6.5']}
    onChange={(checked) => handleToggle('iphone-6.5', checked)}
  />
  {/* More checkboxes... */}
</CheckboxGroup>
```

### Indeterminate Checkbox (Select All)
```tsx
<Checkbox
  label="Select All iPhone Resolutions"
  checked={allSelected}
  indeterminate={someSelected && !allSelected}
  onChange={(checked) => {
    if (checked) {
      selectAllResolutions();
    } else {
      deselectAllResolutions();
    }
  }}
/>
```

## Responsive Behavior

### Mobile (< 640px)
- Touch target: Ensure 44px minimum
- Label font size: Consider slightly larger for readability
- Spacing: Increase gap between checkboxes to 20px

### Tablet/Desktop
- Default sizing
- Consider multi-column layout for large groups

## Integration with Screenshot Converter

### Device/Resolution Selection
Use checkbox groups organized by device type:

```tsx
<div className="space-y-8">
  {/* iPhone Resolutions */}
  <CheckboxGroup label="iPhone">
    {/* Checkboxes for each iPhone size */}
  </CheckboxGroup>

  {/* iPad Resolutions */}
  <CheckboxGroup label="iPad">
    {/* Checkboxes for each iPad size */}
  </CheckboxGroup>

  {/* Apple Watch Resolutions */}
  <CheckboxGroup label="Apple Watch">
    {/* Checkboxes for each Watch size */}
  </CheckboxGroup>
</div>
```

### Features
- "Select All" checkbox for each device category
- Show count of selected resolutions
- Display total number of images that will be generated
- Persist selections (localStorage)
- Quick actions: "Select all portrait", "Select all landscape"
