# App Store Screenshot Converter

A premium, client-side screenshot resizing tool for Apple App Store submissions. Resize your screenshots to all required resolutions for iPhone, iPad, and Apple Watch with a beautiful, modern UI.

![App Store Resizer](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/react-18.3-61dafb.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.6-3178c6.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Features

- **All Apple Resolutions** - iPhone, iPad, and Apple Watch
- **Fast Processing** - Client-side image processing using Canvas API
- **Private & Secure** - All processing happens locally in your browser
- **Beautiful UI** - Premium design with smooth animations
- **Dark Mode** - Automatic theme switching
- **Bilingual** - English and Russian support
- **Drag & Drop** - Easy file upload interface
- **Batch Processing** - Process multiple images at once
- **ZIP Export** - Download all resized images in one archive

## Technology Stack

### Core
- **React 18.3** - UI framework
- **TypeScript 5.6** - Type safety
- **Vite 5.4** - Build tool and dev server

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **CSS Custom Properties** - Dynamic theming
- **Class Variance Authority** - Component variants

### Image Processing
- **Canvas API** - High-quality image resizing
- **JSZip** - ZIP file generation
- **Client-side Processing** - No server required

### UI Components
- **Lucide React** - Premium icon set
- **Custom Components** - Hand-crafted UI elements
- **Smooth Animations** - Professional micro-interactions

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Checkbox.tsx
│   │   ├── FileUpload.tsx
│   │   ├── Modal.tsx
│   │   ├── Progress.tsx
│   │   ├── Select.tsx
│   │   ├── Toast.tsx
│   │   └── Badge.tsx
│   ├── layout/          # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   └── screens/         # Main application screens
│       ├── UploadScreen.tsx
│       ├── ResolutionSelector.tsx
│       ├── ProcessingScreen.tsx
│       ├── DownloadScreen.tsx
│       └── SettingsPanel.tsx
├── contexts/            # React contexts
│   ├── ThemeContext.tsx
│   ├── LocaleContext.tsx
│   └── ToastContext.tsx
├── hooks/               # Custom React hooks
│   ├── useTheme.tsx
│   ├── useLocale.tsx
│   ├── useToast.tsx
│   ├── useUpload.tsx
│   ├── useResolutions.tsx
│   └── useImageProcessor.tsx
├── utils/               # Utility functions
│   ├── imageProcessor.ts
│   ├── zipGenerator.ts
│   ├── validators.ts
│   └── formatters.ts
├── data/                # Static data
│   └── resolutions.ts
├── locales/             # Translations
│   ├── en.ts
│   └── ru.ts
├── types/               # TypeScript types
│   └── index.ts
├── lib/                 # Library utilities
│   └── cn.ts
├── styles/              # Global styles
│   └── globals.css
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd appstore-resizer-new
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Usage

1. **Upload Screenshots** - Drag and drop or click to upload your screenshots (JPEG, PNG, WebP)
2. **Select Resolutions** - Choose target device resolutions from iPhone, iPad, and Apple Watch
3. **Process Images** - Wait while images are resized to all selected resolutions
4. **Download ZIP** - Download a ZIP file containing all resized images

## Supported Resolutions

### iPhone
- 6.9" Display (iPhone 16 Pro Max, 15 Pro Max)
- 6.7" Display (iPhone 14 Pro Max, 13 Pro Max)
- 6.5" Display (iPhone 11 Pro Max, Xs Max)
- 6.1" Display (iPhone 16 Pro, 15 Pro, 14 Pro)
- 5.5" Display (iPhone 8 Plus, 7 Plus)

### iPad
- 12.9" Display (iPad Pro)
- 11" Display (iPad Pro, iPad Air)
- 10.9" Display (iPad Air)
- 10.2" Display (iPad)

### Apple Watch
- 46mm (Series 10)
- 45mm (Series 9/8/7)
- 44mm (Series 6/SE)
- 42mm (Series 10)
- 41mm (Series 9/8/7)
- 40mm (Series 6/SE)

## Design System

The application follows a premium design philosophy inspired by modern SaaS applications:

### Design Principles
- **Clarity over cleverness** - Immediately understandable interfaces
- **Consistency breeds trust** - Cohesive design system throughout
- **Motion with purpose** - Animations guide attention and provide feedback
- **Progressive enhancement** - Solid fundamentals with sophisticated touches
- **Performance matters** - Fast, responsive, 60fps animations
- **Accessibility first** - WCAG AA compliant, keyboard navigation, screen reader support

### Color System
- Uses HSL color space for easy theming
- Semantic color tokens (primary, success, warning, destructive)
- Automatic dark mode support
- Proper contrast ratios for accessibility

### Typography
- System font stack for optimal performance
- Consistent sizing scale (12px - 48px)
- Proper line heights and letter spacing
- Responsive font sizes

### Spacing
- 4px/8px base unit system
- Consistent padding and margins
- Generous whitespace

### Animations
- 150-300ms for micro-interactions
- 400-600ms for page transitions
- Ease-out for entrances, ease-in for exits
- Respects prefers-reduced-motion

## Performance Optimizations

- **Code Splitting** - Separate chunks for vendor and utilities
- **Lazy Loading** - Images and heavy components loaded on demand
- **Canvas API** - Hardware-accelerated image processing
- **Memory Management** - Proper cleanup of object URLs and resources
- **Optimized Animations** - CSS transforms and opacity only
- **Tree Shaking** - Unused code eliminated in production

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- WCAG AA compliant
- Keyboard navigation throughout
- Screen reader support with proper ARIA labels
- Focus indicators on all interactive elements
- Proper color contrast ratios
- Reduced motion support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Design inspiration from Linear, Vercel, and Raycast
- Icons by Lucide
- Built with React and TypeScript
- Styled with Tailwind CSS

## Support

For issues or questions, please open an issue on GitHub.

---

Made with ❤️ using React and TypeScript
