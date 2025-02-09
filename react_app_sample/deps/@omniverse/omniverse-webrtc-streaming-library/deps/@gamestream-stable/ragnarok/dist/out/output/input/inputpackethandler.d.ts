import { GamepadDataHandler, VibrationHandler } from "../interfaces";
import { StreamClient } from "../streamclient";
import { TelemetryHandler } from "../telemetry/telemetryhandler";
import { InputChannel, Measurements } from "./inputinterfaces";
import { TouchType, TouchDataHandler } from "./touchlistener";
import { VideoState } from "../rinterfaces";
export interface MoveEvent {
    absPos: boolean;
    x: number;
    y: number;
    captureTimestamp: number;
    groupSize: number;
    callbackTimestamp: number;
}
export interface IInputPacketHandlerCallbacks {
    /**
     * Called before sending an input packet.
     * @returns true to send the input to the server or false to drop it
     * */
    onSendInput(): boolean;
}
export declare class InputPacketHandler implements GamepadDataHandler, TouchDataHandler {
    private inputChannel;
    private videoState;
    private telemetry;
    private streamClient;
    private measurements;
    private _lastMoveSendTime;
    private _protocolVersion;
    private buffer;
    private bufferView;
    private touchBuffer;
    private touchBufferView;
    private gamepadBufferView;
    private tempBuffer;
    private handleServerCommandFunc;
    private sendTimerId;
    private moveEventBuffer;
    private callbacks;
    private prependScheduledMoves;
    private getTempPacket;
    private vibrationHandlers;
    constructor(callbacks: IInputPacketHandlerCallbacks, moveEventBuffer: MoveEventBuffer, measurements: Measurements, videoState: VideoState, streamClient: StreamClient, inputChannel: InputChannel, telemetry: TelemetryHandler);
    sendLockKeyState(state: number): void;
    private onMessage;
    private handleServerCommand;
    private handleAggregateRiCommand;
    private handleBasicRiCommand;
    private handleVibrationCommand;
    sendMouseDown(button: number, ts: number): void;
    sendMouseUp(button: number, ts: number): void;
    sendMouseWheel(deltaY: number, ts: number): void;
    sendCursorPos(absolute: boolean, x: number, y: number, ts?: number): void;
    private fillMouseGroupHeader;
    private fillMouseGroupPacketV2;
    private fillMovePacket;
    sendKeyboardEvent(packetId: number, keyCode: number, flags: number, ts?: number): void;
    sendHeartbeatEvent(): void;
    private sendInput;
    private getScheduledPacketSizeV2;
    private getScheduledPacketSizeV3;
    hasScheduledPackets(): boolean;
    timeScheduledPackets(delay: number): void;
    sendScheduledPackets(): void;
    private prependScheduledMovesV2;
    private prependScheduledMovesV3;
    private getTempPacketV2;
    private getTempPacketV3;
    sendTextInput(text: ArrayBuffer): void;
    channelOpen(): boolean;
    stop(): void;
    get protocolVersion(): number;
    get lastMoveSendTime(): number;
    private toHexString;
    private populateMultiGamepadPacket;
    private getMultiGamepadPacket;
    gamepadBitmapUpdateHandler(gamepadBitmap: number): void;
    gamepadStateUpdateHandler(count: number, index: number, buttons: number, trigger: number, axes: readonly number[], ts: number | undefined, gamepadBitmap: number): void;
    virtualGamepadUpdateHandler(buttons: number, trigger: number, index: number, axes: readonly number[], gamepadBitmap?: number): void;
    finalizeGamepadData(count: number): void;
    connectUnsupportedGamepad(gamepad: Gamepad): void;
    disconnectUnsupportedGamepad(index: number): void;
    sendGamepadHapticsControl(enable: boolean): void;
    addTouchEvent(idx: number, id: number, touchType: TouchType, x: number, y: number, radiusX: number, radiusY: number, ts: number): boolean;
    sendTouchPacket(count: number): boolean;
    addVibrationHandler(vibrationHandler: VibrationHandler): void;
    removeVibrationHandler(vibrationHandler: VibrationHandler): void;
}
export declare class MoveEventBuffer {
    private _moveEvents;
    supportsGrouping: boolean;
    private _moveEventIndex;
    constructor(bufferSize: number);
    get moveEvents(): ReadonlyArray<MoveEvent>;
    get moveEventIndex(): number;
    clear(): void;
    setGroupSize(idx: number, groupSize: number): void;
    addMoveEvent(absolute: boolean, x: number, y: number, captureTimestamp: number, groupSize: number, callbackTimestamp: number, aggregate?: boolean): void;
}
