import { authTokenCallbackType, ErrorDetails, DeviceOS, DeviceType } from "./dependencies";
import * as PM from "./schemas/pminterfaces.generated";
export declare const CLIENT_VERSION = "28.0";
export declare const CLIENT_IDENTIFICATION = "GFN-PC";
export declare const enum ClientType {
    BROWSER = "BROWSER",
    GFNSDK = "GFNSDK",
    NATIVE = "NATIVE"
}
export declare const enum ClientStreamer {
    CLASSIC = "NVIDIA-CLASSIC",
    WEBRTC = "WEBRTC"
}
export import SESSIONMODIFY_ACTION = PM.Action;
export import AudioFormat = PM.AudioFormat;
export import SdrHdrMode = PM.SdrHdrMode;
export import Usage = PM.Usage;
export import Protocol = PM.Protocol;
export import AppLevelProtocol = PM.AppLevelProtocol;
export import ConnectionInfo = PM.ConnectionInfo;
export import AdState = PM.AdState;
export import AdAction = PM.AdAction;
export import AdUpdate = PM.AdUpdate;
export import AdData = PM.SessionAdData;
export import SessionAdMediaFileData = PM.SessionAdMediaFileData;
export import MonitorSettings = PM.MonitorSettings;
export import StreamingFeatures = PM.StreamingFeatures;
export import BitDepth = PM.BitDepth;
/** GsInitParams object structure used to initialize GridApp class object for streaming purpose
 * Consider all fields mandatory for production. Majority of the fields should be according to the POR as defined
 * in https://docs.google.com/document/d/1MGe199idCH1jbFns0NrIBVayJTqE2QxOS69uFBVQKyI/edit#bookmark=id.4oj2lbotllf7
 * request Headers section.
 */
export declare interface GsInitParams {
    /** clientIdentification like "GFN-PC" will probably change in future*/
    clientIdentification: string;
    /**Version of this client eg. 16.0*/
    clientVersion: string;
    /**Version of the client application like 2.0.29.123*/
    clientAppVersion?: string;
    /**indicates the deviceHashId */
    deviceHashId?: string;
    /**indicates the zone to connect to */
    serverAddress: string;
    /**Indicates client platform name, every platform should have separate string*/
    clientPlatformName: string;
    /**Indicates client type*/
    clientType: ClientType;
    /**
     * @deprecated
     * App useragent string needed for field x-nv-client-identity. For eg, in ragnarok it looks like
     * "GFN-PC/16.0 (WebRTC) Ragnarok/Local MacOSX/10_15_7 Chrome/90.0.4430.93 (master-2347481)"
     */
    appUserAgent?: string;
    /**Indicates Device OS enum string as defined in this file*/
    deviceOs: DeviceOS | undefined;
    /**Version of operating system. */
    deviceOsVer: string | undefined;
    /**Indicates Device Type enum string as defined in this file*/
    deviceType: DeviceType | undefined;
    /**Indicates Device make string*/
    deviceMake?: string;
    /**Indicates Device model string*/
    deviceModel?: string;
    /**An RFC 7231-compliant Accept-Language header string indicating a preference on the language used for the response data.*/
    acceptLanguage?: string;
    /**A string indicating if the client has ECOM enabled through GXTargeting. Default: "true". Valid values: "true", "false"*/
    ecomEnabled?: string;
    /**Indicates ClientStreamer enum string as defined in this file*/
    clientStreamer: ClientStreamer;
    /** The client ID registered in LCARS/Chroma for this client*/
    clientId?: string;
    /** The browser type registered in LCARS/Chroma for this client*/
    browserType?: string;
    /**  This function should return a promise and should be resolved when the client gets the auth/delegate token.
         resolve(authtoken) else reject().*/
    authTokenCallback?: authTokenCallbackType;
    /** Map representing application provided client headers.  If key is one of the default headers, value of header is overridden.
     * New headers are added as new headers. */
    clientHeaders?: Map<string, string>;
}
/**
 * An iterable/map of key value pairs sent to server as part of session setup/resume operation.
 */
