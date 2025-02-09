import { PlatformDetails, SdrHdrMode, StreamingFeatures } from "./dependencies";
import { RErrorCode } from "./rerrorcode";
/**
 * This file provides all the interfaces for Web Streaming Kit. Refer nskutils.ts additional interfaces and APIs.
 * The consumer application of this library is referred to as clients in the comments.
 * GeForce NOW service requires streaming components to be setup on the server before streaming connection establishment, this is handled through SessionControl library.
 */
/**
 * HID devices whose raw inputs can be handled by the remote game/application on the server.
 */
export declare const enum HidType {
    NONE = 0,
    /** DualShock 4 - PS4 controller.*/
    DS4 = 1,
    /** DualSense - PS5 controller.*/
    DS5 = 2
}
/**
 * Types of user inputs handled by StreamKit. @see NskStreamClient.captureUserInput.
 */
export declare const enum InputType {
    None = 0,
    Mouse = 1,
    Keyboard = 2,
    Gamepad = 4,
    Touch = 8,
    All = 15
}
/**
 * Types of video codecs that can be used for a video stream.
 */
export declare const enum VideoCodecType {
    H264 = "H264",
    H265 = "H265",
    AV1 = "AV1",
    UNKNOWN = "UNKNOWN"
}
/**
 * State of microphone capture.
 * @see NskStreamClient.getMicState
 * @see NskStreamClientDelegate.onMicStateUpdate
 * @see NskStreamClient.captureMic
 */
export declare const enum MicState {
    /** Not initialized yet. Clients can call @see shouldDefaultEnableMic and call @see NskStreamClient.captureMic. */
    UNINITIALIZED = 0,
    /** User hasn't yet responded to the browser popup to provide permission for microphone access. */
    PERMISSION_PENDING = 1,
    /** User denied permission from browser popup. */
    PERMISSION_DENIED = 2,
    /** Mic capture has started. */
    STARTED = 3,
    /** No suitable devices present (eg, all mics are unplugged). */
    NO_SUITABLE_DEVICE = 4,
    /** Permission has been granted by user, but mic capture is not active (not started/stopped). */
    STOPPED = 5,
    /** Not supported (eg, on http). */
    UNSUPPORTED = 6,
    /** Unexpected error while capturing mic. */
    ERROR = 7
}
/**
 * Defines streaming modes which can reduce resolution or frame rate or both in bad network conditions to minimize latency/stutters and improve user experience.
 * @see VideoStreamSettings.dynamicStreamingMode and @see NskStreamClient.setDynamicStreamingMode
 */
export declare const enum DynamicStreamingMode {
    /** Stream at target resolution and frame rate irrespective of network conditions. */
    NONE = 0,
    /** Dynamic Resolution Control - lower resolution in bad network conditions. Frame rate will not be lowered. */
    DRC = 1,
    /** Dynamic Frequency Control - lower frequency in bad network conditions. Resolution will not be lowered. */
    DFC = 2,
    /** Streaming components will decide either to lower resolution or frame rate or both. */
    ALL = 3
}
/**
 * Properties of a video stream passed in @see StreamStartParameters.
 * Requesting specific stream settings doesn't always guarantee that server will honor all the requested properties.
 */
export declare interface VideoStreamSettings {
    /** Resolution width. */
    width: number;
    /** Resolution height. */
    height: number;
    /** Streaming frame rate. */
    fps: number;
    /** Maximum bitrate in kilobits per second to be used for streaming. @see getRecommendedBitrate.
     * If not set, NVIDIAStreamKit will calculate the bit rate based on resolution and frame rate. */
    maxBitrateKbps?: number;
    /** Configures dynamic streaming mode. Default value is DynamicStreamingMode.ALL */
    dynamicStreamingMode?: DynamicStreamingMode;
    /** Clients can request for a specific video codec, if not set NVIDIAStreamKit will choose the best codec.
     *  @see NskStreamClientDelegate.onStreamStarted to get the codec selected for the stream. */
    codec?: VideoCodecType;
    /** Bits per pixel of the video stream, populated by NVIDIAStreamKit in NskStreamClientDelegate.onStreamStarted.
     * This parameter is ignored in NskStreamClient.startStreaming. */
    bitDepth?: number;
    /** Dynamic range mode of the video stream. */
    sdrHdrMode?: SdrHdrMode;
}
/**
 * Properties of a downstream video stream that is to be sent from the server and displayed on the client.
 * @see NskStreamClientDelegate.onStreamStarted to get the settings of the video stream provided by server.
 */
