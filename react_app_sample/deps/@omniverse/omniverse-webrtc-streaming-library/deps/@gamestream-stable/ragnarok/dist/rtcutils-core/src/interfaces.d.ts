export declare const enum UTIL_EVENTS {
    /**
     *Indicates a log sent by the library
     */
    LOG_EVENT = "Log"
}
export declare interface LogEvent {
    logModule: string;
    timeStamp: string;
    logLevel: string;
    logtag: string;
    logstr: string;
}
/**This is the method signature for authentication callback which needs to be passed in InitParams */
export declare interface authTokenCallbackType {
    (tokenRequestdata?: any): Promise<any>;
}
export declare const enum AuthType {
    NONE = -1,
    JARVIS = 0,
    JWT_GFN = 1,
    JWT_PARTNER = 2
}
export declare interface AuthInfo {
    type: AuthType;
    token?: string;
}
/**Used as generic error object*/
export declare interface ErrorDetails {
    code: number;
    description?: string;
    error?: Error | DOMException;
}
