import { GdprLevel, OverrideConfigTypeEnum, TelemetryEventBase, ResumeType, CodecType, IPVersion, NetworkTypeEnum, NetworkType, TelemetryImpl } from "./dependencies";
/**
 * Event interface for Http events sent for all non-periodic http calls in library
 */
export interface TelemetryHttpEvent {
    url: string;
    verb: string;
    statusCode: string;
    requestStatusCode: string;
    sessionId: string;
    subSessionId: string;
    requestId: string;
    serverId: string;
    callDuration: number;
    response: string;
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
export declare class GridServer_GameLaunch_RequestDef extends TelemetryEventBase<GridServer_GameLaunch_Request> {
    readonly name: string;
    readonly gdprLevel: GdprLevel;
    constructor(info: GridServer_GameLaunch_Request);
}
declare class TelemetryHandler extends TelemetryImpl {
    private networkType;
    private cmsId;
    private sessionId;
    private subSessionId;
    private exceptionCounts;
    private totalExceptionCount;
    constructor();
    getTelemetryHttpEvent(url: string, verb: string, sessionId?: string): TelemetryHttpEvent;
    getGameLaunchRequestEvent(serverAddress: string, isResume: boolean, sessionId?: string): GridServer_GameLaunch_Request;
    sendHttpEvent(event: TelemetryHttpEvent): void;
    sendGameLaunchRequestEvent(eventData: GridServer_GameLaunch_Request): void;
    sendDebugEvent(key1?: string, key2?: string, key3?: string, key4?: string, key5?: string): void;
    sendExceptionEvent(error: Error | DOMException | undefined, msg: string, file: string, lineno: number, colno: number, handled: boolean, category?: string): void;
    setSessionId(sessionId: string): void;
    setSubSessionId(subSessionId: string): void;
    setCmsId(cmsId: string): void;
    setNetworkType(network: NetworkType): void;
    resetCache(): void;
    private canSendExceptionEvent;
}
export declare const ScTelemetryHandler: TelemetryHandler;
export {};