export declare interface DownstreamVideoSettings extends VideoStreamSettings {
    /** Id of the HTMLVideoElement where the incoming video stream should be displayed.*/
    videoTagId: string;
}
/**
 * Kinds of supported media tracks
 */
export declare const enum MediaTrackKind {
    VIDEO = "video",
    AUDIO = "audio"
}
/**
 * Properties of upstream media that is to be sent from the client to the server.
 */
export declare interface UpstreamMediaSettings {
    /**
     * Media track to be sent to the server.
     * If a MediaTrackKind is provided instead of a track, a placeholder track will be sent of that kind.
     * The track can be replaced/added later using @see setUpstreamMedia
     */
    track: MediaStreamTrack | MediaTrackKind;
    /**
     * Optional stream associated with the track being sent to the server.
     * Passing the same MediaStream for multiple tracks will synchronize these tracks on the server.
     */
    stream?: MediaStream;
}
/** Properties of upstream video that is to be sent from the client to the server. */
export declare interface UpstreamVideoSettings extends UpstreamMediaSettings {
    /**
     * Optional video settings that should be applied to the video track.
     * If none are provided, the settings will be implied from the track
     */
    videoSettings?: VideoStreamSettings;
}
/**
 * Details of the stream from the server provided in NskStreamClientDelegate.onStreamStarted.
 */
export declare interface StreamStartData {
    /** Details of all the video streams provided by server. */
    streams: DownstreamVideoSettings[];
    /** If true, server has provided a separate audio stream which is attached to the HTMLAudioElement provided in StartStreamParameters.
     * Clients should perform unmute on the audio element instead of first video element. */
    separateAudioStream: boolean;
}
export declare const enum StreamStopReason {
    /** Client initiated disconnection by calling NskStreamClient.stopStreaming(). */
    CLIENT_DISCONNECTED = 0,
    /** Streaming was stopped by server. */
    SERVER_DISCONNECTED = 1,
    /** Streaming stopped due to network issues between client and server. */
    NETWORK_ERROR = 2,
    /** Streaming stopped due to some other error */
    ERROR = 3
}
/**
 * Details of Streaming disconnection returned in @see NskStreamClientDelegate.onStreamStopped
 */
export declare interface StreamStopData {
    /** Reason for stream disconnection, could be client initiated, server initiated or due to network issues. */
    reason: StreamStopReason;
    /** Unified error code which uniquely identifies the reason for disconnection. */
    code: RErrorCode;
    /** If true, clients can attempt to start streaming again.
     * In GeForce NOW use case clients must use SessionControl library to resume the session on the server before starting stream. */
    isResumable: boolean;
}
/**
 * Bi-directional client specific data exchange between client and server components.
 * @see NskStreamClient.sendCustomMessage
 * @see NskStreamClientDelegate.onCustomMessage
 */
export declare interface CustomMessage {
    messageType: string;
    /** Recipient module. */
    messageRecipient?: string;
    /** Optional data of this message. */
    data?: string;
}
export declare interface Resolution {
    width: number;
    height: number;
}
/**
 * Periodic statistics provided by the StreamKit during streaming.
 * @see NskStreamClientDelegate.onStreamStatistics
 */
export declare interface StreamStatistics {
    /** Average game FPS */
    avgGameFps: number;
    /** Streaming FPS */
    fps: number;
    /** Round trip delay (ms) */
    rtd: number;
    /** Average decode cost (ms) */
    avgDecodeTime: number;
    /** Total frame loss */
    frameLoss: number;
    /** Total packet loss */
    packetLoss: number;
    /** Available bandwidth (Mbps) */
    totalBandwidth: number;
    /** Utilized bandwidth (%) */
    utilizedBandwidth: number;
    /** Streaming resolution */
    streamingResolution: Resolution;
    /** Streaming codec */
    codec: VideoCodecType;
    /** Bits-per-component of the decoded video */
    bitDepth: number;
}
/**
 * Periodic scores in 0-100 range for latency, packet loss, bandwidth availability during streaming.
 * @see NskStreamClientDelegate.onStreamQuality
 */
