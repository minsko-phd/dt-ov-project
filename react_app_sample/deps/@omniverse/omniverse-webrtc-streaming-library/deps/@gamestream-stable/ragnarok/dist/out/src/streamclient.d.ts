import { RNotificationCode, InputConfigFlags } from "./interfaces";
import { IEventEmitter, ErrorDetails, GridSession, PlatformDetails, StreamParam } from "./dependencies";
import { WebSocketMsg, ExtendedDebugStats, IStreamCallbacks, WebSocketClose, WebSocketHandler, DataChannelParams } from "./rinterfaces";
import { ExitMessage } from "./util/serverclienterrormap";
import { TelemetryHandler } from "./telemetry/telemetryhandler";
import { InputHandler } from "./input/inputhandler";
import { MicCapturer } from "./miccapturer";
import { ClientStatsService, IClientStatsCallbacks } from "./stats/clientstatsservice";
import { VirtualGamepadHandler } from "./input/virtualgamepad";
import { GamepadTester } from "./debug/gamepadtester";
import { GamepadHandler } from "./input/gamepadhandler";
import { AudioRecorder } from "./debug/audiorecorder";
import { ILDATHandler } from "./debug/ldatoverlay";
import { CustomMessage, DynamicStreamingMode, InputType, VideoCodecType, UpstreamMediaSettings } from "./nskinterfaces";
export declare interface ControlChannelMsg {
    version?: {
        major: number;
        minor: number;
    };
    exitMessage?: ExitMessage;
    perfIndicator?: {
        on: boolean;
    };
    stutterIndicator?: {
        on: boolean;
    };
    riDeviceOverlay?: {
        bitmap: number;
    };
    latencyTrigger?: boolean;
    pcmDumpTrigger?: boolean;
    timerNotification?: {
        code: number;
        secondsLeft: number;
    };
    heartbeat?: {};
    debugMessage?: {
        message: string;
    };
    customMessage?: string;
    videoStreamProgressEvent?: {
        streamIndex: number;
        videoStreamProgress: number;
        timestampUs: number;
    };
    etwPrint?: string;
    etwPrintPair?: {
        key: string;
        value: string;
    };
    setMaxBitrate?: {
        streamIndex: number;
        maxBitrate: number;
    };
    setDrcState?: {
        streamIndex: number;
        state: boolean;
    };
    setDfcState?: {
        streamIndex: number;
        state: boolean;
    };
    windowState?: {
        streamIndex: number;
        frameNumber: number;
        windowStateFlags: number;
    };
    systemState?: {
        streamIndex: number;
        frameNumber: number;
        systemStateFlags: number;
    };
    cpuUsage?: {
        streamIndex: number;
        frameNumber: number;
        procCpuUsage: number;
        totalCpuUsage: number;
    };
}
declare interface SignalingMessage {
    type?: string;
    sdp?: string;
    candidate?: string;
    sdpMLineIndex?: number | null;
    sdpMid?: string | null;
    nvstSdp?: string;
    nvstServerOverrides?: string;
}
export interface MultiopusInfo {
    fmtRed: string | undefined;
    fmtCodec: string;
    specificationRed: string;
    specificationCodec: string;
}
export declare const enum DataChannelLabel {
    INPUT = "input_channel_v1",
    GAMEPAD = "gamepad_channel_v1",
    CURSOR = "cursor_channel"
}
export declare class StreamClient implements WebSocketHandler, IClientStatsCallbacks {
    eventEmitter: IEventEmitter;
    name: string;
    id: number;
    private nvstConfig;
    session: GridSession;
    videoElement: HTMLVideoElement;
    audioElement?: HTMLAudioElement;
    remotePeerId: number;
    connectionUrl: string;
    pc?: RTCPeerConnection;
    inputChannel?: RTCDataChannel;
    gamepadChannel?: RTCDataChannel;
    cursorChannel?: RTCDataChannel;
    statsChannel?: RTCDataChannel;
    controlChannel?: RTCDataChannel;
    inputHandler?: InputHandler;
    stopNotified: boolean;
    startNotified: boolean;
    iceCandidateFlag: number;
    telemetry: TelemetryHandler;
    configFlags: InputConfigFlags;
    micCapturer: MicCapturer;
    debugMessageElement: HTMLDivElement;
    debugMessageTimeoutId: number;
    streamBeginTimeoutId: number;
    statsService?: ClientStatsService;
    profilerRunning: boolean;
    webSocketDirtyCloseCount: number;
    signInTimeoutId: number;
    gotOffer: boolean;
    gotLocalCandidate: boolean;
    gotRemoteCandidate: boolean;
    gotAudioTrack: boolean;
    gotVideoTrack: boolean;
    callbacks: IStreamCallbacks;
    audioTrackMuted: boolean;
    private perfIndicator;
    private stutterIndicator;
    private riDeviceOverlayBitmap;
    private trackIdsExpected;
    private streamsAttached;
    private signInUrl;
    private signInRetries;
    private gamepadTester;
    private gamepadHandler;
    private ackIdGenerator;
    private timeTakenBySetRemoteDescriptionCall;
    private timeTakenBySetLocalDescriptionCall;
    private timeTakenByCreateAnswerCall;
    private audioRecorder?;
    private textInputElement?;
    private signInTimerStart;
    private streamBeginTimerStart;
    private signInDuration;
    private streamBeginDuration;
    private pcReconnects;
    private platformDetails;
    private hasPendingKeyboardLayout;
    private keyboardLayout;
    private appLaunchMode;
    private webSocket?;
    private maxReceivedAckId;
    private videoStreamProgress;
    private clientAppVersion?;
    private disconnectedIceStats?;
    private isResume?;
    private codecsPromise;
    private mungingTestPromise;
    private requestedRegion?;
    private bitstreamDump?;
    private queuedControlMessages;
    private safeZoneHandler;
    private sendVideoTrack?;
    private receivedAudioTrackId;
    private deviceObserver;
    private windowStateChangeFunc;
    private systemStateChangeFunc;
    private cpuStateChangeFunc;
    private iceCandidateEventCount;
    private candidateCategoryCounts;
    private iceCandidateEventFunc;
    private candidateAddressRanges;
    private qosMarkerShortcut;
    private serverSideGamepadOverlayGS;
    private clientSideGamepadOverlayGS;
    private negotiatedCodec;
    private measurements;
    private preRenderFunc;
    constructor(parent: IStreamCallbacks, videoElement: HTMLVideoElement, audioElement: HTMLAudioElement | undefined, micCapturer: MicCapturer, configFlags: InputConfigFlags, gamepadTester: GamepadTester, gamepadHandler: GamepadHandler, telemetry: TelemetryHandler, platformDetails: PlatformDetails, session: GridSession, streamParam?: StreamParam, audioRecorder?: AudioRecorder, textInputElement?: HTMLInputElement, clientAppVersion?: string, isResume?: boolean, requestedRegion?: string, dynamicStreamingMode?: DynamicStreamingMode, upstreamMedia?: UpstreamMediaSettings[]);
    /**
     * Starts attempting to connect to the signaling server to start streaming.
     * This should only be called once per StreamClient instance
     */
    start(): void;
    private setSignInfo;
    /**
     * Stops the currently active session
     */
    stop(errorCode: number): void;
    messageHandler(obj: WebSocketMsg): void;
    signInTimeout(): void;
    closeHandler(data: WebSocketClose): void;
    openingHandler(): void;
    openHandler(): void;
    private onWsInfoLog;
    private onWsExceptionLog;
    private createWSAndSignIn;
    signInToConnectionServer(): void;
    startStreamBeginTimeout(): void;
    private streamBeginTimeout;
    private getStreamBeginError;
    private stopStreamWithErrorIfSleep;
    private stopStreamDueToChannelClosing;
    private sendCandidatesTelemetry;
    stopStreamWithError(error: number): void;
    /** Replaces legacy stream names with new ones */
    private renameStreams;
    /**
     * Determines which streams to apply to the video/audio elements. If possible, will combine separate video and audio
     * streams into one media stream and apply it to the video element
     *
     * The server can send separate streams to avoid WebRTC A/V sync from delaying the video, but we may want to only
     * have one stream on the client. This avoids having to use the audio element, which is important for Tizen. By
     * combining them on the client, we get the best of both worlds
     */
    private setMediaElementStreams;
    setUpstreamMedia(index: number, track: MediaStreamTrack): Promise<boolean>;
    unsetUpstreamMedia(index: number): Promise<boolean>;
    stopUpstreamMedia(index: number): Promise<boolean>;
    private addSendVideoTrack;
    private logAndEmitExceptionEvent;
    private setCodecPreferences;
    private moveWSToWebWorker;
    notifyStart(error?: ErrorDetails): void;
    isStartNotified(): boolean;
    /** Sets element.srcObject to a new MediaStream with all the given stream's tracks */
    private setStreamOnElement;
    /**
     * Sends a control channel message, failing if the channel isn't open
     */
    private sendControlMessage;
    /**
     * Queues a control channel message for sending if the channel isn't open yet, or sends it immediately if the
     * channel is already open
     */
    private queueControlMessage;
    updateDcTimeDuration(duration: number): void;
    updateBlockedDuration(duration: number): void;
    notifyIdleUpdate(code: RNotificationCode, secondsLeft: number): void;
    private sendTimerEvent;
    private emitCustomMessageEvent;
    private emitIceStatsEvent;
    private startBitstreamDump;
    private stopBitstreamDump;
    private iceCandidateEventHandler;
    private onIceCandidateHandler;
    createPeerConnection(peerId: number): void;
    private stopInputHandler;
    private stopStatsService;
    updateIceCandidates(sdp: string): string;
    updateIceCandidate(iceCandidate: string): string;
    private didReceiveExpectedTracks;
    private cacheTrackIdsExpected;
    handlePeerMessage(peerId: number, data: string): Promise<void>;
    handleNvstSdp(sdp: string, override: string): string | undefined;
    private preRender;
    private postRender;
    /**
     * Change the display status of the client side stats display
     * @param enableDevStats Whether to enable to advanced developer or basic stats display. Default is false.
     * @param enable Whether to enable or disable the display. If not provided, will invert the status.
     * @todo Make enable required when GridApp is deprecated
     */
    toggleOnScreenStats(enableDevStats?: boolean, enable?: boolean): void;
    getLdatHandler(): ILDATHandler | undefined;
    toggleProfiler(): void;
    toggleWebRTCStats(): void;
    sendQosMarker(): void;
    private statsServiceEnabled;
    enableWebRTCStats(): void;
    disableWebRTCStats(): void;
    sendDataToPeer(peerId: number, message: SignalingMessage): void;
    /**
     * @returns Total number of frames decoded throughout this streaming session.
     * @note The frame count is obtained through stats, so if stats are disabled it will be 0 and the count is updated periodically.
     */
    getFramesDecoded(): number;
    /**
     * @returns Type of video codec used for this stream.
     * @note The codec will either be obtained from the stats or guessed from the SDP negotitaion.
     */
    getVideoCodec(): VideoCodecType;
    toggleUserInput(enable: boolean, inputs?: InputType): void;
    showDebugMessage(message: string): void;
    startProfiler(): void;
    static GetMediaBitrateUpdatedSDP(sdp: string, media: string, bitrate: string): string;
    static isMultiopusOffered(serverSdp: string, media: string): MultiopusInfo | undefined;
    static AddOpusSurroundSupported(sdp: string, media: string, multiopus: MultiopusInfo): string;
    static AddOpusStereoSupported(sdp: string, media: string): string;
    static AddImageattrsToSDP(sdp: string, minw: number, maxw: number, minh: number, maxh: number, minfps: number, maxfps: number): string;
    static GetGoogBitrateUpdatedSDP(sdp: string, media: string, br_min: string, br_max: string, br_start: string): string;
    /**
     * @brief Compares the provided SDP to the list of supported codecs, selecting the top codec present in the SDP that has a match in the codec list.
     * If no match is found, defaults to H264.
     * @param sdp the WebRTC SDP
     * @param codecs list of codecs supported by device in descending order according to priority.
     * The first codec in the array is given highest priority.
     * @returns the selected codec
     * @todo Consolidate SDP manipulation into one function or group of functions.
     */
    static GetSelectedCodec(sdp: string, codecs: VideoCodecType[]): VideoCodecType;
    getVirtualGamepadHandler(): VirtualGamepadHandler | undefined;
    getExtendedDebugStats(): ExtendedDebugStats;
    togglePerfIndicator(): void;
    /**
     * Change display status of the server side stutter indicator
     * @param indicatorStatus Whether or not to show the stutter indicator. If not provided, will invert the display status.
     * @todo make indicatorStatus non-optional when GridApp is removed
     */
    toggleStutterIndicator(indicatorStatus?: boolean): void;
    toggleGamepadOverlay(): void;
    private toggleGamepadClientOverlay;
    sendLatencyTrigger(): boolean;
    sendPcmDumpTrigger(): void;
    eventTriggerLatencyDump(): void;
    toggleGpuViewCapture(): void;
    sendTextInput(text: ArrayBuffer): void;
    setVirtualKeyboardState(visible: boolean): void;
    setVideoTransforms(offsetX: number, offsetY: number, zoomFactor: number): void;
    sendCustomMessage(data: CustomMessage): void;
    setStreamingMaxBitrate(streamIdx: number, kbps: number, upstream?: boolean): void;
    setDrcDfcState(streamIdx: number, mode: DynamicStreamingMode, upstream?: boolean): void;
    writeEtwPrint(msg: string): void;
    writeEtwPrintPair(etwKey: string, etwValue: string): void;
    emitChannelErrorEvent(name: string, event: Event, bufferedAmount?: number): void;
    processInputChannelStats(): void;
    sendKeyEvent(event: KeyboardEvent): void;
    private checkAndNotifyStartToClient;
    private signalAudioPacketsReceived;
    setKeyboardLayout(layout: string): void;
    private logStreamTimestamps;
    /**
     * Configures the given data channel with common event handling, logs, and telemetry
     * @param dataChannel The data channel to configure
     * @param params How to configure the given data channel, see DataChannelParams for details
     */
    addDataChannel(dataChannel: RTCDataChannel, params: DataChannelParams): void;
    private sendWindowState;
    private sendSystemState;
    private sendCpuChange;
    private onWindowStateChange;
    private onSystemStateChange;
    private onCpuStateChange;
}
export {};
