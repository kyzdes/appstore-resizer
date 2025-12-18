# File Upload Component Specification

## Overview
The file upload component allows users to drag and drop files or click to browse. It's a critical component for the Screenshot Converter app, handling image uploads with visual feedback.

## Visual Specifications

### Default State
- Background: `component.uploadZone.background`
- Border: 2px dashed `component.uploadZone.borderDashed`
- Border Radius: `semanticBorderRadius.uploadZone` (12px)
- Padding: `semanticSpacing.uploadZone.padding` (32px)
- Min Height: 200px
- Display: Flex, centered content
- Cursor: pointer

**Content Layout**:
- Icon (Upload/Cloud icon)
  - Size: `semanticSpacing.icon.2xl` (48px)
  - Color: `component.uploadZone.icon`
- Primary Text
  - Font: `typography.bodyLarge`
  - Color: `component.uploadZone.text`
  - Content: "Drop images here or click to browse"
- Secondary Text
  - Font: `typography.bodySmall`
  - Color: `text.secondary`
  - Content: "PNG or JPEG, up to 10 images"
- Gap: `semanticSpacing.uploadZone.gap` (16px) between elements

### Hover State
- Background: `component.uploadZone.backgroundHover`
- Border: 2px dashed `component.uploadZone.borderHover`
- Transition: `componentTransitions.uploadZone`

### Active/Drag Over State
- Background: `component.uploadZone.backgroundActive`
- Border: 2px solid `component.uploadZone.border` (solid, not dashed)
- Scale: `scale(1.02)`
- Shadow: `shadows.md`

**Visual Feedback**:
- Show "Drop files here" message
- Animate border (subtle pulse)

### Disabled State
- Background: `background.tertiary`
- Border: 2px dashed `border.primary`
- Opacity: `semanticOpacity.disabled`
- Cursor: not-allowed

**Content**:
- Icon and text colors: `text.disabled`
- Message: "Upload disabled"

### Error State
- Border: 2px dashed `border.error`
- Background: `semantic.errorSubtle`

**Error Message**:
- Font: `typography.bodySmall`
- Color: `semantic.error`
- Icon: Error/Alert icon
- Examples:
  - "File type not supported. Please use PNG or JPEG."
  - "Maximum 10 files allowed."
  - "File size exceeds limit."

### Success State (Files Added)
- Border: 2px solid `border.success`
- Background: `semantic.successSubtle`

**Content**:
- Show success icon (checkmark)
- Show number of files added
- Font: `typography.bodyBase`
- Color: `semantic.success`

## File Preview Area

Once files are uploaded, show preview thumbnails:

### Thumbnail Grid
- Layout: Grid
- Columns: `appLayouts.imagePreviewGrid`
  - Mobile: 2 columns
  - Tablet: 3 columns
  - Desktop: 4-5 columns
- Gap: `spacing[2]` (8px)
- Margin Top: `spacing[4]` (16px)

### Individual Thumbnail
- Aspect Ratio: `aspectRatio.square` (1:1)
- Border Radius: `borderRadius.md` (6px)
- Border: 1px solid `border.primary`
- Background: `surface.secondary`
- Position: relative (for remove button overlay)

**Image**:
- Object-fit: cover
- Width: 100%
- Height: 100%
- Border Radius: inherit

**Remove Button**:
- Position: absolute, top-right
- Offset: 4px from edges
- Size: 24px × 24px
- Background: `background.overlay` with backdrop blur
- Border Radius: `borderRadius.full`
- Icon: X or Trash (12px)
- Icon Color: `text.inverse`
- Opacity: 0 (hidden)

**Thumbnail Hover**:
- Border: 1px solid `border.secondary`
- Remove button opacity: 1 (visible)
- Transition: `transitions.interactive`

**File Name Overlay**:
- Position: absolute, bottom
- Background: `background.overlay` with backdrop blur
- Padding: `spacing[2]` (8px)
- Font: `typography.filename`
- Color: `text.inverse`
- Truncate: Yes (ellipsis)
- Max Width: 100%

## Drag and Drop Interaction

### Drag Over Document
- Show visual indicator that app accepts drops
- Highlight drop zone
- Prevent default browser behavior

### Drag Leave
- Remove highlight
- Return to default state

### Drop
- Validate files
- Show loading state while processing
- Display success or error feedback
- Update file list

## File Validation

