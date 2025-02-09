import { TelemetryHandler } from "../telemetry/telemetryhandler";
export declare class SleepDetector {
    private sessionId;
    private subSessionId;
    private lastTimeSelfPing;
    private lastSubSessionIdSentOnSleep;
    private lastSessionErrorCode;
    private lastSessionErrorTs;
    private sleepDetectIntervalId;
    private lastSleepDetectionTs;
    private sleepTime;
    private telemetry;
    constructor(telemetry: TelemetryHandler);
    startSleepDetectionTimer(): void;
    stopSleepDetectionTimer(): void;
    private reportSleepEvent;
    private didSleep;
    private setSleepTime;
    periodicSelfPing(): void;
    wasSleepExit(errorCode: number): boolean;
    setSessionId(sessionId: string): void;
    setSubSessionId(subSessionId: string): void;
}
