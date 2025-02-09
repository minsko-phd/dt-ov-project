import { EventEmitter } from "./eventemitter";
import { LogData } from "./logger";
export declare class LegacyLogEmitter extends EventEmitter {
    private logEventName;
    private logQueue;
    constructor(logEventName: string, emitSynchronously?: boolean);
    onLogEvent(logData: LogData): void;
    addListener(eventname: string, handler: Function): void;
}
