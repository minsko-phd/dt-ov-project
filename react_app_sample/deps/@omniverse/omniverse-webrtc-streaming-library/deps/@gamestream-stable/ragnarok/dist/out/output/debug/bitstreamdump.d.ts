import { NvstConfig } from "../nvstconfig";
import { SdpCodecType } from "../util/devicecapabilities";
declare interface RTCConfiguration extends globalThis.RTCConfiguration {
    encodedInsertableStreams?: boolean;
}
export declare class BitstreamDump {
    private nvstConfig;
    private videoCodec;
    private streams;
    constructor(nvstConfig: NvstConfig, videoCodec: SdpCodecType);
    maybeUpdateRtcConfig(config: RTCConfiguration): void;
    start(peerConnection: RTCPeerConnection): void;
    save(): void;
    private setupStream;
}
export {};
