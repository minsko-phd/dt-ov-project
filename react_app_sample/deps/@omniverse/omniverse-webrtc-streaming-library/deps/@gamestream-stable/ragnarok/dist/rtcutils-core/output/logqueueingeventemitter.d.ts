import { EventEmitter } from "./eventemitter";
import { LogEvent } from "./interfaces";
export declare class LogQueueingEventEmitter extends EventEmitter {
    private logEventName;
    private logQueue;
    constructor(logEventName: string, emitSynchronously?: boolean);
    protected onLogEvent(logEvent: LogEvent): void;
    addListener(eventname: string, handler: Function): void;
}