export declare interface StreamQuality {
    qualityScore: number;
    bandwidthScore: number;
    networkLossScore: number;
    latencyScore: number;
}
export declare const enum StreamWarningType {
    Unknown = 0,
    /** Users entitlement for streaming from cloud service is ending. Clients need to inform users to increase their entitlement to continue streaming. */
    ApproachingEntitlementTimeout = 1,
    /** User hasn't been interacting with the application, in order to save resources cloud service might terminate the streaming if user doesn't interact with the stream. */
    ApproachingIdleTimeout = 2,
    /** Streaming duration is reaching the max duration allocated for the current streaming. */
    ApproachingSessionMaxTimeLimit = 3,
    /** Indicates that user has interacted with the application and clients should remove any warnings displayed for ApproachingIdleTimeout. */
    ClearUserIdleTimeOut = 4
}
/**
 * @see NskStreamClientDelegate.onStreamWarning for more details.
 */
export declare interface StreamWarning {
    code: StreamWarningType;
    secondsLeft?: number;
}
/**
 * todo: Discussion on this usage is still in progress, needs cleanup and right documentation.
 * @see NskStreamClientDelegate.onTextComposition
 */
export declare interface TextCompositionEvent {
    /** The updated text while the composition is underway. */
    compositionText: string;
    /** Set to true when non-ascii input is detected. Clients should bring up an IME editor and handle the inputs. */
    imeRecommendation?: boolean;
}
/**
 * Provides all the notifications from the NskStreamClient interface.
 * This delegate interface should be passed during NskStreamClient creation. @see createNskStreamClient
 */
export declare interface NskStreamClientDelegate {
    /**
     * Notifies the client of streaming started. All the NskStreamClient functions which needs to be executed only during streaming can be called after this.
     * onStreamStopped function notifies that streaming has ended.
     * Clients must call @see NskStreamClient.captureUserInput(true) to start sending inputs to server.
     * Note: Inputs are not sent to server by default as clients might display overlay to get user input to switch to fullscreen mode.
     * @param data - @see StreamStartData for full details.
     * @see NskStreamClient.setSupportedHidTypes for configuring the HID devices supported by the remote application.
     */
    onStreamStarted(data: StreamStartData): void;
    /**
     * Notifies the streaming client of connection failure. Clients need to display appropriate message to the user.
     * @param errorCode - unified error code representing the type of failure.
     */
    onStreamStartFailed(errorCode: RErrorCode): void;
    /**
     * Notifies the streaming client of termination of stream.
     * Streaming can be stopped due to various reason, @see StreamStopReason.
     * If StreamStopData.isResumable is set, clients can attempt to restart the stream.
     * @param data - StreamStopData - indicates the type of streaming termination and the unified error code.
     */
    onStreamStopped(data: StreamStopData): void;
    /**
     * Provides the streaming stats to the clients periodically.
     * @param stats - refer StreamStatistics interface for details of the stats.
     */
    onStreamStatistics(stats: StreamStatistics): void;
    /**
     * Provides the quality scores for the current state of streaming.
     * The scores includes a general quality score and scores for latency, bandwidth, network loss.
     * Clients can use these scores to inform users of current streaming quality (if scores are low).
     * @param quality - scores.
     */
    onStreamQuality(quality: StreamQuality): void;
    /**
     * Indicates that streaming might be terminated in x seconds, except when warning.code is ClearUserIdleTimeOut.
     * If warning.code is ApproachingIdleTimeout, users need to be notified of streaming termination in {warning.secondsLeft} seconds if user does not interact with the webpage.
     * Upon user interaction onStreamWarning with warning.code set to ClearUserIdleTimeOut will be invoked, clients should clear the warning displayed to the user.
     * Note: Even if the clients has displayed overlay and called NskStreamClient.captureUserInput(false), any interaction on the webpage will clear the idletimeout but input will not be sent to server.
     * @param warning - StreamWarning - contains the warning code and the time left for termination.
     */
    onStreamWarning(warning: StreamWarning): void;
    /**
     * Notifies changes to Mic state.
     * This function can be executed as part of @see NskStreamClient.captureMic or when user changes the mic capture directly from browser settings.
     * @see NskStreamClient.getMicState to get mic capture state if clients doesn't cache the state provided in this function.
     * @param state - current MicState
     */
    onMicStateUpdate?(state: MicState): void;
    /**
     * Notifies the client that text composition is in progress or completed. This event can be used for displaying the Client IME text input options.
     * This notification is invoked for every composition update as user updates the input.
     * todo: the comments are not detailed enough, need info on which platforms provide this, how should client react to this.
     * - AI skonduru
     * @param event
     */
    onTextComposition(event: TextCompositionEvent): void;
    /**
     * Provides the CustomMessage received from the server. These CustomMessages are generated by some components on the server.
     * Multiple messages can be delivered during streaming.
     * If the streaming service doesn't have any server components which generates messages then clients can skip implementing this function.
     * @param message - CustomMessage received from server.
     * @see NskStreamClient.sendCustomMessage to send CustomMessage from client to server.
     */
    onCustomMessage?(message: CustomMessage): void;
}
/**
 * Provides functions required for virtual input components(Virtual Gamepad / Virtual Keyboard) to enable the virtual inputs and pass the resulting user action as inputs to server.
 * Clients can get this interface by calling @see NskStreamClient.getVirtualInputController()
 */
