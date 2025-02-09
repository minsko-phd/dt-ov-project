import { NetworkType } from "../dependencies";
declare interface NetworkUpdateCallback {
    (network: NetworkType): void;
}
declare class NetworkDetectorImpl {
    private networkTypeMap;
    private network;
    private networkUpdateCallbacks;
    constructor();
    private updateNetwork;
    registerNetworkCallback(callback: NetworkUpdateCallback): void;
    unregisterNetworkCallback(callback: NetworkUpdateCallback): void;
    getNetworkType(): NetworkType;
}
export declare const NetworkDetector: NetworkDetectorImpl;
export {};
