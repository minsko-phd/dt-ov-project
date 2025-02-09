import { TelemetryEventPayload } from "../dependencies";
import { EventDataElements, StreamExitEventData } from "./telemetryinterfaces";
export declare interface exceptionHandlerCallbackType {
    (error: Error | DOMException | undefined, msg: string, file: string, lineno: number, colno: number, handled: boolean, category?: string): void;
}
export declare class TelemetryEventProcessor {
    private cachedExitEvent;
    private eventDataElements;
    private exceptionHandler?;
    private idb;
    private openPromise;
    private cacheExitEventInDbExceptionSentOnce;
    private clearExitEventStoreInDbExceptionSentOnce;
    private cacheTelemetryEventInDbExceptionSentOnce;
    private clearTelemetryEventStoreInDbExceptionSentOnce;
    private gameShortName;
    private gameCmsId;
    private pendingTelemetry;
    constructor();
    setExceptionHandler(handler: exceptionHandlerCallbackType): void;
    private haveConsentToSend;
    sendTelemetryEvent(event: TelemetryEventPayload): void;
    private constructEventDataElements;
    private sendHttpTelemetryRequest;
    setGameDetails(cmsId: string, name: string): void;
    sendExitEvent(eventPayload: TelemetryEventPayload): void;
    clearExitEventStore(pollingDone: boolean): void;
    private copyCommonEventDataElements;
    updateEventDataElements(eventDataElements: EventDataElements): void;
    private updateCachedExitEventData;
    updateCachedExitEvent(exitErrorCode: string, sessionId: string, subSessionId: string, zoneAddress: string, streamDuration: number, frameCount: number, codec: string, // in legacy format 'video/H264'
    isResume: boolean): void;
    getStreamerExitEventPayload(exitData: StreamExitEventData): TelemetryEventPayload;
    private handleCatch;
    private isPrimaryKeyValid;
    private cacheTelemetryEventInDb;
    cacheExitEventInDb(): Promise<void>;
    private getTelemetryServerUrl;
    private sendExitEventUsingBeacon;
    private clearExitEventStoreInDb;
    getCachedExitEvents(): Promise<TelemetryEventPayload[]>;
    sendCachedExitEvent(pollingDone: boolean): Promise<void>;
    private clearTelemetryEventStoreInDb;
    sendAllCachedTelemetryEvents(): void;
    resetDataOnNewSubSession(sessionId: string, subSessionId: string): void;
    getOsName(): string;
    getOsVer(): string;
    getStreamingProfileGuid(): string;
    getSystemInfoGuid(): string;
}
