import { describe, it, expect, beforeEach } from 'vitest';
import { useChatStore } from '../useChatStore';

describe('App Slice Management', () => {
    beforeEach(() => {
        // Reset state before each test
        useChatStore.getState().resetState();
    });

    it('should initialize with default app state', () => {
        const state = useChatStore.getState();
        expect(state.mockupType).toBe('chat');
        expect(state.platform).toBe('signal');
        expect(state.isDarkMode).toBe(false);
        expect(state.showWatermark).toBe(true);
        expect(state.showKeyboard).toBe(false);
        expect(state.phoneStyle).toBe('default');
    });

    it('should toggle dark mode properly', () => {
        const { toggleDarkMode } = useChatStore.getState();
        toggleDarkMode(true);
        expect(useChatStore.getState().isDarkMode).toBe(true);

        toggleDarkMode(false);
        expect(useChatStore.getState().isDarkMode).toBe(false);
    });

    it('should change phone styles properly', () => {
        const { setPhoneStyle } = useChatStore.getState();
        setPhoneStyle('pro');
        expect(useChatStore.getState().phoneStyle).toBe('pro');
    });
});
