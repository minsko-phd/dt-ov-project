import { KeyDeprecatedStats } from "./statsinterfaces";
import { VideoFrameMetadata } from "../internalinterfaces";
export declare interface RTCInboundRtpStreamExtraStats extends RTCInboundRtpStreamStats {
    trackIdentifier: string;
    kind: "video" | "audio";
    mid?: string;
    remoteId?: string;
    framesDecoded?: number;
    keyFramesDecoded?: number;
    framesRendered?: number;
    framesDropped?: number;
    frameWidth?: number;
    frameHeight?: number;
    framesPerSecond?: number;
    qpSum?: number;
    totalDecodeTime?: number;
    totalInterFrameDelay?: number;
    totalSquaredInterFrameDelay?: number;
    pauseCount?: number;
    totalPausesDuration?: number;
    freezeCount?: number;
    totalFreezesDuration?: number;
    lastPacketReceivedTimestamp?: DOMHighResTimeStamp;
    headerBytesReceived?: number;
    packetsDiscarded?: number;
    fecPacketsReceived?: number;
    fecPacketsDiscarded?: number;
    bytesReceived?: number;
    nackCount?: number;
    firCount?: number;
    pliCount?: number;
    totalProcessingDelay?: number;
    estimatedPlayoutTimestamp?: DOMHighResTimeStamp;
    jitterBufferDelay?: number;
    jitterBufferTargetDelay?: number;
    jitterBufferEmittedCount?: number;
    jitterBufferMinimumDelay?: number;
    totalSamplesReceived?: number;
    concealedSamples?: number;
    silentConcealedSamples?: number;
    concealmentEvents?: number;
    insertedSamplesForDeceleration?: number;
    removedSamplesForAcceleration?: number;
    audioLevel?: number;
    totalAudioEnergy?: number;
    totalSamplesDuration?: number;
    framesReceived?: number;
    decoderImplementation?: string;
    playoutId?: string;
    powerEfficientDecoder?: boolean;
    framesAssembledFromMultiplePackets?: number;
    totalAssemblyTime?: number;
    perFrameEntries?: string;
}
export declare class BinaryReport {
    private readonly rvfcStatsCacheLimit;
    private videoPacketsLost;
    private videoFrameDecodeTimeAvgMs;
    private prevVideoPacketsLost;
    private prevVideoFramesDecoded;
    private prevVideoDecodeTimeTotalMs;
    private framesDecoded;
    private pliCount;
    private prevPliCount;
    private framesDropped;
    private prevFramesDropped;
    private rvfcStatsCache;
    /**
     * Each call to getStats does not guarantee the new decoded/assembly frames stats get returned,
     * so maintain a tracker here to track the latest frame recorded so far.
     * It is for comparing frame numbers and only take frames with larger frame numbers so that we know which frames are newly updated.
     */
    private lastPfdaFrameNumber;
    constructor(rvfcStatsCacheLimit?: number);
    private getTimeLapsedSinceStreamBegin;
    private getRelativeTimestamp;
    private sendAudioTrack;
    private sendVideoTrack;
    sendInboundRtpStats(rtp: RTCInboundRtpStreamExtraStats): void;
    private sendAudioRtp;
    getPacketsLost(): number;
    getDecodeTimeAvgMs(): number;
    getFramesDecoded(): number;
    getPliCount(): number;
    getFramesDropped(): number;
    private updateClientAppFeedbackStats;
    private sendVideoRtp;
    private sendVideoRtpPerFrame;
    sendDeprStats(deprecatedStats: KeyDeprecatedStats): void;
    sendVideoFrameMetadata(metadata: VideoFrameMetadata): void;
    sendCachedVfmdStats(): void;
}
