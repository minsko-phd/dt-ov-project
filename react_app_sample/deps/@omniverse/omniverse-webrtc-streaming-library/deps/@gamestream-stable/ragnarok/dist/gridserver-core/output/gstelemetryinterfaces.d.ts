export declare const enum GdprLevel {
    Functional = "functional",
    Technical = "technical",
    Behavioral = "behavioral"
}
export declare const enum BooleanType {
    UNDEFINED = "UNDEFINED",
    TRUE = "TRUE",
    FALSE = "FALSE"
}
export declare const enum OverrideConfigTypeEnum {
    UNKNOWN = "UNKNOWN",
    RCONFIG = "RCONFIG",
    GXT = "GXT",
    LOCAL = "LOCAL",
    OTHER = "OTHER"
}
export declare const enum HTTPVerb {
    OTHER = "OTHER",
    HEAD = "HEAD",
    DELETE = "DELETE",
    POST = "POST",
    GET = "GET",
    CONNECT = "CONNECT",
    OPTIONS = "OPTIONS",
    PUT = "PUT",
    WS = "WS"
}
export declare const enum IPVersion {
    UNKNOWN = "UNKNOWN",
    IPV6 = "IPV6",
    IPV4 = "IPV4"
}
export declare const enum NetworkTypeEnum {
    OTHER = "OTHER",
    ETHERNET = "ETHERNET",
    UNKNOWN = "UNKNOWN",
    WIFI_2_4 = "WIFI_2_4",
    WIFI_5_0 = "WIFI_5_0",
    MOBILE = "MOBILE",
    MOBILE_2G = "MOBILE_2G",
    MOBILE_3G = "MOBILE_3G",
    MOBILE_4G = "MOBILE_4G",
    MOBILE_5G = "MOBILE_5G"
}
export declare const enum GSModuleName {
    UNKNOWN = "UNKNOWN",
    NVST = "NVST",
    GRID_SERVER = "GRID_SERVER",
    BIFROST_CLIENT_SDK = "BIFROST_CLIENT_SDK",
    RAGNAROK = "RAGNAROK",
    GERONIMO = "GERONIMO",
    STREAM_PLAYER_SDK = "STREAM_PLAYER_SDK"
}
export declare const enum FeatureSupportStatus {
    UNKNWON = "UNKNWON",
    SUPPORTED = "SUPPORTED",
    UNSUPPORTED = "UNSUPPORTED"
}
export declare const enum ResumeType {
    NONE = "NONE",
    MANUAL = "MANUAL",
    AUTO = "AUTO"
}
export declare const enum CodecFrameworkType {
    UNKNOWN = "UNKNOWN",
    DXVA = "DXVA",
    MediaCodec = "MediaCodec",
    MFT = "MFT",
    SoftwareDecoder = "SoftwareDecoder",
    VTDecoder = "VTDecoder"
}
export declare const enum CodecType {
    UNKNOWN = "UNKNOWN",
    H263 = "H263",
    H264 = "H264",
    HEVC = "HEVC",
    MPEG_4_SP = "MPEG_4_SP",
    VP8 = "VP8",
    VP9 = "VP9",
    AV1 = "AV1"
}
export declare interface GridServer_GameLaunch_Request {
    requestedZoneAddress: string;
    zoneName: string;
    networkSessionId: string;
    sessionId: string;
    subSessionId: string;
    resumeType: ResumeType;
    overrideConfigType: OverrideConfigTypeEnum;
    overrideConfigVersion: string;
    result: string;
    codec: CodecType;
    ipVersion: IPVersion;
    launchDuration: number;
    networkType: NetworkTypeEnum;
    streamingProfileGuid: string;
    systemInfoGuid: string;
    cmsId: string;
}
export declare interface GS_Feature {
    featureName: string;
    supported: FeatureSupportStatus;
    defaultEnabled: BooleanType;
    enabled: BooleanType;
    reason: string;
    moduleName: GSModuleName;
    networkType: NetworkTypeEnum;
    overrideConfigType: OverrideConfigTypeEnum;
    overrideConfigVersion: string;
    sessionId: string;
    subSessionId: string;
}
export declare interface GS_SystemAPICallResult {
    action: string;
    label: string;
    duration: number;
    callOutput: string;
    data: number;
    moduleName: GSModuleName;
    networkType: NetworkTypeEnum;
    overrideConfigType: OverrideConfigTypeEnum;
    overrideConfigVersion: string;
    sessionId: string;
    subSessionId: string;
}
export declare interface GS_DebugInfo {
    key1: string;
    key2: string;
    key3: string;
    key4: string;
    key5: string;
    moduleName: GSModuleName;
    networkType: NetworkTypeEnum;
    overrideConfigType: OverrideConfigTypeEnum;
    overrideConfigVersion: string;
    cmsId: string;
    sessionId: string;
    subSessionId: string;
}
export declare interface GS_ExceptionInfo {
    filename: string;
    lineno: number;
    stacktrace: string;
    colno: number;
    handled: BooleanType;
    category: string;
    message: string;
    moduleName: GSModuleName;
    sessionId: string;
    subSessionId: string;
}
export declare interface GS_ClientMetricEvent {
    metricName: string;
    moduleName: GSModuleName;
    valueInt1: number;
    valueInt2: number;
    valueInt3: number;
    valueString: string;
    valueDouble: number;
    networkType: NetworkTypeEnum;
    cmsId: string;
    sessionId: string;
    subSessionId: string;
}
export declare interface GS_ConnectivityCheck {
    zone1: string;
    zone2: string;
    zone1Status: number;
    zone2Status: number;
    traceRouteIP: string;
    traceRouteDestinationReached: BooleanType;
    traceRouteOutput: string;
    result: string;
    connectivityFlags: string;
    sessionId: string;
    subSessionId: string;
    resumeType: ResumeType;
    overrideConfigType: OverrideConfigTypeEnum;
    overrideConfigVersion: string;
    moduleName: GSModuleName;
}
export declare interface GS_Sleep_Event {
    eventSequence: string;
    sleepTime: number;
    error: string;
    timeToSleep: number;
    moduleName: GSModuleName;
    cmsId: string;
    sessionId: string;
    subSessionId: string;
}
export declare interface GS_HttpCallResult {
    callDuration: number;
    verb: HTTPVerb;
    sessionId: string;
    subSessionId: string;
    serverId: string;
    url: string;
    overrideConfigType: OverrideConfigTypeEnum;
    overrideConfigVersion: string;
    requestStatusCode: string;
    requestId: string;
    networkType: NetworkTypeEnum;
    statusCode: string;
    cmsId: string;
    moduleName: GSModuleName;
}
export declare interface GS_PropertyChange_Event {
    propertyName: String;
    moduleName: GSModuleName;
    oldValue: String;
    newValue: String;
    frameCount: number;
    sessionId: String;
    subSessionId: String;
    cmsId: String;
}
export declare interface GS_CodecError_Event {
    isHardwareDecoding: BooleanType;
    codecFrameworkType: CodecFrameworkType;
    codecType: CodecType;
    reason: String;
    systemInfoGuid: String;
}
export declare class TelemetryEventBase<T> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    readonly ts: string;
    parameters: T;
    constructor(info: T);
}
export declare class GridServer_GameLaunch_RequestDef extends TelemetryEventBase<GridServer_GameLaunch_Request> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: GridServer_GameLaunch_Request);
}
export declare class GS_FeatureDef extends TelemetryEventBase<GS_Feature> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: GS_Feature);
}
export declare class GS_SystemAPICallResultDef extends TelemetryEventBase<GS_SystemAPICallResult> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: GS_SystemAPICallResult);
}
export declare class GS_DebugInfoDef extends TelemetryEventBase<GS_DebugInfo> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: GS_DebugInfo);
}
export declare class GS_ExceptionInfoDef extends TelemetryEventBase<GS_ExceptionInfo> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: GS_ExceptionInfo);
}
export declare class GS_ClientMetricEventDef extends TelemetryEventBase<GS_ClientMetricEvent> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: GS_ClientMetricEvent);
}
export declare class GS_ConnectivityCheckDef extends TelemetryEventBase<GS_ConnectivityCheck> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: GS_ConnectivityCheck);
}
export declare class GS_Sleep_EventDef extends TelemetryEventBase<GS_Sleep_Event> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: GS_Sleep_Event);
}
export declare class GS_HttpCallResultDef extends TelemetryEventBase<GS_HttpCallResult> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: GS_HttpCallResult);
}
export declare class GS_PropertyChange_EventDef extends TelemetryEventBase<GS_PropertyChange_Event> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: GS_PropertyChange_Event);
}
export declare class GS_CodecError_EventDef extends TelemetryEventBase<GS_CodecError_Event> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: GS_CodecError_Event);
}
