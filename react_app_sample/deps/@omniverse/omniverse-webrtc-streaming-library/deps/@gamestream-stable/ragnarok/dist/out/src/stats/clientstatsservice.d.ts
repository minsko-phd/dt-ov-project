import { IEventEmitter, PlatformDetails } from "../dependencies";
import { TelemetryHandler } from "../telemetry/telemetryhandler";
import { DataChannelParams, ExtendedDebugStats, StaticStreamStats } from "../rinterfaces";
import { ILDATHandler } from "../debug/ldatoverlay";
import { NvstConfig } from "../nvstconfig";
import { DeviceStateObserver } from "../devicestateobserver";
import { RErrorCode } from "../rerrorcode";
import { VideoCodecType } from "../nskinterfaces";
import { Measurements } from "../input/inputinterfaces";
export interface IceConnectionStats {
    recentRequestsSent: number;
    recentResponsesReceived: number;
    recentPacketsReceived: number;
}
declare interface RTCIceCandidateStats extends RTCStats {
    transportId: string;
    address?: string | null;
    port?: number;
    protocol?: string;
    candidateType: RTCIceCandidateType;
    priority?: number;
    url?: string;
    foundation?: string;
    relatedAddress?: string;
    relatedPort?: number;
    usernameFragment?: string;
    tcpType?: RTCIceTcpCandidateType;
}
export interface IClientStatsCallbacks {
    addDataChannel(dataChannel: RTCDataChannel, params: DataChannelParams): void;
    getExtendedDebugStats(): ExtendedDebugStats;
    writeEtwPrint(msg: string): void;
    processInputChannelStats(): void;
}
/**
 * Categories of ice candidates that can be generated/read from stats
 */
export declare const enum IceCandidateCategory {
    TCP = "TCP",
    MDNS = "MDNS",
    IPV6 = "IPV6",
    IPV4 = "IPV4",
    UNKNOWN = "UNKNOWN"
}
/**
 * Private IPv4 address ranges
 */
export declare const enum PrivateIPv4Range {
    TEN = "10/8",
    ONESEVENTWO = "172.16/12",
    ONENINETWO = "192.168/16",
    UNKNOWN = "UNKNOWN"
}
/**
 * Map that can be used to store counts of ice candidates categories, that guarantees keys exist for each enum
 * When a new IceCandidateCategory is added, must initialize its entry to 0 in the constructor
 */
export declare class IceCandidateCategoryCounts extends Map<IceCandidateCategory, number> {
    constructor();
}
/**
 *This class has all the logic to execute GetStats method, and calculate few stats for displaying on client side.
 */
export declare class ClientStatsService {
    private peerConnection;
    private telemetry;
    private videoElement;
    private running;
    private statsChannel;
    private statsIntervalId;
    private deprecatedStatsIntervalId;
    private eventEmitter;
    private keyDeprecatedStats;
    private videoPacketsReceived;
    private videoFramesDecoded;
    private audioCodecType;
    private videoCodecType;
    private reportCache?;
    private qosCalculator;
    private streamStats;
    private callbacks;
    private initTypeId;
    private typeToIdMap;
    private bweMbps;
    private jitter;
    private rtd;
    private gameFps;
    private mediaType;
    private shouldEmitInternalStatsEvent;
    private binaryReport;
    private streamStatsState;
    private nextStreamStatsTs;
    private platformDetails;
    private usedHeapSize;
    private totalHeapSize;
    private staticStreamStats;
    private iceStats;
    private videoFrameCallbackFunc;
    private logicalResolution;
    private physicalResolution;
    private pendingStats;
    private pendingDeprecatedStats;
    private inboundVideoStats;
    private ldat?;
    private useInboundRtpAsTrack;
    private mapRtpTimestampsToFrames;
    private maxBitrate;
    private minBitrate;
    private lastUnsentRtpMapping?;
    private nextRtpMappingTime;
    private hasAudioStats?;
    private statsCollectionState;
    private nextPeriodicStatPrintTime;
    private localStats;
    private videoTagElement;
    private measurements;
    private deviceObserver;
    private displayTopology;
    constructor(eventEmitter: IEventEmitter, callbacks: IClientStatsCallbacks, videoElement: HTMLVideoElement, pc: RTCPeerConnection, nvstConfig: NvstConfig, telemetry: TelemetryHandler, platformDetails: PlatformDetails, staticStreamStats: StaticStreamStats, deviceObserver: DeviceStateObserver, measurements: Measurements);
    private initMap;
    createStatsDataChannel(): void;
    private setIntervals;
    private videoFrameCallback;
    preRender(): void;
    postRender(): void;
    private handleMeasurements;
    private clearIntervals;
    reset(): void;
    isEnabled(): boolean;
    disableStats(): void;
    enableStats(): void;
    stop(): void;
    private isTypeWhitelisted;
    resetTypeIds(): void;
    private processEarlyStatsReport;
    private processStatsReport;
    private convertReportToBinary;
    updateDcSendDuration(time: number): void;
    updateBlockedDuration(duration: number): void;
    sendClientStats(): void;
    private showStreamStats;
    /**
     * Change the display status of the client side stats display
     * @param enableDevStats Whether to enable to advanced developer or basic stats display. Default is false.
     * @param enable Whether to enable or disable the display. If not provided, will invert the status.
     * @todo Make enable required when GridApp is deprecated
     */
    toggleOnScreenStats(enableDevStats: boolean, enable?: boolean): void;
    sendQosMarker(): void;
    private setOnScreenStats;
    private updateOnScreenStats;
    private updateInboundVideoRtpStats;
    private getUnifiedInboundRtp;
    private updateCandidatePairStats;
    private saveDeprecatedStats;
    private sendClientPerfStats;
    private sendRtpMapping;
    private maybeSendMessage;
    private emitStatsException;
    private finalizeGetStats;
    private processGarbageCollectionStats;
    getFramesDecoded(): number;
    getVideoCodec(): VideoCodecType;
    getAudioCodec(): string;
    packetsReceived(): number;
    getIceStats(): IceConnectionStats | undefined;
    getCandidatePairError(): RErrorCode | undefined;
    getCandidateStatCategoryCounts(): IceCandidateCategoryCounts;
    getCandidateAddressRanges(): Set<PrivateIPv4Range>;
    private updateDisplayDetails;
    getLdatHandler(): ILDATHandler | undefined;
}
/**
 * @param candidate Ice candidate or candidate stat to check the candidate category of
 * @return Category of the ice candidate
 */
export declare function getIceCandidateCategory(candidate: RTCIceCandidate | RTCIceCandidateStats): IceCandidateCategory;
/**
 * @param candidate Ice candidate or candidate stat to check the address range of
 * @return Private IPv4 range the candidate falls into, or undefined if it does not fall into a category
 */
export declare function getIceCandidateAddressRange(candidate: RTCIceCandidate | RTCIceCandidateStats): PrivateIPv4Range;
export {};
