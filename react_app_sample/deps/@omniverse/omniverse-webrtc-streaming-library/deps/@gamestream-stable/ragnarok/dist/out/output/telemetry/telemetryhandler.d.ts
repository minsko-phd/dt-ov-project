import { IEventEmitter, TelemetryHttpEvent, TelemetryEventPayload } from "../dependencies";
import { StreamExitEventData } from "./telemetryinterfaces";
import { TelemetryEventProcessor } from "./telemetryeventprocessor";
import { clientShutDownCallbackType } from "../interfaces";
export declare class TelemetryHandler {
    private sessionId;
    private subSessionId;
    private cmsId;
    private eventEmitter;
    private totalGamepadEventsCount;
    private telemetryEventProcessor;
    private exceptionCounts;
    private totalExceptionCount;
    private clientShutDownCallback?;
    constructor(_eventEmitter: IEventEmitter, telemetryEventProcessor: TelemetryEventProcessor);
    setClientShutDownCallback(clientShutDownCallback?: clientShutDownCallbackType): void;
    dispatchEvent(event: TelemetryEventPayload): void;
    emitLaunchEvent(sessionId: string, subSessionId: string, isResume: boolean, zoneAddress: string, launchDuration: number, result: string, codec: string, cmsId: string, networkSessionId: string): void;
    /**
     * Exit event handling follows the below precedence:
     * 1. If the client has registered for ShutDownCallback, we call it with the eventPayload
     * 2. If ShutDownCallback not available or fails to send the evnet, send the Exit event using beacon API
     */
    private processExitEvent;
    sendExitAnalyticsEvent(exitEventData: StreamExitEventData, pollingDone: boolean): void;
    sendCachedExitEvent(pollingDone: boolean): Promise<void>;
    emitExceptionEvent(error: Error | DOMException | undefined, msg: string, file: string, lineno: number, colno: number, handled: boolean, category?: string): void;
    emitHttpEvent(event: TelemetryHttpEvent): void;
    emitGsFeatureEvent(featureName: string, supported: boolean, defaultEnabled: boolean, enabled: boolean, reason: string): void;
    emitDebugEvent(key1?: string, key2?: string, key3?: string, key4?: string, key5?: string): void;
    emitMetricEvent(metricName: string, valueString: string, valueDouble: number, valueInt1: number, valueInt2: number, valueInt3: number): void;
    emitGamepadEvent(gamepadName: string, vid: string, pid: string, index: number, hapticsSupported: boolean, hapticsFeedbackCount: number, primary: boolean, state: number, eventMap: string): void;
    emitSleepEvent(sleepTime: number, timeToSleep: number, sleepSequence: string, error: string, sessionId: string, subSessionId: string): void;
    setSessionId(sessionId: string): void;
    setSubSessionId(subSessionId: string): void;
    setGameDetails(cmsId: string, name: string): void;
    private canSendExceptionEvent;
}
