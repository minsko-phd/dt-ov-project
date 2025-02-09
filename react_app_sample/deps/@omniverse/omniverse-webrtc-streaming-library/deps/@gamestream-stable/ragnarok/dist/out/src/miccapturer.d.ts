import { IEventEmitter, PlatformDetails } from "./dependencies";
import { TelemetryHandler } from "./telemetry/telemetryhandler";
import { LowAudioVolumeType } from "./rinterfaces";
import { MicState } from "./nskinterfaces";
export declare class MicCapturer {
    private eventEmitter;
    private peerConnection;
    private micCaptureStream;
    private micCaptureStarting;
    private paused;
    private static micSupported;
    private currentState;
    private micEnabled;
    private videoElement?;
    private audioElement?;
    private brokenMics;
    private platformDetails;
    private telemetry;
    private ios15;
    private initialized;
    private trackEndedTime;
    private audioVolumeLow;
    private willAudioVolumeBeLow;
    private userDisabledMic;
    private audioInputType?;
    private audioInputCounts;
    private lowAudioVolumeCounts;
    private micHasBeenStarted;
    constructor(platformDetails: PlatformDetails, telemetry: TelemetryHandler);
    private getMicStateEnum;
    getCurrentMicStatus(): Promise<MicState>;
    /**
     * Emits current mic permission state to client via MIC_CAPTURER event.
     * It could result in mic popup to get user permission.
     **/
    emitMicState(): void;
    static isMicSupported(): boolean;
    private updateState;
    private getUserMedia;
    /**
     * Start capturing audio on default device (async).
     * State will be emitted on the EventEmitter
     **/
    startMicCaptureOnDefaultDeviceWithFallback(): Promise<void>;
    /**
     * Create MediaStream which generates silence.
     * The AudioContext for the track is stopped immediately.
     **/
    private getSilenceMediaStream;
    initialize(pc: any, eventEmitter: IEventEmitter, videoElement?: HTMLVideoElement, audioElement?: HTMLAudioElement): void;
    /**
     * Stop mic capture.
     * This method will stop any ongoing mic capture and replace the sender
     * with a silence stream. Mic capture will always be stopped, even if the
     * replacement fails.
     * This method will emit an event on the eventStream to indicate that
     * stream has stopped
     **/
    stopMicRecording(): void;
    /**
     * Client shouldn't call this method, ragnarok will shutdown capture.
     **/
    shutdown(): void;
    resetAudio(): void;
    getMicState(): MicState;
    getTrackEndedTime(): number;
    /**
     * @param low - if true, inform the miccapturer that the audio volume will be low if mic permission are denied.
     * This is due to an iOS 15.4+ bug and used to provide telemetry that tracks the bug's user impact.
     * @see Bug 3560855
     */
    setWillAudioVolumeBeLow(low: boolean): void;
    /**
     * @returns True if the audio volume is currently low, false otherwise
     */
    isAudioVolumeLow(): boolean;
    /**
     * @returns True if the mic has been disabled by the user. Returns false when the mic is capturing and when the mic has never been enabled.
     */
    didUserDisableMic(): boolean;
    extractAudioInputType(): Promise<void>;
    /**
     * @returns True if audio input type is built-in microphone
     */
    isUsingBuiltInMic(): boolean;
    /**
     * Emit debug event to identify that user has run into low audio volume issue.
     * @key - Specifies type of low audio volume event
     */
    recordLowAudioDebugEvent(key: LowAudioVolumeType): void;
    onDeviceChange(deviceChangeCount: number): void;
}
