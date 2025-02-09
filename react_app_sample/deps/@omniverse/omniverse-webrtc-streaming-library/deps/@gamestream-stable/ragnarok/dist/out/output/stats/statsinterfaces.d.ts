export declare interface KeyDeprecatedStats {
    ts: number;
    timingFrameInfo: string;
    targetDelayMs: number;
    minPlayoutDelayMs: number;
    currentDelayMs: number;
}
export declare const enum StatsType {
    DEPR = 0,
    RTPV = 1,
    RTPA = 2,
    TRAV = 3,
    TRAA = 4,
    VFMD = 5,
    PFDA = 6
}
export declare interface WebrtcStats {
    type: StatsType;
    stats: ArrayBuffer[];
}
export declare interface DeprecatedRTCStat {
    id: string;
    timestamp: number;
    type: string;
    names: () => string[];
    stat: (statname: string) => any;
}
export declare interface DeprecatedStats {
    enabled: boolean;
    kind: string;
    result: () => DeprecatedRTCStat[];
}
