import { StreamingQuality } from "./interfaces";
import { AckIdGenerator, StatsHeader, WebSocketMsg, WebSocketHandler } from "./rinterfaces";
import { StatsType, WebrtcStats } from "./stats/statsinterfaces";
import { TelemetryHandler } from "./telemetry/telemetryhandler";
export declare interface Perf {
    RAFTS: number;
    DCSend: number;
    GetStats: number;
    FrameInfo: number;
}
export declare interface ClientEvent {
    TS: number;
    eventtype: string;
}
export declare interface WorkerInit {
    sessionId: string;
}
export declare interface StartStats {
    statsHeader: StatsHeader;
}
export declare interface StreamingQualityWithTs extends StreamingQuality {
    timestamp: number;
}
export declare interface StartWebSocket {
    signInURL: string;
    maxReceivedAckId: number;
    serverSupportsAck: boolean;
    reconnect?: boolean;
}
export declare interface MtbDuration {
    timestamp: number;
    duration: number;
}
export declare interface InputChannelStats {
    timestamp: number;
    bufferedAmount: number;
    maxSchedulingDelay: number;
}
export declare interface GarbageCollectionStats {
    deltaUsedHeapSize: number;
    deltaTotalHeapSize: number;
    timestamp: number;
}
export declare interface WorkerMessage {
    initMessage?: WorkerInit;
    perf?: Perf;
    clientEvent?: ClientEvent;
    startStats?: StartStats;
    stopStats?: boolean;
    webrtcStats?: WebrtcStats;
    sq?: StreamingQualityWithTs;
    startWebSocket?: StartWebSocket;
    stopWebSocket?: boolean;
    send?: WebSocketMsg;
    duration?: MtbDuration;
    inputChannelStats?: InputChannelStats;
    garbageCollectionStats?: GarbageCollectionStats;
    ackid?: number;
}
export declare class RagnarokProfilerImpl {
    private profiling;
    private perf;
    private rworker;
    private streamBeginTs;
    private wsHandler;
    private telemetry?;
    private ackIdGenerator?;
    private pendingErrors;
    private pendingTelemetry;
    constructor();
    startWebSocket(signInURL: string, maxReceivedAckId: number, serverSupportsAck: boolean, wsHandler: WebSocketHandler, reconnect?: boolean): void;
    stopWebSocket(): void;
    initialize(sessionId: string, telemetry: TelemetryHandler, ackIdGenerator: AckIdGenerator): void;
    deinitialize(): void;
    startProfiling(statsHeader: StatsHeader): void;
    stopProfiling(): void;
    updateStreamTime(): void;
    resetPerf(): void;
    sendOverWs(_send: WebSocketMsg): void;
    onWorkerMessage(ev: MessageEvent): void;
    private onWorkerError;
    private emitError;
    onPreRender(): void;
    addDataChannelSendTime(_time: number): void;
    addGetStatsTime(_time: number): void;
    addStatsReport(report: ArrayBuffer[], type: StatsType): void;
    addQualityScore(streamingQuality: StreamingQuality): void;
    addMainThreadBlockDuration(duration: number, startTime: number): void;
    addInputChannelStats(bufferedAmount: number, schedulingDelay: number): void;
    addGarbageCollectionStats(deltaUsedHeapSize: number, deltaTotalHeapSize: number): void;
    onFrameInfo(framesDecoded: number, framesDropped: number): void;
    onEvent(type: string): void;
    getStreamTime(): number;
    getStreamBeginTime(): number;
}
export declare let RagnarokProfiler: RagnarokProfilerImpl;
