import { BrowserName, DeviceModel, DeviceOS, DeviceType, DeviceVendor, PlatformName } from "./enumnames";
interface TelemetryHandler {
    emitDebugEvent(key1?: string, key2?: string, key3?: string, key4?: string, key5?: string, sessionId?: string, subSessionId?: string): void;
}
export declare interface PlatformDetails {
    os: PlatformName;
    osRawVer: string;
    osVer: string;
    browser: BrowserName;
    browserVer: string;
    browserFullVer: string;
    forging: boolean;
    spoofing: boolean;
    confidence: number;
    vendor: DeviceVendor;
    vendorFull?: string;
    deviceType?: DeviceType;
    deviceOS?: DeviceOS;
    deviceModel?: DeviceModel;
    totalTime: DOMHighResTimeStamp;
}
export declare function GetPlatformDetails(): Promise<PlatformDetails>;
export declare const getPlatformDetails: typeof GetPlatformDetails;
export declare function AddPlatformTelemetry(telemetry: TelemetryHandler): void;
export {};
