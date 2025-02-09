import { GsInitParams, SessionParams, GridSession, SESSIONMODIFY_ACTION, AdUpdate } from "./interfaces";
import { AuthInfo, PlatformDetails, NetworkType, LegacyLogEmitter, TelemetryEventIds } from "./dependencies";
import { GsErrorCode } from "./gserrorcode";
import { SessionControlImpl } from "./sessioncontrolimpl";
/**
 * The interface defines the protocol to connect to PM.
 *
 * GridServer is the proxy class which implements the protocol and provides the actual ability to communicate with PM for session setup and teardown.
 * And it could be instantiated as: const gridServer: GridServer = new GridServer(platformDetails, emitEventsSynchronously);
 *
 * Client needs to register listeners for GS_EVENTS as described in interface.ts file for the events it emits.
 *
 * Sample Usage:
 * const gridServer = new GridServer(platformDetails, emitEventsSynchronously);
 * gridServer.initialize({
 *     deviceOs: "WINDOWS",
 *     deviceOsVer: "11.0.22000.0",
 *     deviceType: "DESKTOP",
 *     clientIdentification: "GFN-PC",
 *     clientVersion: "24.0",
 *     clientAppVersion: "2.0.50.104",
 *     clientStreamer: "WEBRTC",
 *     browserType: "CHROME",
 *     deviceHashId: "1234567890",
 *     serverAddress: "server-address.nvidiagrid.net",
 *     autoTokenCallback: <callback function>,
 *     clientHeaders: {
 *         "nv-browser-version": "123.0.1234.12"
 *     },
 *     ...
 * });
 * gridServer.setAuthInfo(AuthInfo.JARVIS, "some token");
 *
 * gridServer.addListener(GS_EVENTS.ACTIVE_SESSIONS_RESULT, (eventData: ActiveSessionResultEvent) => {});
 * gridServer.addListener(GS_EVENTS.PROGRESS_UPDATE, (eventData: SessionProgressUpdateEvent) => {});
 * gridServer.addListener(GS_EVENTS.GET_SESSION_RESULT, (eventData: GetSessionResult) => {});
 *
 * gridServer.putOrPostSession({
 *     streamParams: [...],
 *     appId: 100000000,
 *     shortName: "Fortnite (Epic)",
 *     ...
 * }, SESSIONMODIFY_ACTION.UNKNOWN); // Start a session
 * gridServer.getSession(some_session_id, true); // Queue progress detail will be emitted through the GS_EVENTS.PROGRESS_UPDATE event
 * gridServer.getAllActiveSessions(); // Retrieve current session of the user, session detail will be emitted through the GS_EVENTS.GET_SESSION_RESULT
 * gridServer.sendDeleteRequest(some_session_id); // Delete the existing session
 *
 * gridServer.uninitialize(); // Release all resources
 */
