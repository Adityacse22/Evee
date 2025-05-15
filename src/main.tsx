
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set dark theme as default by adding the class to the HTML element
document.documentElement.classList.add('dark');

// Add viewport meta tag to ensure proper mobile rendering
const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
document.getElementsByTagName('head')[0].appendChild(meta);

// Add theme color meta for browser UI color on mobile
const themeColorMeta = document.createElement('meta');
themeColorMeta.name = 'theme-color';
themeColorMeta.content = '#0F0F19'; // cyber-dark color
document.getElementsByTagName('head')[0].appendChild(themeColorMeta);

// Initialize haptic feedback for supported devices
if ('vibrate' in navigator) {
  // Test vibration - very subtle
  navigator.vibrate(1);
}

// Create audio context for sound effects (will be initialized on user interaction)
window.addEventListener('click', () => {
  if (!window.audioContext) {
    try {
      window.audioContext = new AudioContext();
      console.log('Audio context initialized');
    } catch (e) {
      console.log('Web Audio API not supported');
    }
  }
}, { once: true });

createRoot(document.getElementById("root")!).render(<App />);

// Add TypeScript interfaces for global objects
declare global {
  interface Window {
    audioContext: AudioContext;
  }
}
