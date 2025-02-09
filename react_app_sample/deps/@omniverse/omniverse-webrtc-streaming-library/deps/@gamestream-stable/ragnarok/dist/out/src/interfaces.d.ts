import { AppLaunchMode, ActiveSessionInfo, ErrorDetails, authTokenCallbackType, TelemetryEventPayload, ClientType, StreamInfo, TelemetryEventIds, TelemetryCommonData } from "./dependencies";
import { CursorType, MicState, Resolution, StreamStatistics, StreamQuality, StreamWarning, StreamWarningType, MediaTrackKind as TrackType } from "./nskinterfaces";
export declare const enum EVENTS {
    /** Indicates session has started, failed if error field is there
     * Format is {sessionId?: string, subSessionId?: string, error?: { code: RErrorCode} }
     * Note: in all of these events sessionId may only be there if possible.
     */
    SESSION_START_RESULT = "SessionStartResult",
    /** Indicates session has stopped with successful delete request to PM,
     * error field indicates delete request was not sent
     * Format is {sessionId?: string, subSessionId?: string, error?: { code: RErrorCode} }
     */
    SESSION_STOP_RESULT = "SessionStopResult",
    /** Indicates session has started, failed if error field is there,
     * In success case result will contain list of sessions with sessionId.
     * Format is { error?: { code: RErrorCode}, sessionList: [ { sessionId: X, appId: X, state: X}] }
     */
    ACTIVE_SESSIONS_RESULT = "ActiveSessionsResult",
    /** Deprecated - Use SessionUpdate event
     * This event is used to give progress updates like eta, queue size,
     * these updates will only come before SESSION_START_RESULT event.
     * Format is {
        sessionId: string,
        subSessionId: string,
        queuePosition: number,
        eta: number (milliseconds),
        state: SessionProgressState
        };
    */
    PROGRESS_UPDATE = "ProgressUpdate",
    /** This event provides the state of the session setup/resume process. Refer SessionUpdateEvent for event data */
    SESSION_UPDATE = "SessionUpdate",
    /** Indicates streaming termination, can only come after SESSION_START_RESULT, error field indicates
     * abnormal termination else intentional disconnect.
     * Format is {sessionId?: string, subSessionId?: string, error?: { code: RErrorCode} }
     */
    STREAM_STOPPED = "StreamStopped",
    /**
     *Indicates an Event sent by library during streaming like temporary disconnect or warnings.
     */
    STREAMING_EVENT = "StreamingEvent",
    /**
     *Deprecated
     */
    GETSESSIONRESULT = "GetSessionResult",
    /**
     *Indicates Event sent by library when getSession() request completes. Only used in resume scenarios.
     */
    GET_SESSION_RESULT = "GetSessionResult",
    /**
     *Indicates a log sent by the library
     */
    LOG_EVENT = "Log",
    STREAMING_QUALITY = "StreamingQuality",
    /** This event is used for updates in mic recorder state
     * Format is {
             state: MicState
       };
    */
    MIC_CAPTURE = "MicCapture",
    /**
     * This event is used for forwarding Extended Commands
     */
    CUSTOM_MESSAGE = "CustomMessage",
    /**
     * Indicates that text composition is in progress
     * An event where compositionText is empty will be sent when composition has ended
     */
    TEXT_COMPOSITION = "TextComposition",
    /**
     * Indicates streaming stats are updated
     */
    STREAM_STATS_UPDATE = "StreamStatsUpdate",
    /**
     * This event is used for forwarding the Analytics Events generated by library. Clients should expect TelemetryEventPayload object.
     *
     * Clients should dispatch the received events using the ClientTelemetryConfig in the TelemetryEventPayload object.
     * Events can have different telemetry configurations based on how the library is configured.
     *
     * If clients do not register for this, Ragnarok library will dispatch the telemetry events from within.
     *
     * Note: For handling Stream Exit events, client should pass a clientShutDownCallback in the initParams.
     * Care should be taken to dispatch the exit events reliably as streaming yield metrics are based on these telemetry events.
     */
    TELEMETRY_EVENT = "TelemetryEvent"
}
export declare const enum HotkeyModifier {
    None = 0,
    Ctrl = 1,
    Alt = 2,
    Meta = 4,
    Shift = 8,
    Default = 128
}
export declare interface HotkeyKeyWithKeyName {
    key: string;
    code?: never;
}
export declare interface HotkeyKeyWithCodeName {
    key?: never;
    code: string;
}
declare interface HotkeyModifierKey {
    modifiers: HotkeyModifier;
}
export declare type LocalHotkeyModifierAndKey = HotkeyModifierKey & (HotkeyKeyWithKeyName | HotkeyKeyWithCodeName);
export declare type RemoteHotkeyModifierAndKey = HotkeyModifierKey & HotkeyKeyWithCodeName;
/**
 * Hotkey sequences to be used to send unobtainable keys to the session.
 *
 * A local sequence of keys - consisting of one or more modifiers and one
 * 'main' key - is translated to a sequence in session of zero or more
 * modifiers and one 'main' key.
 * Only one sequence per local 'main' key is possible.
 *
 * The local property defines what key and modifiers must be pressed
 * by the user for the hotkey to take effect.
 * The local key can be specified as a modifier and:
 * - a value from the UIEvent's key property, which is normally a
 *   character value.
 * - a key position, from the UIEvent's code property.  These positions
 *   do not change with logical layout.
 * Note: some key values are present only on specific systems or logical
 * layouts, or can only be generated in combination with certain modifiers on
 * some systems or with some logical layouts.
 * Note: some code values are not present on some physical layouts - for
 * example, IntlBackslash is not present on physical US ANSI layouts,
 * and IntlYen  is only present on physical Japanese layouts.
 * Note: on macOS if the physical layout has the IntlBackslash position,
 * in Safari that key and Backquote have swapped locations compared to
 * every other browser or system.
 *
 * There must be at least one modifier specified from the bitmask of
 * hotkey modifiers.
 * The Default modifier option is Cmd on macOS and Ctrl on other systems.
 *
 *
 * The remote property defines what key combination is produced in-session
 * when the local combination is pressed.
 * The in-session key is specified as a key location from the UIEvent's code
 * property.
 * It is not possible to specify an exact character to enter.
 * Modifiers are permitted but not needed for the remote key sequence.
 * If specified, remote modifiers will be pressed and held whilst the remote
 * key is pressed and released, before the modifiers are released.
 * The exact sequence of remote modifiers (that is, which modifier is pressed
 * first in any sequence) is not able to be specified and is an
 * implementation detail.
 */
