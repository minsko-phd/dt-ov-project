import { GestureHandler } from "./gesturedetector";
import { BoundaryPair, VideoState } from "../rinterfaces";
import { PlatformDetails } from "../dependencies";
export declare const enum TouchType {
    DOWN = 1,
    UP = 2,
    MOVE = 4,
    CANCEL = 8
}
export declare const MAX_TOUCH_COUNT = 40;
export interface TouchDataHandler {
    addTouchEvent(idx: number, id: number, touchType: TouchType, x: number, y: number, radiusX: number, radiusY: number, timestampMs: number): boolean;
    sendTouchPacket(count: number): boolean;
}
export declare class TouchListener {
    private target;
    private videoAddEventListener;
    private videoRemoveEventListener;
    private touchDataHandler;
    private gestureHandler;
    static isSupported(): boolean;
    private isSafari;
    private scaleX;
    private scaleY;
    private margins;
    private activeTouches;
    private activeProtocolIds;
    private droppedEventsCount;
    private storedTouches;
    private storedTouchesTimer;
    private trimStoredTouchesFunc;
    private logStoredTouchesFunc;
    private clearedAllTouches;
    private storeTouch;
    private trimStoredTouches;
    private logStoredTouches;
    private addNewTouch;
    private removeTouch;
    private shouldHandleTouch;
    private sendTouches;
    private touchStartListener;
    private touchMoveListener;
    private touchEnd;
    private touchCancelListener;
    private touchEndListener;
    constructor(target: HTMLElement, videoAddEventListener: (eventName: string, handler: any, options?: any) => void, videoRemoveEventListener: (eventName: string, handler: any, options?: any) => void, touchDataHandler: TouchDataHandler, gestureHandler: GestureHandler, platformDetails: PlatformDetails);
    start(): void;
    stop(): void;
    updateVideoState(videoState: VideoState, margins: BoundaryPair, videoZoomFactor: number): void;
}
