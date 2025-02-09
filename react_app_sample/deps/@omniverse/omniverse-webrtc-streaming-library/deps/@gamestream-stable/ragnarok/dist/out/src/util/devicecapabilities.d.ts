import { PlatformDetails, StreamInfo } from "../dependencies";
import { VideoCodecType } from "../nskinterfaces";
import { StreamingSettingsException } from "./utils";
/**
 * Determines and returns the current device's capabilities
 *
 * @param platformDetails Platform details, obtained from GetPlatformDetails
 * @param candidateVideoModes List of possible video modes to choose from, which can help with selecting a resolution.
 *                            Currently unused in Ragnarok
 * @returns Device capabilities
 */
export declare function getDeviceCapabilities(platformDetails: PlatformDetails, candidateVideoModes?: VideoMode[]): Promise<DeviceCapabilities>;
/**
 * @deprecated Use getDeviceCapabilities instead
 */
export declare const GetDeviceCapabilities: typeof getDeviceCapabilities;
export declare function getDeviceCapabilitiesImpl(exception: StreamingSettingsException, screenWidth: number, screenHeight: number, dpr: number, _candidateVideoModes?: VideoMode[]): Promise<DeviceCapabilities>;
/**
 * Serializes a DeviceCapabilities object into a string which can be deserialized by the mode selection library
 *
 * @param capabilities Device capabilities
 * @returns Serialized device capabilities
 */
export declare function serializeDeviceCapabilities(capabilities: DeviceCapabilities): string;
export declare interface VideoMode {
    width: number;
    height: number;
    fps: number;
}
export declare interface ScaledVideoMode extends VideoMode {
    /**
     * Scale factor between physical and logical resolutions as an integer percentage. If specified, this mode
     * represents a physical resolution and applying this scale factor to the width and height will yield the logical
     * resolution
     * @example 2x scaling would be represented as 200. A physical resolution of 3840x2160 would yield a logical
     *          resolution of 1920x1080
     * @example 1.5x scaling would be represented as 150. A physical resolution of 1920x1080 would yield a logical
     *          resolution of 1280x720
     */
    scaleFactor?: number;
}
export declare interface SupportedVideoMode extends VideoMode {
    /**
     * Indicates this mode is supported only for the specified value of HDR. If undefined, this mode applies whether
     * HDR is enabled or disabled
     * @example hdr = true indicates this mode should only be considered if HDR is enabled
     * @example hdr = false indicates this mode should only be considered if HDR is disabled
     * @example hdr = undefined indicate this mode should always be considered
     */
    hdr?: boolean;
}
export declare interface DeviceCapabilities {
    /**
     * The current physical display mode of the device. The width/height should be set to the number of physical pixels
     * in each dimension and FPS set according to the display's refresh rate. The DPI should be set to the scaling
     * factor between the current physical and logical resolution
     */
    displayMode: ScaledVideoMode;
    /**
     * Indicates support for streaming features
     */
    features: StreamFeatures;
    /**
     * List of max modes the client device can handle streaming at without significant loss of QOS or performance.
     * For example, max decode resolutions
     */
    maxSupportedModes: SupportedVideoMode[];
    /**
     * The highest mode the client device should stream at without any overrides. Higher resolution/FPS streams may
     * have minor QOS or performance issues, but will still work.
     * If undefined or set to all zeroes, this will be inferred from the displayMode
     */
    maxAutoMode?: VideoMode;
    /**
     * List of max modes the client device can handle encoding video at without significant loss of QOS or performance
     */
    maxEncodeModes?: VideoMode[];
}
export declare const enum VsyncType {
    OFF = 0,
    ON = 1,
    ADAPTIVE = 2
}
export declare interface StreamFeatures {
    /**
     * Whether vvsync is supported
     */
    vvsync?: boolean;
    /**
     * Whether enabling/disabling vsync is supported
     */
    vsync?: VsyncType;
    /**
     * Whether HDR is supported
     */
    hdr?: boolean;
    /**
     * The number of audio channels to stream with
     */
    audioChannelCount?: number;
    /**
     * Whether reflex is supported
     */
    reflex?: boolean;
}
export declare interface MediaCapabilitiesDecodingInfo {
    supported: boolean;
    smooth: boolean;
    powerEfficient: boolean;
}
export declare function ConvertCapabilityToNumber(capability?: MediaCapabilitiesDecodingInfo): number;
export declare function IsMediaCapabilitiesSupported(): boolean;
export declare class CapabilitiesHelperImpl {
    private supportsAv1?;
    private supportsH265?;
    private checkAv1?;
    private checkH265?;
    private refreshRate?;
    private refreshRatePromise?;
    constructor();
    refreshAv1Support(): Promise<MediaCapabilitiesDecodingInfo | undefined>;
    getAv1Capabilities(): Promise<MediaCapabilitiesDecodingInfo | undefined>;
    getAv1SupportSync(): MediaCapabilitiesDecodingInfo | undefined;
    refreshH265Support(): Promise<MediaCapabilitiesDecodingInfo | undefined>;
    getH265Capabilities(): Promise<MediaCapabilitiesDecodingInfo | undefined>;
    getH265SupportSync(): MediaCapabilitiesDecodingInfo | undefined;
    getDecodeCapability(codec: string, width?: number, height?: number, framerate?: number): Promise<MediaCapabilitiesDecodingInfo | undefined>;
    refresh120FpsSupport(): Promise<boolean>;
    is120FpsSupported(): Promise<boolean>;
    getRefreshRate(reCalculate?: boolean): Promise<number>;
    private is120Fps;
    private fetchRefreshRate;
    private calcRefreshRate;
}
export declare let CapabilitiesHelper: CapabilitiesHelperImpl;
/**
 * Retrieves a list of supported video codecs based on the provided stream information and platform details.
 * @param streamInfo Information about the stream
 * @param platformDetails Details about the platform
 * @param platformDetails
 * @returns A promise resolving to an array of supported video codecs, sorted in descending order of recommendation.
 */
export declare function getSupportedCodecs(streamInfo: StreamInfo, platformDetails: PlatformDetails): Promise<VideoCodecType[]>;
