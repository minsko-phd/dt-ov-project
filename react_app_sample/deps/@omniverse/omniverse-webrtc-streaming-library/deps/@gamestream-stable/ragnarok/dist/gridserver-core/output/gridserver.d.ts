import { GsInitParams, SessionParams, SessionState, GridSession, SESSIONMODIFY_ACTION, TelemetryEventIds } from "./interfaces";
import { AuthInfo, LogQueueingEventEmitter, PlatformDetails, IEventEmitter } from "./dependencies";
import { NetworkTypeEnum } from "./gstelemetryinterfaces";
/**
 * The interface defines the protocol to connect to PM.
 *
 * GridServer is the proxy class which implements the protocol and provides the actual ability to communicate with PM for session setup and teardown.
 * And it could be instantiated as: const gridServer: GridServer = new GridServer(platformDetails, emitEventsSynchronously);
 *
 * Client needs to register listners for GS_EVENTS as described in interface.ts file for the events it emits.
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
declare interface IGridServer extends IEventEmitter {
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
     * This method should be called before recreating gridserver object
     **/
    uninitialize(): void;
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
     * NOTE: the subsession ID is set/reset on putOrPostSession calls and will be empty until one is executed.
     *       Ideally the subsession ID is the current one, but it will not be expired if the current subsession expires.
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
    /**
     * This method can be used to get a session details belonging to a session id for resume scenario or during polling.
     * Pass isPoll flag true when post request is made for session setup.
     * Result is returned in promise with GridSession object.
     * @param sessionId - sessionId in case of resume.
     * @param isPoll - used in post request.
     **/
    getSession(_sessionId: string, isPoll: boolean): Promise<GridSession | undefined>;
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
     * Update telemetry network status. Default: NetworkTypeEnum.UNKNOWN
     * @param network - interface: NetworkTypeEnum
     */
    setNetworkType(network: NetworkTypeEnum): void;
}
export declare class GridServer extends LogQueueingEventEmitter implements IGridServer {
    private sessionControlServerMap;
    private httpRequestOptions;
    protected initParams?: GsInitParams;
    protected protocol: string;
    protected overrideSignallingInfo: boolean;
    protected subSessionId: string;
    private queuePosition;
    private pollingOptions;
    private authInfo;
    private zoneName?;
    private zoneAddress?;
    private subSessionsIdMap;
    private logHandler;
    private putOrPostRequestController?;
    private getSessionRequestController?;
    private gpuType?;
    private gsTelemetryHandler;
    private clientLocale?;
    private launchRequestInfoMap;
    private platformDetails?;
    constructor(platformDetails?: PlatformDetails, emitEventsSynchronously?: boolean);
    initialize(initParams: GsInitParams): void;
    /**
     * This method should be called before recreating gridserver object
     **/
    uninitialize(): void;
    updateTelemetryEventIds(telemetryEventIds: TelemetryEventIds): void;
    private extractSessionInformation;
    private extractSessionList;
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
    private sendSessionUpdateEvent;
    private getPollingInterval;
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
    setAuthInfo(authInfo: AuthInfo): void;
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
    setNetworkType(network: NetworkTypeEnum): void;
    private addServerOperationAttributes;
    private addErrorAttributes;
    private addResultSuccessAttribute;
    private addSessionInfoAttributes;
    private addRequestStatusAttributes;
    private addErrorAttributesAndReject;
    static convertSessionStateToString(status: number): SessionState;
    private getUrlForSession;
    private createSessionRequestURL;
    private getSessionRequestData;
    private performSessionRequest;
    private updateSessionZoneInfo;
    private static getResultFromRequestStatus;
    private static getGsErrorCode;
    private static isParseError;
    private static getResultCodeDescription;
    private static addClientHeaders;
}
export declare class PassThruServer extends GridServer {
    constructor();
    getAllActiveSessions(): void;
    putOrPostSession(startParams: SessionParams, action: number, sessionId: string | undefined): Promise<GridSession | undefined>;
    getSession(_sessionId: string, isPoll: boolean): Promise<GridSession | undefined>;
    sendDeleteRequest(sessionId: string): Promise<void>;
}
export {};