export declare interface VirtualInputController {
    /**
     * Clients must call this function to indicate if clients will display virtual gamepad for this platform.
     * This must be executed before @see NskStreamClient.getGamepadBitmap and @see NskStreamClient.startStreaming.
     * If clients enable virtual gamepad for all streaming sessions then this API can be invoked once during initialization.
     * @param supported - true if client supports virtual gamepad, by default StreamKit assumes virtual gamepad is not supported.
     */
    setClientSupportsVirtualGamepad(supported: boolean): void;
    /**
     * Pass the current state of the virtual gamepad to the streaming server.
     * Clients should call this when virtual gamepad buttons/triggers/axes are pressed or released.
     * All inputs from virtual gamepad will be treated as inputs from a primary gamepad.
     * @param buttons - a bitwise field for all the buttons pressed by user. Refer GamepadButton enum for bit positions of buttons.
     *                  Bit value 1 represents button is pressed.
     * @param trigger - 16bit values for left trigger and right trigger. Refer VirtualButton.LT/RT for the bits position.
     * @param axes - tuple of axes values for left and right joystick. Values: [left X, left Y, right X, right Y]
     * @note This API is no-op if virtual gamepad support was not indicated through setClientSupportsVirtualGamepad API.
     */
    handleVirtualGamepadState(buttons: number, trigger: number, axes: [number, number, number, number]): void;
    /**
     * Informs the current state of virtual keyboard display to the NVIDIAStreamKit.
     * Clients should call this when virtual keyboard UI is shown/hidden.
     * Note: In case of mobile/TV devices, bringing up the system provided keyboard should also be treated as virtual keyboard.
     * @param displayed - true if the virtual keyboard is displayed in the client.
     * @returns false if streaming is not in progress, else true.
     */
    setVirtualKeyboardState(displayed: boolean): boolean;
    /**
     * Passes the input from the virtual keyboard to the streaming server.
     * Clients need to invoke this API twice with event.type = keydown and keyup.
     * If only event.type = keydown is sent then this will be treated as a long press of key.
     * Clients should fill KeyboardEvent.type and .key properties.
     * Refer: https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values for key values.
     * @param event - user input from virtual keyboard mapped to the javascript Keyboard Event.
     * @returns false if streaming is not in progress, else true.
     */
    handleVirtualKeyInput(event: KeyboardEvent): boolean;
}
/**
 * Initialize parameters for NskStreamClient.
 */
export declare interface StreamClientInitParameters {
    /**
     * In platforms with no physical keyboard like mobile and TV platforms (or any platform with system virtual keyboard), clients must provide an option for users to enter text.
     * This can be done through an HTMLInputElement (which can be given focus to bring up the system virtual keyboard) or through custom virtual keyboard.
     * If clients use HTMLInputElement then pass that reference in this property, NVIDIAStreamKit will listen for text input on this element and send it to the server.
     * Else if clients provide custom virtual keyboard then use @see VirtualInputController.handleVirtualKeyInput to send inputs to server.
     * The element can be hidden from users by setting 'opacity: 0' and 'pointer-events: none' on the element.
     * On some mobile platforms, a minimum font-size of 24em is recommended to prevent the viewport from shifting to the element when focus is given to it.
     */
    textInputElement?: HTMLInputElement;
}
/**
 * Server address and port for signal or media stream connection.
 */
export declare interface StreamConnectionInfo {
    /** Fully qualified domain name or IP of the server. */
    address: string;
    /** Server port. */
    port: number;
    /**
     * Indicates if websocket connection to signaling server should be secure or not, not applicable for media connection.
     * This is optional property, when not set signaling will be on secure websocket if address is FQDN else non secure websocket connection in passthru use case (address is IP).
     */
    secure?: boolean;
}
/**
 * Information that is only used to provide additional information in debug stats overlay and telemetry.
 * Properties which will be populated by getStreamStartParameters API are: appId, gpuType, zoneName.
 * Clients are expected to populate the rest of the properties.
 */
