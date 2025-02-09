import { EventEmitter } from "./eventemitter";
import { LogEvent } from "./interfaces";
declare type LogFunction = (tag: string, msg: string, ...jsonObject: any[]) => void;
declare type FormatFunction = (msg: string, ...args: any[]) => string;
declare interface LogInterface {
    d: LogFunction;
    w: LogFunction;
    e: LogFunction;
    i: LogFunction;
    format: FormatFunction;
    commit(logevent: LogEvent): void;
    sanitize(string?: string): string | undefined;
}
export declare class LogImpl extends EventEmitter implements LogInterface {
    private _nop;
    private _nopf;
    private _d;
    private _i;
    private _w;
    private _e;
    private _f;
    private queue;
    constructor();
    get d(): LogFunction;
    get w(): LogFunction;
    get i(): LogFunction;
    get e(): LogFunction;
    sanitize(msg?: string): string | undefined;
    get format(): FormatFunction;
    commit(logevent: LogEvent): void;
    stringifyArgs(...args: any[]): string;
    private formatString;
    private emitLogMsg;
    addListener(eventname: string, handler: Function): void;
    private renderDate;
}
export declare let Log: LogImpl;
export {};
