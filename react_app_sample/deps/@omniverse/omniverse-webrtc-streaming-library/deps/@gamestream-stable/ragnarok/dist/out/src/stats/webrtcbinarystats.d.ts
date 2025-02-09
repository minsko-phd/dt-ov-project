import { WebrtcStats } from "./statsinterfaces";
import { LogCallbackType } from "../rinterfaces";
export declare const ChunkHeaderSize = 9;
export declare const statsConfig: {
    depr: {
        size: number;
        version: number;
        name: string;
    };
    rtpv: {
        size: number;
        version: number;
        name: string;
    };
    rtpa: {
        size: number;
        version: number;
        name: string;
    };
    traa: {
        size: number;
        version: number;
        name: string;
    };
    trav: {
        size: number;
        version: number;
        name: string;
    };
    vfmd: {
        size: number;
        version: number;
        name: string;
    };
    pfda: {
        size: number;
        version: number;
        name: string;
    };
    none: {
        size: number;
        version: number;
        name: string;
    };
};
export declare class WebrtcBinaryStats {
    private wsLogger;
    private statsMap;
    private rtpVideoStats;
    constructor(wsLogger: LogCallbackType);
    size(): number;
    addReport(report: WebrtcStats): void;
    write(dest: Uint8Array, startOffset: number): number;
    resetLists(): void;
    private createHeader;
    private getStatsConfig;
    private writeStatsToBuffer;
}
