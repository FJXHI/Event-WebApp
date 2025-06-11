// scripts/useMessagingStore.ts
import { defineStore } from 'pinia';

export const useMessagingStore = defineStore('messaging', {
  state: () => ({
    fcmToken: null as string | null,
  }),
  actions: {
    setToken(token: string) {
      this.fcmToken = token;
    },
  },
});
