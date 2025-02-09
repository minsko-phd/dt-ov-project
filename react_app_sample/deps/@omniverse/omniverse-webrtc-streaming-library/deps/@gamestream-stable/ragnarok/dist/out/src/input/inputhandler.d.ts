import { StreamClient } from "../streamclient";
import { TelemetryHandler } from "../telemetry/telemetryhandler";
import { IEventEmitter, PlatformDetails } from "../dependencies";
import { GestureHandler, TouchRecord } from "./gesturedetector";
import { InputConfigFlags } from "../interfaces";
import { VirtualGamepadHandler } from "./virtualgamepad";
import { InputChannel, InputMediaElement, Measurements } from "./inputinterfaces";
import { GamepadHandler } from "./gamepadhandler";
import { GamepadTester } from "../debug/gamepadtester";
import { IInputPacketHandlerCallbacks } from "./inputpackethandler";
import { IStreamCallbacks } from "../rinterfaces";
import { SafeZoneHandler } from "../safezonehandler";
import { MouseHandlerCallbacks } from "./mousehandler";
import { DeviceStateObserver } from "../devicestateobserver";
import { InputType } from "../nskinterfaces";
export declare class InputHandler implements GestureHandler, IInputPacketHandlerCallbacks, MouseHandlerCallbacks {
    private deviceObserver;
    private videoTagElement;
    private videoState;
    private keydownFunc;
    private keyupFunc;
    private focusChangeFunc;
    private fullscreenEventFunc;
    private preRenderFunc;
    private mouseHandler;
    private gestureDetector?;
    private touchListener?;
    private eventEmitter;
    private rendering;
    private resizedFunc;
    private viewportResizedFunc;
    private popStateFunc;
    private textInputFunc;
    private textCompositionFunc;
    private unidentifiedKeys;
    private lastLockKeysState;
    private pressedKeys;
    private supportsNumAndScrollLock;
    private isChromeOs;
    private isMacOs;
    private isAndroidOs;
    private ignoredLockKeys;
    private telemetry;
    private enabledInputs;
    private isVirtualKeyboardVisible;
    private enabledInputsBeforeUserIdlePendingOverlay?;
    private isUserIdleTimeoutPending;
    private historyProtected;
    private preventNavigation;
    private streamClient;
    private perf;
    private useVkCodes;
    private windowAddEventListener;
    private documentAddEventListener;
    private videoAddEventListener;
    private windowRemoveEventListener;
    private documentRemoveEventListener;
    private videoRemoveEventListener;
    private gamepadHandler;
    private rsdmmHandler;
    private statsGestureTimerId;
    private resizeObserver?;
    private intersectionObserver?;
    private touchDelay;
    private gamepadTester;
    private packetHandler;
    private gamepadTesterEnabled;
    private idleInputListenerFunc;
    private textInputElement?;
    private textCompositionState;
    private textInputDetected;
    private platformDetails;
    private flagTranslateToggleChineseKey;
    private tradChineseLayout;
    private callbacks;
    private twoFingerTapCount;
    private threeFingerTapCount;
    private safeZoneHandler;
    private safeZoneTimeoutId;
    private autocapitalizeSetting;
    private autocorrectSetting;
    private hotkeyKeys;
    private hotkeyCodes;
    private isVisionPro;
    private shouldGenerateVisionProKeyUp;
    constructor(streamClient: StreamClient, videoElement: InputMediaElement, inputChannel: InputChannel, cursorChannel: InputChannel, telemetry: TelemetryHandler, eventEmitter: IEventEmitter, configFlags: InputConfigFlags, sendRawTouchInput: boolean, gamepadTester: GamepadTester, gamepadHandler: GamepadHandler, platformDetails: PlatformDetails, callbacks: IStreamCallbacks, safeZoneHandler: SafeZoneHandler, deviceObserver: DeviceStateObserver, measurements: Measurements, gamepadChannel?: InputChannel, textInputElement?: HTMLInputElement);
    uninitialize(): void;
    private createGestureDetector;
    private createTouchListener;
    private changeFocusHandling;
    private updateLockKeysState;
    preRender(_timestamp: number): void;
    postRender(): void;
    virtualGamepadUpdateHandler(): void;
    resized(_evt?: Event): void;
    viewportResized(evt: Event): void;
    private orientationChange;
    popstate(evt: Event): void;
    private getVirtualKeycode;
    private japaneseSpecialKey;
    private koreanSpecialKey;
    private chineseTogglePermitted;
    private tradChineseToggleKey;
    keydown(evt: KeyboardEvent): void;
    private logHotkeys;
    private setupHotkeys;
    private getHotkey;
    keyup(evt: KeyboardEvent): void;
    clientAspectGreater(client: number, session: number): boolean;
    private updateVideoState;
    fullscreenEventHandler(fullscreen: boolean): void;
    private enableBackPrevention;
    private disableBackPrevention;
    private isTrueTouchActive;
    private enableUserInput;
    private disableUserInput;
    toggleUserInput(enable: boolean, inputs?: InputType): void;
    isUserInputEnabled(): boolean;
    private onTextFocus;
    private onTextBlur;
    private onFocusChange;
    onEnterPointerLock(): void;
    onExitPointerLock(sendEscape: boolean): void;
    isEscapePressed(): boolean;
    private getShiftModifierFlag;
    private getModifierFlags;
    sendHeartbeatEvent(): void;
    private clearIdleTimeout;
    private getIdleEvents;
    private idleInputListener;
    setUserIdleTimeoutPending(value: boolean): void;
    releasePressedKeys(): void;
    releasePressedKeysAndButtons(): void;
    private perfCallback;
    getVirtualGamepadHandler(): VirtualGamepadHandler;
    sendTextInput(text: ArrayBuffer): void;
    private sendAndClearText;
    private hasVirtualKeyCodeMapping;
    private sendCharCodesAndClearText;
    private textCompositionHandler;
    private textInputHandler;
    setVirtualKeyboardState(visible: boolean): void;
    /** Returns true if virtual keyboard is visible, false otherwise.*/
    getVirtualKeyboardState(): boolean;
    setKeyboardLayout(layout: string): void;
    private getTranslationLimits;
    private touchMove;
    private applyVideoTransforms;
    clientRequestVideoTransform(offsetX: number, offsetY: number, zoomFactor: number): void;
    shouldPreventDefaultTouch(): boolean;
    shouldPreventDefaultKb(evt: KeyboardEvent): boolean;
    private clearStatsGestureTimer;
    tap(target: HTMLElement, timestamp: number, lastTouch: TouchRecord, touchCount: number): void;
    private emulateMouseClick;
    holdBegin(target: HTMLElement, timestamp: number, touch: TouchRecord): void;
    holdEnd(target: HTMLElement, timestamp: number): void;
    drag(target: HTMLElement, timestamp: number, touch: TouchRecord): void;
    scroll(target: HTMLElement, timestamp: number, touches: TouchRecord[]): void;
    panZoom(target: HTMLElement, timestamp: number, touches: TouchRecord[]): void;
    panZoomEnd(target: HTMLElement, timestamp: number): void;
    private getMargins;
    /**
     * If keyboard input is kept enabled when the GFN virtual keyboard is on,
     * inputs meant to navigate it will affect the stream unintentionally.
     * So utilize keydown/keyup methods for GFN virtual Keyboard input only.
     */
    sendKeyEvent(event: KeyboardEvent): void;
    private sendSafeZone;
    private clearSafeZoneTimeout;
    private sendMouseDown;
    private sendMouseUp;
    onSendInput(): boolean;
    getInputMode(): string;
    setShouldDrawCursor(draw: boolean): void;
    toggleGamepadTester(): void;
}
