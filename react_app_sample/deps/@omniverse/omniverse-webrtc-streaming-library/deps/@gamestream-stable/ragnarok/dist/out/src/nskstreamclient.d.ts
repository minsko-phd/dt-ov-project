import { PlatformDetails } from "./dependencies";
import { StartSessionResultEvent, StreamingTerminatedEvent } from "./interfaces";
import { CustomMessage, DynamicStreamingMode, HidType, InputType, MicState, NskStreamClient, NskStreamClientDelegate, StreamClientInitParameters, StreamStartParameters, StreamingState, VirtualInputController } from "./nskinterfaces";
import { RErrorCode } from "./rerrorcode";
import { IStreamCallbacks } from "./rinterfaces";
/**
 * Implementation class of the public NskStreamClient interface.
 * @todo Split responsibilities between this and StreamClient. Can gamepad and mic be owned by StreamClient, since only used in that context?
 */
export declare class NskStreamClientImpl implements NskStreamClient, IStreamCallbacks, VirtualInputController {
    private platformDetails;
    private delegate;
    private initParams;
    private streamClient?;
    private gamepadHandler;
    private micCapturer;
    private gamepadTester;
    private audioRecorder;
    private streamingState;
    private startTime;
    private isResume;
    private sleepDetector;
    private exitErrorCodeForUnload?;
    private systemIdleId;
    private visibilityHiddenTime;
    private deviceChangeCount;
    private sessionId;
    private subSessionId;
    private zoneAddress;
    private zoneName;
    private videoElement?;
    private audioElement?;
    private micRecording;
    private appId;
    /**
     * @param platformDetails - PlatformDetails obtained from @see getPlatformDetails
     * @param delegate - NskStreamClientDelegate to receive all the notifications.
     * @param initParams - Initialization parameters.
     */
    constructor(platformDetails: PlatformDetails, delegate: NskStreamClientDelegate, initParams: StreamClientInitParameters);
    startStreaming(params: StreamStartParameters): RErrorCode;
    stopStreaming(reason?: number): void;
    getStreamingState(): StreamingState;
    sendCustomMessage(message: CustomMessage): boolean;
    setStreamingMaxBitrate(kbps: number, index?: number, upstream?: boolean): boolean;
    setDynamicStreamingMode(mode: DynamicStreamingMode, index?: number, upstream?: boolean): boolean;
    setKeyboardLayout(layout: string): boolean;
    setSupportedHidTypes(hidType: HidType): void;
    setGamepadRsdmm(enable: boolean): boolean;
    getVirtualInputController(): VirtualInputController;
    getGamepadBitmap(): number;
    captureUserInput(enable: boolean, inputs?: InputType): boolean;
    sendTextInput(text: ArrayBuffer): boolean;
    getMicState(): Promise<MicState>;
    captureMic(enable: boolean): boolean;
    setVideoTransforms(offsetX: number, offsetY: number, zoomFactor: number, streamIndex?: number): boolean;
    setUpstreamMedia(index: number, track: MediaStreamTrack): Promise<boolean>;
    unsetUpstreamMedia(index: number): Promise<boolean>;
    stopUpstreamMedia(index: number): Promise<boolean>;
    onSessionStart(data: StartSessionResultEvent): void;
    onStreamStop(data: StreamingTerminatedEvent): void;
    onUserIdleClear(): void;
    emit(eventName: string, ...args: any[]): void;
    addListener(eventname: string, handler: Function): void;
    removeListener(eventname: string, handler: Function): void;
    removeAllListeners(): void;
    removeAllListenersOfEvent(eventname: string): void;
    hasListener(eventname: string): boolean;
    setClientSupportsVirtualGamepad(supported: boolean): void;
    handleVirtualGamepadState(buttons: number, trigger: number, axes: [number, number, number, number]): void;
    setVirtualKeyboardState(displayed: boolean): boolean;
    handleVirtualKeyInput(event: KeyboardEvent): boolean;
    /**
     * Cleanup the state, listeners, etc. once a streaming session is ended.
     */
    private resetClient;
    /**
     * Collect startup timing related telemetry events, once per nskstreamclient.
     */
    private collectPerformanceTimingTelemetry;
    /**
     * Collect media capability related telemetry events, once per nskstreamclient.
     */
    private collectMediaCapabilitiesTelemetry;
    /**
     * Handle an exception that was not explicitly caught.
     * Emit an event, log, and potentially stop streaming.
     * @param unhandled Event that caused the unhandled exception
     * @returns False since we want the exception to propagate
     */
    private unhandledException;
    /**
     * Stop the stream client and clean up streaming
     * @param errorCode Code to stop the stream client with
     * @param clientInitiated Whether or not the end request was client initiated
     */
    private shutdownClient;
    /**
     * Send a stream exit event
     * @param code Exit code associated with the exit. If not provided, will assume Success.
     * @param connectivity String that represents the connectivity status at the time of exit. @see ConnectivityStatus
     * @param sleep Whether or not the exit was related to the device going to sleep. If not provided, will assume false.
     */
    private sendExitEvent;
    /**
     * Handle the visibility change event.
     * Apply iOS specific audio and microphone WARs.
     * If we are losing visibility, cache an exit event because we might be shutdown soon.
     */
    private visibilityChange;
    /**
     * Handle page unload, by ending the stream gracefully.
     */
    private unload;
    /**
     * Handle and track audio device changes.
     */
    private deviceChange;
    /**
     * Clear LG specific system idle timeout
     */
    private clearSystemIdleTimeout;
    /**
     * Handle LG specific system idle timeout meant to prevent burn in
     * @param event LG specific system idle event
     */
    private handleSystemIdle;
    /**
     * Register event listeners to monitor device while streaming.
     */
    private registerWindowAndDocumentEvents;
    /**
     * Unregister event listeners that monitored the device while streaming.
     */
    private unregisterWindowAndDocumentEvents;
    /**
     * Perform the WAR to reset audio.
     */
    private resetAudio;
    /**
     * Remove WAR to fix high latency audio issue on iOS 15
     */
    private removeContextFix;
    /**
     * Apply WAR to fix high latency audio issue on iOS 15
     */
    private applyContextFix;
    /**
     * Determine whether or not the device currently has internet connectivity
     * @param errorCode Code that streaming was ended with
     * @returns Promise that resolves with the connectivity status
     */
    private getConnectivityStatus;
    /**
     * This function validates and updates session parameters.
     * @param params Parameters to validate and update.
     * @returns Validated and udpated stream parameters.
     * @note Will return an empty video element array or undefined audio element if they cannot be validated.
     */
    private updateStreamParams;
}
