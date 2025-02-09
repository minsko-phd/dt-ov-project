import { PlatformDetails, CodecType, BooleanType, ResumeType } from "../dependencies";
import { StreamingResolution, StreamingProfilePreset, StreamingSettings } from "../interfaces";
import { Resolution, VideoCodecType } from "../nskinterfaces";
/************************************ Utils Exposed to Client by Ragnarok 1.0 -Should be deleted once all clients migrate to Ragnarok2.0 ******************************************/
/**
 * DEPRECATED - Use GetDeviceCapabilities instead
 * Returns the streaming resolution to request from the server given
 * the active screen dimensions.
 * This API may not take device capabilities into account if they have not been cached.
 * If device capability needs to be taken into account, AreVideoSettingsSupported should be
 * used to remove unsupported resolutions from candidateResolutions prior to calling this API.
 * @param streamingProfilePreset - StreamingProfilePreset
        enum<chosen streaming profile>
        If Balanced, will choose highest resolution, else will choose lowest
 * @param candidateResolutions - StreamingResolution[]
        Object<width, height>
        List of resolutions to consider for streaming
        If empty, recommended resolution will come from a hardcoded list
 * @return - StreamingResolution
     Recommended resolution to stream at given the active screen dimensions.
**/
export declare function ChooseStreamingResolution(streamingProfilePreset?: StreamingProfilePreset, candidateResolutions?: StreamingResolution[]): StreamingResolution;
/**
 * DEPRECATED - Use GetDeviceCapabilities instead
 * Returns the streaming resolution to request from the server given the active screen dimensions.
 * This API may not take device capabilities into account if they have not been cached.
 * Should call InitializeUtils prior to this to guarantee capabilities are taken into account.
 * @param streamingProfilePreset - StreamingProfilePreset
     enum<chosen streaming profile>
     If Balanced, will choose highest resolution, else will choose lowest
 * @param candidateSettings - StreamingSettings[]
     Object<Object<width, height>, frameRate>
     List of resolutions and frame rates to consider for streaming
     If empty, recommended resolution will come from a hardcoded list
 * @param platformDetails - PlatformDetails
     Obtained from GetPlatformDetails
 * @return - StreamingSettings
     Recommended stream settings at given the active screen dimensions and device capabilities.
 **/
export declare function ChooseStreamingSettings(streamingProfilePreset: StreamingProfilePreset | undefined, candidateSettings: StreamingSettings[], platformDetails: PlatformDetails): StreamingSettings;
/**
 * Initialize the utility functions
 * Client should call prior to using other utility APIs
 * If not called, other APIs will still work but may take longer or return less accurate results
 */
export declare function InitializeUtils(): void;
/**
 * This method returns the channel count supported by default device of client.
 * @return Channel count - 2(STEREO), 6(SURROUND_5_1) or 8(SURROUND_7_1)
 * This will be deprecated with Async call
 **/
export declare function GetSupportedAudioChannelCount(): number;
/**
 * This method returns the channel count supported by default device of client.
 * @return Channel count - 2(STEREO), 6(SURROUND_5_1) or 8(SURROUND_7_1)
 **/
export declare function GetSupportedAudioChannelCountAsync(): Promise<number>;
export declare function MakeLandscapeResolution(res: [number, number]): [number, number];
/**
 * Enum that specifies which exceptions should be made during streaming settings selection
 * Can have multiple exceptions, by ORing exceptions together
 */
