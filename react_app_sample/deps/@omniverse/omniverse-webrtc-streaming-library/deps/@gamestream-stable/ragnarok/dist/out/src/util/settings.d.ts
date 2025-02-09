import { RemoteOverrideInfo, MetaData, ClientType, DeviceOS, DeviceType, ClientStreamer } from "../dependencies";
interface _RagnarokSettings {
    ragnarokConfig: RagnarokConfig;
    clientConfigOverride: string;
    remoteOverrideInfo: RemoteOverrideInfo;
    leanMode: boolean;
    loggingEnabled: boolean;
    consoleLoggingEnabled: boolean;
    gamepadEnabled: boolean;
    webrtcStatsEnabled: boolean;
    statsUploadEnabled: boolean;
    micEnabled?: boolean;
    mouseFilter?: boolean;
    unadjustedMovement?: boolean;
    maxBitrate: number;
    resWidth: number;
    resHeight: number;
    gamepadRaf: boolean;
    gamepadPollInterval?: number;
    advancedGestures: boolean;
    forceTouchCapable: boolean;
    touchWarp: boolean;
    storeTouch: boolean;
    storeTouchGesture: boolean;
    latencyTest: boolean;
    gamepadTesterEnabled: boolean;
    deviceOs?: DeviceOS;
    deviceType?: DeviceType;
    deviceModel?: string;
    clientStreamer?: ClientStreamer;
    clientId?: string;
    clientPlatformName?: string;
    clientType?: ClientType;
    appLaunchMode?: number;
    rsdmm: boolean;
    rsdmmThumbstickToggle: boolean;
    allowSourceReset: boolean;
    allowAudioReset: boolean;
    allowAutoplayChange: boolean;
    allowEnableMic: boolean;
    allowMutingVideo: boolean;
    bitsPerPixel?: number;
    fps: number;
    isInternalUser?: boolean;
    bitsPerPixel1440p?: number;
    sessionMetaData?: MetaData;
    is1440pSupported?: boolean;
    stutterIndicator?: boolean;
    allowHaptics?: boolean;
    enableAv1Support?: boolean;
    codecList?: string[];
    hdr?: boolean;
    supportHotkeys?: boolean;
    forceHotkeys?: boolean;
    synthesizeGamepadHid?: boolean;
    disableSynthesizedDS4?: boolean;
    disableSynthesizedDS5?: boolean;
    disableSynthDS4FromDS5?: boolean;
    disableSynthDS5FromDS4?: boolean;
    allowSynthDS4FromGeneric?: boolean;
    allowSynthDS5FromGeneric?: boolean;
    synthesizedDS4AllGamesEnabled?: boolean;
    synthesizedDS5AllGamesEnabled?: boolean;
    forceServerDS4?: boolean;
    forceServerDS5?: boolean;
    cursor?: string;
    pointerLockEscape?: boolean;
    isAvp?: boolean;
    enableComputePressure: boolean;
}
declare interface RagnarokConfig {
    mouseCoalesceInterval?: number;
    connectivityCheckTimeout?: number;
    signInTimeout?: number;
    offlineErrorsStreaming?: string[];
    offlineErrorsSessionSetup?: string[];
    sleepErrorsStreaming?: string[];
    sleepErrorsSessionSetup?: string[];
    nvscClientConfigFields?: string[];
    gamepadPollInterval?: number;
    getStatsInterval?: number;
    getDeprecatedStatsInterval?: number;
    enableCpm?: boolean;
    bitsPerPixel?: number;
    userTerminatedMicRecorderThreshold?: number;
    bitsPerPixel1440p?: number;
    allowHaptics?: boolean;
    codecList?: string[];
    /** Bitwise setting to enable Av1 for specific streaming resolutions and frame rates.  See EnableAv1Config in devicecapabilities.ts.  Note that enableAv1Support takes precedence over this field if specified.*/
    enableAv1ByResolutionAndFps?: number;
    enableAv1Support?: boolean;
    terminateUnhandledException?: boolean;
    sendInsetValueUpdateEvents?: boolean;
    sendNonEssentialMetricEvents?: boolean;
    usePerfNowCaptureTimestamp?: boolean;
    enableOOFQosEnhancements?: boolean;
    disableUnadjustedMovementForAppIds?: number[];
    synthesizeGamepadHid?: boolean;
    requireDS4TrackpadForAppIds?: number[];
    pointerLockEscape?: boolean;
    enableComputePressure?: boolean;
}
export declare let RagnarokSettings: _RagnarokSettings;
/** The GFN specific remote config data fetched from RemoteConfig server */
export declare interface RemoteConfigData {
    /**  common fields for all clients, contains PM communication params etc*/
    common?: string;
    /**  ragnarok specific fields */
    ragnarok?: string;
    /**  remote config file version */
    version?: string;
}
/** Free form Ragnarok library configuration parameter.
    To be used only by GFN client and internal dev clients. */
