// Ejecutar esto 
// npm install capacitor-plugin-app-tracking-transparency
// npx cap sync

import { AppTrackingTransparency } from 'capacitor-plugin-app-tracking-transparency';

// En el método requestTrackingPermission():
async requestTrackingPermission() {
  if (!this.isNative) return true;
  
  if (Capacitor.getPlatform() === 'ios') {
    try {
      const result = await AppTrackingTransparency.requestPermission();
