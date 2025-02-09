/**
 * This class is a wrapper for a promise which waits for a timeout or abort on the signal.
 * The promise stored in the class can be obtained through getPromise function.
 * The constructor accepts the waitTime (in milliseconds) and an optional AbortSignal.
 *    When the signal is aborted, the promise is rejected.
 *    When the waitTime is met, the promise will be resolved.
 * The cancel function provides option to cancel the timeout and prevent rejection upon abort.
 * After cancel, once the reference to this object is removed then GarbageCollector will free the promise.
 *
 * Note: In signal abort cases the promise rejection doesnt return the signal reason.
 *  Reasons:
 *    1. Eventhough AbortSignal.reason is introduced in node 17.2.0, the node version 18.12.1 still doesnt support plumbing of reason from AbortController to AbortSignal.
 *    2. AbortSignal.reason was introduced in chrome/edge -98, safari 15.4.
 *    3. Relying on the reason of AbortSignal for business logic will be erroneous.
 *    4. The previous implemenation of setTimeoutPromise was providing a AbortError message created by our module, unit tests were passing because of this reason, this creates more confusion.
 */
export declare class CancellableWait {
    private promise;
    private promiseResolve;
    private promiseReject;
    private onAbortFunc;
    private timerId;
    private abortSignal;
    private timedOut;
    private aborted;
    constructor(waitTimeInMS: number, signal?: AbortSignal);
    /** Cancels the promise, the promise will never resolve or reject after this call.
     *  If the promise needs to be rejected then perform abort on the signal passed in constructor instead of calling this function.
     *  This is a no op function if promise was already resolved/rejected. */
    cancel(): void;
    /** Returns the actual promise which can be used in promise race or for adding .then/.catch handlers. */
    getPromise(): Promise<void>;
    /** Returns true if wait timedout and promise was resolved. */
    isTimedOut(): boolean;
    /** Returns true if signal was aborted and promise was rejected.
     *  Note: If cancel was invoked before signal abort, then this value will be false.
     */
    isAborted(): boolean;
    private onAbort;
    private onTimeout;
}
