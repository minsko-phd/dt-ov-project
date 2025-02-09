import { VideoFrameMetadata } from "../internalinterfaces";
import { DeviceStateObserver } from "../devicestateobserver";
export interface ILDATHandler {
    stop(): void;
    reset(): void;
    toggleVisibility(): void;
    isVisible(): boolean;
    toggle(): void;
    isActive(): boolean;
    allowPointerLock(): boolean;
    toggleAutoFire(): void;
    saveLog(): void;
    centerLoupe(): void;
    toggleMoveOnClick(): void;
}
export declare class LDATOverlay implements ILDATHandler {
    private deviceObserver;
    private visible;
    private controller;
    private videoElement;
    private fullscreenChangeFunc;
    private mouseDownFunc;
    private mouseMoveFunc;
    private overlay;
    private lumaSlider;
    private lumaSpan;
    private startButton;
    private helpDialogueButton;
    private loupe;
    private loupeHeader;
    private warning;
    private helpDialogue;
    private notification;
    private latencyData;
    private autoFireInputs;
    private autoFireCheckbox;
    private shotCountSlider;
    private shotCountSpan;
    private shotDelaySlider;
    private shotDelaySpan;
    private autoFireInProgress;
    private autoFireIntervalId;
    private shotCount;
    private loupePositionX;
    private loupePositionY;
    private moveOnClickCheckBox;
    private prevMoveEvent;
    private notificationTimeoutId;
    constructor(videoElement: HTMLVideoElement, deviceObserver: DeviceStateObserver);
    /**
     * Stop the LDAT.
     * Should only be invoked during session teardown.
     */
    stop(): void;
    /**
     * Reset the LDAT.
     * Restores default settings and clears any stored data.
     */
    reset(): void;
    /**
     * Toggle the LDAT's visibility.
     * If the LDAT is currently not visible, then display the interface.
     * If the LDAT is currently visible, then minimize the interface.
     */
    toggleVisibility(): void;
    private setVisible;
    /**
     * @return True if LDAT overlay is visible, false otherwise.
     */
    isVisible(): boolean;
    /**
     * Toggle whether the LDAT is active by starting or stopping the LDAT.
     * If the LDAT is currently inactive, then start the LDAT.
     * If the LDAT is currently active, then stop the LDAT.
     * When active, the area under the loupe is continuously sampled for changes in luminance.
     */
    toggle(): void;
    private setActive;
    /**
     * @return True if the LDAT is active, false otherwise.
     */
    isActive(): boolean;
    /**
     * @return True if requesting pointer lock on the video element is allowed.
     * Returns false if pointer lock should not occur on the video element.
     * Pointer lock is prevented when the LDAT should interact with mouse events.
     */
    allowPointerLock(): boolean;
    /**
     * Toggle whether the LDAT is in auto fire mode.
     */
    toggleAutoFire(): void;
    private getLatencyTimings;
    private isAutoFire;
    /**
     * Save latency measurements to log file.
     * File is located in downloads folder.
     */
    saveLog(): void;
    /**
     * Position loupe in center of video element.
     * Accounts for padding.
     */
    centerLoupe(): void;
    /**
     * Toggle whether move on click is enabled.  Disabled by default.
     * When enabled, mouse move events are simulated whenever a mouse click is detected.
     */
    toggleMoveOnClick(): void;
    /**
     * When LDAT is active, inform controller of frame timing data.
     * Controller will use this data to compute latency statistics when a flash occurs.
     * Should only be invoked when LDAT is active.
     */
    onVideoFrame(now: DOMHighResTimeStamp, metadata: VideoFrameMetadata): void;
    private createDiv;
    private createTitleDiv;
    private createButton;
    private createCheckBox;
    private createLabel;
    private createRangeInput;
    private createOverlay;
    private createLumaThreshold;
    private createAutoFireOverlay;
    private styleAutoFireOverlay;
    private createLoupePositionOverlay;
    private createLoupe;
    /**
     * Positions loupe centered at (x, y), where x and y are normalized values 0.0 - 1.0 in video coordinate space
     */
    private positionLoupe;
    private positionLoupeFromUserInput;
    private styleLoupe;
    private setMoveOnClick;
    private onmousedown;
    private onmousemove;
    private createWarning;
    private createHelpDialogue;
    private styleHelpDialogue;
    private createNotification;
    private updateLoupePosition;
    private showLoupePositionWarning;
    private onfullscreenchange;
    private clearNotificationTimeoutId;
    private clearNotificationDisplay;
    private flashCallback;
    private autoFire;
    private resetAutoFire;
    private makeDraggable;
    private asPercentage;
    private inMilliseconds;
    private setValueAndDispatchInputEvent;
    private getPadding;
}
