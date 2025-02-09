import { SessionParams, SessionState } from "./interfaces";
import { Telemetry } from "./dependencies";
import { Session, SessionParameters } from "./sessioncontrol";
import { ScErrorCode } from "./gserrorcode";
/**
 * Singleton instance of Telemetry interface to configure and update telemetry related data.
 * Applications must configure this during SessionControl library initialization phase.
 * This singleton instance is responsible for handling telemetry generated from all the library objects and functions.
 */
export declare const SessionControlTelemetry: Telemetry;
/**
 * This utility API sets all the streaming related properties of the SessionParameters object provided to this API.
 * Clients must pass the output (SelectResult object) of the ClientModeSelection library to fill certain fields of SessionParameters.
 * Fields that will be overwritten by this API:
 * - requestedAudioFormat
 * - monitorSettings
 * - streamingFeatures
 * If the client wants to manually set these fields, it should do so after calling this API to initalize them with
 * the recommended values.
 * @param sessionParameters - object whose streaming related features will be updated by this API.
 * @param modeSelectionResult - serialized SelectResult object returned by ClientModeSelection library.
 * @note This API is usable for both SessionControl and GridServer session parameters
 * @note This API syntax is slightly different from the getStreamStartParameters API as there are a lot of non streaming related properties in SessionParameters.
 *       It is better to just update the streaming related properties instead of creating a SessionParameters object.
 */
export declare function updateSessionParameters(sessionParameters: SessionParameters | SessionParams, modeSelectionResult: string): void;
/**
 * Returns true if the ScErrorCode is one of the cancellation error code.
 * @param code - ScErrorCode returned by any of the SessionControl APIs
 * @returns boolean
 */
export declare function isCancelCode(code: ScErrorCode): boolean;
/**
 * Resume requests are accepted by servers only in certain states.
 * Clients can use this function to determine if an active session can be resumed or not.
 * @see SessionStartResumeResult / @see SessionControl.getActiveSessions
 * @param state - current Session state.
 * @returns true if session is resumable
 */
export declare function isResumableSessionState(state: SessionState): boolean;
/**
 * Returns an active session for a specific appId which is in resumable state.
 * @param activeSessions - provided by SessionControl.getActiveSessions or SessionControl.startSession API.
 * @param appId - CMSID for which an active resumable session needs to be checked.
 * @returns - Session, if an active resumable session exits for an appId, else undefined.
 */
export declare function getResumableSession(activeSessions: Session[], appId: number): Session | undefined;
