import { FacebookLogin } from '@capacitor-community/facebook-login';
import { Capacitor } from '@capacitor/core';

class FacebookAnalyticsService {
  constructor() {
    this.isNative = Capacitor.isNativePlatform();
    this.initialized = false;
  }

  async initialize() {
    if (!this.isNative) {
      console.log('Facebook Analytics: Running on web, disabled');
      return;
    }

    try {
      await FacebookLogin.initialize({
        appId: 'YOUR_APP_ID', // Reemplaza con tu App ID
        autoLogAppEvents: true, // Activar auto-logging de eventos
        xfbml: true,
        version: 'v18.0'
      });
      
      this.initialized = true;
      console.log('Facebook SDK initialized successfully');
    } catch (error) {
      console.error('Error initializing Facebook SDK:', error);
    }
  }

  async logEvent(eventName, params = {}) {
    if (!this.isNative || !this.initialized) {
      console.log(`[FB Analytics Web] Event: ${eventName}`, params);
      return;
    }

    try {
      await FacebookLogin.logEvent({
        eventName: eventName,
        parameters: params
      });
      console.log(`[FB Analytics] Event tracked: ${eventName}`, params);
    } catch (error) {
      console.error('Error logging Facebook event:', error);
    }
  }

  // Eventos estándar de Facebook

  async logPurchase(value, currency = 'EUR', contentId = null) {
    await this.logEvent('fb_mobile_purchase', {
      _valueToSum: value,
      fb_currency: currency,
      fb_content_id: contentId
    });
  }

  async logCompleteRegistration(registrationMethod = 'email') {
    await this.logEvent('fb_mobile_complete_registration', {
      fb_registration_method: registrationMethod
    });
  }

  async requestTrackingPermission() {
    if (!this.isNative) return true;
    
    return true;
  }
}

export default new FacebookAnalyticsService();
