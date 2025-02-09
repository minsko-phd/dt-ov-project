export declare const enum INTERNAL_EVENTS {
    /**
     * Sends streaming stats periodically. These are the same ones shown in on screen stats.
     */
    STREAMING_STATS = "StreamingStats"
}
/**
 * Streaming stats
 */
export interface StreamingStats {
    /** Current FPS */
    fps: number;
    /** Average decode time of all the frames received so far  */
    cumulativeAvgDecodeTime: number;
    /** Ongoing average decode time */
    avgDecodeTime: number;
    /** Current bandwidth estimate */
    bwe: number;
    bwu: number;
    /** Current streaming resolution width */
    width: number;
    /** Current streaming resolution height */
    height: number;
}
export interface VideoFrameMetadata {
    presentationTime: DOMHighResTimeStamp;
    expectedDisplayTime: DOMHighResTimeStamp;
    width: number;
    height: number;
    mediaTime: number;
    presentedFrames: number;
    processingDuration?: number;
    captureTime?: DOMHighResTimeStamp;
    receiveTime?: DOMHighResTimeStamp;
    rtpTimestamp?: number;
}
export interface VideoFrameRequestCallback {
    (now: DOMHighResTimeStamp, metadata: VideoFrameMetadata): void;
}
export declare type RAFCallback = (now: DOMHighResTimeStamp) => void;
export interface WithRequestVideoFrameCallback {
    requestVideoFrameCallback?(callback: VideoFrameRequestCallback): number;
    cancelVideoFrameCallback?(handle: number): void;
}
