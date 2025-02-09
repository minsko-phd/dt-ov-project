export declare const enum Commands {
    CREATE = 0,
    CREATE_SUCCESS = 1,
    CLOSE = 2,
    WORK = 3,
    RESULT = 4,
    ERROR = 5
}
export interface CmdMsg {
    cmd: Commands;
    data: any;
}
export interface DoWork<Result> {
    doWork(): Result | Promise<Result>;
}
export declare type WorkerResultCallback<Result> = (workerResult: Result) => void;
export declare function makeWorkerFromInterface<Result>(interfaceRef: {
    new (): DoWork<Result>;
}, callback: WorkerResultCallback<Result>, errorCallback: WorkerResultCallback<MessageEvent | ErrorEvent | string>): Worker;
export interface SharedWorker extends AbstractWorker {
    port: MessagePort;
}
export declare function makeSharedWorkerFromInterface<Result>(interfaceRef: {
    new (): DoWork<Result>;
}, callback: WorkerResultCallback<Result>, errorCallback: WorkerResultCallback<MessageEvent | ErrorEvent | string>): SharedWorker;
export declare function stopWorker(worker?: Worker | SharedWorker): void;