export declare interface StatTelemetryInfo {
    /** Identification code of the application that is running on the server. */
    appId?: number;
    /** Short name that corresponds to the appId */
    shortName?: string;
    /** Device language in RFC 3066 code, but with '_' like en_US. http://www.i18nguy.com/unicode/language-identifiers.html */
    clientLocale?: string;
    /** Type of the GPU of the server machine that is running the streaming session */
    gpuType?: string;
    /** Name of zone that session was streamed from. */
    zoneName?: string;
    /**V ersion of the client application like 2.0.29.12 */
    clientAppVersion?: string;
    /** Region that the session was requested to be setup in. */
    region?: string;
}
/**
 * Type of cursor to display
 */
export declare const enum CursorType {
    /** Render the cursor in software, matching cursor with the server */
    SOFTWARE = 0,
    /** Render the cursor in hardware, matching cursor with the server */
    HARDWARE = 1,
    /** Allow the browser to handle cursor on its own, without matching the server cursor */
    FREE = 2
}
/**
 * Parameters supplied to @see NskStreamClient.startStreaming for setting up a stream connection.
 * Note: In GeForce NOW use case many of the parameters can be populated using the session object provided by the SessionControl library. @see getStreamStartParameters
 * Note: All parameters except streamParams[].videoTagId, keyboardLayout and audioTagId will be populated in getStreamStartParameters API.
 */
export declare interface StreamStartParameters {
    /** Array of streaming properties. For each entry in this array a video stream will be requested from the server. */
    downstreamParams: DownstreamVideoSettings[];
    /** Connection details for websocket connection for exchange of offer, ICE info for streaming connection establishment. */
    signalConnectionInfo: StreamConnectionInfo;
    /** Connection details for WebRTC connection for media streaming. This is required if the streaming server is behind NAT.
     *  If not provided, will use the ICE information provided by signaling server. */
    mediaConnectionInfo?: StreamConnectionInfo;
    /** When set to true, the touch input on the client device is sent as it is to the server, else will convert the touch inputs to mouse inputs.
     * Note: enableTouchInput should be set only if the remote application on the server is capable of handling raw touch inputs. */
    enableTouchInput: boolean;
    /** In services where there is one signaling server, this parameter lets the signaling server identify where to route the clients websocket request.
     * This value is passed in the websocket header: "Sec-WebSocket-Protocol: x-nv-sessionid.<<sessionid>>"
     * This is also used in telemetry.*/
    sessionId: string;
    /** A GUID which identifies individual streaming connection when analyzing telemetry. In GeForce NOW, the SessionControl library will generate this GUID. */
    subSessionId?: string;
    /** The element ID to an existing HTMLAudioElement. This should only be specified if downstreamParams is empty,
     * which indicates no video streams are expected.
     * If downstreamParams is not empty, this will be ignored and audio will be combined with the first video stream. */
    audioTagId?: string;
    /** Keyboard layout string in locale format (e.g. "en-US")
     * @see setKeyboardLayout for more details
     */
    keyboardLayout?: string;
    /** FQDN address of the server that returned the session information. Required to run internet connectivity tests. */
    zoneAddress: string;
    /** True if this is not the first time a client is connecting to the session, false if it is */
    resume?: boolean;
    /** Extra information that can be provided to be included in debug stats overlay and telemetry.
     * Some of the properties can be populated from the SessionControl library, others must be explicitly supplied. */
    statTelemetryInfo?: StatTelemetryInfo;
    /** Streaming features that should be enabled. This should already be negotiated by the client and server to only
     * enable features that are supported and allowed by both. */
    streamingFeatures?: StreamingFeatures;
    /** Whether the stream will be used in windowed mode. If the stream might be used in both windowed and fullscreen
     * mode, this should still be set to true */
    windowedStreaming?: boolean;
    /** Indicates the cursor type to use for the session. If unspecified, will be inferred from windowedStreaming */
    cursorType?: CursorType;
    /** Array of streaming properties. For each entry in this array a stream will be sent to the server. */
    upstreamParams?: UpstreamMediaSettings[];
}
/** Enumeration of status of streaming in NskStreamClient.
 *  @see NskStreamClient.getStreamingState for state transitions.
 */
export declare const enum StreamingState {
    NONE = 0,
    STARTING_STREAM = 1,
    STREAMING = 2,
    STOPPING_STREAM = 3,
    STOPPED = 4
}
/**
 * This interface provides the main functionalities for streaming.
 * Clients should create a NskStreamClient using the createNskStreamClient API.
 * NskStreamClientDelegate passed in the createNskStreamClient will get all the results of async API of NskStreamClient and notifications during streaming.
 */
