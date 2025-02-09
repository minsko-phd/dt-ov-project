export interface InputChannel {
    readonly bufferedAmount: number;
    readonly readyState: RTCDataChannelState;
    send(buffer: ArrayBufferView): void;
    onmessage: ((this: RTCDataChannel, ev: MessageEvent) => any) | null;
}
export interface VideoInterface {
    readonly videoHeight: number;
    readonly videoWidth: number;
    readonly paused?: boolean;
    readonly currentTime?: number;
    getVideoPlaybackQuality(): VideoPlaybackQuality;
    readonly webkitDecodedFrameCount?: number;
    readonly webkitDroppedFrameCount?: number;
}
export interface InputMediaElement extends HTMLElement, VideoInterface {
}
export interface Measurements {
    baseTime: number;
    baseTotalVideoFrames: number;
    animationFrameCount: number;
    sendInputCount: number;
    sendInputOver5ms: number;
    sendInputOver10ms: number;
    singleDroppedFrames: number;
    multiDroppedFrames: number;
    aggregatedCount: number;
    oversizedEventCount: number;
}
