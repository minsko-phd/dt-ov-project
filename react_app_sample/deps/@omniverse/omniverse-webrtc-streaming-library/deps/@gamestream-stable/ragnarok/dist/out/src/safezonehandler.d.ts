import { CustomMessage } from "./nskinterfaces";
import { TelemetryHandler } from "./telemetry/telemetryhandler";
import { PlatformDetails } from "./dependencies";
export declare interface MessageSender {
    sendCustomMessage(message: CustomMessage): void;
}
export declare class SafeZoneHandler {
    private sender;
    private videoElement;
    private platformDetails;
    private telemetry?;
    private safeZone;
    private topPadding;
    private leftPadding;
    private showSafeZone;
    private debugWindow?;
    private telemetryEventCount;
    constructor(sender: MessageSender, videoElement: HTMLVideoElement, platformDetails: PlatformDetails, telemetry?: TelemetryHandler | undefined);
    uninitialize(): void;
    /**
     * @param topPadding top padding of video element
     * @param leftPadding left padding of video element
     * Provide information regarding the video's current state.
     * Should be invoked whenever video state is updated, which accounts for resize and orientation change events.
     */
    updateVideoState(topPadding: number, leftPadding: number): void;
    /**
     * Calculates safe area inset values and sends updated insets over custom message.
     */
    send(): void;
    /**
     * Toggles whether safe zone inset values are displayed on screen.
     * For debugging purposes only.  Not intended for production use.
     */
    toggleDisplaySafeZone(): void;
    /**
     * Returns normalized inset values relative to displayed video
     * This is the rect within the video view unobscured by notches and bars.
     */
    private getSafeZone;
    private createDebugWindow;
    private updateDebugWindow;
}
