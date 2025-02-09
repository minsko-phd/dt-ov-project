import { VirtualGamepadHandler } from "./virtualgamepad";
import { TelemetryHandler } from "../telemetry/telemetryhandler";
import { GamepadDataHandler, VibrationHandler, Zoneless } from "../interfaces";
import { GamepadRSDMM } from "./gamepadrsdmm";
import { PlatformDetails } from "../dependencies";
import { HidType } from "../nskinterfaces";
/** Bitmask for gamepad buttons in input protocol */
export declare const enum BUTTONS {
    A = 4096,
    B = 8192,
    X = 16384,
    Y = 32768,
    LB = 256,
    RB = 512,
    BACK = 32,
    START = 16,
    THUMBL = 64,
    THUMBR = 128,
    DPADU = 1,
    DPADD = 2,
    DPADL = 4,
    DPADR = 8,
    MENU = 65536,
    TRACKPAD = 131072
}
/** Bitmask for gamepad triggers in input protocol */
export declare const enum TRIGGERS {
    RT = 65280,
    LT = 255
}
/** Actions to be executed on certain combinations of gamepad inputs */
export interface GamepadShortcut {
    /** The button that activates the shortcut when pressed. @see BUTTONS for valid values */
    actionButton: number;
    /**  Buttons that need to be exclusively held as part of the chord. @see BUTTONS for valid values, can OR together for multiple modifiers */
    modifierButtons: number;
    /** Triggers that need to be exclusively held as part of the chord. @see TRIGGERS for valid values, can OR together for multiple modifiers */
    modifierTriggers: number;
    /** Callback to be executed when the shortcut is activated */
    callback: Function;
}
declare global {
    type GamepadHapticActuatorTypeEnhanced = "vibration" | "dual-rumble";
    interface GamepadHapticEffectParameters {
        duration: number;
        startDelay: number;
        weakMagnitude: number;
        strongMagnitude: number;
    }
    interface GamepadHapticActuatorEnhanced {
        type: GamepadHapticActuatorTypeEnhanced;
        playEffect?(type: GamepadHapticActuatorTypeEnhanced, params: GamepadHapticEffectParameters): Promise<any>;
    }
    interface Gamepad {
        vibrationActuator?: GamepadHapticActuatorEnhanced;
    }
}
export declare class GamepadHandler implements VibrationHandler {
    private gamepadDataHandlers;
    private telemetry?;
    private gamepadConnectedFunc;
    private gamepadDisconnectedFunc;
    private gamepadInactivityFunc;
    private gamepadDetails;
    private gamepadBitmap;
    private gamepadCount;
    private gamepadTimer;
    private gamepadPollInterval;
    private gamepadTickFunc;
    private gamepadSnapshotPrevious;
    private gamepadTimestamps;
    private hapticsStrongMagnitude;
    private hapticsWeakMagnitude;
    private lastHapticsEffect;
    private hapticsSupported;
    private hapticsEnabled;
    private hapticsState;
    private allowHaptics;
    private isUserInputEnable;
    private firstTimeInputEnabled;
    private inputEnabledStateBeforeUserIdlePendingOverlay;
    private virtualGamepad;
    private virtualGamepadHandler;
    private windowAddEventListener;
    private windowRemoveEventListener;
    private gamepadDataSender;
    private rsdmmHandler;
    private rsdmmActive;
    private prevThumbstickDown;
    private seenThumbUp;
    private isSafariOlder;
    private isSafari13;
    private isSafari14;
    private isChromeOs;
    private isWebOs;
    private isTizenOs;
    private isAndroid;
    private platformDetails;
    private gamepadScannedOnce;
    private virtualGamepadTelemetry?;
    private previousGamepadTickTs?;
    private maxSchedulingDelay;
    private shortcuts;
    private allowSynthesizedHid;
    private allowSynthesizedDS4;
    private allowSynthesizedDS5;
    private gameSupportsDualShock4;
    private gameSupportsDualSense;
    private serverSupportsDualShock4;
    private serverSupportsDualSense;
    private gameRequiresTouches;
    private xinputGamepadIndices;
    private ds4GamepadIndices;
    constructor(platformDetails: PlatformDetails, zoneless?: Zoneless);
    setServerHidSupportedDevices(supportedHidDevices: number): void;
    requireTrackpadTouches(): void;
    private connectVirtualGamepad;
    private sendVirtualGamepadTelemetry;
    private disconnectVirtualGamepad;
    private getGamepadBitMask;
    private getMsBitMask;
    private getEffectiveId;
    private addXInputGamepad;
    private deleteXInputGamepad;
    setGamepadInactiveCallback(callback: any): void;
    removeGamepadDataHandler(gamepadDataHandler: GamepadDataHandler): void;
    addGamepadDataHandler(gamepadDataHandler: GamepadDataHandler): void;
    private resetGamepadDataHandlerState;
    setGamepadDataSender(gamepadDataSender: GamepadDataHandler): void;
    setGamepadRSDMM(rsdmmHandler: GamepadRSDMM): void;
    enterRsdmmMode(): void;
    exitRsdmmMode(): void;
    /**
     * Toggle RSDMM state, or set it to the provided state (if different from current).
     */
    toggleRsdmmMode(enable?: boolean): void;
    isRsdmmActive(): boolean;
    addTelemetry(telemetry: TelemetryHandler): void;
    private getPlugState;
    private getTelemetryData;
    private getGamepadType;
    private getStandardGamepadDetail;
    private getStandardGamepadSimplifiedHapticsDetail;
    private getShieldGamepadDetail;
    private getSafari13GamepadDetail;
    private getDualSenseGamepadDetail;
    private getXboxSeriesGamepadDetail;
    private getXboxSeriesWiredGamepadDetail;
    private getGamepadDetail;
    private gamepadBitmapUpdateHandler;
    private gamepadConnected;
    private gamepadDisconnected;
    private resetGamepadTimer;
    private getDeviceIds;
    disconnectAllGamepads(): void;
    private isSuitableGamepad;
    private isStandardGamepad;
    private isBluetoothXboxWithHapticsProblems;
    private isShieldGamepad;
    private isDualSenseGamepad;
    private isXboxSeries;
    private isXboxSeriesWired;
    private isXboxGamepad;
    private addGamepad;
    private updateGamepad;
    private isPrimaryGamepad;
    private deleteGamepad;
    private gamepadAlreadySeen;
    private addSonyGamepad;
    private deleteSonyGamepad;
    private scanGamepads;
    private getStandardButtons;
    private getEventMap;
    private getStandardTrigger;
    private getShieldTrigger;
    private getAxesTrigger;
    private getStandardAxes;
    private getSafari13Axes;
    private get0125Axes;
    private get0134Axes;
    private getSafari13Buttons;
    private getDpadFromAxis;
    private getDpadFromTwoAxes;
    private getDualSenseButtons;
    private getXboxSeriesButtons;
    private getXboxSeriesWiredButtons;
    postRender(): void;
    virtualGamepadUpdateHandler(): void;
    getMainThreadSchedulingDelay(): number;
    resetMainThreadSchedulingDelay(): void;
    private updateMainThreadSchedulingDelay;
    private gamepadTick;
    private getShortcutIndex;
    /**
     * Registers a gamepad shortcut that can activate
     * Must call removeShortcut with the same shortcut when it is no longer valid
     * @param shortcut GamepadShortcut that should be registered
     */
    addShortcut(shortcut: GamepadShortcut): void;
    /**
     * Removes a registered gamepad shortcut
     * @param shortcut GamepadShortcut that should be removed
     */
    removeShortcut(shortcut: GamepadShortcut): void;
    private updateGamepadTelemetry;
    private sendGamepadHaptics;
    enableUserInput(): void;
    disableUserInput(): void;
    resetGamepadState(): void;
    getVirtualGamepadHandler(): VirtualGamepadHandler;
    private isHapticsSupported;
    private setAndSendHapticsEnabled;
    private hasHaptics;
    handleSimpleXInputVibration(index: number, leftMotorSpeed: number, rightMotorSpeed: number): void;
    handleSimpleDS4Vibration(index: number, leftMotorSpeed: number, rightMotorSpeed: number): void;
    private handleSimpleVibration;
    getBitmap(): number;
    setAdditionalInputDevices(potentialAdditionalInputDevices?: HidType): void;
}
/**
 * Determines if a trigger is pressed
 * @param trigger the active triggers
 * @param triggerMask the bitmask of the trigger that should be checked
 * @returns true if the trigger is pressed; false otherwise.
 */
export declare function isTriggerPressed(trigger: number, triggerMask: number): boolean;
