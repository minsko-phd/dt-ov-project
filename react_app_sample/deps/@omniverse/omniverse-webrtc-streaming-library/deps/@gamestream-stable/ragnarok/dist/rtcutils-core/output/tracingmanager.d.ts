export declare const TracingComponent: {
    name: string;
    version: string;
};
export declare class TracingManager {
    private static instance;
    private tracer;
    private constructor();
    static getInstance(): TracingManager;
    createSpan<T>(operationName: string, fn: () => Promise<T> | T): Promise<T>;
}
