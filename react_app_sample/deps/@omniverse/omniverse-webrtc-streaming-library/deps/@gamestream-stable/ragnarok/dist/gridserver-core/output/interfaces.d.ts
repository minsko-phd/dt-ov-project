import { authTokenCallbackType, ErrorDetails, DeviceOS, DeviceType } from "./dependencies";
export declare const enum ClientType {
    BROWSER = "BROWSER",
    GFNSDK = "GFNSDK",
    NATIVE = "NATIVE"
}
export declare const enum ClientStreamer {
    CLASSIC = "NVIDIA-CLASSIC",
    WEBRTC = "WEBRTC"
}
export declare const enum SdrHdrMode {
    SDR = 0,
    HDR = 1,
    EDR = 2
}
export declare const enum AudioFormat {
    UNKNOWN = 0,
    STEREO = 1,
    UP_TO_5_1_SURROUND_PCM = 2,
    UP_TO_7_1_SURROUND_PCM = 3
}
/** GsInitParams object structure used to initialize GridApp class object for streaming purpose
 * Consider all fields mandatory for production. Mojority of the fields should be according to the POR as defined
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
    /**Indicates clientplatform name, every platform should have seperate string*/
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
    /**A string indicating if the client has ecom enabled through GXTargeting. Default: "true". Valid values: "true", "false"*/
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
    /** Map representing application provided client headers.  If key is one of the default headers, value of header is overriden.
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
    audioTagId: string;
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
    /** clientTime ZoneOffset in milleseconds, if client doesn't pass it's calculated from JS API which might be wrong on some platform like Android*/
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
    accessToken?: string;
    /** Users age in years required for Ads category selection. */
    userAge?: number;
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
export declare interface SessionUpdateEvent {
    sessionId: string;
    subSessionId: string;
    progressState: SessionProgressState;
    queuePosition: number;
    eta: number;
}
/**
 * Event interface for Http events sent for all non- peroidic http calls in library
 */
export declare interface TelemetryHttpEvent {
    url: string;
    verb: string;
    statusCode: string;
    requestStatusCode: string;
    sessionId: string;
    subSessionId: string;
    requestId: string;
    serverId: string;
    callDuration: number;
}
/**
 * Event interface for Debug events sent
 */
export declare interface TelemetryDebugEvent {
    sessionId: string;
    subSessionId: string;
    key1?: string;
    key2?: string;
    key3?: string;
    key4?: string;
    key5?: string;
}
/**
 * Event schema config to be used for dispatching the events. This is included in
 * TelemetryEventPayload for every event emitted using GS_EVENTS.TELEMETRY_EVENT
 */
export declare interface ClientTelemetryConfig {
    /** The telemetry client's name as defined in the event schema*/
    clientName: string;
    /** The telemetry client's Id as defined in the event schema*/
    clientId: string;
    /** The telemetry client's event schema version*/
    eventSchemaVer: string;
}
/**
 * Event payload interface for all Telemetry events being forwarded.
 * Clients should dispatch the event based on the clientConfig in the payload
 */
export declare interface TelemetryEventPayload {
    /** Event name as per the schema*/
    name: string;
    /** Event payload as per the schema*/
    parameters: any;
    /** Event gdpr level as per the schema*/
    gdprLevel: string;
    /** Timestamp when the event was emitted*/
    ts: string;
    /** Schema config to be used for dispatching the event*/
    clientConfig: ClientTelemetryConfig;
}
/**
 * Interface used in GridServer.updateTelemetryEventIds called from the upper layers to update the telemetry eventIds.
 * These eventIds are typically sent with other events from the different modules and schemas. Clients might have to
 * call these before every streaming session so that we always have the Ids of the latest events. Wherever required,
 * we pass on these eventids in our event payloads and later use
 */
export declare interface TelemetryEventIds {
    /** An UUID sent with every streaming profile event sent */
    streamingProfileGuid?: string;
    /** An UUID sent with every systemInfo event sent */
    systemInfoGuid?: string;
}
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
 * Repesentation of post/put/get session request's response object.
 * This object has minimum info needed by the client to communicate to gameseat for game launch.
 * It's also useful in passing around between different components.
 **/
export declare interface GridSession {
    sessionId: string;
    accessToken?: string;
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
}
export declare interface ServerError {
    code: number;
    sessionId?: string;
    description: string;
    sessionList?: ActiveSessionInfo[];
}
export declare const enum SESSIONMODIFY_ACTION {
    UNKNOWN = 0,
    PAUSE = 1,
    RESUME = 2,
    SESSION_RATING = 3,
    JOIN = 4,
    FORWARD = 5
}
export declare const enum Usage {
    UNKNOWN = 0,
    CONTROL = 1,
    VIDEO = 2,
    AUDIO = 3,
    INPUT = 4,
    CUSTOM = 5,
    USB = 6,
    RTSP = 7,
    GAMESTREAM_CONTROL = 8,
    GAMESTREAM_SECURE_CONTROL = 9,
    SESSION_CONTROL = 10,
    NETWORK_TEST_CONTROL = 11,
    RTSPRU = 12,
    AUDIO_INPUT = 13,
    SIGNALING = 14,
    MEDIA = 15,
    RTSPS = 16,
    BUNDLE = 17
}
export declare const enum Protocol {
    UNKNOWN = 0,
    TCP = 1,
    UDP = 2
}
export declare const enum AppLevelProtocol {
    UNKNOWN = 0,
    RTSP = 1,
    HTTP = 2,
    RTSPRU = 3,
    SOCKET = 4,
    HTTPS = 5,
    RTSPS = 6
}
export declare interface ConnectionInfo {
    ip: string;
    port: number;
    appLevelProtocol: AppLevelProtocol;
    usage: Usage;
    protocol: Protocol;
    resourcePath?: string;
}
/**
 * Information about a video stream to be requested from the PM
 */
export declare interface MonitorSettings {
    monitorId?: number;
    positionX?: number;
    positionY?: number;
    widthInPixels: number;
    heightInPixels: number;
    dpi?: number;
    framesPerSecond: number;
    sdrHdrMode?: SdrHdrMode;
}
