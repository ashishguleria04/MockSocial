
import LZString from 'lz-string';
import { ChatState } from '@/store/useChatStore';

// Define what part of the state we want to share
export type ShareableState = Pick<ChatState,
    'mockupType' | 'platform' | 'contact' | 'messages' | 'statusBar' | 'postConfig' | 'isDarkMode'
>;

export const encodeState = (state: ChatState): string => {
    const shareableData: ShareableState = {
        mockupType: state.mockupType,
        platform: state.platform,
        contact: state.contact,
        messages: state.messages,
        statusBar: state.statusBar,
        postConfig: state.postConfig,
        isDarkMode: state.isDarkMode,
    };

    // Safety check: if an image is too large (base64), we might want to strip it
    // For now we'll naively compress everything.
    const json = JSON.stringify(shareableData);
    return LZString.compressToEncodedURIComponent(json);
};

export const decodeState = (encoded: string): Partial<ChatState> | null => {
    try {
        const json = LZString.decompressFromEncodedURIComponent(encoded);
        if (!json) return null;
        return JSON.parse(json);
    } catch (e) {
        console.error('Failed to decode state', e);
        return null;
    }
};
