
import LZString from 'lz-string';
import { ChatState, Platform, MockupType, Message, Contact, PostConfig, StatusBarConfig, Sender, MessageStatus } from '@/store/useChatStore';

// Define what part of the state we want to share
export type ShareableState = Pick<ChatState,
    'mockupType' | 'platform' | 'contact' | 'messages' | 'statusBar' | 'postConfig' | 'isDarkMode'
>;

// Validate sender type
const isValidSender = (value: unknown): value is Sender => {
    return value === 'me' || value === 'them';
};

// Validate message status
const isValidMessageStatus = (value: unknown): value is MessageStatus => {
    return value === 'sent' || value === 'delivered' || value === 'read';
};

// Validate platform
const isValidPlatform = (value: unknown): value is Platform => {
    const validPlatforms: Platform[] = ['signal', 'imessage', 'whatsapp', 'discord', 'instagram', 'messenger', 'telegram', 'twitter', 'slack', 'teams', 'x', 'snapchat', 'tiktok', 'linkedin', 'threads'];
    return typeof value === 'string' && validPlatforms.includes(value as Platform);
};

// Validate mockup type
const isValidMockupType = (value: unknown): value is MockupType => {
    return value === 'chat' || value === 'post';
};

// Validate message structure
const isValidMessage = (msg: unknown): msg is Message => {
    if (typeof msg !== 'object' || msg === null) return false;
    const m = msg as Record<string, unknown>;
    return (
        typeof m.id === 'string' &&
        typeof m.text === 'string' &&
        isValidSender(m.sender) &&
        typeof m.time === 'string' &&
        isValidMessageStatus(m.status)
    );
};

// Validate contact structure
const isValidContact = (contact: unknown): contact is Contact => {
    if (typeof contact !== 'object' || contact === null) return false;
    const c = contact as Record<string, unknown>;
    return (
        typeof c.name === 'string' &&
        typeof c.status === 'string' &&
        (c.avatar === null || typeof c.avatar === 'string')
    );
};

// Validate status bar configuration
const isValidStatusBar = (statusBar: unknown): statusBar is StatusBarConfig => {
    if (typeof statusBar !== 'object' || statusBar === null) return false;
    const s = statusBar as Record<string, unknown>;
    return (
        typeof s.time === 'string' &&
        typeof s.batteryLevel === 'number' &&
        s.batteryLevel >= 0 && s.batteryLevel <= 100 &&
        typeof s.showBatteryPercentage === 'boolean' &&
        typeof s.signalStrength === 'number' &&
        s.signalStrength >= 0 && s.signalStrength <= 4 &&
        typeof s.wifi === 'boolean'
    );
};

// Validate post config
const isValidPostConfig = (config: unknown): config is PostConfig => {
    if (typeof config !== 'object' || config === null) return false;
    const p = config as Record<string, unknown>;
    return (
        typeof p.text === 'string' &&
        (p.image === null || typeof p.image === 'string') &&
        typeof p.likes === 'string' &&
        typeof p.comments === 'string' &&
        typeof p.shares === 'string'
    );
};

// Validate decoded state structure
const isValidShareableState = (data: unknown): data is ShareableState => {
    if (typeof data !== 'object' || data === null) return false;
    const d = data as Record<string, unknown>;
    return (
        isValidMockupType(d.mockupType) &&
        isValidPlatform(d.platform) &&
        isValidContact(d.contact) &&
        Array.isArray(d.messages) &&
        d.messages.every(isValidMessage) &&
        isValidStatusBar(d.statusBar) &&
        isValidPostConfig(d.postConfig) &&
        typeof d.isDarkMode === 'boolean'
    );
};

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
        if (!json) {
            console.warn('Failed to decode state: empty or invalid input');
            return null;
        }
        const parsed = JSON.parse(json);
        
        // Validate the decoded data
        if (!isValidShareableState(parsed)) {
            console.warn('Failed to decode state: invalid data structure');
            return null;
        }
        
        return parsed;
    } catch (e) {
        console.error('Failed to decode state', e);
        return null;
    }
};
