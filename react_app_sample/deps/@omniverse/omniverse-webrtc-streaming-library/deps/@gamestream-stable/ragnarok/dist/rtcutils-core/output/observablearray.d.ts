/**
 * This class is an extension of Javascript's Array class.
 * Provides option to listen to the execution of selected Array functions.
 *
 * The implementation supports single callback and not event listeners.
 * Users can set the callback for "push" function by invoking setcallback("push", callbackfunction),
 * after push execution of the array the callback will be executed in the same context.
 * Callback can be reset by invoking setcallback("push", undefined)
 *
 * Right now only "push" function is supported, based on the need other functions can be supported.
 * Note: the callbacks are executed only for push function execution and not for other array insert functions like unshift.
 */
export declare class ObservableArray<T> extends Array<T> {
    private pushCallback?;
    constructor();
    /** Sets the callback for an array action like "push".
     * passing undefined in callback will result in this function behaving like removeCallback */
    setCallback(action: "push", callback: Function | undefined): void;
    /** removes all the elements in the array. */
    clear(): void;
    private customPush;
}