export declare interface NskStreamClient {
    /**
     * Starts streaming from the server. Clients must provide the signaling (and media connection) info and stream parameters for establishing the streaming session.
     * NskStreamClientDelegate will be notified of streaming start result. @see NskStreamClientDelegate.onStreamStarted and @see NskStreamClientDelegate.onStreamStartFailed
     * NskStreamClient supports only one streaming session at a time. This API cannot be invoked if streaming(or streaming start) is in progress.
     * If clients need to cancel the streaming start process then execute stopStreaming.
     * @param params - @see StreamStartParameters for the required parameters. @see getStreamStartParameters
     * @returns RErrorCode.Success if input parameters was successfully accepted. Else error - Streaming/StreamingStart already in progress, input parameters are not valid etc.
     * @note Clients must inform the virtual gamepad support through VirtualInputController.setClientSupportsVirtualGamepad before invoking this API.
     */
    startStreaming(params: StreamStartParameters): RErrorCode;
    /**
     * Stops the current stream or cancels the streaming start process.
     * If startStreaming was not invoked then this API is no-op.
     * @see NskStreamClientDelegate.onStreamStopped for streaming termination notification if streaming was in progress.
     * No notification will be provided if streaming was not yet started.
     * @param reason - optional unified code to be collected in telemetry.
     *        For user initiated disconnection, clients can ignore this field.
     *        For all other cases of termination, clients must define unique codes which can be used in data analysis.
     */
    stopStreaming(reason?: number): void;
    /**
     * Provides the current state of streaming.
     * If startStreaming was never invoked, state will be StreamingState.NONE.
     * If startStreaming was invoked and streaming is not yet started, state will be StreamingState.STARTING_STREAM.
     * If streaming is in progress then state will be StreamingState.STREAMING.
     * If stopStreaming is invoked streaming state will be StreamingState.STOPPING_STREAM.
     * If streaming was stopped then state will be StreamingState.STOPPED.
     * Delegate of NskStreamClient can also use @see NskStreamClientDelegate.onStreamStarted and @see NskStreamClientDelegate.onStreamStopped callbacks to track the current streaming state.
     * @returns @see StreamingState
     */
    getStreamingState(): StreamingState;
    /**
     * Send custom messages to the streaming server
     * Note: should be invoked only during streaming.
     * @see NskStreamClientDelegate.onStreamStarted to get the streaming start notification.
     * @see NskStreamClientDelegate.onCustomMessage for message from server.
     * @param message - message to be sent to the server
     * @returns false if streaming is not in progress, else true.
     */
    sendCustomMessage(message: CustomMessage): boolean;
    /**
     * Updates the maximum streaming bitrate for the stream at runtime.
     * Note: should be invoked only during streaming.
     * @see StreamStartParameters.streamParam.maxBitrateKbps for configuring the initial maximum bitrate value.
     * @see NskStreamClientDelegate.onStreamStarted to get the streaming start notification.
     * @param kbps - bitrate in Kilobits per seconds.
     * @param index - optional index if there is more than one stream.
     * @see StreamStartData for the index of a stream from the server or @see StreamStartParameters for index of an upstream source
     * @param upstream - optional flag to indicate whether to adjust an upstream source
     * @returns false if streaming is not in progress, else true.
     */
    setStreamingMaxBitrate(kbps: number, index?: number, upstream?: boolean): boolean;
    /**
     * Updates the DynamicResolutionControl/DynamicFrequencyControl properties of stream at runtime.
     * By default streaming will lower the resolution/framerate if the network is not capable of handling the targeted resolution/framerate.
     * When network is good the resolution/framerate will be restored to its targeted values.
     * If DRC/DFC is disabled, then streaming will stay at (or switch to) targeted resolution/framerate irrespective of network conditions and the current stream resolution/framerate.
     * @see StreamStartParameters.streamParam.dynamicStreamingMode for the initial DRC/DFC state. This API can be used for runtime configuration.
     * Note: should be invoked only during streaming.
     * @see NskStreamClientDelegate.onStreamStarted to get the streaming start notification.
     * @param mode - DynamicStreamingMode to be applied to the stream.
     * @param index - optional index if there is more than one stream.
     * @see StreamStartData for the index of a stream from the server or @see StreamStartParameters for index of an upstream source
     * @param upstream - optional flag to indicate whether to adjust an upstream source
     * @returns false if streaming is not in progress, else true.
     */
    setDynamicStreamingMode(mode: DynamicStreamingMode, index?: number, upstream?: boolean): boolean;
    /**
     * Sets the keyboard layout on the server during streaming.
     * Browser doesn't provide options to detect the system keyboard layout. Clients must configure the keyboard layout selected by user on the server.
     * In GeForce NOW, the user selected keyboard layout is configured on the server through SessionControl library. In other use cases if keyboard layout is not configured
     * on the server then clients must call this function before enabling sending keyboard inputs to the server. @see NskStreamClient.captureUserInput.
     * Note: should be invoked only during streaming. Does not cache the keyboard layout for next stream session.
     * @see NskStreamClientDelegate.onStreamStarted to get the streaming start notification.
     * @param layout - keyboard layout string in locale format (e.g. "en-US")
     * @returns false if streaming is not in progress, else true.
     */
    setKeyboardLayout(layout: string): boolean;
    /**
     * Informs if the remote application on the server can handle specific HID device raw inputs.
     * Clients must call this before getGamepadBitmap() and startStreaming().
     * In GeForce NOW the app list request provides the input types supported by the remote application.
     * StreamKit by default will consider HidType.NONE as the supported devices.
     * In use cases like GeForce Now where different applications on server can be launched in subsequent sessions clients must invoke this before every streaming session.
     * @param hidType - bitwise OR values of supported HID types.
     * @note After every stream termination/stream connection failure, the supportedHidTypes are reset to NONE by StreamKit.
     * @note Touch devices are also HID type but in GeForce NOW we need confirmation from SessionControl library that
     * remote application has been launched to handle raw touch inputs, use StreamStartParameters.enableTouchInput to
     * enable sending raw touch inputs to server.
     */
    setSupportedHidTypes(hidType: HidType): void;
    /**
     * Toggle Gamepad Right-Stick Dynamic Mouse Mode on/off.
     * When enabled the gamepad joystick can be treated as mouse to send mouse move and mouse click events to server.
     * Default state is off, and must be explicitly enabled.
     * Note: for Xbox platform, left stick will be used for RSDMM feature with same API
     * Does nothing if stream is not started and the state is not cached between streams.
     * @param enable - true to enable, false to disable.
     * @returns false if streaming is not in progress, else true.
     */
    setGamepadRsdmm(enable: boolean): boolean;
    /**
     * Provides the VirtualInputController interface which can be used for notifying virtual input display state and sending virtual inputs to the server.
     * Reference is valid throughout the life time of NskStreamClient.
     * When NskStreamClient needs to be released the reference to return object should be removed for the garbage collector to cleanup NskStreamClient.
     * @see VirtualInputController for more details.
     * @returns VirtualInputController
     **/
    getVirtualInputController(): VirtualInputController;
    /**
     * Provides the gamepad bit map which represents the current status of gamepads connected to the browser tab.
     * In GeForce NOW, the clients need to get the value of gamepad bitmap and pass it to the SessionControl library, which forwards the bitmap to server even before streaming connection.
     * During streaming any changes to the gamepad state is communicated to the server by the NVIDIAStreamKit.
     * @return number - bitmap value which streamer process can understand.
     * @see setSupportedHidTypes to inform DS4/DS5 support before invoking this function.
     * @note Clients must inform the virtual gamepad support through VirtualInputController.setClientSupportsVirtualGamepad before invoking this API.
     */
    getGamepadBitmap(): number;
    /**
     * This API will enable/disable input handling for given input types in fullscreen and windowed mode.
     * When client displays overlays and doesn't want the inputs to be sent to server, clients must call captureUserInput(false)
     * After streaming connection by default input is not handled, clients must call captureUserInput(true) to enable input processing.
     * The value passed here will not be reused for next streaming session. Client must call captureUserInput(true) after every streaming start notification.
     * When mouse input capture is enabled, the cursor is captured automatically.
     * Note: disabling input handling will not prevent sending inputs to server via VirtualInputController or through sendTextInput.
     * @see NskStreamClientDelegate.onStreamStarted.
     * @param enable - enable/disable
     * @param inputs - input types that need to be enabled/disabled [default: InputType.All]
     * @returns false if streaming is not in progress, else true.
     **/
    captureUserInput(enable: boolean, inputs?: InputType): boolean;
    /**
     * Send plain text to server. Even if captureUserInput(false) is executed to prevent input handling, this input will always be sent to server.
     * Note: should be invoked only during streaming.
     * @see NskStreamClientDelegate.onStreamStarted to get the streaming start notification.
     * @param text - ArrayBuffer containing text in utf-8 format
     * @returns false if streaming is not in progress, else true.
     */
    sendTextInput(text: ArrayBuffer): boolean;
    /**
     * Provides the current status of Mic capture.
     * Since Browser API's to get Mic state is asynchronous this API returns a promise.
     * @see NskStreamClientDelegate.onMicStateUpdate
     * @see isFeatureSupported - BrowserFeature::MicCapture
     * @returns promise - provides MicState when resolved.
     **/
    getMicState(): Promise<MicState>;
    /**
     * When enabled the voice stream from the Mic will be sent to the server and passed to the game/app on the server.
     * The downlink Mic audio from remote participants will be played along with the streamed game/app audio.
     * After enable/disable Mic, status will be updated to NskStreamClientDelegate.
     * @see NskStreamClientDelegate.onMicStateUpdate
     * @param enable - if true Mic capture will be started else stopped.
     * Note: Mic should not be enabled in all cases. @see isFeatureSupported and @see shouldDefaultEnableMic
     * @returns false if streaming is not in progress, else true.
     **/
    captureMic(enable: boolean): boolean;
    /**
     * Applies CSS transformations to the video element of a particular stream.
     * This can be used to move or change the scale of the video element.
     * Users can change the transforms through touch controls on mobile platforms as well.
     * The transforms are absolute and not relative to the existing or previous state of the video element.
     * The parameters of the API function is same as translate3d and scale3d.
     * This API should be used instead of directly using the above APIs so that transformation is accounted when processing user inputs.
     * @param offsetX - Horizontal offset that should be applied to the video in CSS pixels
     * @param offsetY - Vertical offset that should be applied to the video in CSS pixels
     *                  Note: Can be any value, but will be clamped so that the video will still fill the entire video area.
     *                        0 is no translation, negative translates the video left/up and positive translates the video right/down.
     * @param zoomFactor - Factor the video should be scaled by. 1 is default size, < 1 makes the video smaller and > 1 makes it larger
     *                     Note: Can be any value, but if the user pans or zooms the video it will be forced to [1, 3] so recommended values are in the same range.
     * @param index - optional stream index if there is more than one stream.
     * @returns false if streaming is not in progress, else true.
     **/
    setVideoTransforms(offsetX: number, offsetY: number, zoomFactor: number, index?: number): boolean;
    /**
     * Update the source of a track being sent to the server.
     * @param index Index of the stream being sent to the server to update the source of.
     * Corresponds to the index of the array provided in @see StreamStartParameters.
     * @note That the track must be of the same type as previously specified at that index.
     * @param track Track to send to the server.
     * @note Replacing a track does not stop the previous track. Use @see stopUpstreamMedia to stop an ongoing track.
     * @returns A promise that resolves with true if the track was successfully replaced, false if it was not.
     **/
    setUpstreamMedia(index: number, track: MediaStreamTrack): Promise<boolean>;
    /**
     * Unset the source of a track being sent to the server.
     * The existing track will be replaced with a placeholder track.
     * @param index Index of the stream being sent to the server to update the source of.
     * Corresponds to the index of the array provided in @see StreamStartParameters.
     * @returns A promise that resolves with true if the track was successfully unset, false if it was not.
     */
    unsetUpstreamMedia(index: number): Promise<boolean>;
    /**
     * Stop the source of a stream being sent to the server.
     * @param index Index of the stream being sent to the server to stop.
     * Corresponds to the index of the array provided in @see StreamStartParameters
     * @note Once a stream is stopped, a placeholder stream will be sent to the server.
     * Even once this is called on a streamIndex, another stream can still be added using @see setUpstreamMedia.
     * @note This API is provided as a convenience, clients can instead stop the stream directly.
     * The stream client will replace the stream with a placeholder stream even if the clients stop the stream without the use of this API.
     * @note It is not required to call this function before calling @see setUpstreamMedia with a new stream.
     * @returns A promise that resolves with true if the stream was successfully stopped, false if it was not.
     */
    stopUpstreamMedia(index: number): Promise<boolean>;
}
/**
 * Creates a NskStreamClient interface which provides the streaming functionalities.
 * Clients can use the same instance for successive streaming connections.
 * @param platformDetails - PlatformDetails obtained from @see getPlatformDetails
 * @param delegate - NskStreamClientDelegate to receive all the notifications.
 * @param initParams - Initialization parameters.
 * @returns NskStreamClient interface.
 * @throws {Error} - if unable to initialize the NskStreamClient.
 */
export declare function createNskStreamClient(platformDetails: PlatformDetails, delegate: NskStreamClientDelegate, initParams: StreamClientInitParameters): NskStreamClient;
