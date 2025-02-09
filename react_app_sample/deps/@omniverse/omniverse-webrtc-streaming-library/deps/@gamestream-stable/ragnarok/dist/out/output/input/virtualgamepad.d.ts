/**
 * All buttons which virtual gamepad can have.
 */
export declare const enum VirtualButton {
    A = 4096,
    B = 8192,
    X = 16384,
    Y = 32768,
    LB = 256,
    RB = 512,
    LT = 255,
    RT = 65280,
    BACK = 32,
    START = 16,
    STICK_LEFT = 64,
    STICK_RIGHT = 128,
    DPAD_UP = 1,
    DPAD_DOWN = 2,
    DPAD_LEFT = 4,
    DPAD_RIGHT = 8
}
/**
 * VirtualGamepad represents the storage for virtual gamepad events passed
 * from client.
 */
export interface VirtualGamepad {
    v_index: number;
    v_enabled: boolean;
    v_connected: boolean;
    v_buttons: number;
    v_trigger: number;
    v_axes: number[];
    v_updated: boolean;
}
/**
 * This is the virtual gamepad interface for client. Gridapp provides the
 * reference of this class for clients to enable/disable and pass input.
 *
 * The interface defines the protocol to interact with VirtualGamepadHandler.
 * The actual instance could be obtained by using the call:
 * const virtualGamepadHandler: VirtualGamepadHandler = gridApp.getVirtualGamepadHandler();
 *
 * We need this way for client to pass gamepad input because we want to keep
 * all UI things out of the Ragnarok library.
 */
declare interface IVirtualGamepadHandler {
    /**
     * Client should call this when virtual gamepad UI is shown.
     */
    enable(): void;
    /**
     * Client should call this when virtual gamepad UI is hidden.
     */
    disable(): void;
    /**
     * Clients should call this when virtual gamepad buttons/triggers/axes are
     * pressed or released, and virtual gamepad input is to be sent to server.
     * Clients should pass all valid arguments and must clear all values to
     * return to controls to a neutral state.
     * @param buttons - buttons that need to be updated. Accept multiple buttons at a time.
     * @param trigger - triggers that need to be updated. Accept multiple triggers at a time.
     * @param axes - axes that need to be updated. Accept mutiple axes at a time.
     */
    updateInput(buttons: number, trigger: number, axes: number[]): void;
}
export declare class VirtualGamepadHandler implements IVirtualGamepadHandler {
    private virtualGamepad;
    constructor(virtualGamepad: VirtualGamepad);
    enable(): void;
    disable(): void;
    updateInput(buttons: number, trigger: number, axes: number[]): void;
}
export {};
