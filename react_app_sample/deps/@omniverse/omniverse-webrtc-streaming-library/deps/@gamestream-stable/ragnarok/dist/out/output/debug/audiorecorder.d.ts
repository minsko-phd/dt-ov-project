export declare const enum TriggerState {
    NONE = 0,
    RECORDING = 1,
    LATENCY = 2
}
export declare class AudioRecorder {
    private mediaRecorder?;
    private isRecording;
    private recordedBlobs;
    private recordedBlobsArray;
    private timerID;
    private dumpCount;
    private audioTriggerState;
    private audioStream?;
    createRecorder(): void;
    startRecord(): void;
    private restartRecord;
    destroyRecorder(): void;
    initialize(stream: MediaStream): void;
    uninitialize(): void;
    downloadAudio(): void;
    startPcmDump(): Boolean;
    startLatencyDump(): Boolean;
    createNewLatencyDump(): void;
}
