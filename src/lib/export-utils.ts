import * as htmlToImage from 'html-to-image';
import { encode } from 'modern-gif';

export interface GifFrame {
    element: HTMLElement;
    delayMs: number;
}

export const generateGifFromElements = async (
    frames: GifFrame[],
    width: number,
    height: number,
    onProgress?: (progress: number) => void
): Promise<Blob> => {
    const gifFrames: { data: HTMLCanvasElement; delay: number }[] = [];

    // 1. Capture all frames as ImageData
    for (let i = 0; i < frames.length; i++) {
        const { element, delayMs } = frames[i];

        // We use a slight delay or force reflow if needed, but assuming elements are visible
        const canvas = await htmlToImage.toCanvas(element, {
            width,
            height,
            backgroundColor: undefined,
            pixelRatio: 1, // Keep 1x for GIF size constraints
        });

        gifFrames.push({ data: canvas, delay: delayMs });

        // Report progress for capturing frames (first 50% of the work)
        if (onProgress) onProgress((i + 1) / frames.length * 0.5);
    }

    // 2. Encode to GIF
    const buffer = await encode({
        width,
        height,
        frames: gifFrames,
    });

    if (onProgress) onProgress(1); // 100%

    // 3. Return as Blob
    return new Blob([buffer], { type: 'image/gif' });
};
