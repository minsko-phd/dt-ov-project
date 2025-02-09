import { TelemetryEventIds, TelemetryHttpEvent } from "./interfaces";
import { IEventEmitter } from "./dependencies";
import { GridServer_GameLaunch_Request, NetworkTypeEnum } from "./gstelemetryinterfaces";
export declare class GsTelemetryHandler {
    private eventEmitter;
    private networkType;
    private cmsId;
    private sessionId;
    private subSessionId;
    private telemetryEventIds;
    private exceptionCounts;
    private totalExceptionCount;
    private readonly telemetryConfig;
    constructor(_eventEmitter: IEventEmitter);
    updateTelemetryEventIds(telemetryIds: TelemetryEventIds): void;
    private emitEvent;
    getTelemetryHttpEvent(url: string, verb: string, sessionId?: string): TelemetryHttpEvent;
    getGameLaunchRequestEvent(serverAddress: string, isResume: boolean, networkSessionId?: string, sessionId?: string): GridServer_GameLaunch_Request;
    emitHttpEvent(event: TelemetryHttpEvent): void;
    emitGameLaunchRequestEvent(eventData: GridServer_GameLaunch_Request): void;
    emitDebugEvent(key1?: string, key2?: string, key3?: string, key4?: string, key5?: string): void;
    emitExceptionEvent(error: Error | DOMException | undefined, msg: string, file: string, lineno: number, colno: number, handled: boolean, category?: string): void;
    setSessionId(sessionId: string): void;
    setSubSessionId(subSessionId: string): void;
    setCmsId(cmsId: string): void;
    setNetworkType(network: NetworkTypeEnum): void;
    resetCache(): void;
    private canSendExceptionEvent;
}
