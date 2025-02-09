import { PlatformDetails, Telemetry } from "./dependencies";
import { StreamStartParameters } from "./nskinterfaces";
/**
 * Singleton instance of Telemetry interface to configure the telemetry upload mechanism.
 * Applications must configure this during NVIDIAStreamKit initialization phase.
 * This singleton instance is responsible for handling telemetry generated from all the library objects and functions.
 */
export declare const NskTelemetry: Telemetry;
/**
 * Returns a string which identifies the current streamer type to the GeForce NOW server components.
 * May not be useful for other use cases.
 * @returns The streamer identification string.
 */
export declare function getStreamerType(): string;
/**
 * Feature types supported by browser.
 * Not all browsers support every feature, clients must use @see IsFeatureSupported to determine if the current browser supports the feature.
 */
export declare const enum BrowserFeature {
    /**
     * This feature determines if the browser supports WebRTC streaming and has all the required fixes for optimized streaming.
     * If streaming is not supported then clients must direct users to supported browser and minimum browser version.
     */
    Streaming = 0,
    /** Microphone capture. */
    MicCapture = 1
}
/**
 * Checks whether the browser supports a given feature.
 * @param browserFeature - @see BrowserFeature for different features.
 * @param platformDetails - platform information obtained from @see getPlatformDetails
 * @return - true - if the browser supports the requested feature else false.
 **/
export declare function isFeatureSupported(browserFeature: BrowserFeature, platformDetails: PlatformDetails): boolean;
export { isFeatureSupported as IsFeatureSupported };
/**
 * Informs whether Mic should be enabled by default or not.
 * The recommendation is made based on various criteria like platform permissions, performance, limited support etc.
 * This is not the same as IsFeatureSupported(MicCapture) and cannot be used as a replacement.
 * @param platformDetails - platform info provided by GetPlatformDetails API.
 **/
export declare function shouldDefaultEnableMic(platformDetails: PlatformDetails): boolean;
/**
 * Provides the recommended range for streaming bitrate in Kilobits per second given the streaming resolution and fps.
 * Clients can provide option to user for selecting the bitrate within this range.
 * User selected value should be passed in @see StreamStartParameters.streamParam.maxBitrateKbps.
 * If user doesn't select any value use maximum bitrate returned by this API.
 * @param width - streaming resolution width.
 * @param height - streaming resolution height.
 * @param fps - streaming framerate.
 * @return - tuple [x, y] - where x is the maximum bitrate and y is the minimum bitrate in kilobits per second.
 */
export declare function getRecommendedBitrate(width: number, height: number, fps: number): [number, number];
/**
 * Calculate data usage per hour for streaming at the provided framerate and bitrateKbps values.
 * @param fps - streaming framerate.
 * @param bitrateKbps - Streaming bitrate in Kilo bits per second, @see getRecommendedBitrate.
 * @return - Data usage estimation in GigaBytes per hour.
 **/
export declare function estimateDataUsage(fps: number, bitrateKbps: number): number;
/**
 * @deprecated Please use getRecommendedBitrate
 */
export declare function CalculateMaxBitrateKbps(width: number, height: number, fps: number): number;
/**
 * @deprecated Please use estimateDataUsage
 **/
export declare function CalculateDataUsage(fps: number, bitrateKbps: number): number;
/**
 * Converts the GfnSession object provided by the SessionControl library to StreamStartParameters.
 * Client applications can override the values and update the missing entries.
 * @see StreamStartParameters for which values will be populated, clients need to populate the remaining values.
 * @param session - a stringified SessionControl::Session object returned by SessionControl library.
 * @returns StreamStartParameters which can be updated and passed to startStreaming.
 */
export declare function getStreamStartParameters(session: string): StreamStartParameters;
