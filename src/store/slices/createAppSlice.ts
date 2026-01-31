import { StateCreator } from 'zustand';
import { Platform, MockupType, StatusBarConfig } from '../useChatStore';

export interface AppSlice {
  mockupType: MockupType;
  platform: Platform;
  statusBar: StatusBarConfig;
  isDarkMode: boolean;
  showWatermark: boolean;

  setMockupType: (type: MockupType) => void;
  setPlatform: (platform: Platform) => void;
  updateStatusBar: (updates: Partial<StatusBarConfig>) => void;
  toggleDarkMode: (isDark: boolean) => void;
  toggleWatermark: (show: boolean) => void;
  wallpaper: string | null;
  setWallpaper: (url: string | null) => void;
  showKeyboard: boolean;
  toggleKeyboard: (show: boolean) => void;
}

export const createAppSlice: StateCreator<AppSlice> = (set) => ({
  mockupType: 'chat',
  platform: 'signal',
  statusBar: {
    time: '9:41',
    batteryLevel: 100,
    showBatteryPercentage: true,
    signalStrength: 4,
    wifi: true,
  },
  isDarkMode: false,
  showWatermark: true,
  wallpaper: null,
  showKeyboard: false,

  setMockupType: (type) => set({ mockupType: type }),
  setPlatform: (platform) => set({ platform }),
  updateStatusBar: (updates) =>
    set((state) => ({ statusBar: { ...state.statusBar, ...updates } })),
  toggleDarkMode: (isDark) => set({ isDarkMode: isDark }),
  toggleWatermark: (show) => set({ showWatermark: show }),
  setWallpaper: (url) => set({ wallpaper: url }),
  toggleKeyboard: (show) => set({ showKeyboard: show }),
});
