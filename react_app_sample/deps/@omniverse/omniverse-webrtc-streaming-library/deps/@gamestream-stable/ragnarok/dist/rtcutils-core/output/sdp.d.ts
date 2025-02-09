export declare type SDPBlob = string;
export declare type SDPLine = string;
export declare type SDPSection = string;
export interface ISDPIceParameters {
    iceLite?: boolean;
    usernameFragment: string;
    password: string;
}
export interface ISDPFingerprint {
    algorithm: string;
    value: string;
}
export interface ISDPDtlsParameters {
    role: string;
    fingerprints: ISDPFingerprint[];
}
export declare class SDPUtils {
    static SplitLines(blob: SDPBlob): SDPLine[];
    static SplitSections(blob: SDPBlob): SDPSection[];
    static GetDescription(blob: SDPBlob): SDPSection;
    static GetMediaSections(blob: SDPBlob): SDPSection[];
    static MatchPrefix(blob: SDPBlob, prefix: string): SDPLine[];
    static ParseFingerprint(line: SDPLine): ISDPFingerprint;
    static GetDtlsParameters(mediaSection: SDPSection, sessionpart: SDPSection): ISDPDtlsParameters;
    static GetIceParameters(mediaSection: SDPSection, sessionpart: SDPSection): ISDPIceParameters;
}