declare interface IGridServer {
    /**
     * Initialize the grid server.
     * NOTE: should be called before any network operations:
     *         - getAllActiveSessions
     *         - putOrPostSession
     *         - getSession
     *         - sendDeleteRequest
     * @param initParams - interface: GsInitParams
     */
    initialize(initParams: GsInitParams): void;
    /**
     * This method should be called before recreating GridServer object
     **/
    uninitialize(): void;
    /**
     * Adds a function which should be invoked for a particular event.
     * Any number of handlers can be registered for an event.
     * @param eventname - the event type for which the corresponding handler to be invoked.
     * @param handler - listener function to be invoked when the event is emitted.
     **/
    addListener(eventname: string, handler: Function): void;
    /**
     *  Removes an handler for a particular event.
     * @param eventname - the event type for which the corresponding handler  has to be removed.
     * @param handler - listener function to be removed.
     **/
    removeListener(eventname: string, handler: Function): void;
    /**
     * Update telemetry event ids. Without calling the function results in
     * telemetry ID field to be blank.
     * NOTE: should be called before putOrPostSession.
     * @param telemetryEventIds - interface: TelemetryEventIds
     */
    updateTelemetryEventIds(telemetryEventIds: TelemetryEventIds): void;
    /**
     * Gets the current active sessions for the user.
     * This is an asynchronous API, upon completion ACTIVE_SESSIONS_RESULT is emitted for results.
     **/
    getAllActiveSessions(): void;
    /**
     * This method returns the current sessionId.
     * NOTE: the session id is set/reset on putOrPostSession calls and will be empty until one is executed.
     * Ideally the session ID is the current one, but it will not be expired if the current session expires.
     **/
    getSessionId(): string;
    /**
     * This method returns the current subSessionId.
     * NOTE: the SubSessionId is set/reset on putOrPostSession calls and will be empty until one is executed.
     *       Ideally the SubSessionId is the current one, but it will not be expired if the current SubSession expires.
     **/
    getSubSessionId(): string;
    /**
     * This method can be used to resume (PUT) or start (POST) a session.
     * Result is returned in promise with GridSession object.
     * @param startParams - object of SessionParams object.
     * @param action - value from SESSIONMODIFY_ACTION for resume or starting session.
     * @param sessionId - sessionId in case of resume
     * @throws ServerError in case of failure
     **/
    putOrPostSession(startParams: SessionParams, action: SESSIONMODIFY_ACTION, sessionId: string | undefined): Promise<GridSession | undefined>;
    /**
     * This method can be used to get a session details belonging to a session id for resume scenario or during polling.
     * Pass isPoll flag true when post request is made for session setup.
     * Result is returned in promise with GridSession object.
     * @param sessionId - sessionId in case of resume.
     * @param isPoll - used in post request.
     **/
    getSession(_sessionId: string, isPoll: boolean): Promise<GridSession | undefined>;
    /**
     *  For certain sessions GFN servers requires clients to display Ads to users.
     *  The Ads information are provided in the SessionUpdate event during getSession(isPoll = true)
     *  Application is expected to inform the state of Ad Play to GridServer module during session setup process.
     *  AdAction:
     *     START  - application started displaying the ad.
     *     PAUSE  - if the ad play is paused because of user navigating away from application.
     *     RESUME - ad play continuation after being paused.
     *     FINISH - ad play completed.
     *     CANCEL - User stopped ad play or client failed to play the ad.
     *  Note:
     *   Valid Ad actions for current AdState are
     *      CurrentState - AdAction
     *      STARTED  -> PAUSE|FINISH|CANCEL
     *      PAUSED   -> RESUME|CANCEL
     *      RESUMED  -> PAUSE|FINISH|CANCEL
     *      FINISHED -> None
     *      CANCELLED -> None
     *  This API is valid only if a getSession(isPoll = true) is in progress. After all the Ad play is completed and server is ready for streaming the getSession promise will be resolved.
     *  This API can throttle the ads update request to server if there are too many pause/resume updates for an Ad.
     *  Returns GsErrorCode.Success if the ad state update is successfully accepted.
     *  @param  adUpdate: AdUpdate to be sent to the server. Refer to AdUpdate documentation for the various parameters to be passed.
     *     Note: 1. Ad play can be canceled on the client device for multiple reasons,
     *           In few cases the session might be terminated on server which results in getSession promise rejection
     *           and in few cases session will transition to ready for streaming (getSession promise resolution) only after waiting for minimum duration.
     *           Clients are expected
     *           2. Applications can keep invoking this API without need to monitor the state of the Ad received from server.
     *              Multiple AdUpdates might be sent to server in one request. This usually happens when transitioning from one Ad to another.
     *              Ad1 action FINISH and Ad2 action START will be combined and sent to server in one request.
     *           3. This API can internally throttle the sequential PAUSE-RESUME actions.
     */
    updateAdState(adUpdate: AdUpdate): GsErrorCode;
    /**
     * This method can be used to send a delete request for a given session id.
     * Pass isPoll flag true when post request is made for session setup.
     * Result is returned in promise of type void.
     * @param sessionId - sessionId to delete
     * @note Will not cancel active operations.
     * @note If putOrPostSession or getSession is in progress, should first call cancelSessionSetup
     **/
    sendDeleteRequest(sessionId: string): Promise<void>;
    /**
     * Set the client's authorization information.
     * NOTE: initialize must be called before using this API.
     *       Should be called before the first use of APIs that require authentication with the server.
     *         - getAllActiveSessions
     *         - putOrPostSession
     *         - getSession
     *         - sendDeleteRequest
     *       If not called, Jarvis authentication will be assumed.
     *       In the event of authentication related errors, can be called again to update the existing authentication information.
     * @param authInfo - object
                     { type: enum<auth method for server communication>
                       token: string<token to authenticate server communication>}
     **/
    setAuthInfo(authInfo: AuthInfo): void;
    /**
     * This method can be used to cancel in progress session setup.
     * Should be called only after putOrPostSession or getSession with isPoll = true, before they resolve.
     * Ongoing APIs will throw with either SessionSetupCancelled or SessionSetupCancelledDuringQueuing.
     * @note Will not send DELETE request for the session.
     * @note Should call sendDeleteRequest following putOrPostSession or getSession resolution if the session should be deleted.
     **/
    cancelSessionSetup(): void;
    /**
     * Get zone name.
     * NOTE: will be empty until getSession or putOrPostSession gets called.
     */
    getZoneName(): string;
    /**
     * Get zone address.
     * NOTE: will be empty until getSession or putOrPostSession gets called.
     */
    getZoneAddress(): string;
    /**
     * Get GPU type.
     * NOTE: will be empty until getSession or putOrPostSession gets called.
     */
    getGpuType(): string;
    /**
     * Update telemetry network status. Default: NetworkType.UNKNOWN
     * @param network - interface: NetworkType
     */
    setNetworkType(network: NetworkType): void;
}
export declare class GridServer extends SessionControlImpl implements IGridServer {
    protected subSessionId: string;
    private zoneName?;
    private zoneAddress?;
    private subSessionsIdMap;
    private clearLogCallback;
    private putOrPostRequestController?;
    private getSessionRequestController?;
    private gpuType?;
    private launchRequestInfoMap;
    protected eventEmitter: LegacyLogEmitter;
    private telemetryCallback;
    private sessionUpdateHandler;
    constructor(platformDetails?: PlatformDetails, emitEventsSynchronously?: boolean);
    initialize(initParams: GsInitParams): void;
    /**
     * This method should be called before recreating GridServer object
     **/
    uninitialize(): void;
    addListener(eventname: string, handler: Function): void;
    removeListener(eventname: string, handler: Function): void;
    updateTelemetryEventIds(telemetryEventIds: TelemetryEventIds): void;
    /**
     * This method can be used to get all active sessions for current logged in user.
     * Expect ACTIVE_SESSIONS_RESULT event for results.
     **/
    getAllActiveSessions(): void;
    private getAllActiveSessionsImpl;
    protected resetSubSessionId(subSessionId: string, sessionId?: string): void;
    /**
     * This method returns the current sessionId.
     **/
    getSessionId(): string;
    /**
     * This method returns the current subSessionId.
     **/
    getSubSessionId(): string;
    /**
     * This method can be used to resume (PUT) or start (POST) a session.
     * Result is returned in promise with GridSession object.
     * @param startParams - object of SessionParams object.
     * @param action - value from SESSIONMODIFY_ACTION for resume or starting session.
     * @param sessionId - sessionId in case of resume
     **/
    putOrPostSession(startParams: SessionParams, action: SESSIONMODIFY_ACTION, sessionId: string | undefined): Promise<GridSession | undefined>;
    private putOrPostSessionImpl;
    /**
     * This method can be used to get a session details belonging to a session id for resume scenario or during polling.
     * Pass isPoll flag true when post request is made for session setup.
     * Result is returned in promise with GridSession object.
     * @param sessionId - sessionId in case of resume.
     * @param isPoll - used in post request.
     **/
    getSession(_sessionId: string, isPoll: boolean): Promise<GridSession | undefined>;
    private getSessionImpl;
    /**
     * This method can be used to send a delete request for a given session id.
     * Pass isPoll flag true when post request is made for session setup.
     * Result is returned in promise of type void.
     * @param sessionId - sessionId to delete
     * @note Will not cancel active operations.
     * @note If putOrPostSession or getSession is in progress, should first call cancelSessionSetup
     **/
    sendDeleteRequest(sessionId: string): Promise<void>;
    private sendDeleteRequestImpl;
    /**
     * This method can be used to cancel in progress session setup.
     * Should be called only after putOrPostSession or getSession with isPoll = true, before they resolve.
     * Ongoing APIs will throw with either SessionSetupCancelled or SessionSetupCancelledDuringQueuing.
     * @note Will not send DELETE request for the session.
     * @note Should call sendDeleteRequest following putOrPostSession or getSession resolution if the session should be deleted.
     * @note If the putOrPostSession or getSession promise-resolve/reject is already invoked but the then/catch block in application is not executed then this API is a no-op.
     *       Applications must handle the session result or non cancellation error and take appropriate action.
     **/
    cancelSessionSetup(): void;
    getZoneName(): string;
    getZoneAddress(): string;
    getGpuType(): string;
    private addErrorAttributesAndReject;
    private updateSessionZoneInfo;
    protected isSessionSetupInProgress(): boolean;
    /**
     * Emits GS_EVENT.SESSION_UPDATE event and the legacy GS_EVENT.PROGRESS_UPDATE
     * note: GFNClientSDK is using GS_EVENT.PROGRESS_UPDATE, instead of transitioning to GS_EVENT.SESSION_UPDATE they will switch to SessionControl usage
     * @param sessionUpdate
     */
    private sendSessionUpdateEvent;
}
export declare class PassThruServer extends GridServer {
    constructor();
    getAllActiveSessions(): void;
    putOrPostSession(startParams: SessionParams, action: number, sessionId: string | undefined): Promise<GridSession | undefined>;
    getSession(_sessionId: string, isPoll: boolean): Promise<GridSession | undefined>;
    sendDeleteRequest(sessionId: string): Promise<void>;
    updateAdState(adUpdate: AdUpdate): GsErrorCode;
}
export {};
