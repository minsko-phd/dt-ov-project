export declare const enum Controller {
    UNKNOWN = 0,
    MOUSE = 1,
    MOUSE_KEYBOARD = 2,
    X_INPUT_GAMEPAD = 3,
    DIRECT_INPUT_GAMEPAD = 4,
    JOYSTICK = 5,
    WHEEL = 6,
    TOUCHSCREEN = 7,
    WII_CONTROLLER = 8,
    KINECT_CONTROLLER = 9,
    KEYBOARD = 10,
    X_INPUT_GAMEPAD_PARTIAL = 11,
    DIRECT_INPUT_GAMEPAD_PARTIAL = 12,
    DUALSHOCK4_GAMEPAD = 13,
    DUALSENSE_GAMEPAD = 14
}
export declare const enum SdrHdrMode {
    SDR = 0,
    HDR = 1,
    EDR = 2
}
export declare const enum AudioMode {
    UNKNOWN = 0,
    LOCAL = 1,
    REMOTE = 2
}
export declare const enum Static_metadata_descriptor_id {
    NV_STATIC_METADATA_TYPE_1 = 0
}
export declare const enum EnhancedStreamMode {
    UNKNOWN = 0,
    DEFAULT = 1,
    TURBO = 2
}
export declare const enum AppLaunchMode {
    UNKNOWN = 0,
    DEFAULT = 1,
    GAMEPAD_FRIENDLY = 2,
    TOUCH_FRIENDLY = 3
}
export declare const enum AudioFormat {
    UNKNOWN = 0,
    STEREO = 1,
    UP_TO_5_1_SURROUND_PCM = 2,
    UP_TO_7_1_SURROUND_PCM = 3
}
export declare const enum BitDepth {
    BIT_DEPTH_8 = 0,
    BIT_DEPTH_10 = 1
}
export declare const enum SeatSetupStep {
    UNKNOWN = 0,
    WAITING_FOR_RESOURCE = 1,
    CONFIGURING_SEAT = 2,
    STARTING_GAME = 3,
    PLAYING = 4,
    WAITING_FOR_PREVIOUS_SESSION_CLEANUP = 5
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
export declare const enum AdState {
    UNKNOWN = 0,
    NOT_STARTED = 1,
    STARTED = 2,
    PAUSED = 3,
    RESUMED = 4,
    FINISHED = 5,
    CANCELED = 6
}
export declare const enum Status {
    UNKNOWN = 0,
    INITIALIZING = 1,
    READY_FOR_CONNECTION = 2,
    PLAYING = 3,
    PAUSED_UNINTENTIONAL = 4,
    PAUSED_INTENTIONAL = 5,
    RESUMING = 6,
    FINISHED = 7
}
export declare const enum ErrorCode {
    UNKNOWN = 0,
    OK = 1,
    UNKNOWN_ERROR = 2,
    QUEUE_FAILURE = 3,
    SEAT_ASSIGNMENT_FAILURE = 4,
    EXECUTABLE_NOT_FOUND = 5,
    APP_FAILED_TO_START = 6,
    STREAMER_CRASHED = 7,
    STREAMER_CONNECTION_TIMEOUT = 8,
    STREAMER_FAILED_TO_START = 9,
    KEY_FRAME_DETECTION_FAILED = 10,
    CANCELLED = 11,
    KEY_FRAME_NOT_FOUND = 12,
    INVALID_KEY_FRAME_TIMEOUT = 13,
    EXECUTE_SETUP_COMMAND_FAILED = 14,
    MISSING_ENV_VARIABLE = 15,
    CLIENT_CONNECTION_TIMEOUT = 16,
    RESOLUTION_CHANGE_FAILED = 17,
    INVALID_PERF_CLASS = 18,
    INVALID_PER_RES = 19,
    CLIENT_RECONNECTION_TIMEOUT = 20,
    STREAMER_RECONNECTION_TIMEOUT = 21,
    FAILED_TO_UPDATE_USERSTATE_FILE = 22,
    USER_STATE_SAVE_FAILED = 23,
    USER_STATE_RESTORE_FAILED = 24,
    LIBRARY_NOT_FOUND = 25,
    SEAT_SETUP_FAILED = 26,
    DYNAMIC_NAT_SETUP_FAILED = 27,
    ALL_SEAT_CLASSES_FENCED = 28,
    CLIENT_ERROR = 29,
    INVALID_EXPECTED_STATE = 30,
    STALE_SESSION = 31,
    CONNECTION_FAILED_DISPOSE = 32,
    INVALID_USERNAME_HASH = 33,
    STATE_MACHINE_EXCEPTION = 34,
    UNSPECIFIED_TIMEOUT = 35,
    STREAM_HANDLER_EXCEPTION = 36,
    STREAM_ATTEMPT_FAILED = 37,
    WINDOW_FOCUS_VIOLATION = 38,
    STREAMER_ERROR = 39,
    GFE_ERROR = 40,
    GAME_NOT_RUNNING = 41,
    GAME_NOT_FOUND = 42,
    GAME_MINIMIZED = 43,
    GAME_STARTED_LOCALLY = 44,
    GAME_LAUNCHER_FAILED = 45,
    PRIMARY_DISPLAY_ERROR = 46,
    NVFBC_ERROR = 47,
    NO_ACTIVE_USER = 48,
    STEAM_USER_IS_NOT_LOGGED_IN = 49,
    SERVER_LOCKED = 50
}
export declare const enum StatusCode {
    UNKNOWN = 0,
    SUCCESS_STATUS = 1,
    FORBIDDEN_STATUS = 2,
    TIMEOUT_STATUS = 3,
    INTERNAL_ERROR_STATUS = 4,
    INVALID_REQUEST_STATUS = 5,
    INVALID_REQUEST_VERSION_STATUS = 6,
    SESSION_LIST_LIMIT_EXCEEDED_STATUS = 7,
    INVALID_REQUEST_DATA_MALFORMED_STATUS = 8,
    INVALID_REQUEST_DATA_MISSING_STATUS = 9,
    REQUEST_LIMIT_EXCEEDED_STATUS = 10,
    SESSION_LIMIT_EXCEEDED_STATUS = 11,
    INVALID_REQUEST_VERSION_OUT_OF_DATE_STATUS = 12,
    SESSION_ENTITLED_TIME_EXCEEDED_STATUS = 13,
    AUTH_FAILURE_STATUS = 14,
    INVALID_AUTHENTICATION_MALFORMED_STATUS = 15,
    INVALID_AUTHENTICATION_EXPIRED_STATUS = 16,
    INVALID_AUTHENTICATION_NOT_FOUND_STATUS = 17,
    ENTITLEMENT_FAILURE_STATUS = 18,
    INVALID_APP_ID_NOT_AVAILABLE_STATUS = 19,
    INVALID_APP_ID_NOT_FOUND_STATUS = 20,
    INVALID_SESSION_ID_MALFORMED_STATUS = 21,
    INVALID_SESSION_ID_NOT_FOUND_STATUS = 22,
    EULA_UNACCEPTED_STATUS = 23,
    MAINTENANCE_STATUS = 24,
    SERVICE_UNAVAILABLE_STATUS = 25,
    STEAM_GUARD_REQUIRED_STATUS = 26,
    STEAM_LOGIN_REQUIRED_STATUS = 27,
    STEAM_GUARD_INVALID_STATUS = 28,
    STEAM_PROFILE_PRIVATE_STATUS = 29,
    INVALID_COUNTRY_CODE = 30,
    INVALID_LANGUAGE_CODE = 31,
    MISSING_COUNTRY_CODE = 32,
    MISSING_LANGUAGE_CODE = 33,
    SESSION_NOT_PAUSED = 34,
    INVALID_AUTHENTICATION_EMAIL_NOT_VERIFIED_STATUS = 35,
    INVALID_AUTHENTICATION_UNSUPPORTED_PROTOCOL_STATUS = 36,
    INVALID_AUTHENTICATION_UNKNOWN_TOKEN_STATUS = 37,
    INVALID_AUTHENTICATION_CREDENTIALS_STATUS = 38,
    SESSION_NOT_PLAYING = 39,
    INVALID_SERVICE_RESPONSE_STATUS = 40,
    APP_PATCHING_STATUS = 41,
    GAME_NOT_FOUND_IN_ZONE = 42,
    NOT_ENOUGH_CREDITS = 43,
    INVITATION_ONLY_REGISTRATION = 44,
    REGION_NOT_SUPPORTED_FOR_REGISTRATION = 45,
    SESSION_TERMINATED_BY_ANOTHER_CLIENT = 46,
    DEVICEID_IS_ALREADY_USED = 47,
    SERVICE_NOT_EXIST_STATUS = 48,
    SESSION_EXPIRED = 49,
    SESSION_LIMIT_PER_DEVICE_EXCEEDED_STATUS = 50,
    FORWARDING_ZONE_OUT_OF_CAPACITY = 51,
    REGION_NOT_SUPPORTED_INDEFINITELY = 52,
    REGION_BANNED = 53,
    REGION_ON_HOLD_FOR_FREE = 54,
    REGION_ON_HOLD_FOR_PAID = 55,
    APP_MAINTENANCE_STATUS = 56,
    FORWARD__REQUEST_RESOURCE_POOL_NOT_CONFIGURED = 57,
    FORWARD__REQUEST_INSUFFICIENT_VM_CAPACITY = 58,
    FORWARD__REQUEST_INSUFFICIENT_ROUTE_CAPACITY = 59,
    FORWARD__REQUEST_INSUFFICIENT_SCRATCH_SPACE_CAPACITY = 60,
    INSTANCE_TYPE_NOT_SUPPORTED_IN_REGION = 61,
    SESSION_QUEUE_LENGTH_EXCEEDED = 62,
    REGION_NOT_SUPPORTED_FOR_STREAMING = 63,
    FORWARD__REQUEST_ALLOCATION_TIME_EXPIRED = 64,
    FORWARD__GAME_BINARIES_NOT_AVAILABLE = 65,
    SESSION_GAME_BINARIES_NOT_AVAILABLE_IN_REGION = 66,
    UEK_RETRIEVAL_FAILED = 67,
    ENTITLEMENT_FAILURE_FOR_RESOURCE_STATUS = 68,
    SESSION_REQUEST_IN_QUEUE_ABANDONED = 69,
    MEMBER_TERMINATED = 70,
    SESSION_REMOVED_FROM_QUEUE_MAINTENANCE = 71,
    ZONE_MAINTENANCE_STATUS = 72,
    GUEST_MODE_CAMAPAIGN_DISABLED = 73,
    REGION_NOT_SUPPORTED_FOR_STREAMING_BECAUSE_OF_ANONYMOUS_ACCESS = 74,
    INSTANCE_TYPE_NOT_SUPPORTED_IN_SINGLE_REGION = 75,
    FORWARD__REQUEST_INSUFFICIENT_CSS_CAPACITY = 76,
    INVALID_RESOURCE_ID_NOT_FOUND_STATUS = 77,
    INVALID_ZONE_FOR_QUEUED_SESSION = 78,
    SESSION_WAITING_ADS_TIME_EXPIRED = 79,
    USER_CANCELED_WATCHING_ADS = 80,
    STREAMING_NOT_ALLOWED_IN_LIMITED_MODE = 81,
    FORWARD__REQUEST_JPM_FAILED = 82,
    MAX_SESSION_NUMBER_LIMIT_EXCEEDED = 83,
    GUEST_MODE_PARTNER_CAPACITY_DISABLED = 84
}
export declare const enum Action {
    UNKNOWN = 0,
    PAUSE = 1,
    RESUME = 2,
    SESSION_RATING = 3,
    JOIN = 4,
    FORWARD = 5,
    AD_UPDATE = 6,
    TRANSFER = 7
}
export declare const enum AdAction {
    UNKNOWN = 0,
    START = 1,
    PAUSE = 2,
    RESUME = 3,
    FINISH = 4,
    CANCEL = 5
}
export declare interface MonitorSettings {
    /** id of the virtual monitor */
    monitorId?: number;
    /** X position for the monitor */
    positionX?: number;
    /** Y position for the monitor */
    positionY?: number;
    /** Horizontal resolution in pixels */
    widthInPixels: number;
    /** Vertical resolution in pixels */
    heightInPixels: number;
    /** pixel density */
    dpi?: number;
    /** Maximum number of frames per second that monitor can handle */
    framesPerSecond: number;
    /** optional, client can request SDR, HDR, or EDR modes for this session launch. */
    sdrHdrMode?: SdrHdrMode;
}
export declare interface MetaData {
    key?: string;
    value?: string;
}
export declare interface DisplayDataInfo {
    /** x coordinate of color primary 0 (e.g. Red) of mastering display ([0x0000-0xC350] = [0.0 - 1.0]) */
    displayPrimaryX0?: number;
    /** y coordinate of color primary 0 (e.g. Red) of mastering display ([0x0000-0xC350] = [0.0 - 1.0]) */
    displayPrimaryY0?: number;
    /** x coordinate of color primary 1 (e.g. Green) of mastering display ([0x0000-0xC350] = [0.0 - 1.0]) */
    displayPrimaryX1?: number;
    /** y coordinate of color primary 1 (e.g. Green) of mastering display ([0x0000-0xC350] = [0.0 - 1.0]) */
    displayPrimaryY1?: number;
    /** x coordinate of color primary 2 (e.g. Blue) of mastering display ([0x0000-0xC350] = [0.0 - 1.0]) */
    displayPrimaryX2?: number;
    /** y coordinate of color primary 2 (e.g. Blue) of mastering display ([0x0000-0xC350] = [0.0 - 1.0]) */
    displayPrimaryY2?: number;
    /** x coordinate of white point of mastering display ([0x0000-0xC350] = [0.0 - 1.0]) */
    displayWhitePointX?: number;
    /** y coordinate of white point of mastering display ([0x0000-0xC350] = [0.0 - 1.0]) */
    displayWhitePointY?: number;
    /** Maximum display luminance ([0x01-0xFF] cd/m^2) */
    desiredContentMaxLuminance?: number;
    /** Minimum display luminance ([]) */
    desiredContentMinLuminance?: number;
    /** Desired maximum Frame-Average Light Level (MaxFALL) ([0x0001-0xFFFF] = [1.0 - 65535.0] cd/m^2) */
    desiredContentMaxFrameAverageLuminance?: number;
}
export declare interface ClientHdrCapabilities {
    /** Version of this structure */
    version?: number;
    /** This is 32 bits mapping to multiple bit-fields flag defined in NV_HDR_CAPABILITIES nvapi.h */
    hdrEdrSupportedFlagsInUint32?: number;
    /** Static Metadata Descriptor Id */
    static_metadata_descriptor_id?: Static_metadata_descriptor_id;
    /** describing client display data */
    display_data?: DisplayDataInfo;
}
export declare interface StreamingFeatures {
    /** State of Reflex feature */
    reflex?: boolean;
    /** Color & encoding bit depth */
    bitDepth?: BitDepth;
    /** State of Cloud Gsync feature */
    cloudGsync?: boolean;
    /** L4S is enabled */
    enabledL4S?: boolean;
    /** Supported HID devices bitmask */
    supportedHidDevices?: number;
}
export declare interface SessionRequestData {
    /** AppId that matches App Id in the list of applications */
    appId: number;
    /** Human readable name */
    internalTitle?: string;
    availableSupportedControllers?: Controller[];
    /** deprecated */
    preferredController?: Controller;
    networkTestSessionId?: string;
    /** optional parent session id, if the session request is created from a broker to GameStream server, or as part of the CoPlay */
    parentSessionId?: string;
    clientIdentification?: string;
    /** SHA1 of the device serial number */
    deviceHashId: string;
    clientVersion: string;
    sdkVersion?: string;
    streamerVersion?: string;
    clientPlatformName: string;
    /** client can request monitor setting from a list of supported settings for each monitor */
    clientRequestMonitorSettings: MonitorSettings[];
    /** optional identifier that indicates if optimum playable settings should be used */
    useOps?: boolean;
    /** if set to 'LOCAL', audio is played on the server, REMOTE indicates that audio is played on the client */
    audioMode?: AudioMode;
    /** optional array of key-value pairs. this may be used by gamestream to provide keys for input encryption */
    metaData?: MetaData[];
    /** deprecated, refer clientRequestMonitorSettings.sdrhdrmode */
    sdrHdrMode?: SdrHdrMode;
    /** deprecated, refer clientRequestMonitorSettings.sdrhdrmode */
    clientDisplayHdrCapabilities?: ClientHdrCapabilities;
    surroundAudioInfo?: number;
    remoteControllersBitmap: number;
    /** Optional information about local timezone of the client, used to set timezone on the server for game play (offset specified in ms) */
    clientTimezoneOffset: number;
    /** deprecated */
    enhancedStreamMode?: EnhancedStreamMode;
    /** Optional, indicates the application launch mode. For steam GAMEPAD_FRIENDLY mode = Steam Big Picture */
    appLaunchMode?: AppLaunchMode;
    /** Optional, indicates the client can support secure RTSP protocol. */
    secureRTSPSupported?: boolean;
    /** Partner custom data. */
    partnerCustomData?: string;
    /** Indicates whether this session is run with partner account linking */
    accountLinked?: boolean;
    /** Member preference to persist the game settings or not */
    enablePersistingInGameSettings?: boolean;
    requestedAudioFormat?: AudioFormat;
    /** User age in years */
    userAge?: number;
    /** Streaming features requested by client */
    requestedStreamingFeatures?: StreamingFeatures;
}
export declare interface SeatSetupInfo {
    /** Position in the queue if session is waiting for resources, zero if resource is allocated. The value is eventually consistent due to the server using cached queue data. (e.g position could appear to increase in subsequent calls) */
    queuePosition?: number;
    /** Estimated completion time in milliseconds of the seat setup step */
    seatSetupEta?: number;
    /** identifier for what is currently happening on the server while user is waiting */
    seatSetupStep: SeatSetupStep;
}
export declare interface ConnectionInfo {
    /** IP addresses that will be used to connect */
    ip: string;
    port: number;
    protocol: Protocol;
    /** application level protocol */
    appLevelProtocol: AppLevelProtocol;
    /** path to the resource on the server, url for the resource is: appLevelProtocol://ip:port/resourcePath */
    resourcePath?: string;
    /** Intended usage for this connect i.e. RTSP */
    usage: Usage;
}
export declare interface SessionAdMediaFileData {
    /** Media file URL */
    mediaFileUrl: string;
    /** Encoding profile */
    encodingProfile: string;
}
export declare interface SessionAdData {
    /** ID of this ad */
    adId: string;
    /** URL for that ad */
    adUrl: string;
    /** Ad length in seconds */
    adLengthInSeconds: number;
    /** List of media files */
    adMediaFiles: SessionAdMediaFileData[];
    /** State of this ad */
    adState: AdState;
}
export declare interface Session {
    sessionId: string;
    sessionRequestData?: SessionRequestData;
    /** deprecated - do not use */
    finalSelectedScreenResolution?: string;
    /** actual settings for each monitor as returned by the server */
    monitorSettings: MonitorSettings[];
    userIdleWarningTimeoutInMs?: number;
    /** IP address of the client */
    clientIp?: string;
    /** Information about seat setup, if seat setup is in progress */
    seatSetupInfo?: SeatSetupInfo;
    sessionControlInfo?: ConnectionInfo;
    /** Information for the streamer how to connect to the stremer server, may contain other connection info */
    connectionInfo?: ConnectionInfo[];
    /** User-facing name for type of instance assigned to a session */
    gpuType?: string;
    /** Indicates whether to expect ad information during session queueing */
    sessionAdsRequired?: boolean;
    /** List of ads available for that session */
    sessionAds?: SessionAdData[];
    /** Status of this session */
    status: Status;
    enhancedStreamMode?: EnhancedStreamMode;
    /** Error code associated with the session status */
    errorCode?: ErrorCode;
    /** Finalized streaming features from server based on client request & entitlement */
    finalizedStreamingFeatures?: StreamingFeatures;
}
export declare interface RequestStatus {
    statusCode?: StatusCode;
    statusDescription?: string;
    unifiedErrorCode?: number;
    requestId: string;
    serverId: string;
    countryCode?: string;
}
export declare interface SessionInfo {
    session?: Session;
    requestStatus?: RequestStatus;
    /** List of other sessions belonging to this user */
    otherUserSessions?: Session[];
}
export declare interface SessionRequest {
    sessionRequestData?: SessionRequestData;
}
export declare interface AdUpdate {
    /** Ad receipt or Id */
    adId: string;
    /** Requested action for this ad */
    adAction: AdAction;
    /** Unix timestamp as a numeric value */
    clientTimestamp?: number;
    /** Optional. Reason for cancel. It is used only when adState is CANCELED */
    cancelReason?: string;
    /** [DEPRECATED] Optional. Time in seconds of how much of the ad was watched. This is used only when adState is CANCELED */
    watchedTimeInSeconds?: number;
    /** Optional. Time in milliseconds of how much of the ad was watched. This is used only when adState is CANCELED */
    watchedTimeInMs?: number;
    /** Optional. Time in milliseconds of how long the ad was paused. */
    pausedTimeInMs?: number;
}
export declare interface SessionModify {
    action: Action;
    /** Optional data associated with action as a short string */
    data?: string;
    /** information that specifies parameters for resume of the session. if no data is specified here, streamer should use the same data that was used to originally create the session */
    sessionRequestData?: SessionRequestData;
    /** optional array of key-value pairs. would be used by gamestream to update encryption key on resume */
    metaData?: MetaData[];
    /** List of ad update requests */
    adUpdates?: AdUpdate[];
}
