import { SessionParams, AuthInfo, PlatformDetails, LogQueueingEventEmitter, IEventEmitter } from "./dependencies";
import { EventDataElements } from "./telemetry/telemetryinterfaces";
import { InitParams, StartSessionResultEvent, InputConfigFlags, CustomMessage, InputType, StreamingTerminatedEvent } from "./interfaces";
import { VirtualGamepadHandler } from "./input/virtualgamepad";
import { GamepadHandler } from "./input/gamepadhandler";
import { IStreamCallbacks } from "./rinterfaces";
/**
 * The interface which defines the protocol to connect to server.
 *
 * GridApp is the class which implements the protocol and provides the actual ability to connect to server.
 * And it could be instantiated as: const gridApp: GridApp = new GridApp(platformDetails);
 *
 * Clients can register for callbacks only for EVENTS (declared in interfaces.ts). AddListener method of GridApp provided by EventEmitter
 * is used to register for these events and client can do UI updates accordingly.
 * Client needs InitParams and sessionStartParams object with correct data before a session is initiated.
 * call setAuthInfo to set auth method used to communicate with server (default is Jarvis).
 * call startSession only after successfull initialization of grid app using initialize method
 * call stopSession to stop streaming.
 * call getActiveSessions if SESSION_START_RESULT fails with RErrorCode.SessionLimitExceeded to get list of sessions
 * and then client can stop those sessions using stopSession method to start a new session later on.
 *
 * Sample Usage:
 * const gridApp = new GridApp(platformDetails);
 * gridApp.initialize({
 *     serverAddress: "server-address.nvidiagrid.net",
 *     authTokenCallback: <function callback>,
 *     deviceHashId: "1234567890",
 * },
 * {
 *     cursorType: CursorType.SOFTWARE,
 *     allowUnconfined: false
 * });
 * gridApp.setAuthInfo({ AuthType.JARVIS, "some token" });
 *
 * gridApp.addListener(EVENTS.SESSION_START_RESULT, (eventData: StartSessionResultEvent) => {});
 * gridApp.addListener(EVENTS.SESSION_STOP_RESULT, (eventData: StopSessionResultEvent) => {});
 * gridApp.addListener(EVENTS.ACTIVE_SESSIONS_RESULT, (eventData: ActiveSessionResultEvent) => {});
 * gridApp.addListener(EVENTS.PROGRESS_UPDATE, (eventData: SessionProgressUpdateEvent) => {});
 * gridApp.addListener(EVENTS.STREAM_STOPPED, (eventData: StreamingTerminatedEvent) => {});
 * gridApp.addListener(EVENTS.STREAMING_EVENT, (eventData: StreamingEvent) => {});
 * gridApp.addListener(EVENTS.GET_SESSION_RESULT, (eventData: GetSessionResult) => {});
 *
 * gridApp.startSession({
 *     appId: 100000000,
 *     keyboardLayout: "en-US",
 *     shortName: "Fortnite (Epic)",
 *     streamParams: [...]
 * }); // Start a session
 * gridApp.getSession(some_session_id); // Retrieve the session by using the given session id, session detail will be emitted through the GET_SESSION_RESULT event
 * gridApp.stopSession(some_session_id); // Stop a session
 */
