import { WebSocketMsg, WebSocketImplCallbacks } from "./rinterfaces";
export declare class WebSocketImpl {
    private sessionId;
    private accessToken;
    private ws?;
    private wsHadError;
    private serverSupportsAck;
    private cacheMsgsForAck;
    private wsQueue;
    private wsLogger;
    private wsException;
    private wsHandler;
    private heartBeatTimeoutId;
    private maxReceivedAckId;
    private url;
    constructor(sessionId: string, accessToken: string, webSocketImplCallbacks: WebSocketImplCallbacks);
    initialize(url: string, maxReceivedAckId: number, serverSupportsAck: boolean, reconnect?: boolean): void;
    uninitialize(closeCode?: number): void;
    reconnect(): void;
    private checkWebsocketConnectionPeriodically;
    private clearHeartBeatTimeout;
    private setHeartBeatTimeout;
    private deleteFromAckCache;
    private addInAckCache;
    private sendOnWsReliablyIfNeeded;
    send(data: WebSocketMsg): void;
    private sendAckToServer;
    createWebSocket(reconnect?: boolean): void;
}
