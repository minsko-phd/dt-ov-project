import { GamepadDataHandler } from "../interfaces";
import { InputMediaElement } from "../input/inputinterfaces";
/**
 * This is the main class which provides ability to test multiple connected gamepads.
 */
export declare class GamepadTester implements GamepadDataHandler {
    private gamepadTesterElementId;
    private visible;
    private gamepads;
    private unsupportedGamepads;
    private xinputGamepadIndices;
    constructor();
    gamepadBitmapUpdateHandler(gamepadBitmap: number): void;
    removeSonyDualShock4Hid(index: number): void;
    gamepadStateUpdateHandler(count: number, localIndex: number, index: number, buttons: number, trigger: number, axes: readonly number[], ts: number, gamepadBitmap: number, name: string): void;
    dualShock4StateUpdateHandler(localIndex: number, index: number, buttons: number, trigger: number, axes: readonly number[], ts: number, gamepadBitmap: number, name: string): void;
    connectUnsupportedGamepad(gamepad: Gamepad): void;
    disconnectUnsupportedGamepad(index: number): void;
    private initGamepadTesterElement;
    toggleGamepadTester(videoTagElement: InputMediaElement): void;
    private start;
    finalizeGamepadData(count: number, hidCount?: number): void;
    virtualGamepadUpdateHandler(buttons: number, trigger: number, index: number, axes: readonly number[], gamepadBitmap: number): void;
}
