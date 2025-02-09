import { RNotificationCode } from "../interfaces";
export declare interface ExitMessage {
    code?: number;
    nvstResult?: number;
    stopData?: string;
}
export declare function getRNotificationCode(serverCode: number): RNotificationCode.Unknown | RNotificationCode.ApproachingEntitlementTimeout | RNotificationCode.ApproachingIdleTimeout | RNotificationCode.ApproachingSessionMaxTimeLimit;
export declare function getClientTerminationReason(err: number): number;
export declare function getRErrorCodeForExitMessage(exitMessage: ExitMessage): number;
export declare function getRErrorCode(serverErr: number): number;
export declare function getRErrorCodeForNvstResult(nvstResult: number): number;
