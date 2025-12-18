/**
 * Application Entry Point
 *
 * Sets up React app with all providers and global styles
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';
import { ToastProvider } from './contexts/ToastContext';
import { ImageSettingsProvider } from './contexts/ImageSettingsContext';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system">
      <LocaleProvider defaultLocale="en">
        <ImageSettingsProvider>
          <ToastProvider maxToasts={3} defaultDuration={8000} position="top-right">
            <App />
          </ToastProvider>
        </ImageSettingsProvider>
      </LocaleProvider>
    </ThemeProvider>
  </React.StrictMode>
);
