import { NvstConfig } from "../nvstconfig";
import { VideoCodecType } from "../nskinterfaces";
declare interface RTCConfiguration extends globalThis.RTCConfiguration {
    encodedInsertableStreams?: boolean;
}
export declare class BitstreamDump {
    private nvstConfig;
    private videoCodec;
    private streams;
    constructor(nvstConfig: NvstConfig, videoCodec: VideoCodecType);
    maybeUpdateRtcConfig(config: RTCConfiguration): void;
    start(peerConnection: RTCPeerConnection): void;
    save(): void;
    private setupStream;
}
export {};
