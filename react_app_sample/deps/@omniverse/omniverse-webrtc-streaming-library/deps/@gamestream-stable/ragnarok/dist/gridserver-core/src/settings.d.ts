import { RemoteOverrideInfo } from "./dependencies";
interface _SessionControlSettings {
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
    adsPollingIntervalMinMS?: number;
}
export declare interface CommonConfig {
    pmCommunication?: PmCommunication;
}
export declare let SessionControlSettings: _SessionControlSettings;
/** Configuration parameters for the SessionControl library.*/
export declare interface SessionControlConfigData {
    gxtOverrideData?: string;
    overrideData?: string;
}
/**
 * Configures the internal settings of the library through configs from remote server and local settings from developers.
 * Clients must call this whenever remote configuration is fetched from GxT server.
 * If there is any configuration set by dev users, clients must call this API during library initialization stage.
 *
 * The SessionControlConfigData.overrideData is a string of feature toggle/options separated by '&' character.
 * The options are:
 *      log=enable|disable              -- Enable log generation from the library.
 *      console=enable|disable          -- Enable console log from the library if log generation is enabled.
 *      hdr=on|off                      -- Force request HDR virtual monitors on server.
 *  Instead of enable/disable, on/off or 0/1 values can also be used.
 * @param data - configuration parameters.
 */
export declare function configureSessionControlSettings(data: SessionControlConfigData): void;
/**
 * @deprecated please use configureSessionControlSettings
 */
export declare function ConfigureGridServerSettings(data: GridServerConfigData): void;
export declare type GridServerConfigData = SessionControlConfigData;
export { SessionControlSettings as GridServerSettings };
