import { PlatformDetails } from "./platform";
export declare const enum PayloadDeviceType {
    DESKTOP = "Desktop",
    LAPTOP = "Laptop",
    TV = "TV",
    PHONE = "Phone",
    TABLET = "Tablet",
    SERVER = "Server",
    CONSOLE = "Console",
    UNDEFINED = "undefined"
}
export declare const enum PayloadBrowserType {
    CHROME = "Chrome",
    SAFARI = "Safari",
    YANDEX = "Yandex",
    EDGE = "Edge",
    EDGE_LEGACY = "Edge_legacy",
    FIREFOX = "Firefox",
    SAMSUNG = "Samsung",
    CHROMIUM = "Chromium",
    OPERA = "Opera",
    BRAVE = "Brave",
    SILK = "Silk",
    UNDEFINED = "undefined"
}
export declare const enum PayloadOSType {
    WINDOWS = "Windows",
    MACOS = "MacOS",
    SHIELD = "Shield",
    ANDROID = "Android",
    IOS = "iOS",
    IPADOS = "iPadOS",
    CHROMEOS = "ChromeOS",
    LINUX = "Linux",
    TIZEN = "Tizen",
    WEBOS = "WebOS",
    TVOS = "tvOS",
    XBOX = "Xbox",
    STEAMOS = "SteamOS",
    UNDEFINED = "undefined"
}
export declare const enum ClientHeaderOSType {
    WINDOWS = "WINDOWS",
    MACOS = "MACOS",
    SHIELD = "SHIELD",
    ANDROID = "ANDROID",
    IOS = "IOS",
    IPADOS = "IPADOS",
    CHROMEOS = "CHROMEOS",
    LINUX = "LINUX",
    TIZEN = "TIZEN",
    WEBOS = "WEBOS",
    XBOX = "XBOX",
    STEAMOS = "STEAMOS",
    UNKNOWN = "UNKNOWN"
}
export declare const enum ClientHeaderBrowserType {
    CHROME = "CHROME",
    SAFARI = "SAFARI",
    YANDEX = "YANDEX",
    EDGE = "EDGE",
    EDGE_LEGACY = "EDGE_LEGACY",
    FIREFOX = "FIREFOX",
    SAMSUNG = "SAMSUNG",
    CHROMIUM = "CHROMIUM",
    OPERA = "OPERA",
    BRAVE = "BRAVE",
    SILK = "SILK",
    UNKNOWN = "UNKNOWN"
}
export declare const enum ClientHeaderDeviceType {
    DESKTOP = "DESKTOP",
    LAPTOP = "LAPTOP",
    TV = "TV",
    PHONE = "PHONE",
    TABLET = "TABLET",
    CONSOLE = "CONSOLE",
    UNKNOWN = "UNKNOWN"
}
export declare interface PayloadPlatformDetails {
    readonly os: PayloadOSType;
    readonly browser: PayloadBrowserType;
    readonly deviceType: PayloadDeviceType;
}
export declare interface ClientHeaderPlatformDetails {
    readonly os: ClientHeaderOSType;
    readonly browser: ClientHeaderBrowserType;
    readonly deviceType?: ClientHeaderDeviceType;
}
export declare function translatePlatformDetailsForPayload(details: PlatformDetails): PayloadPlatformDetails;
export declare function translatePlatformDetailsForClientHeader(details: PlatformDetails): ClientHeaderPlatformDetails;
