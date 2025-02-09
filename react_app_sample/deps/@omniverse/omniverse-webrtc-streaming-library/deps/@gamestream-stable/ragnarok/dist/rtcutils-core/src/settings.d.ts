interface _RtcUtilsSettings {
    loggingEnabled: boolean;
    consoleLoggingEnabled: boolean;
}
export declare let RtcUtilsSettings: _RtcUtilsSettings;
/** Free form Ragnarok library configuration parameter.
    To be used only by GFN client and internal dev clients. */
export declare interface RtcUtilConfigData {
    overrideData?: string;
}
/** Returns the boolean representation of the associated string */
export declare function toBool(value: string): boolean | undefined;
/**
 * This function allows GFN/dev clients to configure the ragnarok library to toggle various features from override tools or from remote config server.
 * This should be invoked before initializing other components of ragnarok library.
 *
 * The RtcUtilConfigData.remoteConfigData is all GFN specific settings, its exposed as a string to prevent dependency on GFN client from configuring values to it.
 * The json data received form the RemoteConfig server is stringified as it is and passed into the library without interpretation.
 *
 *
 * The RtcUtilConfigData.overrideData is a string of feature toggle/options separated by '&' character.
 * The options exposed exposed are:
 *
 *      mode=lean|dev|default           -- Lean mode of ragnarok put the library into minimal functionality mode.
 *                                         Most features will be disabled and users configure enabling of selected features.
 *                                         Dev mode of ragnarok enables dev internal tools for the library (by default enabled for Lean mode)
 *      log=enable|disable              -- Enable log generation from the library.
 *      console=enable|disable          -- Enable console log from the library if log generation is enabled.
 *
 *  Ex: In order to put the ragnarok in Lean mode yet support logging, the settings string would be
 *      "mode=lean&log=enable"
 *  Instead of enable/disable,  on/off or 0/1 can be used as well.
 */
export declare function ConfigureRtcUtilsSettings(data: RtcUtilConfigData): void;
export {};
