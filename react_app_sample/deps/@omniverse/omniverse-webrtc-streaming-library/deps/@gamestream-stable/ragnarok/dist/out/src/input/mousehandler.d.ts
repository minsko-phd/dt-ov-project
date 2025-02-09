import { StreamClient } from "../streamclient";
import { TelemetryHandler } from "../telemetry/telemetryhandler";
import { PlatformDetails } from "../dependencies";
import { InputConfigFlags } from "../interfaces";
import { InputChannel, InputMediaElement, Measurements } from "./inputinterfaces";
import { VideoState } from "../rinterfaces";
import { InputPacketHandler, MoveEventBuffer } from "./inputpackethandler";
import { GamepadRSDMM } from "./gamepadrsdmm";
import { DeviceStateObserver } from "../devicestateobserver";
export interface MouseHandlerCallbacks {
    onEnterPointerLock: () => void;
    onExitPointerLock: (sendEscape: boolean) => void;
    isEscapePressed: () => boolean;
}
interface Cursor {
    /** Base64 encoded representation of the cursor image */
    imageStr: string;
    /** The x coordinate of the hotspot of the image */
    hotspotX: number;
    /** The y coordinate of the hotspot of the image */
    hotspotY: number;
    /** Mime type of the image represented by imageStr */
    mimeTypeStr: string;
    /** If set, contains the in-progress or fully decoded cursor image */
    image?: HTMLImageElement;
    /**
     * If set, contains a string which can be used to set the CSS cursor style on an element to display this cursor.
     * This is reset for non-system cursors whenever the DPR changes
     */
    style?: string;
    /** The scale factor/devicePixelRatio-equivalent at which the server captured the cursor image */
    scale: number;
}
interface CursorState {
    absPositioning: boolean;
    confined: boolean;
    /** X coordinate of the cursor, in display-video space */
    absX: number;
    /** Y coordinate of the cursor, in display-video space */
    absY: number;
    /** X offset to be added to next relative movement, in display physical space */
    remX: number;
    /** Y offset to be added to next relative movement, in display physical space */
    remY: number;
    style: string;
    /** The most recent cursor image that we have started decoding, or undefined if the most recent cursor has been
     * decoded */
    imagePendingDecode?: HTMLImageElement;
    /** The current cursor to display */
    cursor: Cursor;
}
export declare class MouseHandler {
    private callbacks;
    private deviceObserver;
    private streamClient;
    private videoTagElement;
    private configFlags;
    private videoState;
    private mousedownFunc;
    private pointerdownFunc;
    private mouseupFunc;
    private pointerupFunc;
    private mousewheelFunc;
    private pointerMoveFunc;
    private pointerRawUpdateFunc;
    private freeMouseMoveFunc;
    private freePointerMoveFunc;
    private pointerLockEventFunc;
    private pointerLockErrorFunc;
    private focusChangeFunc;
    private fullscreenChangeFunc;
    private cursorType;
    private windowedMode;
    private cursorState;
    private cursorCanvasState;
    private cursorCache;
    private systemCursors;
    private cursorCanvas;
    private pointerLockState;
    private consecutivePointerLockFailedAttempts;
    private allowPointerLock;
    private pressedButtons;
    private supportsRawUpdate;
    private supportsPointerEvents;
    private supportsCoalescedEvents;
    private isChromium;
    private telemetry;
    private unadjustedMovementAllowed;
    private unadjustedMovementActive;
    private pointerLockReturnsPromise;
    private measurements;
    private rawUpdateState;
    private rawCoalesceInterval;
    private mouseFilter;
    private documentAddEventListener;
    private videoAddEventListener;
    private documentRemoveEventListener;
    private videoRemoveEventListener;
    private rsdmmHandler;
    private zoomInProgress;
    private packetHandler;
    private moveEventBuffer;
    private platformDetails;
    private nonpassiveOptions;
    private scaleMovementByDpr;
    private shouldDrawCursor;
    private isUserInputEnable;
    /** The name of the CSS image-set function supported on this browser, if any. Can be a prefixed version */
    private supportedImageSetName?;
    /** True if we should detect if the user pressed Escape when exiting pointer lock and generate key events */
    private sendEscapeOnUserUnlock;
    /** If non-zero, the pending pointer lock timer used to generate Escape key events */
    private exitPointerLockTimerId;
    /**
     * True if we need to start a timer in mousedown to request pointer lock. This is needed because Safari only lets us
     * enter pointer lock inside a user interaction, like mousedown. It considers a timer started from mousedown as
     * still inside a user interaction, so we can enter pointer lock here
     */
    private useMouseDownTimerHack;
    /** If non-zero, the timer used to enter pointer lock after a mouse down event */
    private mouseDownPointerLockTimerId;
    constructor(callbacks: MouseHandlerCallbacks, streamClient: StreamClient, videoElement: InputMediaElement, cursorChannel: InputChannel, telemetry: TelemetryHandler, configFlags: InputConfigFlags, platformDetails: PlatformDetails, rsdmmHandler: GamepadRSDMM, measurements: Measurements, moveEventBuffer: MoveEventBuffer, packetHandler: InputPacketHandler, deviceObserver: DeviceStateObserver);
    uninitialize(): void;
    preRender(_timestamp: number): void;
    postRender(): void;
    private pointerdown;
    private mousedown;
    private clearMouseDownPointerLockTimer;
    private handleDelayedMouseDownPointerLock;
    private pointerup;
    private mouseup;
    private mousewheel;
    private freePointerMove;
    private freeMouseMove;
    private handlePointerEvent;
    private pointermove;
    private pointerrawupdate;
    setCursorPosFromOffset(offsetX: number, offsetY: number): void;
    private setCursorPosFromMovement;
    private setCursorPosFromServer;
    private setCursorPosFromDisplayVideo;
    private getCursorCanvas;
    private createCursorCanvasElement;
    private updateCursorCanvasPosition;
    updateVideoState(videoState: VideoState): void;
    private updateCursorCanvasState;
    private getCursorScaling;
    private drawCursor;
    private setCursor;
    /** Draws the current cursor image to the cursor canvas, resizing it if necessary */
    private drawCursorToCanvas;
    /** Updates the cursor canvas so the cursor's hotspot is over the given x, y coordinate in display-video space */
    private updateCursorTransform;
    /** Shows the cursor canvas if it's hidden */
    private showCursorCanvas;
    /** Hides the cursor canvas if it's visible */
    private hideCursorCanvas;
    private onCursorMessage;
    private handleSystemCursor;
    private handleBitmapCursor;
    private handleCursorCommon;
    private makeCursorStyle;
    /**
     * @returns true if we should scale the HW cursors ourselves.
     * @note We want to scale up the HW cursor ourselves to get a crisp image, but this requires image-set support in
     *       the browser. If image-set isn't available, this returns false to let the browser do all the scaling
     */
    private shouldScaleHwCursor;
    private makeBase64Url;
    private updateHardwareCursor;
    private scheduleCursorDraw;
    private setCursorMovementAbsolute;
    private setCursorConfinement;
    private onFullscreenChange;
    private pointerLockChange;
    private finalizeExitPointerLock;
    private stopPointerLockTimer;
    private pointerLockError;
    private handlePointerLockFailed;
    shouldPointerLock(): boolean;
    isPointerLocked(): boolean;
    updatePointerLock(): void;
    enableUserInput(): void;
    disableUserInput(): void;
    isUserInputEnabled(): boolean;
    private setRawUpdate;
    private addMoveListener;
    private removeMoveListener;
    private static contextMenuHandler;
    private addClickListeners;
    private removeClickListeners;
    private onFocusChange;
    releasePressedButtons(): void;
    getMoveEventName(): "mousemove" | "pointermove";
    private getFreeMoveFunc;
    sendMouseDown(button: number, ts: number): void;
    sendMouseUp(button: number, ts: number): void;
    setShouldDrawCursor(draw: boolean): void;
    setZoomInProgress(zoom: boolean): void;
    getCursorState(): CursorState;
    toggleUnadjustedMovement(): void;
    setNextRawUpdate(): void;
    private getDefaultUnadjustedMovement;
    getMouseMode(): string;
}
export {};
