import { GdprLevel, ResumeType, OverrideConfigTypeEnum, CodecType, IPVersion, NetworkTypeEnum, BooleanType, TelemetryEventIds, TelemetryEventBase, ClientTelemetryConfig, TelemetryEventPayload } from "../dependencies";
export declare const RagnarokTelemetryConfig: ClientTelemetryConfig;
export declare const enum InputDeviceType {
    UNKNOWN = "UNKNOWN",
    GAMEPAD = "GAMEPAD",
    KEYBOARD = "KEYBOARD",
    MOUSE = "MOUSE",
    TOUCH_INPUT = "TOUCH_INPUT"
}
export declare const enum HotPlugType {
    PLUG = "PLUG",
    UNPLUG = "UNPLUG"
}
export declare const enum HdrStatus {
    UNKNOWN = "UNKNOWN",
    SUPPORTED = "SUPPORTED",
    SUPPORTED_DISABLED = "SUPPORTED_DISABLED",
    UNSUPPORTED = "UNSUPPORTED"
}
export declare interface Resolution {
    refreshRate: number;
    width: number;
    height: number;
}
export declare interface Streamer_Start {
    zoneAddress: string;
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
export declare interface Streamer_Exit {
    zoneAddress: string;
    networkSessionId: string;
    sessionId: string;
    subSessionId: string;
    resumeType: ResumeType;
    overrideConfigType: OverrideConfigTypeEnum;
    overrideConfigVersion: string;
    exitReason: string;
    result: string;
    frameCount: number;
    codec: CodecType;
    ipVersion: IPVersion;
    streamDuration: number;
    networkType: NetworkTypeEnum;
    streamingProfileGuid: string;
    systemInfoGuid: string;
    cmsId: string;
}
export declare interface Streamer_InputDevice {
    deviceName: string;
    deviceType: InputDeviceType;
    vendorId: string;
    productId: string;
    deviceIndex: number;
    reportIndex: number;
    hapticsSupported: BooleanType;
    hapticsFeedbackCount: number;
    state: number;
    eventMapReceived: string;
    eventMapProcessed: string;
    sessionId: string;
    subSessionId: string;
    cmsId: string;
}
export declare interface Streamer_HotPlugEvent {
    deviceType: InputDeviceType;
    deviceIndex: number;
    reportIndex: number;
    bitmap: number;
    action: HotPlugType;
    sessionId: string;
    subSessionId: string;
}
export declare interface Streamer_DecoderCaps {
    codec: CodecType;
    resolutions: Resolution[];
    maxBitrateMbps: number;
    profile: string;
    level: string;
    systemInfoGuid: string;
    isHardwareCodec: BooleanType;
}
export declare interface Streamer_DisplayCaps {
    displayModes: Resolution[];
    hdrStatus: HdrStatus;
    systemInfoGuid: String;
}
export declare interface Streamer_EncoderCaps {
    codec: CodecType;
    resolutions: Resolution[];
    maxBitrateMbps: number;
    profile: String;
    level: String;
    systemInfoGuid: String;
}
export declare const EventTypes: {
    Streamer_Start: {
        name: string;
        gdprLevel: GdprLevel;
    };
    Streamer_Exit: {
        name: string;
        gdprLevel: GdprLevel;
    };
    Streamer_InputDevice: {
        name: string;
        gdprLevel: GdprLevel;
    };
    Streamer_HotPlugEvent: {
        name: string;
        gdprLevel: GdprLevel;
    };
    Streamer_DecoderCaps: {
        name: string;
        gdprLevel: GdprLevel;
    };
    Streamer_DisplayCaps: {
        name: string;
        gdprLevel: GdprLevel;
    };
    Streamer_EncoderCaps: {
        name: string;
        gdprLevel: GdprLevel;
    };
};
export declare class Streamer_StartDef extends TelemetryEventBase<Streamer_Start> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: Streamer_Start);
}
export declare class Streamer_ExitDef extends TelemetryEventBase<Streamer_Exit> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: Streamer_Exit);
}
export declare class Streamer_InputDeviceDef extends TelemetryEventBase<Streamer_InputDevice> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: Streamer_InputDevice);
}
export declare class Streamer_HotPlugEventDef extends TelemetryEventBase<Streamer_HotPlugEvent> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: Streamer_HotPlugEvent);
}
export declare class Streamer_DecoderCapsDef extends TelemetryEventBase<Streamer_DecoderCaps> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: Streamer_DecoderCaps);
}
export declare class Streamer_DisplayCapsDef extends TelemetryEventBase<Streamer_DisplayCaps> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: Streamer_DisplayCaps);
}
export declare class Streamer_EncoderCapsDef extends TelemetryEventBase<Streamer_EncoderCaps> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: Streamer_EncoderCaps);
}
export declare interface FormattedEventDetail {
    name: string;
    ts: string;
    parameters: object;
    experiments?: object;
}
/**
 * This interface represents all the common data which ragnarok needs to send telemetry events independently to telemetry server.
 */
export declare interface JsEventsCommonData {
    clientId?: string;
    clientVer?: string;
    eventSchemaVer?: string;
    eventSysVer?: string;
    eventProtocol?: string;
    deviceId?: string;
    userId?: string;
    externalUserId?: string;
    idpId?: string;
    sessionId?: string;
    platform?: string;
    sentTs?: string;
    events?: FormattedEventDetail[];
    gdprFuncOptIn?: string;
    gdprTechOptIn?: string;
    gdprBehOptIn?: string;
    deviceGdprFuncOptIn?: string;
    deviceGdprTechOptIn?: string;
    deviceGdprBehOptIn?: string;
    deviceOS?: string;
    deviceOSVersion?: string;
    deviceType?: string;
    deviceModel?: string;
    deviceMake?: string;
    clientType?: string;
    clientVariant?: string;
    integrationId?: string;
    browserType?: string;
}
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
export declare interface TelemetryEventDbSchema {
    userId: string;
    sessionId: string;
    name: string;
    eventPayload?: TelemetryEventPayload;
}
/**
 * Internal interface that describes all the required information to dispatch the exit event telemetry
 */
export declare interface StreamExitEventData {
    exitErrorCode: string;
    sessionId: string;
    subSessionId: string;
    zoneAddress: string;
    streamDuration: number;
    frameCount: number;
    codec: string;
    isResume: boolean;
    connectivity: string;
    sleep: boolean;
    networkTestSessionId: string;
}
export declare const enum Connectivity {
    UNDEFINED = "undefined",
    ONLINE = "online",
    OFFLINE = "offline",
    OFFLINE_WRONG_STATUS = "offline_wrong_status",
    TIMEOUT = "timeout"
}
