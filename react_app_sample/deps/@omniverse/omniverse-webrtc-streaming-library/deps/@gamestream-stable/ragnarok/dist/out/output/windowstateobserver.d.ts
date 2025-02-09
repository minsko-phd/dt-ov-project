import { PlatformDetails } from "./dependencies";
/**
 * Types of window states that are observed by the WindowStateObserver
 */
export declare const enum WindowStateType {
    FOCUS = 0,
    MOUSE_FOCUS = 1,
    FULLSCREEN = 2
}
/**
 * This class is a centralized source for window states (e.g. focus, video states, visibility).
 * Other classes in the project should use this class to receive updates about the state and query the current value
 * and should not directly listen for or query them themselves.
 */
export declare class WindowStateObserver {
    private windowStateListeners;
    private focusFunc;
    private blurFunc;
    private fullscreenFunc;
    private mouseEnterFunc;
    private mouseLeaveFunc;
    private windowFocus;
    private fullscreen;
    private mouseFocus;
    private isMobile;
    constructor(platformDetails: PlatformDetails);
    /**
     * Uninitialize the window state observer
     * @note Must be called before class leaves scope
     */
    uninitialize(): void;
    /**
     * Get whether or not the application window has focus
     * @returns Whether the application window has focus
     */
    getWindowFocus(): boolean;
    /**
     * Set the window focus state
     * @param focus Value to set the window focus state to
     * @note Should only be used in rare cases, where the application is aware of the state before the browser fires the corresponding events.
     */
    setWindowFocus(focus: boolean): void;
    /**
     * Get whether or not the application window is in fullscreen
     * @returns Whether the application window is in fullscreen
     */
    getFullscreen(): boolean;
    private setFullscreen;
    /**
     * Get whether or not the application window has mouse focus
     * @returns Whether the application window has mouse focus
     */
    getMouseFocus(): boolean;
    private setMouseFocus;
    /**
     * Register a listener for a window state
     * @param type Type of window state to listen for
     * @param listener Listener that will be called when the state is updated
     * @note Should be accompanied by a call to removeStateListener before listener goes out of scope to prevent leaks
     */
    addStateListener(type: WindowStateType, listener: Function): void;
    /**
     * Unregister a listener for a window state
     * @param type Type of window state to listen for
     * @param listener Listener that was registered in addStateListener
     */
    removeStateListener(type: WindowStateType, listener: Function): void;
    private onFocus;
    private onBlur;
    private onFullscreenChange;
    private onMouseEnter;
    private onMouseLeave;
}
