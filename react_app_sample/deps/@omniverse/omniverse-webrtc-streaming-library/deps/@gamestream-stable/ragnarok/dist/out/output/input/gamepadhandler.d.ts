import { VirtualGamepadHandler } from "./virtualgamepad";
import { TelemetryHandler } from "../telemetry/telemetryhandler";
import { GamepadDataHandler, VibrationHandler, Zoneless } from "../interfaces";
import { GamepadRSDMM } from "./gamepadrsdmm";
import { PlatformDetails } from "../dependencies";
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
    DPADR = 8
}
export declare const enum TRIGGERS {
    RT = 65280,
    LT = 255
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
    constructor(platformDetails: PlatformDetails, zoneless?: Zoneless);
    private connectVirtualGamepad;
    private sendVirtualGamepadTelemetry;
    private disconnectVirtualGamepad;
    private getGamepadBitMask;
    private getMsBitMask;
    private addGamepadCommon;
    private removeGamepadCommon;
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
    private isXinputGamepad;
    private addGamepad;
    private updateGamepad;
    private isPrimaryGamepad;
    private deleteGamepad;
    private gamepadAlreadySeen;
    private scangamepads;
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
    private updateGamepadTelemetry;
    private sendGamepadHaptics;
    enableUserInput(): void;
    disableUserInput(): void;
    resetGamepadState(): void;
    getVirtualGamepadHandler(): VirtualGamepadHandler;
    private isHapticsSupported;
    private setAndSendHapticsEnabled;
    private hasHaptics;
    handleSimpleVibration(index: number, leftMotorSpeed: number, rightMotorSpeed: number): void;
    getBitmap(): number;
}
