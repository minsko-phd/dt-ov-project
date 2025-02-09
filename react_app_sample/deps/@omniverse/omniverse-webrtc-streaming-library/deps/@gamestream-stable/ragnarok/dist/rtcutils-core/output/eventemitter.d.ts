export declare interface IEventEmitter {
    addListener(eventname: string, handler: Function): void;
    removeListener(eventname: string, handler: Function): void;
    removeAllListenersOfEvent(eventname: string): void;
    removeAllListeners(): void;
    hasListener(eventname: string): boolean;
    emit(eventname: string, ...args: any[]): void;
}
/**
 * Implements a custom event emitter pattern.
 *  a. Provides option for adding and removing listeners for an event type.
 *  b. Exposes function to emit events with variable argument.
 **/
export declare class EventEmitter implements IEventEmitter {
    private handlers;
    private emitSynchronously?;
    constructor(emitSynchronously?: boolean);
    /**
     * Adds a function for to be invoked for a particular event.
     * Any number of handlers can be registered for an event.
     * @param eventname - the event type for which the corresponding handler to be invoked.
     * @param handler - listener function to be invoked when the event is emitted.
     **/
    addListener(eventname: string, handler: Function): void;
    /**
     *  Removes an handler for a particular event.
     * @param eventname - the event type for which the corresponding handler  has to be removed.
     * @param handler - listener function to be removed.
     * Note: Removes only on instance of the function in each call, if a function is added as listener for X times
     * then this function needs to be invoked X times to remove all instances.
     **/
    removeListener(eventname: string, handler: Function): void;
    removeAllListenersOfEvent(eventname: string): void;
    removeAllListeners(): void;
    hasListener(eventname: string): boolean;
    /**
     *  Emits an event. The corresponding listeners will be executed.
     * @param eventname - the event type.
     * @param args - variable number of args for this event. These parameters are passed to registered listeners.
     * Note: If there are no listener for input event type then this function is no op.
     **/
    emit(eventname: string, ...args: any[]): void;
}
