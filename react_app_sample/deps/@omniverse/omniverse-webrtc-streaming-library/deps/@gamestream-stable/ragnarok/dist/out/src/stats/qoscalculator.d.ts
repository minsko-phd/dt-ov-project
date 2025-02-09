export declare class QosCalculator {
    private maxBitrate;
    private minBitrate;
    private maxLatency;
    private minLatency;
    private maxQosScore;
    private latencyScore;
    private networkLossScore;
    private bandwidthScore;
    private iirFilterFactor;
    private qualityScore;
    private lowBandwidthUtilThreshold;
    constructor(maxBitrate: number, minBitrate: number);
    calculateLatencyScore(currentReport: RTCIceCandidatePairStats): void;
    calculateLatencyScoreV2(rtd: number): void;
    calculateBandwidthScoreV2(bandwidthMbps: number, bwu: number): 0 | undefined;
    calculateNetworkLossScore(currInboundVideo: RTCInboundRtpStreamStats, prevInboundVideo: RTCInboundRtpStreamStats): void;
    GetStreamQuality(): import("../nskinterfaces").StreamQuality;
    private applyIIRFilter;
}
