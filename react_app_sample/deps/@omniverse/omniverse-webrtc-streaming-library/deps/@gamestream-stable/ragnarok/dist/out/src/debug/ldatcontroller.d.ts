import { VideoFrameMetadata } from "../internalinterfaces";
export interface FrameLatencyData {
    /** Number of frames submitted for composition */
    presentedFrames: number;
    /** Time video frame callback fired.  Occurs after CompositorFrame produced by renderer is submitted to browser process */
    videoFrameCallbackTime: DOMHighResTimeStamp;
    /** Time user agent submitted frame for composition */
    presentationTime: DOMHighResTimeStamp;
    /** Time encoded frame received by platform, i.e. last packet belonging to frame received over network */
    receiveTime?: DOMHighResTimeStamp;
    /** Duration from submission of encoded packet to decoder until decoded frame ready for presentation */
    processingDuration?: number;
    /** Time browser received mouse input event from OS */
    mouseClickTime: DOMHighResTimeStamp;
    /** Time mousedown callback occurred */
    mouseClickCallbackTime: DOMHighResTimeStamp;
}
export interface FlashCallback {
    (x: FrameLatencyData): void;
}
export declare const DEFAULT_LUMA_THRESHOLD = 0.06;
export declare const MOUSE_EVENT_DELAY_MS = 100;
/**
* Responsible for interpreting mouse click data, luminance data, and frame timing data to compute latency statistics.
  Controls whether operations necessary for the LDAT to run should be performed.
 */
export declare class LDATController {
    private active;
    private lumaThreshold;
    private loupePosition;
    private frameTimings;
    private mouseClickData;
    private flashCallback?;
    private videoElement;
    private mousedownFunc;
    constructor(videoElement: HTMLVideoElement);
    /**
     * Activate or deactivate the LDAT.
     * When active, luminance should be calculated on a per-frame basis to compute latency statistics.
     * @param active
     */
    setActive(active: boolean): void;
    /**
     * @return True if the LDAT is active, false otherwise.
     */
    isActive(): boolean;
    /**
     * Set the luminance threshold used to determine whether a flash occurred.
     * Default threshold defined as 6% increase in luminance relative to the prior frame's value
     * @param threshold - Percent increase in luminance between 0 and 1
     */
    setLuminanceThreshold(threshold: number): void;
    /**
     * @return The luminance threshold used to determine whether a flash occurred, expressed as percentage.
     */
    getLuminanceThreshold(): number;
    /**
     * Set the region to be sampled for luminance changes
     * @param rect Region in abstract 0.0-1.0 coordinate space
     */
    setLoupePosition(rect: DOMRect): void;
    /**
     * @return The region to sample for luminance changes in abstract 0.0-1.0 coordinate space
     */
    getLoupePosition(): DOMRect;
    /**
     * Register callback to be invoked when flash is detected in region under the loupe.
     */
    registerFlashCallback(callback: FlashCallback): void;
    /**
     * When LDAT is active, use frame timing data to compute latency statistics when a flash occurs.
     * If a flash has been detected for this frame, invoke registered callback and clear stale video frame data from cache.
     */
    onVideoFrame(now: DOMHighResTimeStamp, metadata: VideoFrameMetadata): void;
    private onmousedown;
    /**
     * Calculates average luminance across all pixels in specified region of video frame.
     * @param source element that holds the video frame data
     * @param x coordinate of region's top-left corner, in coordinate space of source element
     * @param y  coordinate of region's top left corner, in coordinate space of source element
     * @param width of source region to read
     * @param height of source region to read
     * @param callback the function to call when average calculation finished
     * @return Luminance as normalized value between 0 and 1.  Result is delivered asynchronously as Promise.
     * Rejects with -1 if failed to calculate luminance or if functionality not supported on given platform.
     */
    static GetAvgLuminance(source: CanvasImageSource, x: number, y: number, width: number, height: number): Promise<number>;
    private static GetAvgLuminanceImpl;
    private recordLuminance;
    /**
     * @return True if entire loupe is positioned over the video element.
     * Returns false if any portion of loupe is outside bounds of video element.
     */
    isLoupeInPosition(): boolean;
    /**
     * Converts DOMRect from abstract 0.0-1.0 coordinate space to video coordinate space
     */
    private convertToVideoCoordinateSpace;
    /**
     *  Simulates mouse click by dispatching mouse or pointer events on the video element.
     */
    sendMouseClickEvent(): void;
}
