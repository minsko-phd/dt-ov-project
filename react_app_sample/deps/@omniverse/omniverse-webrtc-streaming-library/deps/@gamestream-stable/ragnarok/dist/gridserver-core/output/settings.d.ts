import { OverrideConfigTypeEnum } from "./gstelemetryinterfaces";
interface _GridServerSettings {
    commonConfig: CommonConfig;
    remoteOverrideInfo: RemoteOverrideInfo;
    loggingEnabled: boolean;
    consoleLoggingEnabled: boolean;
    webSocketSignaling: boolean;
    webRtcStreamer: boolean;
    hdr?: boolean;
}
declare interface PmCommunication {
    httpBackOffDelay?: number;
    httpRetryCount?: number;
    httpDataReceiveTimeout?: number;
    httpConnectionTimeout?: number;
    pollingIntervalMin?: number;
    pollingIntervalMax?: number;
    pollingIntervalStep?: number;
    pollingQueueSizePerStep?: number;
}
export declare interface CommonConfig {
    pmCommunication?: PmCommunication;
}
export declare let GridServerSettings: _GridServerSettings;
export declare interface RemoteOverrideInfo {
    type: OverrideConfigTypeEnum;
    version: string;
}
/** The GFN specific remote config data fetched from RemoteConfig server */
declare interface RemoteConfigData {
    /**  common fields for all clients, contains PM communication params etc*/
    common?: string;
    /**  remote config file version */
    version?: string;
}
/** Interfaces for GXT override config data fetched from GXT server */
declare interface GxtConfigDebugInfo {
    revision: string;
}
declare interface GxtConfigParams {
    name: string;
    value: Object;
    version: string;
}
export declare interface GxtRemoteConfigData {
    debugInfo: GxtConfigDebugInfo;
    params: GxtConfigParams[];
}
/** Free form GridServer library configuration parameter.
    To be used only by GFN client and internal dev clients. */
export declare interface GridServerConfigData {
    remoteConfigData?: RemoteConfigData;
    gxtOverrideData?: string;
    overrideData?: string;
}
/**
 * This function allows GFN/dev clients to configure the GridServer library to toggle various features from override tools or from remote config server.
 * This should be invoked before initializing other components of GridServer library.
 *
 * The GridServerConfigData's remoteConfigData and gxtOverrideData are all GFN specific settings, exposed as a string to prevent dependency on
 * GFN client from configuring values to it. The json data received from the RemoteConfig/GxtConfig server is stringified as it is and passed
 * into the library without interpretation.
 *
 * The GridServerConfigData.overrideData is a string of feature toggle/options separated by '&' character.
 * The options exposed exposed are:
 *
 *      mode=lean|dev|default           -- Lean mode of GridServer put the library into minimal functionality mode.
 *                                         Most features will be disabled and users configure enabling of selected features.
 *                                         Dev mode of GridServer enables dev internal tools for the library (by default enabled for Lean mode)
 *      log=enable|disable              -- Enable log generation from the library.
 *      console=enable|disable          -- Enable console log from the library if log generation is enabled.
 *      hdr=on|off                      -- Whether or not to request an HDR stream.
 *
 *  Ex: In order to put the ragnarok in Lean mode yet support logging, the settings string would be
 *      "mode=lean&log=enable"
 *  Instead of enable/disable,  on/off or 0/1 can be used as well.
 */
export declare function ConfigureGridServerSettings(data: GridServerConfigData): void;
export {};
