import { NetworkTypeEnum } from "../dependencies";
declare interface NetworkUpdateCallback {
    (network: NetworkTypeEnum): void;
}
declare class NetworkDetectorImpl {
    private networkTypeMap;
    private network;
    private networkUpdateCallbacks;
    constructor();
    private updateNetwork;
    registerNetworkCallback(callback: NetworkUpdateCallback): void;
    unregisterNetworkCallback(callback: NetworkUpdateCallback): void;
    getNetworkType(): NetworkTypeEnum;
}
export declare const NetworkDetector: NetworkDetectorImpl;
export {};
