import { AuthInfo, ErrorDetails } from "./interfaces";
import { PlatformDetails } from "./platform";
export * from "./sdp";
export declare function IsXbox(platform: PlatformDetails): boolean;
export declare function IsEdge(platform: PlatformDetails): boolean;
export declare function IsXboxEdge(platform: PlatformDetails): boolean;
export declare function IsiOS(platform: PlatformDetails): boolean;
export declare function IsiPadOS(platform: PlatformDetails): boolean;
export declare function IsiDevice(platform: PlatformDetails): boolean;
/**
 * Returns true if the input string is an ipv4 address format. X.X.X.X -> X:<0 - 255>
 **/
export declare function IsValidIPv4(ipaddress: string): boolean;
/**
 * Returns an randomly generated number in string format for the requested length.
 **/
export declare function GetRandNumericString(length: number): string;
/**
 * Convert a signed integer value to an unsigned integer value.
 *
 * Returns signed 2's complement for negative numbers and results in no-op for positive numbers.
 *
 * Unified error codes are represented as 32 bit unsigned integers.
 *  Because Javascript's number type is not a 32 bit integer, these codes can be sent as a negative value.
 * For example, the code 0xC1C8B0B0 is sent as -1043812176, or -0x3E374F50 in hex.  This code is converted
 * to 0xFFFFFFFFC1C8B0B0, which after extracting the rightmost 32 bits results in the original code, 0xC1C8B0B0.
 *
 * https://confluence.nvidia.com/display/GNCE/New+Schema+Format
 **/
export declare function convertToUnsignedInt(code: number): number;
/**
 * Returns an hex format of an integer code. The hex string starts with 0x and has 8 upper case hex format.
 **/
export declare function GetHexString(code: number): string;
/**  Returns true if origin service bits are set.
 **/
export declare function isUnifiedErrorCode(code: number): boolean;
/**
 * Returns true if the browser is Chromium-based, else false.
 * Intentionally true for Edge Chromium, modern Opera, etc.
 */
export declare function IsChromium(): boolean;
/**
 * Returns true if the browser is Safari, else false.
 **/
export declare function IsSafari(platformDetails: PlatformDetails): boolean;
/**
 * Returns true if this is an iPhone or an iPod Touch.
 */
export declare function IsiPhone(platformDetails?: PlatformDetails): boolean;
/**
 * Returns true if this is an iPad.
 */
export declare function IsiPad(platformDetails?: PlatformDetails): boolean;
/**
 * Returns true if this is a WebOS device.
 */
export declare function IsWebOS(platformDetails: PlatformDetails): boolean;
export declare function IsChromeOS(platformDetails: PlatformDetails): boolean;
export declare function IsWindowsOS(platformDetails: PlatformDetails): boolean;
export declare function IsMacOS(platformDetails: PlatformDetails): boolean;
export declare function IsTizenOS(platformDetails: PlatformDetails): boolean;
export declare function IsLinuxOS(platformDetails: PlatformDetails): boolean;
export declare function IsAndroidOS(platformDetails: PlatformDetails): boolean;
export declare function IsSteamDeck(platformDetails: PlatformDetails): boolean;
export declare function IsFirefox(platformDetails: PlatformDetails): boolean;
/**
 * Error codes return by utils lib
 */
export declare const enum UtilsErrorCode {
    NoNetwork = 3237089281,
    NetworkError = 3237089282,
    AuthTokenNotUpdated = 3237093377,
    ResponseParseFailure = 3237093379,
    UserAborted = 15867905,
    ExceptionHappened = 3237089284
}
/**
 * type to be used for header in performHttpRequestxxx options arg.
 */
export interface HttpRequestHeaders {
    [key: string]: string;
}
export interface RequestHttpOptions {
    method?: string;
    headers: HttpRequestHeaders;
    body?: string;
    retryCount?: number;
    timeout?: number;
    backOffDelay?: number;
    keepalive?: boolean;
}
export interface Response {
    status: number;
    data: string;
    retries: number;
}
export declare const DefaultHttpRequestOptions: RequestHttpOptions;
/**
   * Performs an asynchronous http(s) request. Returns a promise which resolves when the http request completed (irrespective of http status code).
   *         Promise will be rejected in case of network errors.
   *         resolve( { status: <http status code> , data: <http response> } )
   *         reject ( { code: <integer error code> } )
   * Call the abort method on the returned Promise to abort any pending network requests and reject the Promise. The
   * rejected object will be of the form: { code: UtilsErrorCode.UserAborted }
   * @param url- http url
   * @param options - optional http method, headers and other settings:
          {method: string;       http method - GET(default), POST, PUT, DELETE
          headers: {};          Key value pairs of headers.
          body: string;         Request body for POST and PUT request.
          retryCount: number;   Number of retires in error cases.
          timeout: number;      timeout duration.
          keepalive: boolean;   Keeps the connection alive even if the tab is closed.}
  **/
export declare function performHttpRequest(url: string, options?: RequestHttpOptions, authInfo?: AuthInfo, abortController?: AbortController): Promise<Response>;
export declare const CLIENT_VERSION = "26.0";
export declare const CLIENT_IDENTIFICATION = "GFN-PC";
export declare function IsTouchDevice(): boolean;
export declare function IsTouchCapable(): boolean;
export declare function IsTV(platformDetails: PlatformDetails): boolean;
/**
 * @param platformDetails - interface: PlatformDetails
 * @returns true if this is a mobile device, false if it is not
 **/
export declare function isMobile(platformDetails: PlatformDetails): boolean;
export declare function getNewGuid(): string;
export declare function IsChromeBrowser(platformDetails: PlatformDetails): boolean;
export declare function IsChromeVersionAtLeast(platformDetails: PlatformDetails, major: number, minor?: number, build?: number, patch?: number): boolean;
export declare function IsSafariVersionAtLeast(platformDetails: PlatformDetails, major: number, minor?: number, patch?: number): boolean;
/**
 * @param platformDetails - interface: PlatformDetails
 * @param major - OS major version
 * @param minor - OS minor version [optional]
 * @returns true if OS version matches the major and minor version provided, false otherwise
 **/
export declare function IsiOSVersion(platformDetails: PlatformDetails, major: number, minor?: number): boolean;
/**
 * @param platformDetails - interface: PlatformDetails
 * @param major - OS major version
 * @param minor - OS minor version [optional]
 * @returns true if OS version is at least the major and minor version provided, false otherwise
 **/
export declare function IsiOSVersionAtLeast(platformDetails: PlatformDetails, major: number, minor?: number): boolean;
export interface FetchResponse {
    readonly status: number;
}
export declare function customFetch(url: string, timeoutMs?: number, data?: {}): Promise<FetchResponse>;
export declare function getRErrorDetails(code: number, description?: string, error?: Error | DOMException | null): ErrorDetails;
