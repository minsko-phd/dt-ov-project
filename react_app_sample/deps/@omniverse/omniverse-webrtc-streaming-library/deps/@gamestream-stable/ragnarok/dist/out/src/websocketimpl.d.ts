import { WebSocketMsg, LogCallbackType, WebSocketHandler } from "./rinterfaces";
export interface LogCallbacks {
    info: LogCallbackType;
    exception: LogCallbackType;
}
export declare class WebSocketImpl {
    private sessionId;
    private ws?;
    private wsHadError;
    private cacheMsgsForAck;
    private wsQueue;
    private wsLogger;
    private wsException;
    private wsHandler?;
    private heartBeatTimeoutId;
    private maxReceivedAckId;
    private url;
    private socketId;
    constructor(sessionId: string, logCallbacks: LogCallbacks);
    initialize(url: string, maxReceivedAckId: number, wsHandler: WebSocketHandler, reconnect?: boolean): void;
    uninitialize(closeCode?: number): void;
    private resetWebSocket;
    private checkWebsocketConnectionPeriodically;
    private clearHeartBeatTimeout;
    private setHeartBeatTimeout;
    private deleteFromAckCache;
    private addInAckCache;
    private sendOnWsReliablyIfNeeded;
    send(data: WebSocketMsg): void;
    private sendAckToServer;
    private createWebSocket;
}
