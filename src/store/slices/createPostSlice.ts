import { StateCreator } from 'zustand';
import { PostConfig } from '../useChatStore';

export interface PostSlice {
    postConfig: PostConfig;
    updatePostConfig: (updates: Partial<PostConfig>) => void;
}

export const createPostSlice: StateCreator<PostSlice> = (set) => ({
    postConfig: {
        text: 'Just launched my new portfolio! 🚀 check it out #webdev #design',
        image: null,
        likes: '1.2k',
        comments: '42',
        shares: '12',
    },

    updatePostConfig: (updates) =>
        set((state) => ({ postConfig: { ...state.postConfig, ...updates } })),
});