### Accepted File Types
- PNG (.png)
- JPEG (.jpg, .jpeg)

### File Size Limits
- Maximum single file size: 10MB
- Maximum total upload: 50MB

### File Count Limits
- Minimum: 1 file
- Maximum: 10 files

### Validation Messages
```typescript
const validationMessages = {
  invalidType: 'Only PNG and JPEG files are supported.',
  tooLarge: 'File size exceeds 10MB limit.',
  tooMany: 'Maximum 10 files allowed. Please remove some files.',
  tooFew: 'Please upload at least one image.',
  totalSizeTooLarge: 'Total file size exceeds 50MB limit.',
};
```

## Loading State

### While Processing
- Show progress indicator
- Disable further uploads
- Display processing message

**Visual**:
- Overlay: `background.overlay`
- Spinner: Centered, `semanticSpacing.icon.xl` (32px)
- Message: "Processing images..." below spinner
- Font: `typography.bodyBase`
- Color: `text.secondary`

## Accessibility

### Keyboard Navigation
- Component is focusable (Tab key)
- Activatable with Enter or Space key
- Opens native file picker
- Focus indicator: `shadows.focus.default`

### ARIA Attributes
```typescript
aria-label="Upload images"
aria-describedby="upload-instructions"
role="button"
tabIndex={0}
```

### Screen Reader Announcements
- Announce when files are added: "3 images added"
- Announce errors: "Error: File type not supported"
- Announce when processing: "Processing images"
- Provide clear instructions

### Visual Accessibility
- Color contrast: All text meets WCAG AA (4.5:1)
- Don't rely on color alone for state indication
- Use icons + text for feedback
- Ensure focus indicators are clearly visible

## Usage Guidelines

### Do's
- Clearly indicate accepted file types
- Show file previews after upload
- Provide clear error messages
- Allow easy removal of uploaded files
- Show file names and sizes
- Indicate maximum file/size limits upfront

### Don'ts
- Don't silently fail validation
- Don't block the UI during upload
- Don't allow duplicate files
- Don't lose uploaded files on errors
- Don't make error messages technical/cryptic

## Component API

```typescript
interface FileUploadProps {
  // Accepted file types
  accept?: string; // Default: 'image/png,image/jpeg'

  // File limits
  maxFiles?: number; // Default: 10
  maxFileSize?: number; // Default: 10 * 1024 * 1024 (10MB)
  maxTotalSize?: number; // Default: 50 * 1024 * 1024 (50MB)

  // State
  disabled?: boolean;
  loading?: boolean;

  // Files
  files?: File[];
  onFilesChange?: (files: File[]) => void;

  // Validation
  onError?: (error: string) => void;

  // Drag and drop
  onDrop?: (files: File[]) => void;
  onDragOver?: (event: React.DragEvent) => void;
  onDragLeave?: (event: React.DragEvent) => void;

  // Customization
  multiple?: boolean; // Default: true
  showPreviews?: boolean; // Default: true
  className?: string;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
}
```

## Implementation Example

```typescript
<FileUpload
  accept="image/png,image/jpeg"
  maxFiles={10}
  maxFileSize={10 * 1024 * 1024}
  files={uploadedFiles}
  onFilesChange={setUploadedFiles}
  onError={(error) => {
    showToast({
      variant: 'error',
      message: error,
    });
  }}
  aria-label="Upload screenshots"
  aria-describedby="upload-help-text"
/>
```

## Responsive Behavior

### Mobile (< 640px)
- Padding: `spacing[6]` (24px)
- Icon size: `semanticSpacing.icon.xl` (32px)
- Thumbnail grid: 2 columns
- Font sizes: Scale down by 1 step

### Tablet (640px - 1024px)
- Default sizing
- Thumbnail grid: 3 columns

### Desktop (> 1024px)
- Default sizing
- Thumbnail grid: 4-5 columns
- Show file names on hover without overlay

## Integration with Screenshot Converter

### Specific Requirements
- Must handle multiple image uploads
- Show clear file size/count limits
- Integrate with image processing pipeline
- Maintain uploaded files through resolution selection
- Allow removal of individual files
- Show file dimensions after upload (optional enhancement)

### User Flow
1. User drops/selects images
2. Validate file types and sizes
3. Show previews with file names
4. Allow removal of unwanted files
5. Enable "Process Images" button when files are valid
6. Maintain file state through processing
