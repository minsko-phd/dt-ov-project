import { AppLaunchMode, IEventEmitter, StreamInfo } from "./dependencies";
import { StartSessionResultEvent, StreamingTerminatedEvent } from "./interfaces";
import { RErrorCode } from "./rerrorcode";
import { MicState, VideoCodecType } from "./nskinterfaces";
export declare class AckIdGenerator {
    private ackId;
    constructor();
    getNextAckId(): number;
}
export declare interface WebSocketMsg {
    peer_info?: {
        id: number;
        name: string;
    };
    peer_msg?: {
        from: number;
        to: number;
        msg: string;
    };
    ackid?: number;
    ack?: number;
    hb?: number;
    stats?: ArrayBuffer;
    error?: string;
}
export interface BoundaryPair {
    horizontal: number;
    vertical: number;
}
export interface ExtendedDebugStats {
    isVideoElementPaused: boolean;
    isAudioElementPaused: boolean;
    isUserInputEnabled: boolean;
    isVirtualKeyboardVisible: boolean;
    micState: MicState;
    isRsdmmActive: boolean;
    keyboardLayout: string;
    appLaunchMode: AppLaunchMode;
    inputMode: string;
}
export declare interface StatsHeader {
    stats: {
        from: number;
        to: number;
    };
    ackid?: number;
}
export interface IStreamCallbacks extends IEventEmitter {
    onSessionStart(data: StartSessionResultEvent): void;
    onStreamStop(data: StreamingTerminatedEvent): void;
    onUserIdleClear(): void;
}
export declare interface WebSocketClose {
    error: boolean;
    code?: number;
    reason?: string;
    wasClean?: boolean;
}
export declare interface WorkerResponse {
    initialized?: boolean;
    statsStarted?: boolean;
    log?: string;
    exception?: string;
    wsClose?: WebSocketClose;
    wsMessage?: WebSocketMsg;
    wsOpening?: boolean;
    wsOpen?: boolean;
}
export interface LogCallbackType {
    (msg: string): void;
}
export interface WebSocketHandler {
    messageHandler: (data: WebSocketMsg) => void;
    closeHandler: (data: WebSocketClose) => void;
    openingHandler: () => void;
    openHandler: () => void;
}
/**
 * Video Stream progress reported by server on the control channel.
 * Provides the client with more granular details when reporting exit codes.
 */
export declare const enum VideoStreamProgress {
    NO_INFO = 0,
    SETUP_BEGIN = 1,
    SETUP_END = 2,
    ADAPTER_INIT_BEGIN = 3,
    ADAPTER_INIT_END = 4,
    FRAMEPROVIDER_INIT_BEGIN = 5,
    FRAMERPROVIDER_INIT_END = 6,
    ENCODER_INIT_BEGIN = 7,
    ENCODER_INIT_END = 8
}
export declare const enum LowAudioVolumeType {
    PERMISSION_DENIED = "permissionDenied",
    VISIBILITY_CHANGE = "visibilityChange",
    DEVICE_CHANGE = "deviceChange"
}
export interface StaticStreamStats {
    zoneName: string;
    clientAppVersion: string;
    appId: number;
    requestedRegion: string;
    gpuType: string;
    streamInfo: StreamInfo;
    clientLocale: string;
}
export interface VideoState {
    displayVideoWidth: number;
    displayVideoHeight: number;
    scalingFactor: number;
    topPadding: number;
    leftPadding: number;
    videoWidth: number;
    videoHeight: number;
    viewportHeight: number;
    offsetX: number;
    offsetY: number;
    zoomFactor: number;
}
export interface DataChannelParams {
    errorCode?: RErrorCode;
    open?: () => void;
    close?: () => void;
}
/**
 * Internal interface that describes all the required information to dispatch the exit event telemetry
 */
export declare interface StreamExitEventData {
    exitErrorCode: string;
    sessionId: string;
    subSessionId: string;
    zoneAddress: string;
    streamDuration: number;
    frameCount: number;
    codec: VideoCodecType;
    isResume: boolean;
    connectivity: string;
    sleep: boolean;
    networkTestSessionId: string;
}