export declare interface RagnarokConfigData {
    remoteConfigData?: RemoteConfigData;
    gxtOverrideData?: string;
    overrideData?: string;
    clientConfigOverride?: string;
    isInternalUser?: boolean;
}
/**
 * This function allows GFN/dev clients to configure the ragnarok library to toggle various features from override tools or from remote config server.
 * This should be invoked before initializing other components of ragnarok library.
 *
 * The RagnarokConfigData's remoteConfigData and gxtOverrideData are all GFN specific settings, exposed as a string to prevent dependency on
 * GFN client from configuring values to it. The json data received from the RemoteConfig/GxtConfig server is stringified as it is and passed
 * into the library without interpretation.
 *
 *
 * The RagnarokConfigData.overrideData is a string of feature toggle/options separated by '&' character.
 * The options exposed exposed are:
 *
 *      mode=lean|dev|default           -- Lean mode of ragnarok put the library into minimal functionality mode.
 *                                         Most features will be disabled and users configure enabling of selected features.
 *                                         Dev mode of ragnarok enables dev internal tools for the library (by default enabled for Lean mode)
 *      log=enable|disable              -- Enable log generation from the library.
 *      console=enable|disable          -- Enable console log from the library if log generation is enabled.
 *      gamepad=enable|disable          -- Enable/disable gamepad functionality.
 *      webrtcstats=enable|disable      -- Enable/disable calling GetStats of WebRTC library.
 *                                         Note: This is equivalent of Ctrl+Alt+F5 toggle.
 *      statsupload=enable|disable      -- Enable/disable uploading of client metrics/perf metrics to server.
 *                                         Note: statsupload=disable&webrtcstats=disable is equivalent to Ctrl+Alt+F4 toggle.
 *      mic=enable|disable              -- Enable/disable client mic capture during streaming.
 *      mousefilter=enable|disable      -- Enable/disable mouse event filtering. Intended for automated testing.
 *      bitrate=<number>|0              -- Sets the max bitrate. 0 will use the default. If value is above 100 treat as Kbps else Mbps.
 *      advancedgestures=enable|disable -- Enable/disable drag, mouse scroll, and video pan/zoom gestures.
 *      touch=enable|disable            -- Enable/disable sending of touch events.
 *                                         Note: Enabling this disables touch-as-mouse.
 *      latency=enable|disable          -- Enable/disable input indicator. Intended for input latency testing.
 *      audioreset=enable|disable       -- Enable/disable iOS 15 WAR for high audio latency.
 *      sourcereset=enable|disable      -- Enable/disable iOS 15.1 WAR for blank video on app background.
 *      autoplaychange=enable|disable   -- Enable/disable iOS 15 WAR for blank video on game launch
 *      ioswars=enable|disable          -- Enable/disable all iOS 15 WARs.
 *      bitsperpixel=<number>           -- 1080p and lower bits per pixel coefficient in max bitrate calculation.
 *      client id=<string>              -- Client ID for session request. Refers to Client ID registered in LCARS/Chroma for this client.
 *      fps=<number>                    -- Stream FPS to request. 0 will use normal requested.
 *      resolution=<number>x<number>    -- Resolution width and height to request, e.g. 1920x1080.
 *      bitsperpixel1440p=<number>      -- 1440p and up bits per pixel coefficient in max bitrate calculation.
 *      meta=<string>~<string>          -- Metadata to send in session set up request, of the form key~value.
 *      1440p=true|false                -- Whether or not ragnarok should claim 1440p is supported.
 *      stutter=enable|disable          -- Enable/disable toggling stutter indicators.
 *      av1=enable|disable              -- Enable/disable AV1 support
 *      codeclist=<codec>,<codec>,...   -- Comma-separated list of supported codecs in descending order according to priority, e.g "AV1,H264"
 *      internaluser=true|false         -- Whether user is internal user
 *      hdr=on|off                      -- Whether or not to request an HDR stream.
 *      supporthotkeys=true|false       -- Whether in-session hotkeys are supported or not
 *      forcehotkeys=true|false         -- Whether to force use of hotkeys even on a normally non-hotkey-using platform/browser
 *
 *  Ex: In order to put the ragnarok in Lean mode yet support logging, the settings string would be
 *      "mode=lean&log=enable"
 *  Instead of enable/disable,  on/off or 0/1 can be used as well.
 */
export declare function ConfigureRagnarokSettings(data: RagnarokConfigData): void;
/**
 * TODO: remove when Vision Pro gets its own GXT configs
 * Configures settings for the Vision Pro, which initially shares a GXT identify with iPads
 * This call, as well as subsequent calls to ConfigureRagnarokSettings will combine the generic and AVP settings
 **/
export declare function configureAvpSettings(): void;
export {};
