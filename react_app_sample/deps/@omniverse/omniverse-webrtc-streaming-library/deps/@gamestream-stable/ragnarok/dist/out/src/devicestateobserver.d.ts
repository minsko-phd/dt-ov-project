import { PlatformDetails } from "./dependencies";
/**
 * Types of window states that are observed by the DeviceStateObserver
 */
export declare const enum DeviceStateType {
    FOCUS = 0,
    MOUSE_FOCUS = 1,
    FULLSCREEN = 2,
    ON_BATTERY = 3,
    LOW_POWER = 4,
    CPU_USAGE = 5
}
/**
 * Display topology enum that mimics what is in native code.
 * This enum is being declared here only for consistency.
 * Note that current implementation detects only EXTENDED mode.
 * For everything else, UNKNOWN will be returned.
 */
export declare const enum DisplayTopology {
    UNKNOWN = 0,
    /** There is a single display online, and it is built-in to the computer (laptop / all-in-one) */
    INTERNAL = 1,
    /** There are multiple displays online, and at least some of them are mirrored (same picture on two displays) */
    CLONE = 2,
    /** There are multiple displays online, and at least 2 of them aren't in a mirror set (not cloned) */
    EXTENDED = 3,
    /** There is a single display online, and it is external to the computer */
    EXTERNAL = 4
}
/**
 * This class is a centralized source for window states (e.g. focus, video states, visibility).
 * Other classes in the project should use this class to receive updates about the state and query the current value
 * and should not directly listen for or query them themselves.
 */
export declare class DeviceStateObserver {
    private deviceStateListeners;
    private focusFunc;
    private blurFunc;
    private fullscreenFunc;
    private mouseEnterFunc;
    private mouseLeaveFunc;
    private chargingChangeFunc;
    private batteryLevelChangeFunc;
    private displayTopologyChangeFunc;
    private windowFocus;
    private fullscreen;
    private mouseFocus;
    private lowPower;
    private onBattery;
    private isMobile;
    private isiPhone;
    private isiPad;
    private isMac;
    private displayTopology;
    private pressureObserver?;
    private lastCpuState;
    constructor(platformDetails: PlatformDetails);
    /**
     * Uninitialize the window state observer
     * @note Must be called before class leaves scope
     */
    uninitialize(): void;
    private findWorstState;
    private getStateLevel;
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
     * Get whether or not the device is on low battery
     * @returns Whether the device is on low battery
     */
    getLowPower(): boolean;
    private setLowPower;
    /**
     * Get whether or not the device is on battery
     * @returns Whether the device is on battery
     */
    getOnBattery(): boolean;
    private setOnBattery;
    getDisplayTopology(): DisplayTopology;
    getCpuUsage(): number;
    /**
     * Register a listener for a window state
     * @param type Type of window state to listen for
     * @param listener Listener that will be called when the state is updated
     * @note Should be accompanied by a call to removeStateListener before listener goes out of scope to prevent leaks
     */
    addStateListener(type: DeviceStateType, listener: Function): void;
    /**
     * Unregister a listener for a window state
     * @param type Type of window state to listen for
     * @param listener Listener that was registered in addStateListener
     */
    removeStateListener(type: DeviceStateType, listener: Function): void;
    /**
     * Checks whether or not this device supports observation of the battery state
     * @return true if this device can monitor the battery state and provide ON_BATTERY and LOW_POWER events
     */
    isBatterySupported(): boolean;
    isWindowManagementSupported(): boolean;
    isComputePressureSupported(): boolean;
    private onFocus;
    private onBlur;
    private onFullscreenChange;
    private onMouseEnter;
    private onMouseLeave;
    private onChargingChange;
    private onBatteryLevelChange;
    private isBatteryLow;
    private onDisplayTopologyChange;
}