export declare interface Hotkey {
    local: LocalHotkeyModifierAndKey;
    remote: RemoteHotkeyModifierAndKey;
}
/**
 * Input configuration flags.
 * Intended for debugging purposes; leave at defaults.
 */
export declare interface InputConfigFlags {
    cursorType?: CursorType;
    allowUnconfined: boolean;
    preventNavigation?: boolean;
    streamingHotkeys?: Hotkey[];
    windowedStreaming?: boolean;
    unadjustedMovement?: boolean;
}
export declare const defaultInputConfigFlags: InputConfigFlags;
export declare interface clientShutDownCallbackType {
    (exitEventPayload: TelemetryEventPayload): boolean;
}
/**
 * Interface representing video streaming settings
 */
export declare interface StreamingSettings {
    resolution: StreamingResolution;
    frameRate: number;
}
export declare const enum StreamingProfilePreset {
    BALANCED = 0,
    DATASAVER = 1,
    COMPETITIVE = 2
}
export { TrackType };
export declare interface Track {
    kind: TrackType;
    trackId?: string;
}
/** This is passed in StartSessionResult for client to call play on appropriate media element.
 * Client may need to show a bridge state to get user gesture for successful play call and hence get
 * around browser play policies. Client should also handle all success/fail cases with correct screens/UX and telemetry.
 */