declare interface IGridApp extends IEventEmitter {
    /**
     * Initializes the GridApp.
     * Returns true if successfully initialized.
     * @param initializeParams - interface: InitParams
     * @param inputConfigFlags - interface: InputConfigFlags [default: { allowUnconfined: false, preventNavigation: false }]
     **/
    initialize(initializeParams: InitParams, inputConfigFlags: InputConfigFlags): boolean;
    /**
     * This API is used by client to keep ragnarok informed about all the latest params need to be passed in telemetry event.
     * To get user and session id updated client should at least call it just before every call to startSession and resume.
     * @param {EventDataElements} eventDataElements
     * @memberof GridApp
     */
    updateEventDataElements(eventDataElements: EventDataElements): void;
    /**
     * Gets the current active sessions for the user.
     * This is an asynchronous API, upon completion ACTIVE_SESSIONS_RESULT event is emitted.
     **/
    getActiveSessions(): void;
    /**
     * Starts a session.
     * This is an asynchronous API and the result is delivered in SESSION_START_RESULT event.
     * If there result doesn't contain error then client should display the video tag as a successful result indicates
     * streaming has begun.
     * @param sessionStartParams - check SessionParams interface for details
     **/
    startSession(sessionStartParams: SessionParams): void;
    /**
     * getSession request.
     * This is an asynchronous API and the result is delivered in GET_SESSION_RESULT event.
     * This API is meant for resume scenario only. Since getActiveSessions is expensive as it includes a jarvis call.
     * So client needs to make getActiveSessions call once and subsequent calls can be getSession to get the state.
     * @param sessionId - sessionId to be resumed.
     **/
    getSession(sessionId: string): void;
    /**
     * resume request.
     * This is an asynchronous API and the result is delivered in SESSION_START_RESULT event.
     * This call is recommended instead of resume() and covers all resume cases.
     * * @param sessionResumeParams - check SessionParams for details
     * * @param sessionId of resumable session
     * Here sre steps client go through:
     * 1. Client make a startSessionRequest
     * 2. Session is streaming.
     * 3. Client gets STREAM_STOPPED event with error group (((eventData.error.code ^ RErrorCode.StreamerErrorCategory)>>8) == 0)
     *    or tab is closed or browser crashed or session launched from different device with same account and same appid.
     * 4. Client calls getactivesession() and if the appid is same and error is (RErrorCode.SessionLimitExceeded || RErrorCode.SessionLimitPerDeviceReached)
     * 5. Client Calls multiple getSession(sessionid) untill status becomes SessionState.READY_FOR_CONNECTION
     * 6. Client calls resumeSession()
     **/
    resumeSession(sessionResumeParams: SessionParams, sessionId: string): void;
    /**
     * Stops a session.
     * This is an asynchronous API and the result is delivered in SESSION_STOP_RESULT event.
     * If the session to be stopped is streaming in current client then streaming is aborted and session is terminated on the server.
     * If not streaming then session is terminated on the server.
     * @param sessionId - session to be stopped.
     * @param exitCode - reason for stopping the session
     **/
    stopSession(sessionId?: string, exitCode?: number): void;
    /**
     * Pauses a session.
     * This is an asynchronous API and the result is delivered in SESSION_STOP_RESULT event.
     * If the session to be stopped is streaming in current client then streaming is aborted and session is not terminated on the server.
     * If not streaming then session is terminated on the server.
     * @param sessionId - session to be paused.
     **/
    pauseSession(sessionId?: string): void;
    /**
     * DEPRECATED - should use resumeSession instead.
     * resume request.
     * This is an asynchronous API and the result is delivered in SESSION_START_RESULT event.
     * This call has a limitation that it is meant for auto resume only as client wants to stick with this due to same it's making in geronimo.
     * We can't resume once the tab is closed or from another device.
     * Here sre steps client go through:
     * 1. Client make a startSessionRequest
     * 2. Session is streaming.
     * 3. Client gets STREAM_STOPPED event with error group (((eventData.error.code ^ RErrorCode.StreamerErrorCategory)>>8) == 0)
     * 4. Client Calls multiple getSession(sessionid) untill status becomes SessionState.READY_FOR_CONNECTION
     * 5. Client calls resume()
     **/
    resume(): void;
    /**
     * Find whether mic is supported or not
     * This is definitive (either site is http (https/Chrome flags bypass is required),
     * or browser does not support capture)
     **/
    isMicSupported(): boolean;
    /**
     * Enable/disable mic recording
     * This will enable/disable recording of microphone (mic stream is already established
     * if supported when we initialize), can cause perf issues if enabled
     * This is an asynchronous API, upon completion MIC_STATE event is emitted.
     * This method should be called after a successful session start
     **/
    setMicRecordingEnabled(enabled: boolean): void;
    /**
     * Get current status of mic recording
     * This method will emit a MicStateEvent with result of operation
     **/
    getMicState(): void;
    /**
     * Find whether mic should be enabled by default
     * This recommendation can be made based on various criteria
     * e.g. platform permissions, performance, limited support etc.
     * This is not the same as isMicSupported and cannot be used as a replacement
     **/
    shouldDefaultEnableMic(): boolean;
    /**
     * This API will enable/disable input handlings for given input types in fullscreen and windowed mode.
     * When inputs are enabled/disabled, event listeners are registerd/de-registered with certain DOM elements.
     * This could be useful when showing overlay buttton under fullsceen mode.
     * @param enable - enable/disable
     * @param inputs - input types that need to be enabled/disabled [default: InputType.All]
     **/
    toggleUserInput(enable: boolean, inputs?: InputType): void;
    /**
     * Send custom messages to the streaming server
     * NOTE: do nothing if stream is not started.
     * @param message - messages need to be sent to the server
     **/
    sendCustomMessage(message: CustomMessage): void;
    /**
     * Get the reference of VirtualGamepadHandler. Reference can be undefined if inputchannel is failed to go in open state.
     * Clients should refer virtualgamepad.ts API details.
     **/
    getVirtualGamepadHandler(): VirtualGamepadHandler | undefined;
    /**
     * Set the client's authorization information.
     * initialize must be called before using this API.
     * Should be called before the first use of APIs that require authentication with the server:
     *   - startSession
     *   - getActiveSessions
     *   - getSession
     *   - resumeSession
     *   - stopSession
     *   - pauseSession
     *   - resume
     * If not called, Jarvis authentication will be assumed.
     * In the event of authentication related errors, can be called again to update the existing authentication information.
     * @param authInfo - object
     *               { type: enum<auth method for server communication>
     *                 token: string<token to authenticate server communication>}
     **/
    setAuthInfo(authInfo: AuthInfo): void;
    /**
     * Send plain text to server.
     * NOTE: do nothing if stream is not started.
     * @param text - ArrayBuffer containing text in utf-8 format
     */
    sendTextInput(text: ArrayBuffer): void;
    /**
     * Send virtual keyboard state to server.
     * NOTE: do nothing if stream is not started.
     * @param visible - Boolean describing the visual state of the virtual keyboard
     */
    setVirtualKeyboardState(visible: boolean): void;
    /**
     * Transform video element locally.
     * @param offsetX - X coordinate offset
     * @param offsetY - Y coordinate offset
     * @param zoomFactor - zoom factor to determine translation limits
     */
    setVideoTransforms(offsetX: number, offsetY: number, zoomFactor: number): void;
    /**
     * Toggle the visibility of on screen stats.
     * Other shortcuts to bring up the stats (key combination and gestures) can still be used to toggle the visibility of the stats.
     * NOTE: do nothing if stream is not started.
     **/
    toggleOnScreenStats(): void;
    /**
     * Toggle the stutter visualization tool.
     * NOTE: do nothing if stream is not started.
     **/
    toggleStutterIndicator(): void;
    /**
     * Sets the keyboard layout on the server during a session
     * NOTE: do nothing if stream is not started.
     * @param layout - keyboard layout string (e.g. "en-US")
     */
    setKeyboardLayout(layout: string): void;
    /**
     * Download the audio recording.
     * NOTE: the audio recording must exist. If not exist, no file will be downloaded.
     *       To generate the audio, ctrl + alt + d is needed to trigger PCM dump under dev mode.
     */
    downloadAudio(): void;
    /**
     * Toggle Right-Stick Dynamic Mouse Mode on/off.
     * Default state is off, and must be explicitly enabled.
     * Note: for xbox left stick will be used for rsdmm feature with same API
     * @param enable - true to enable, false to disable.
     */
    toggleRsdmm(enable: boolean): void;
    /**
     * Sends keyboard event to streamer.
     * NOTE: do nothing if stream is not started.
     * @param event - keyboard event
     */
    sendKeyEvent(event: KeyboardEvent): void;
    /**
     * Sets the max bitrate while streaming.
     * NOTE: do nothing if stream is not started.
     * @param kbps - bitrate in kbps
     * @param streamIdx - stream index
     */
    setStreamingMaxBitrate(kbps: number, streamIdx?: number): void;
    /**
     * Adjust for poor network condition while streaming.
     * NOTE: do nothing if stream is not started.
     * @param enabled - true for enable; false for disable
     * @param streamIdx - stream index
     */
    setDrcDfcState(enabled: boolean, streamIdx?: number): void;
}
export declare class GridApp extends LogQueueingEventEmitter implements IGridApp, IStreamCallbacks {
    private platformDetails;
    private currentSession?;
    private streamClient?;
    private gridServer?;
    private initializeParams;
    private sessionStartParams?;
    private startTime;
    private unloadFunc;
    private onlineFunc;
    private visibilitychangeFunc;
    private unhandledExceptionFunc;
    private framesDecoded;
    private telemetry;
    private isResume;
    private inputConfigFlags;
    private micCapturer;
    private audioRecorder;
    private inputEnabled;
    private inputs?;
    private micEnabled;
    private sleepDetector;
    private gamepadTester;
    gamepadHandler: GamepadHandler;
    private sessionSetUpInProgress;
    private deviceChangeFunc;
    private resetAudioFunc;
    private pageShutDownCleanupDuringSessionDone;
    private exitErrorCodeForUnload?;
    private exitEventCacheTimeoutId;
    private telemetryEventProcessor;
    private systemIdleFunc;
    private systemIdleId;
    private visibilityHiddenTime;
    private deviceChangeCount;
    private isSessionOngoing;
    private sessionPauseInProgress;
    constructor(platformDetails: PlatformDetails);
    private resetSessionIds;
    private unhandledException;
    private sendExitAnalyticsEvent;
    private getStreamExitEventData;
    private pageShutDownCleanupDuringSession;
    private unload;
    private online;
    private visibilitychange;
    private onGsTelemetryEvent;
    private onGsActiveSessionsResult;
    private onGsProgressUpdate;
    private onGsSessionUpdate;
    private initializeGridServer;
    /**
     * Initializes the GridApp.
     * Returns true if successfully initialized.
     * @param initializeParams - interface: InitParams
     * @param inputConfigFlags - interface: InputConfigFlags [default: { allowUnconfined: false, preventNavigation: false }]
     **/
    initialize(initializeParams: InitParams, inputConfigFlags?: InputConfigFlags): boolean;
    downloadAudio(): void;
    /**
     * This API is used by client to keep ragnarok informed about all the latest params need to be passed in telemetry event.
     * To get user and session id updated client should at least call it just before every call to startSession and resume.
     * @param {EventDataElements} eventDataElements
     * @memberof GridApp
     */
    updateEventDataElements(eventDataElements: EventDataElements): void;
    /**
     * Gets the current active sessions for the user.
     * This is an asynchronous API, upon completion ACTIVE_SESSIONS_RESULT event is emitted.
     **/
    getActiveSessions(): void;
    private onSessionStartException;
    private onSessionStartError;
    private runSession;
    private sendSessionSetupInProgressTelemetry;
    private updateExitEventCacheWithNewParams;
    private clearExitEventCacheTimeout;
    private cacheExitEventInDbPeriodically;
    private setPeriodicExitEventCacheTimeout;
    private registerWindowAndDocumentEvents;
    private collectPerformanceTimingTelemetry;
    private unregisterWindowAndDocumentEvents;
    private prepareSession;
    /**
     * Starts a session.
     * This is an asynchronous API and the result is delivered in SESSION_START_RESULT event.
     * If there result doesn't contain error then client should display the video tag as a successful result indicates
     * streaming has begun.
     * @param sessionStartParams - check SessionParams interface for details
     **/
    startSession(sessionStartParams: SessionParams): void;
    /**
     * getSession request.
     * This is an asynchronous API and the result is delivered in GET_SESSION_RESULT event.
     * This API is meant for resume scenario only. Since getActiveSessions is expensive as it includes a jarvis call.
     * So client needs to make getActiveSessions call once and subsequent calls can be getSession to get the state.
     * @param sessionId - sessionId to be resumed.
     **/
    getSession(sessionId: string): void;
    /**
     * NOTE: should use resumeSession instead.
     * resume request.
     * This is an asynchronous API and the result is delivered in SESSION_START_RESULT event.
     * This call has a limitation that it is meant for auto resume only as client wants to stick with this due to same it's making in geronimo.
     * We can't resume once the tab is closed or from another device.
     * Here sre steps client go through:
     * 1. Client make a startSessionRequest
     * 2. Session is streaming.
     * 3. Client gets STREAM_STOPPED event with error group (((eventData.error.code ^ RErrorCode.StreamerErrorCategory)>>8) == 0)
     * 4. Client Calls multiple getSession(sessionid) untill status becomes SessionState.READY_FOR_CONNECTION
     * 5. Client calls resume()
     **/
    resume(): void;
    /**
     * resume request.
     * This is an asynchronous API and the result is delivered in SESSION_START_RESULT event.
     * This call is recommended instead of resume() and covers all resume cases.
     * * @param sessionResumeParams - check SessionParams for details
     * * @param sessionId of resumable session
     * Here sre steps client go through:
     * 1. Client make a startSessionRequest
     * 2. Session is streaming.
     * 3. Client gets STREAM_STOPPED event with error group (((eventData.error.code ^ RErrorCode.StreamerErrorCategory)>>8) == 0)
     *    or tab is closed or browser crashed or session launched from different device with same account and same appid.
     * 4. Client calls getactivesession() and if the appid is same and error is (RErrorCode.SessionLimitExceeded || RErrorCode.SessionLimitPerDeviceReached)
     * 5. Client Calls multiple getSession(sessionid) untill status becomes SessionState.READY_FOR_CONNECTION
     * 6. Client calls resumeSession()
     **/
    resumeSession(sessionResumeParams: SessionParams, sessionId: string): void;
    /**
     * Stops a session.
     * This is an asynchronous API and the result is delivered in SESSION_STOP_RESULT event.
     * If the session to be stopped is streaming in current client then streaming is aborted and session is terminated on the server.
     * If not streaming then session is terminated on the server.
     * @param sessionId - session to be stopped.
     * @param exitCode - reason for stopping the session
     **/
    stopSession(sessionId?: string, exitCode?: number): void;
    /**
     * Pauses a session.
     * This is an asynchronous API and the result is delivered in SESSION_STOP_RESULT event.
     * If the session to be stopped is streaming in current client then streaming is aborted and session is not terminated on the server.
     * If not streaming then session is terminated on the server.
     * @param sessionId - session to be paused.
     **/
    pauseSession(sessionId?: string): void;
    private startStreaming;
    private notifyClientStartResult;
    private notifyClientWithError;
    private getConnectivityStatus;
    private stopStreamClient;
    private notifyClientOfStop;
    onSessionStart(data: StartSessionResultEvent, sessionSetupFailed?: boolean): void;
    private collectMediaCapabilitiesTelemetry;
    onStreamStop(data: StreamingTerminatedEvent): void;
    onUserIdleClear(): void;
    private updateSessionParams;
    private sendDeleteRequest;
    /**
     * Find whether mic is supported or not
     * This is definitive (either site is http (https/Chrome flags bypass is required),
     * or browser does not support capture)
     **/
    isMicSupported(): boolean;
    /**
     * Enable/disable mic recording
     * This will enable/disable recording of microphone (mic stream is already established
     * if supported when we initialize), can cause perf issues if
     * enabled
     * This is an asynchronous API, upon completion MIC_STATE event is emitted.
     * This method should be called after a successful session start
     **/
    setMicRecordingEnabled(enabled: boolean): void;
    /**
     * Get current status of mic recording
     * This method will emit a MicStateEvent with result of operation
     **/
    getMicState(): void;
    /**
     * Find whether mic should be enabled by default
     * This recommendation can be made based on various criteria
     * e.g. platform permissions, performance, limited support etc.
     * This is not the same as isMicSupported and cannot be used as a replacement
     **/
    shouldDefaultEnableMic(): boolean;
    /**
     * Send custom messages to the streaming server
     * NOTE: do nothing if stream is not started.
     * @param message - messages need to be sent to the server
     **/
    sendCustomMessage(message: CustomMessage): void;
    /**
     * This API will enable/disable input handlings for given input types in fullscreen and windowed mode.
     * When inputs are enabled/disabled, event listeners are registerd/de-registered with certain DOM elements.
     * This could be useful when showing overlay buttton under fullsceen mode.
     * @param enable - enable/disable
     * @param inputs - input types that need to be enabled/disabled [default: InputType.All]
     **/
    toggleUserInput(enable: boolean, inputs?: InputType): void;
    /**
     * Toggle Right-Stick Dynamic Mouse Mode on/off.
     * Default state is off, and must be explicitly enabled.
     * Note: for xbox left stick will be used for rsdmm feature with same API
     */
    toggleRsdmm(enable: boolean): void;
    /**
     * Get the reference of VirtualGamepadHandler. Reference can be undefined if inputchannel is failed to go in open state.
     * Clients should refer virtualgamepad.ts API details.
     **/
    getVirtualGamepadHandler(): VirtualGamepadHandler | undefined;
    /**
     * Set the client's authorization information.
     * initialize must be called before using this API.
     * Should be called before the first use of APIs that require authentication with the server (startSession, getActiveSessions).
     * If not called, Jarvis authentication will be assumed.
     * In the event of authentication related errors, can be called again to update the existing authentication information.
     * @param authInfo - object
                     { type: enum<auth method for server communication>
                       token: string<token to authenticate server communication>}
     **/
    setAuthInfo(authInfo: AuthInfo): void;
    /**
     * Send plain text to server.
     * NOTE: do nothing if stream is not started.
     * @param text - ArrayBuffer containing text in utf-8 format
     */
    sendTextInput(text: ArrayBuffer): void;
    /**
     * Send virtual keyboard state to server.
     * NOTE: do nothing if stream is not started.
     * @param visible - Boolean describing the visual state of the virtual keyboard
     */
    setVirtualKeyboardState(visible: boolean): void;
    /**
     * Transform video element locally.
     * @param offsetX - X coordinate offset
     * @param offsetY - Y coordinate offset
     * @param zoomFactor - zoom factor to determine translation limits
     */
    setVideoTransforms(offsetX: number, offsetY: number, zoomFactor: number): void;
    /**
     * Toggle the visibility of on screen stats.
     * Other shortcuts to bring up the stats (key combination and gestures) can still be used to toggle the visibility of the stats.
     * NOTE: do nothing if stream is not started.
     **/
    toggleOnScreenStats(): void;
    /**
     * Toggle the stutter visualization tool.
     * NOTE: do nothing if stream is not started.
     **/
    toggleStutterIndicator(): void;
    /**
     * Sets the keyboard layout on the server during a session
     * NOTE: do nothing if stream is not started.
     * @param layout - keyboard layout string (e.g. "en-US")
     */
    setKeyboardLayout(layout: string): void;
    /**
     * Sends keyboard event to streamer.
     * NOTE: do nothing if stream is not started.
     * @param event - keyboard event
     */
    sendKeyEvent(event: KeyboardEvent): void;
    /**
     * Sets the max bitrate while streaming.
     * NOTE: do nothing if stream is not started.
     * @param kbps - bitrate in kbps
     * @param streamIdx - stream index
     */
    setStreamingMaxBitrate(kbps: number, streamIdx?: number): void;
    /**
     * Adjust for poor network condition while streaming.
     * NOTE: do nothing if stream is not started.
     * @param enabled - true for enable; false for disable
     * @param streamIdx - stream index
     */
    setDrcDfcState(enabled: boolean, streamIdx?: number): void;
    private applyContextFix;
    private removeContextFix;
    private handleSystemIdle;
    private clearSystemIdleTimeout;
    private deviceChange;
    private terminateOrAbortStreaming;
    private cancelSessionSetup;
    private getGridAppUninitializedError;
}
export {};
