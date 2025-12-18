# Getting Started Guide

## Installation & Setup

### Step 1: Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

This will install:
- **react** & **react-dom** - UI framework
- **jszip** - ZIP file generation
- **lucide-react** - Icon library
- **clsx** & **tailwind-merge** - CSS utility management
- **class-variance-authority** - Component variant management
- All development dependencies (TypeScript, Vite, Tailwind CSS, etc.)

### Step 2: Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Step 3: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Step 4: Preview Production Build

```bash
npm run preview
```

Preview the production build locally before deployment.

## Project Structure

```
appstore-resizer-new/
├── src/
│   ├── components/         # All React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── layout/        # Layout components
│   │   └── screens/       # Main application screens
│   ├── contexts/          # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── data/              # Static data (resolutions)
│   ├── locales/           # Translations (en, ru)
│   ├── types/             # TypeScript type definitions
│   ├── lib/               # Library utilities
│   ├── styles/            # Global CSS
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── public/                # Static assets
├── index.html             # HTML entry point
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite config
├── tailwind.config.ts     # Tailwind CSS config
└── README.md              # Documentation
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

## Key Features Implemented

### 1. UI Components
✅ Button with variants and loading states
✅ Card with multiple styles
✅ Checkbox with custom styling
✅ Select/Dropdown with search
✅ Modal/Dialog with animations
✅ Badge with variants
✅ Progress indicators (linear & circular)
✅ Toast notifications
✅ File upload with drag & drop

### 2. Application Screens
✅ Upload Screen - Drag & drop file upload
✅ Resolution Selector - Device/resolution picker
✅ Processing Screen - Progress indicators
✅ Download Screen - Success state with download
✅ Settings Panel - Theme & language settings

### 3. Features
✅ Dark/Light theme with smooth transitions
✅ English/Russian localization
✅ Client-side image processing
✅ Batch processing support
✅ ZIP file generation
✅ Responsive design
✅ Full accessibility (WCAG AA)
✅ Smooth animations throughout

## Application Flow

1. **Upload** - User uploads screenshots (JPEG, PNG, WebP)
2. **Configure** - User selects target resolutions
3. **Process** - Images are resized to all selected resolutions
4. **Download** - User downloads ZIP file with all resized images

## Configuration

### Theme
The application supports three theme modes:
- **Light** - Light color scheme
- **Dark** - Dark color scheme
- **System** - Follows OS preference

Theme preference is saved to localStorage.

### Language
Two languages are supported:
- **English (en)** - Default
- **Russian (ru)**

Language preference is saved to localStorage.

### Supported Resolutions

#### iPhone
- 6.9" - 1320×2868 (Portrait), 2868×1320 (Landscape)
- 6.7" - 1290×2796 (Portrait), 2796×1290 (Landscape)
- 6.5" - 1242×2688 (Portrait), 2688×1242 (Landscape)
- 6.1" - 1179×2556 (Portrait), 2556×1179 (Landscape)
- 5.5" - 1242×2208 (Portrait), 2208×1242 (Landscape)

#### iPad
- 12.9" - 2048×2732 (Portrait), 2732×2048 (Landscape)
- 11" - 1668×2388 (Portrait), 2388×1668 (Landscape)
- 10.9" - 1640×2360 (Portrait), 2360×1640 (Landscape)
- 10.2" - 1620×2160 (Portrait), 2160×1620 (Landscape)

#### Apple Watch
- 46mm - 416×496
- 45mm - 396×484
- 44mm - 368×448
- 42mm - 396×484
- 41mm - 352×430
- 40mm - 324×394

## Technology Stack

- **React 18.3** - UI framework
- **TypeScript 5.6** - Type safety
- **Vite 5.4** - Build tool
- **Tailwind CSS 3.4** - Styling
- **JSZip 3.10** - ZIP generation
- **Lucide React** - Icons

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- All image processing is done client-side using Canvas API
- No server required - everything runs in the browser
- Images never leave the user's device
- Fast processing with hardware acceleration
- Optimized bundle size with code splitting

## Troubleshooting

### Issue: Port 3000 already in use
```bash
# Use a different port
npm run dev -- --port 3001
```

### Issue: Build errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors
```bash
# Run type checking
npm run type-check
```

## Development Tips

1. **Component Development**
   - All UI components are in `src/components/ui/`
   - Use existing components as templates
   - Follow the established patterns

2. **Adding Translations**
   - Edit `src/locales/en.ts` and `src/locales/ru.ts`
   - Use nested keys for organization
   - Use `{param}` syntax for dynamic values

3. **Styling**
   - Use Tailwind utility classes
   - Follow the design system in `tailwind.config.ts`
   - Use `cn()` utility for conditional classes

4. **State Management**
   - Use Context API for global state
   - Use custom hooks for complex logic
   - Keep components pure and presentational

## Next Steps

After getting the application running:

1. Test all features thoroughly
2. Customize branding (logo, colors, fonts)
3. Add additional resolutions if needed
4. Implement analytics if required
5. Deploy to hosting platform (Vercel, Netlify, etc.)

## Support

For issues or questions:
- Check the README.md for detailed documentation
- Review IMPLEMENTATION_SUMMARY.md for technical details
- Open an issue on GitHub

---

Happy coding! 🚀
