export interface TouchRecord {
    identifier: number;
    clientX: number;
    clientY: number;
    deltaX: number;
    deltaY: number;
}
export interface GestureHandler {
    tap: (target: HTMLElement, timestamp: number, lastTouch: TouchRecord, touchCount: number) => void;
    holdBegin: (target: HTMLElement, timestamp: number, touch: TouchRecord) => void;
    holdEnd: (target: HTMLElement, timestamp: number) => void;
    drag: (target: HTMLElement, timestamp: number, touch: TouchRecord) => void;
    scroll: (target: HTMLElement, timestamp: number, touches: TouchRecord[]) => void;
    panZoom: (target: HTMLElement, timestamp: number, touches: TouchRecord[]) => void;
    panZoomEnd: (target: HTMLElement, timestamp: number) => void;
    shouldPreventDefaultTouch: () => boolean;
    setShouldDrawCursor: (draw: boolean) => void;
}
export declare const maximumTapDurationMs: number;
export declare class GestureDetector {
    private target;
    private videoAddEventListener;
    private videoRemoveEventListener;
    private gestureHandler;
    static isSupported(): boolean;
    private allowableMovement;
    private currentTouches;
    private tapTimerId;
    private maxTouchCount;
    private activeGesture;
    private touchStartListener;
    private touchMoveListener;
    private endTouches;
    private touchCancelListener;
    private touchEndListener;
    constructor(target: HTMLElement, videoAddEventListener: (eventName: string, handler: any, options?: any) => void, videoRemoveEventListener: (eventName: string, handler: any) => void, gestureHandler: GestureHandler);
    start(): void;
    stop(): void;
}