export declare const enum StreamingSettingsException {
    NONE = 0,
    IPHONE = 1,
    IPAD = 2,
    TIZEN4K = 4,
    WEBOS4K = 8,
    VISIONPRO = 16
}
export declare function ChooseStreamingSettingsImpl(streamingProfilePreset: StreamingProfilePreset, candidateSettings: StreamingSettings[] | undefined, exception: StreamingSettingsException, screenWidth: number, screenHeight: number): StreamingSettings;
export declare function getStreamingSettingsExceptions(platformDetails: PlatformDetails): StreamingSettingsException;
/**
 * Checks whether or not the device supports the video settings for streaming
 * Note: Does not take monitor dimensions into account for resolutions
 * This API may not take device capabilities into account if they have not been cached.
 * Should call InitializeUtils prior to this to guarantee capabilities are taken into account.
 * @param candidateSettings - StreamingSettings[]
     Object<Object<width, height>, frameRate>
     List of resolutions and frame rates to check for capability
 * @param platformDetails - PlatformDetails
     Obtained from GetPlatformDetails
 * @return - StreamingSettings[]
     List of settings supported by the device.
     Guaranteed to be a subset of candidateSettings.
     Can change between subsequent calls (e.g. new monitor with new refresh rate introduced)
**/
export declare function FilterSupportedStreamingSettings(candidateSettings: StreamingSettings[], platformDetails: PlatformDetails): StreamingSettings[];
export interface EdgeInsets {
    top: number;
    left: number;
    bottom: number;
    right: number;
}
export declare function GetSafeAreas(): EdgeInsets;
export interface TouchPoint {
    x: number;
    y: number;
}
export interface TouchPosSize {
    clientX: number;
    clientY: number;
    radiusX: number;
    radiusY: number;
}
export declare function WarpTouch(touch: TouchPosSize): TouchPoint;
export declare function ConvertErrorOnConnectivityTest(errorCode: number): number;
export declare function ConvertErrorOnSleep(errorCode: number, platformDetails: PlatformDetails): number;
export declare function IsStreamingErrorCategory(errorCode: number): boolean;
export declare function ShouldRunConnectivityTest(errorCode: number): boolean;
export declare function setUint64(value: number, dataBufferView: DataView, offset: number, littleEndian: boolean, scale?: number): void;
export declare function getUint64(dataBufferView: DataView, offset: number, littleEndian: boolean): number;
export declare function CanResume(code: number, platformDetails: PlatformDetails): boolean;
export declare const MODE_1080P_WIDTH = 1920;
export declare const MODE_1080P_HEIGHT = 1080;
export declare const MODE_UWFHD_1080P_WIDTH = 2560;
export declare const MODE_QHDLIKE_PIXEL_THRESHOLD: number;
export declare const MODE_1440P_WIDTH = 2560;
export declare const MODE_1440P_HEIGHT = 1440;
export declare const MODE_UWQHD_1440P_WIDTH = 3440;
export declare const MODE_4KLIKE_PIXEL_THRESHOLD: number;
export declare function IsResolution1440p(width: number, height: number): boolean;
export declare function IsResolution4k(width: number, height: number): boolean;
/**
 * Convert an internal video codec to one that can be sent in telemetry
 * @param codec Video codec to convert to the telemetry version
 * @returns CodecType enum that can be used for telemetry
 */
export declare function toTelemetryVideoCodecType(codec: VideoCodecType): CodecType;
export declare function ShouldEnableCPM(platformDetails: PlatformDetails): boolean;
export declare function shouldEnableOOFQosEnhancements(platformDetails: PlatformDetails): boolean;
export declare function getUnadjustedMovementForAppId(appId: number): boolean | undefined;
export declare function ToBooleanType(x?: boolean): BooleanType;
export declare function ToResumeType(isResume: boolean): ResumeType;
export declare function getSettingForAppId(setting: string, appId: number): boolean | undefined;
export declare function RunTaskOnInit(task: VoidFunction): void;
/**
 * @return String representation of resolution in format {width}x{height}
 */
export declare function GetResolutionString(resolution: Resolution): string;
export declare function GetLogicalResolution(): Resolution;
export declare function GetPhysicalResolution(): Resolution;
/**
 * Copies bytes from a Uint8Array to a DataView
 * @param to Target data view
 * @param toOffset Offset into DataView to start copying bytes
 * @param from Source array. The entire array will be copied
 */
export declare function setUint8Array(to: DataView, toOffset: number, from: Uint8Array): void;
/**
 * Reports whether or not the device meets the minimum requirements for streaming.
 * Based on browser/OS/version/features
 */
export declare function isGamestreamSupported(platformDetails: PlatformDetails): boolean;
/**
 * Saves content to file name provided.
 * @return True if successfully downloaded content, false otherwise.
 */
export declare function Download(content: any, fileName: string, mimeType: string): boolean;
/**
 * @return Audio context if supported by browser
 */
export declare function GetAudioContext(sampleRate?: number): AudioContext | undefined;
/**
 *
 * @param a Object a
 * @param b Object b
 * @return True if objects have same properties with same values
 */
export declare function IsEqualShallow(a: Object, b: Object): boolean;
/**
 *
 * @return True if pointer events are supported, false otherwise
 */
export declare function SupportsPointerEvents(): boolean;
/**
 * @return Maximum audio channel count based upon possible munging of SDP
 */
export declare function mungingTest(): Promise<number>;
/**
 * @param timestamp device capture timestamp
 * @return Capture timestamp relative to stream begin time.
 * Uses original timestamp provided, unless device capture timestamp is unreliable, in which case uses performance.now().
 */
export declare function GetCaptureTimestamp(timestamp: number): number;
/************************************ Internal Utils (END) ******************************************/
