/**
 * Identifies the severity of a log message (e.g: a warning or an error).
 */
export declare const enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    DEBUG = "DEBUG",
    ERROR = "ERROR"
}
/**
 * Details of the log messages provided in the LogCallback.
 */
export declare interface LogData {
    /** Formatted string of timestamp (local time) at which log message was generated.
     *  Format:  "YYYY-MM-DD HH:MM::SS.XYZ" where XYZ is milliseconds and HH is in 24 hour format. */
    timestamp: string;
    /** Severity of log. */
    level: LogLevel;
    /** Source file and module of log. */
    tag: string;
    /** Log text. */
    message: string;
}
/**
 * Callback to be executed by the StreamKit/SessionControl and other libraries to deliver logs to the client.
 * Refer registerLogCallback API of StreamKit/SessionControl.
 */
export declare type LogCallback = (log: LogData) => void;
declare type LogFunction = (tag: string, msg: string, ...jsonObject: any[]) => void;
declare type FormatFunction = (msg: string, ...args: any[]) => string;
declare interface LogInterface {
    d: LogFunction;
    w: LogFunction;
    e: LogFunction;
    i: LogFunction;
    format: FormatFunction;
    setLogCallback(callback?: LogCallback): void;
    isCallbackRegistered(): boolean;
}
export declare class LogImpl implements LogInterface {
    private _nop;
    private _d;
    private _i;
    private _w;
    private _e;
    private _f;
    private queue;
    private callback?;
    private module;
    static readonly MAX_QUEUE_SIZE = 50;
    constructor(module?: string);
    get d(): LogFunction;
    get w(): LogFunction;
    get i(): LogFunction;
    get e(): LogFunction;
    /**
     * Register the callback function to receive log messages.
     * Clients can invoke Log.setLogCallback() to clear the registered callback(If needed).
     * @param callback - function which can handle the log messages.
     * @note Once a callback is registered this function delivers all the queued log messages in callback asynchronously.
     */
    setLogCallback(callback?: LogCallback): void;
    /**
     * Informs if the clients have registered callback with this object.
     * @returns true if a callback is registered.
     * @note This is a temporary function required in GridServer and Ragnarok1.0 libraries.
     */
    isCallbackRegistered(): boolean;
    sanitize(msg?: string): string | undefined;
    get format(): FormatFunction;
    stringifyArgs(...args: any[]): string;
    private formatString;
    /**
     * Delivers the first log in queue via callback.
     * If callback is not set or queue is empty then this function is a no-op.
     * @param recursive - If true, queues a task to deliver next log via callback if the queue has more elements.
     */
    private executeLogCallback;
    private handleLog;
    private renderDate;
}
export declare let Log: LogImpl;
/**
 * Registers a callback to deliver the log messages.
 * This API should be invoked before executing any functions of SessionControl/StreamKit library.
 * Clients can invoke registerLogCallback() to clear the registered callback(If needed).
 * @param callback - function to be executed to deliver log.
 */
export declare function registerLogCallback(callback?: LogCallback): void;
export {};
