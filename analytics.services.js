import { FirebaseAnalytics } from '@capacitor-firebase/analytics';
import { Capacitor } from '@capacitor/core';

class AnalyticsService {
  constructor() {
    this.isNative = Capacitor.isNativePlatform();
    this.initialized = false;
  }

  async initialize() {
    if (!this.isNative) {
      console.log('Analytics: Running on web, analytics disabled');
      return;
    }

    try {
      await FirebaseAnalytics.setEnabled({ enabled: true });
      this.initialized = true;
      console.log('Firebase Analytics initialized successfully');
    } catch (error) {
      console.error('Error initializing Firebase Analytics:', error);
    }
  }

  async logScreenView(screenName, screenClass = null) {
    if (!this.isNative || !this.initialized) {
      console.log(`[Analytics Web] Screen View: ${screenName}`);
      return;
    }

    try {
      await FirebaseAnalytics.logEvent({
        name: 'screen_view',
        params: {
          screen_name: screenName,
          screen_class: screenClass || screenName,
        },
      });
      console.log(`[Analytics] Screen View tracked: ${screenName}`);
    } catch (error) {
      console.error('Error logging screen view:', error);
    }
  }

  async logEvent(eventName, params = {}) {
    if (!this.isNative || !this.initialized) {
      console.log(`[Analytics Web] Event: ${eventName}`, params);
      return;
    }

    try {
      await FirebaseAnalytics.logEvent({
        name: eventName,
        params: params,
      });
      console.log(`[Analytics] Event tracked: ${eventName}`, params);
    } catch (error) {
      console.error('Error logging event:', error);
    }
  }

  async setUserId(userId) {
    if (!this.isNative || !this.initialized) {
      console.log(`[Analytics Web] User ID: ${userId}`);
      return;
    }

    try {
      await FirebaseAnalytics.setUserId({ userId });
      console.log(`[Analytics] User ID set: ${userId}`);
    } catch (error) {
      console.error('Error setting user ID:', error);
    }
  }

  async setUserProperty(name, value) {
    if (!this.isNative || !this.initialized) {
      console.log(`[Analytics Web] User Property: ${name} = ${value}`);
      return;
    }

    try {
      await FirebaseAnalytics.setUserProperty({ name, value });
      console.log(`[Analytics] User Property set: ${name} = ${value}`);
    } catch (error) {
      console.error('Error setting user property:', error);
    }
  }
}

export default new AnalyticsService();
