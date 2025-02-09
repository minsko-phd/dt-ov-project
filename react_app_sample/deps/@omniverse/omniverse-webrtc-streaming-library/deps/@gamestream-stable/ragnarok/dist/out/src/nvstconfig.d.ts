import { PlatformDetails, SdrHdrMode, StreamInfo } from "./dependencies";
import { DynamicStreamingMode } from "./nskinterfaces";
import { RErrorCode } from "./rerrorcode";
export declare const enum NvscStreamCaptureModeFlags {
    NONE = 0,
    VIDEO = 1,
    AUDIO = 2,
    VOICE = 4
}
export interface NvstVideoConfig {
    clientViewportWd: number;
    clientViewportHt: number;
    maxFps: number;
    maximumBitrateKbps: number;
    initialBitrateKbps: number;
    initialPeakBitrateKbps: number;
    minimumBitrateKbps: number;
    mapRtpTimestampsToFrames: boolean;
    dynamicStreamingMode?: DynamicStreamingMode;
    sdrHdrMode?: SdrHdrMode;
}
export interface NvstRemoteInputConfig {
    partialReliableThresholdMs: number;
    hidDeviceMask: number;
}
export interface NvstConfig {
    video: NvstVideoConfig[];
    clientCapture: number;
    remoteInput: NvstRemoteInputConfig;
}
export declare function getDefaultNvstVideoConfig(param: StreamInfo, maxBitrate: number, mapRtpTimestampsToFrames: boolean, dynamicStreamingMode?: DynamicStreamingMode): NvstVideoConfig;
export interface NvstAnswer {
    config?: NvstConfig;
    answer?: string;
    error?: RErrorCode;
}
export declare function handleNvstOffer(config: NvstConfig, serverSdpStr: string, serverOverride: string, platformDetails: PlatformDetails): NvstAnswer;
