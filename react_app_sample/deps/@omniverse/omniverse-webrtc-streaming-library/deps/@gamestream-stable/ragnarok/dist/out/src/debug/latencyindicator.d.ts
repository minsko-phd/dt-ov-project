import { PlatformDetails } from "../dependencies";
import { InputMediaElement } from "../input/inputinterfaces";
export declare class LatencyIndicator {
    private indicatorElement?;
    private indicatorContext;
    private currentColor;
    private platformDetails;
    private static singleton;
    private constructor();
    static getInstance(): LatencyIndicator;
    initialize(videoElement: InputMediaElement, platformDetails: PlatformDetails): void;
    toggleIndicator(): void;
    private createLatencyIndicator;
    private renderWhite;
    private renderRed;
}