export declare interface Stream {
    streamId: string;
    tracks: Track[];
}
/** Event generated for EVENTS.SESSION_START_RESULT*/
export declare interface StartSessionResultEvent {
    sessionId: string;
    subSessionId: string;
    error?: ErrorDetails;
    sessionList?: ActiveSessionInfo[];
    streams?: Stream[];
    streamInfo?: StreamInfo[];
    zoneName: string;
    zoneAddress: string;
    gpuType: string;
    isResume: boolean;
}
/** Event generated for EVENTS.SESSION_STOP_RESULT*/
export declare interface StopSessionResultEvent {
    sessionId: string;
    subSessionId: string;
    error?: ErrorDetails;
    framesDecoded?: number;
}
/** Event generated for EVENTS.GET_SESSION_RESULT*/
export declare interface GetSessionResult {
    sessionId: string;
    subSessionId: string;
    appId?: number;
    status?: string;
    state?: string;
    error?: ErrorDetails;
    appLaunchMode?: AppLaunchMode;
}
/** Event generated for EVENTS.STREAM_STOPPED*/
export declare interface StreamingTerminatedEvent {
    sessionId: string;
    subSessionId: string;
    exitcode?: number;
    error: ErrorDetails;
    isResumable?: boolean;
    zoneName: string;
    zoneAddress: string;
}
/** Interface for handling the Gamepad packet updates */
export interface GamepadDataHandler {
    gamepadBitmapUpdateHandler(gamepadBitmap: number): void;
    gamepadStateUpdateHandler(count: number, localIndex: number, serverIndex: number, buttons: number, trigger: number, axes: readonly number[], ts: number, gamepadBitmap: number, name: string): void;
    finalizeGamepadData(xinputCount: number, hidCount?: number): void;
    virtualGamepadUpdateHandler(buttons: number, trigger: number, index: number, axes: readonly number[], gamepadBitmap: number): void;
    connectUnsupportedGamepad(gamepad: Gamepad): void;
    disconnectUnsupportedGamepad(index: number): void;
    sendGamepadHapticsControl?(enable: boolean): void;
    addSonyDualSenseHid?(index: number): void;
    removeSonyDualSenseHid?(index: number): void;
    addSonyDualShock4Hid?(index: number): void;
    removeSonyDualShock4Hid?(index: number): void;
    dualShock4StateUpdateHandler?(localIndex: number, index: number, buttons: number, trigger: number, axes: readonly number[], ts: number, gamepadBitmap: number, name: string): void;
}
export interface VibrationHandler {
    handleSimpleXInputVibration(index: number, leftMotorSpeed: number, rightMotorSpeed: number): void;
    handleSimpleDS4Vibration(index: number, leftMotorSpeed: number, rightMotorSpeed: number): void;
}
export declare interface Zoneless {
    windowAddEventListener?: Function;
    windowRemoveEventListener?: Function;
    documentAddEventListener?: Function;
    documentRemoveEventListener?: Function;
    videoAddEventListener?: Function;
    videoRemoveEventListener?: Function;
}
export declare const enum STREAMING_STATE {
    RECONNECTING = "reconnecting",
    RECONNECTED = "reconnected"
}
export declare interface StreamingStateLegacy {
    state: string;
}
export declare type StreamingWarnings = StreamWarning;
export declare type StreamingQuality = StreamQuality;
export declare type StreamUpdateEvent = StreamStatistics;
export declare type StreamingResolution = Resolution;
export { StreamWarningType as RNotificationCode };
/** Event generated for EVENTS.STREAMING_EVENT*/
export declare interface StreamingEvent {
    streamingState?: StreamingStateLegacy;
    streamingWarnings?: StreamingWarnings;
}
/** InitParams object structure used to initialize GridApp class object for streaming purpose
 * Consider all fields mandatory for production.
 */
export declare interface InitParams {
    /** clientIdentification like GFN-PC will probably change in future*/
    clientIdentification?: string;
    /**Version of this client */
    clientVersion?: string;
    /**Version of the client application */
    clientAppVersion?: string;
    /**indicates the deviceHashId */
    deviceHashId?: string;
    /**indicates the zone to connect to */
    serverAddress: string;
    /**  This function should return a promise and should be resolved when the client gets the auth/delegate token.
         resolve(authtoken) else reject().*/
    authTokenCallback?: authTokenCallbackType;
    /** Used to give callback to client in case tab is closed during streaming */
    clientShutDownCallback?: clientShutDownCallbackType;
    /** Tag of an input field that should be listened to for input, main use case is for TVs' software keyboards */
    textInputElement?: HTMLInputElement;
    /** Map representing application provided client headers.  If key is one of the default headers, value of header is overridden.
     * New headers are added as new headers. */
    clientHeaders?: Map<string, string>;
    /** Indicates client type.
     * See gridserver-core/src/interfaces.ts for definition.
     * If none is provided, ClientType.BROWSER will be used */
    clientType?: ClientType;
    /** Registered client ID for this client */
    clientId?: string;
    /**
     * Whether the stream will be used in windowed mode. If the stream might be used in both windowed and fullscreen
     * mode, this should still be set to true
     */
    windowedStreaming?: boolean;
    /** Indicates the cursor type to use for the session. If unspecified, will be inferred from windowedStreaming */
    cursorType?: CursorType;
}
/**
 * Event data returned by mic
 */
export declare interface MicStateEvent {
    state: MicState;
}
export declare type JsEventsCommonData = TelemetryCommonData;
export declare interface JsEventsConfig {
    server: string;
    version: string;
}
/**
 * This is the root interface used by client to pass common telemetry data to ragnarok.
 */
export declare interface EventDataElements {
    commonData?: JsEventsCommonData;
    experiments?: object;
    config?: JsEventsConfig;
    telemetryEventIds?: TelemetryEventIds;
}