export declare interface MetaData {
    [key: string]: string;
}
/**
 * Defines the mode in which gaming applications needs to be launched on the server.
 * Client applications are expected to select the modes based on supported controls by the gaming application and client capability.
 */
export declare const enum AppLaunchMode {
    /** For touch devices launches in GamepadFriendly mode else regular app launch. */
    Default = 0,
    /** Launches applications for primary control from gamepads. */
    GamepadFriendly = 1,
    /** Launches applications for primary control from touchscreen. */
    TouchFriendly = 2
}
/** interface used inside ActiveSessionResultEvent*/
export declare interface ActiveSessionInfo {
    sessionId: string;
    appId: number;
    state: string;
    /** Mode in which gaming application was launched on the server.
        This informs what type of input events the streaming session is capable of handling */
    appLaunchMode?: AppLaunchMode;
}
/**
 * Used in  SessionParams interface describing stream parameters needed.
 */
export declare interface StreamParam {
    width: number;
    height: number;
    fps: number;
    maxBitrateKbps?: number;
    drc?: boolean;
    videoTagId: string;
    audioTagId?: string;
    sendVideoTrack?: MediaStreamTrack;
}
/**
 * Session params need to be passed by client in startSession while starting a session.
 */
export declare interface SessionParams {
    appId: string;
    /** Short name that corresponds to the appId */
    shortName?: string;
    /** this contains details needed for stream as defined in JSON schema */
    monitorSettings?: MonitorSettings[];
    remoteControllersBitmap?: number;
    /** video stream parameters */
    streamParams?: StreamParam[];
    /** Layout specification for systems keyboard */
    keyboardLayout?: string;
    /** Device language in RFC 3066 code, but with '_' like en_US. http://www.i18nguy.com/unicode/language-identifiers.html */
    clientLocale?: string;
    /** Allows keyboard layout to be update during streaming. */
    allowKeyboardLayoutChange?: boolean;
    /** Random key value pairs to be sent to server */
    metaData?: MetaData;
    /** Gaming applications launch  mode on the server. */
    appLaunchMode?: AppLaunchMode;
    /** Indicates if the user has linked the platform account with NVIDIA Streaming Service */
    accountLinked?: boolean;
    /** Custom data sent from GFN partner applications, this data will be plumbed all the way to GameSeat. */
    partnerCustomData?: string;
    /** clientTime ZoneOffset in milliseconds, if client doesn't pass it's calculated from JS API which might be wrong on some platform like Android*/
    clientTimeZoneOffset?: number;
    requestedAudioFormat?: AudioFormat;
    /** NetworkTest SessionId if the network test was run for this session*/
    networkSessionId?: string;
    /** List of connection detail to server which include ports of audio, video etc.  Only valid with passthru streaming.  */
    connectionInfo?: ConnectionInfo[];
    /** Informs the server to save the graphics settings changes by users so that it can be applied in next streaming session for the same app. */
    enablePersistingInGameSettings?: boolean;
    /** sessionId to be sent as the auth token to signaling server.
        This parameter is no-op in GFN use cases as the GFN servers provide the session id.
        Applicable in passthru and other experimental use cases. */
    sessionId?: string;
    /** Users age in years required for Ads category selection. */
    userAge?: number;
    /**
     * Requested features to enable on the server. The server may choose to disable features that aren't supported or
     * allowed. The finalized negotiated features can be found in @see GridSession.finalizedStreamingFeatures
     */
    streamingFeatures?: StreamingFeatures;
    /** Additional HID input types that the game supports. See HidType for values. */
    additionalInputDevices?: number;
}
export declare const enum SessionState {
    INITILIAZING = "initializing",
    INITIALIZING = "initializing",
    READY_FOR_CONNECTION = "ready_for_connection",
    STREAMING = "streaming",
    PAUSED = "paused",
    RESUMING = "resuming",
    FINISHED = "finished",
    UNKNOWN = "unknown"
}
/**These are the states of PROGRESS_UPDATE */
export declare const enum SessionProgressState {
    /** Indicates connecting to the PM */
    CONNECTING = "Connecting",
    /** Indicates waiting in queue for seat availability */
    IN_QUEUE = "InQueue",
    /** Indicates configuration in progress */
    CONFIGURING = "Configuring",
    /** Indicates PM is cleaning up previous session */
    PREVIOUS_SESSION_CLEANUP = "PreviousSessionCleanup",
    /** Session is ready on server, starting streamer connection */
    STARTING_STREAMER = "StartingStreamer"
}
export declare const enum GS_EVENTS {
    /** Indicates session has started, failed if error field is there,
     * In success case result will contain list of sessions with sessionId.
     * Format is { error?: { code: RErrorCode}, sessionList: [ { sessionId: X, appId: X, state: X}] }
     */
    ACTIVE_SESSIONS_RESULT = "ActiveSessionsResult",
    /** Deprecated - Use SessionUpdate event.
     *  This event is used to give progress updates like eta, queue size,
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
    /**
     *Indicates analytics Event sent by library using split schema. Clients should expect TelemetryEventPayload object.
     */
    TELEMETRY_EVENT = "TelemetryEvent",
    /**
     *Indicates a log sent by the library
     */
    LOG_EVENT = "Log"
}
/** Event generated for GS_EVENTS.ACTIVE_SESSIONS_RESULT*/
export declare interface ActiveSessionResultEvent {
    sessionList: ActiveSessionInfo[];
    error?: ErrorDetails;
}
/** Deprecated - Use SessionUpdateEvent
 * Event generated for GS_EVENTS.PROGRESS_UPDATE*/
