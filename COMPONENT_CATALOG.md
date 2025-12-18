# Component Catalog

A comprehensive guide to all UI components in the App Store Screenshot Converter.

## Table of Contents
- [UI Components](#ui-components)
- [Layout Components](#layout-components)
- [Screen Components](#screen-components)
- [Usage Examples](#usage-examples)

---

## UI Components

### Button

**Location:** `src/components/ui/Button.tsx`

Premium button component with multiple variants and states.

**Features:**
- Variants: primary, secondary, ghost, destructive, outline, link
- Sizes: sm, md, lg, icon
- Loading states
- Icon support (left/right)
- Active scale effect
- Full accessibility

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ariaLabel?: string;
}
```

**Example:**
```tsx
<Button variant="primary" size="lg" loading={isLoading}>
  Submit
</Button>

<Button
  variant="secondary"
  leftIcon={<Upload />}
  onClick={handleUpload}
>
  Upload Files
</Button>
```

---

### Card

**Location:** `src/components/ui/Card.tsx`

Flexible card component with multiple variants.

**Features:**
- Variants: default, elevated, interactive, glass
- Padding options: none, sm, md, lg
- Composition: Header, Title, Description, Content, Footer
- Smooth animations

**Props:**
```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'interactive' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}
```

**Example:**
```tsx
<Card variant="elevated" padding="lg">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    Main content here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### Checkbox

**Location:** `src/components/ui/Checkbox.tsx`

Custom styled checkbox with smooth animations.

**Features:**
- Custom styling
- Indeterminate state
- Label and description
- Error states
- Smooth check animation

**Props:**
```typescript
interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  error?: boolean;
  helperText?: string;
}
```

**Example:**
```tsx
<Checkbox
  checked={isChecked}
  onCheckedChange={setIsChecked}
  label="Accept terms and conditions"
  description="You must accept the terms to continue"
/>
```

---

### Select

**Location:** `src/components/ui/Select.tsx`

Advanced dropdown with search and keyboard navigation.

**Features:**
- Keyboard navigation
- Search/filter
- Custom option rendering
- Icons and descriptions
- Error states

**Props:**
```typescript
interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
}

interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}
```

**Example:**
```tsx
<Select
  label="Select Device"
  options={[
    { value: 'iphone', label: 'iPhone', icon: <Smartphone /> },
    { value: 'ipad', label: 'iPad', icon: <Tablet /> },
  ]}
  value={selectedDevice}
  onChange={setSelectedDevice}
  searchable
/>
```

---

### Modal

**Location:** `src/components/ui/Modal.tsx`

Full-featured modal dialog with animations.

**Features:**
- Backdrop blur
- Focus trap
- ESC and click outside to close
- Body scroll lock
- Size variants
- Composition: Header, Body, Footer

**Props:**
```typescript
interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  preventBackdropClose?: boolean;
  preventEscapeClose?: boolean;
}
```

**Example:**
```tsx
<Modal open={isOpen} onClose={handleClose} size="lg">
  <ModalHeader>
    <ModalTitle>Modal Title</ModalTitle>
    <ModalDescription>Modal description</ModalDescription>
  </ModalHeader>
  <ModalBody>
    Modal content
  </ModalBody>
  <ModalFooter>
    <Button onClick={handleClose}>Close</Button>
    <Button variant="primary">Confirm</Button>
  </ModalFooter>
</Modal>
```

---

### Badge

**Location:** `src/components/ui/Badge.tsx`

Small badge component for labels and counts.

**Features:**
- Variants: default, primary, success, warning, error, outline
- Sizes: sm, md, lg
- Icon support
- Dot indicator
- Removable option

**Props:**
```typescript
interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}
```

**Example:**
```tsx
<Badge variant="primary" size="lg">
  New
</Badge>

<Badge variant="success" dot>
  Active
</Badge>

<Badge removable onRemove={handleRemove}>
  Tag
</Badge>
```

---

### Progress

**Location:** `src/components/ui/Progress.tsx`

Progress indicators (linear and circular).

**Features:**
- Linear and circular variants
- Multiple color variants
- Percentage display
- Indeterminate state
- Status text
- Shimmer effect

**Props:**
```typescript
interface ProgressProps {
  value?: number;
  max?: number;
  variant?: 'default' | 'success' | 'error' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  statusText?: string;
  indeterminate?: boolean;
}
```

**Example:**
```tsx
<Progress
  value={75}
  variant="primary"
  showPercentage
  statusText="Processing..."
/>

<CircularProgress
  value={50}
  size={120}
  variant="success"
/>
```

---

### Toast

**Location:** `src/components/ui/Toast.tsx`

Toast notification system with auto-dismiss.

**Features:**
- Variants: success, error, warning, info
- Auto-dismiss
- Manual dismiss
- Progress indicator
- Stacking support
- Accessible

**Props:**
```typescript
interface ToastProps {
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
  title: string;
  description?: string;
  duration?: number;
  onDismiss?: () => void;
  showProgress?: boolean;
}
```

**Usage via Hook:**
```tsx
const { success, error, warning, info } = useToast();

success('Success!', 'Operation completed');
error('Error!', 'Something went wrong');
warning('Warning!', 'Please check this');
info('Info', 'Here is some information');
```

---

### FileUpload

**Location:** `src/components/ui/FileUpload.tsx`

Advanced file upload with drag & drop.

**Features:**
- Drag and drop
- Click to browse
- File validation
- Preview thumbnails
- Remove files
- Progress indication

**Props:**
```typescript
interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  files?: File[];
  onFilesChange?: (files: File[]) => void;
  disabled?: boolean;
  showPreviews?: boolean;
}
```

**Example:**
```tsx
<FileUpload
  accept="image/jpeg,image/png"
  maxSize={10 * 1024 * 1024}
  maxFiles={10}
  files={files}
  onFilesChange={setFiles}
  showPreviews
/>
```

---

## Layout Components

### Header

**Location:** `src/components/layout/Header.tsx`

Application header with theme toggle and language selector.

**Features:**
- Logo and branding
- Theme toggle
- Language selector
- Settings button
- Glass morphism background

**Props:**
```typescript
interface HeaderProps {
  onSettingsClick?: () => void;
}
```

---

### Footer

**Location:** `src/components/layout/Footer.tsx`

Minimal footer with copyright and links.

**Features:**
- Copyright info
- Social links
- Version badge
- Responsive

---

### Layout

**Location:** `src/components/layout/Layout.tsx`

Main application layout wrapper.

**Features:**
- Header and footer integration
- Background effects
- Responsive container
- Flexible content area

**Props:**
```typescript
interface LayoutProps {
  children: React.ReactNode;
  onSettingsClick?: () => void;
  showFooter?: boolean;
}
```

---

## Screen Components

### UploadScreen

**Location:** `src/components/screens/UploadScreen.tsx`

Initial upload screen with drag & drop.

**Features:**
- Hero section
- File upload zone
- Features showcase
- Continue button

**Props:**
```typescript
interface UploadScreenProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  onContinue: () => void;
  isValidating?: boolean;
}
```

---

### ResolutionSelector

**Location:** `src/components/screens/ResolutionSelector.tsx`

Resolution selection screen with filters.

**Features:**
- Device filter
- Orientation filter
- Visual device cards
- Select all/deselect all
- Navigation buttons

**Props:**
```typescript
interface ResolutionSelectorProps {
  resolutions: Resolution[];
  selectedResolutions: Resolution[];
  onSelectionChange: (resolutions: Resolution[]) => void;
  deviceFilter: DeviceType | 'all';
  orientationFilter: 'all' | 'portrait' | 'landscape';
  onDeviceFilterChange: (filter: DeviceType | 'all') => void;
  onOrientationFilterChange: (filter: 'all' | 'portrait' | 'landscape') => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onBack: () => void;
  onContinue: () => void;
}
```

---

### ProcessingScreen

**Location:** `src/components/screens/ProcessingScreen.tsx`

Processing screen with progress indicators.

**Features:**
- Circular progress
- Linear progress
- Stage indicators
- Current file display
- Animations

**Props:**
```typescript
interface ProcessingScreenProps {
  status: ProcessingStatus;
}
```

---

### DownloadScreen

**Location:** `src/components/screens/DownloadScreen.tsx`

Success screen with download button.

**Features:**
- Success animation
- Statistics display
- Download button
- Start over option

**Props:**
```typescript
interface DownloadScreenProps {
  result: ProcessedResult;
  onDownload: () => void;
  onStartOver: () => void;
  isDownloading?: boolean;
}
```

---

### SettingsPanel

**Location:** `src/components/screens/SettingsPanel.tsx`

Settings modal for theme and language.

**Features:**
- Theme selection
- Language selection
- Visual selection indicators
- Modal dialog

**Props:**
```typescript
interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}
```

---

## Usage Examples

### Complete Form Example

```tsx
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Select } from '@/components/ui/Select';

function MyForm() {
  const [accepted, setAccepted] = useState(false);
  const [device, setDevice] = useState('');

  return (
    <Card variant="elevated">
      <CardContent className="space-y-4">
        <Select
          label="Device"
          options={deviceOptions}
          value={device}
          onChange={setDevice}
        />

        <Checkbox
          checked={accepted}
          onCheckedChange={setAccepted}
          label="I accept the terms"
        />

        <Button
          variant="primary"
          fullWidth
          disabled={!accepted || !device}
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}
```

### Toast Notifications Example

```tsx
import { useToast } from '@/hooks/useToast';

function MyComponent() {
  const { success, error } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      success('Saved!', 'Your changes have been saved');
    } catch (err) {
      error('Error', 'Failed to save changes');
    }
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

### Modal Example

```tsx
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

function MyModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>
          <ModalTitle>Confirm Action</ModalTitle>
        </ModalHeader>
        <ModalBody>
          Are you sure you want to proceed?
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

---

## Design System

### Colors

All components use semantic color tokens:
- `primary` - Main brand color
- `secondary` - Secondary actions
- `success` - Success states
- `warning` - Warning states
- `destructive` - Destructive actions
- `muted` - Muted/disabled states
- `accent` - Accent/hover states

### Spacing

Based on 4px/8px system:
- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `6` = 24px
- `8` = 32px

### Border Radius

- Small: 4px
- Medium: 8px
- Large: 12px
- XL: 16px

### Shadows

- `sm` - Subtle shadow
- `md` - Medium shadow
- `lg` - Large shadow
- `xl` - Extra large shadow

### Animations

- Fast: 150-200ms
- Normal: 200-300ms
- Slow: 400-600ms

All animations use `ease-out` for entrances and `ease-in` for exits.

---

## Accessibility

All components are built with accessibility in mind:

- Proper ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader support
- Color contrast compliance (WCAG AA)
- Reduced motion support

---

## Best Practices

1. **Use semantic HTML** - Components render proper HTML elements
2. **Provide labels** - Always include labels for form elements
3. **Handle loading states** - Show loading indicators for async operations
4. **Validate inputs** - Use error states and helper text
5. **Consider mobile** - All components are responsive
6. **Test accessibility** - Use keyboard and screen readers
7. **Optimize performance** - Use React.memo for expensive components

---

This catalog provides a comprehensive reference for all available components. Each component is production-ready with full TypeScript support and accessibility features.