export declare interface SessionProgressUpdateEvent {
    sessionId: string;
    subSessionId: string;
    queuePosition: number;
    eta: number;
    state: string;
}
/** Event generated for GS_EVENTS.SESSION_UPDATE*/
export declare interface SessionUpdate {
    sessionId: string;
    subSessionId: string;
    progressState: SessionProgressState;
    queuePosition: number;
    eta: number;
    isAdsRequired?: boolean;
    ads: AdData[];
}
export declare type SessionUpdateEvent = SessionUpdate;
export declare interface ServerInfo {
    server?: string;
    ip?: string;
    port: number;
    protocol?: string;
}
/**
 * Information about a video stream received from the PM
 */
export declare interface StreamInfo {
    width: number;
    height: number;
    fps: number;
    sdrHdrMode?: SdrHdrMode;
}
/**
 * Representation of post/put/get session request's response object.
 * This object has minimum info needed by the client to communicate to GameSeat for streaming.
 * It's also useful in passing around between different components.
 **/
export declare interface GridSession {
    sessionId: string;
    subSessionId: string;
    signalConnectionInfo: ServerInfo;
    mediaConnectionInfo: ConnectionInfo[];
    streamInfo: StreamInfo[];
    appId: number;
    state: SessionState;
    appLaunchMode: AppLaunchMode;
    /** Name of zone that session was streamed from, extracted from sessionControlInfo.  In cases
     *  of failed session setup/resume requests, this is the name of the zone that handled the
     *  post/put request, extracted from requestStatus.*/
    zoneName: string;
    /** Address of the server that returned the session information. */
    zoneAddress: string;
    gpuType: string;
    /** Device language in RFC 3066 code, but with '_' like en_US. http://www.i18nguy.com/unicode/language-identifiers.html */
    clientLocale: string;
    /** Finalized streaming features negotiated by the server */
    finalizedStreamingFeatures?: StreamingFeatures;
}
export declare interface ServerError {
    code: number;
    sessionId?: string;
    description: string;
    sessionList?: ActiveSessionInfo[];
}
