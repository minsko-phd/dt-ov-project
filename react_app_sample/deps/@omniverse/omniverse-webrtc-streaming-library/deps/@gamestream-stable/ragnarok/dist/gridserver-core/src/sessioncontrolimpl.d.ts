import { AuthInfo, NetworkType, ObservableArray, PlatformDetails, RequestHttpOptions } from "./dependencies";
import { ScErrorCode } from "./gserrorcode";
import { AdAction, AdState, AdUpdate, ServerInfo, SessionUpdate } from "./interfaces";
import { ActiveSessionsResult, SessionInfoResult, SessionControl, SessionStartResumeResult, SessionUpdateCallback, SessionParameters, InitializeParameters, Session } from "./sessioncontrol";
import { GridServer_GameLaunch_Request } from "./gstelemetryhandler";
import * as PM from "./schemas/pminterfaces.generated";
/**
 * Contains parameters which helps decide the interval between GET session requests during session setup.
 * @see SessionControl.getPollingInterval
 */
export interface PollingOptions {
    /** Minimum interval between consecutive GET session requests */
    minInterval: number;
    /** Maximum interval between consecutive GET session requests. */
    maxInterval: number;
    /**
     * When sessions are in longer queue, the GET session request interval should be higher to reduce the load on the server.
     * From 0 to n, for every X number of queue position the interval needs to be incremented by step value.
     * Ex: For step = 2 and queueSizePerStep = 30.
     *  If session queue position is between 1-30, interval should be 1 * step which is 2.
     *  If session queue position is between 31-60, interval should be  2 * step which is 4.
     * Note: The resulting interval must be below maxInterval.
     */
    step: number;
    /** size of queue after which interval must be incremented by step. */
    queueSizePerStep: number;
    /**
     * When the server indicates session requires ads, library must delay sending the next GET session request until a minimum duration.
     * This helps in needlessly request server until it fetches ad details from third party service.
     * This value cannot override the minInterval and maxInterval values.
     */
    adsPollingIntervalMinMS: number;
}
/**
 * Provides the resulting AdState for a given AdAction.
 * @param action - AdAction which would result in state transition.
 * @returns AdState - next state of the Ad.
 */
export declare function convertAdActionToState(action: AdAction): AdState;
/**
 * Checks whether the transition of Ad from one state to another is valid.
 * This is required to reject invalid AdUpdates from client. @see SessionControl.updateAdState
 * @param lastState - last state of the Ad.
 * @param newState - next state to be transitioned to based on clients AdUpdate
 * @returns true - if state transition is valid, else false.
 */
export declare function isValidAdStateTransition(lastState: AdState, newState: AdState): boolean;
/**
 * Utility function which provides string form of few generic error codes which can used for logging.
 * @see SessionControl.performSessionRequest
 * @param code - Error generated during server request, could be ScErrorCode or unified error code returned by server.
 * @returns a string which can be logged.
 */
export declare function getErrorCodeDescription(code: number): string;
/**
 * Collection of the output data from @see SessionControlImpl.performSessionRequest
 */
export interface ServerResponse {
    /** Result code for the current http request. */
    result: ScErrorCode;
    /**
     * Session object generated from server response.
     * If http requests fails due to network error then this object will not be populated.
     */
    session?: Session;
    /** Id of the server instance which responded to the http request. */
    serverId?: string;
    /** Active session associated with the user, populated for SessionRequestType.GET_ACTIVE_SESSIONS and in SessionRequestType.CREATE_SESSION(optional) */
    activeSessions?: Session[];
    /** Actual json response from server. */
    pmResponse?: PmResponse;
}
/**
 * Identifies the type of http request to @see SessionControl.performSessionRequest.
 */
export declare enum SessionRequestType {
    CREATE_SESSION = 0,
    RESUME_SESSION = 1,
    DELETE_SESSION = 2,
    GET_SESSIONINFO = 3,
    AD_UPDATE = 4,
    GET_ACTIVE_SESSIONS = 5
}
declare type ServerResponseHandler = (response: ServerResponse) => void;
declare type ExceptionHandler = (error: any) => void;
declare type RequestAbortHandler = () => void;
declare type TimeoutHandler = () => void;
/**
 * todo SessionSetupController:
 * Below functions of SessionControlImpl can be moved to a class called SessionSetupController which wraps everything that needs to happen during Session setup process.
 *  startOrResumeSession,
 *  performSessionSetupPollingRequest,
 *  processSessionSetupException, resolveStartResumeSession, processSessionSetupServerResponse,
 *  getPollingInterval,
 *  updateAdState implementation,
 *  getSessionUpdate
 * Some of the members of SessionControlImpl like pollingOptions, adUpdateArray, adsStateInfo should also be moved to SessionSetupController.
 * While implementing SessionSetupController, some functions like extractSessionInformation, extractSessionList, performSessionRequest should all be made accessible to SessionSetupController.
 * Right now majority of the SessionControlImpl properties are combined in SessionSetupData struct and letting the derived GridServer class utilize member functions of SessionControl for polling.
 * It would be better to take up moving of functionalities to SessionSetupController after GridServer class is deleted,
 * otherwise will require some WARs in design which again needs to be cleaned up.
 */
/** Promise return type of SessionControl.startSession/resumeSession */
declare type SessionStartResumeResolve = (value: SessionStartResumeResult | PromiseLike<SessionStartResumeResult>) => void;
/**
 * Collection of the parameters required in session setup process.
 * Temporary structure required until SessionSetupController implementation.
 */
interface SessionSetupData {
    /** sessionSession/resumeSession returned promise resolve function. */
    resolve: SessionStartResumeResolve;
    /** Promise rejection function. */
    reject: any;
    /** Telemetry events for the session setup process. Emitted before resolving the promise. */
    launchTelemetryEvent: GridServer_GameLaunch_Request;
    /** Current session Id. Will be updated after POST session response in startSession case.*/
    sessionId?: string;
    /** SubSessionId for the current startSession/resumeSession. */
    subSessionId: string;
    /** Cached session details to be provided to client in case of network failures. */
    lastSessionFromServer?: Session;
    /** Callback to deliver the SessionUpdate data to clients. */
    sessionUpdateCallback: SessionUpdateCallback;
    /**
     * Last queue position sent to client in SessionUpdate.
     * Required to prevent sending queue position higher than the previously provided queue position to client.
     * This is a WAR for UI progress bar going back and forth issue. */
    lastQueuePosition: number;
    /**
     * Indicates if the session was put in queue on server.
     * Will be used to distinguish result code between SessionSetupCancelled and SessionSetupCancelledDuringQueuing.
     */
    isSessionInQueue: boolean;
    /** Abort controller for terminating the setup process. */
    cancelController: AbortController;
    /** Start time of the session setup process, eventually the SessionSetupController class will set this in its constructor. */
    startTime: number;
}
/** A union of possible responses from the PM */
declare interface PmResponse {
    requestStatus?: PM.RequestStatus;
    sessions?: PM.Session[];
    session?: PM.Session;
    otherUserSessions?: PM.Session[];
}
/**
 * Implementation class of @see SessionControl interfaces.
 * This class is not exported outside of this library.
 */
export declare class SessionControlImpl implements SessionControl {
    protected sessionControlServerMap: Map<string, ServerInfo>;
    protected httpRequestOptions: RequestHttpOptions;
    protected authInfo: AuthInfo;
    protected tracingAttributes: Map<string, string>;
    protected protocol: string;
    protected platformDetails?: PlatformDetails;
    protected sessionSetupData?: SessionSetupData;
    protected adUpdateArray: ObservableArray<AdUpdate>;
    protected adsStateInfo: Map<string, {
        serverAdState: AdState;
        lastClientAdState: AdState;
    }>;
    protected pollingOptions: PollingOptions;
    protected serverAddress: string;
    private deviceId;
    private clientPlatformName;
    constructor();
    /**
     * Initializes the SessionControl class.
     * This is a temporary function added to support the derived class GridServer initialization which needs to wait for client calling init for internal configuration.
     * todo: Once GridServer is deleted, move all the content of this to function to constructor.
     * @param initializeParams
     * @returns true if successfully initialized.
     */
    init(initializeParams: InitializeParameters): boolean;
    setAuthInfo(authInfo: AuthInfo): void;
    setNetworkType(network: NetworkType): void;
    startSession(startParameters: SessionParameters, cancelController: AbortController, updateCallback: SessionUpdateCallback): Promise<SessionStartResumeResult>;
    resumeSession(sessionId: string, resumeParameters: SessionParameters, cancelController: AbortController, callback: SessionUpdateCallback): Promise<SessionStartResumeResult>;
    deleteSession(sessionId: string, cancelController?: AbortController): Promise<ScErrorCode>;
    getActiveSessions(cancelController: AbortController | undefined): Promise<ActiveSessionsResult>;
    getSessionInfo(sessionId: string, cancelController: AbortController | undefined): Promise<SessionInfoResult>;
    /**
     * Indicates if execution of startSession/resumeSession is in progress.
     * note: GridServer overrides and determines this based on this.getSessionRequestController.
     * @returns boolean
     */
    protected isSessionSetupInProgress(): boolean;
    /**
     * Adds common attributes to the active tracing span.
     * Must be called whenever a new span is created.
     * todo: evaluate if this can be moved to TracingManager.
     */
    protected addTracingAttributesToSpan(): void;
    /**
     * Updates the span with the result of the operation.
     * @param code - Returned by SessionControl APIs
     * @param description - optional description to be set in span.
     */
    protected addResultToSpan(code: ScErrorCode, description?: string): void;
    /**
     * Updates the span with session properties.
     */
    protected addSessionInfoToSpan(pmSession: PM.Session): void;
    /**
     * Updates the span with RequestStatus details of http response from server.
     * @param requestStatus - RequestStatus object in the response from server.
     */
    protected addRequestStatusToSpan(requestStatus: PM.RequestStatus): void;
    /**
     * Creates Session object from the json response from server
     * @param pmSession - the "session" objected contained in the http response from the server.
     * @returns Session
     */
    private extractSessionInformation;
    /**
     * Converts the array of unified protocol session object to Session array.
     * @param pmSessions - the array of unified protocol session objects.
     * @returns Session[]
     */
    private extractSessionList;
    /**
     * This function is executed during session setup/resume process if the server has provided ads for the session.
     * Clients are expected to play the ads received from server and update the ad state to library. @see SessionControl.updateAdState
     * Since requests to server are always sent sequentially, the updateAdState function just queues the AdUpdate.
     * This function sends the queued AdUpdates to server.
     * If there are no AdUpdates to be sent to server then either wait for timeout or for new AdUpdate from the client or abort signal from client.
     * @param sessionId - Id of the session thats being setup.
     * @param setupController - AbortController to abort the request to server or abort the wait for timeout.
     * @param onServerResponse - Handler to be executed once response is received from server.
     * @param onException - Handler to be executed during exception.
     * @param onAbort - Handler to be executed when clients abort the request via setupController parameter.
     * @param onTimeout - Handler to be executed when clients doesn't provide any AdUpdate for a long time.
     */
    protected processAdUpdates(sessionId: string, setupController: AbortController, onServerResponse: ServerResponseHandler, onException: ExceptionHandler, onAbort: RequestAbortHandler, onTimeout: TimeoutHandler): void;
    updateAdState(adUpdate: AdUpdate): ScErrorCode;
    /**
     * Generates a url for session requests. For new/resume session @see createSessionRequestURL to add additional query parameters.
     * @param sessionId - if set (all request except GET_ACTIVE_SESSIONS and CREATE_SESSION), will add the sessionId to URL
     * @param serverAddress - optional, will be used in URL creation if the session resource is not yet allocated in any zone.
     * @returns URL
     */
    protected getUrlForSession(sessionId: string): string;
    /**
     * Utility function to create the URL for new session or resume request.
     * The resume requests should always be sent to the zone where session is established.
     * @param startParams - SessionParameters which contains keyboardLayout, locale which are populated in query params of url.
     * @param sessionId - if set will create resume request URL.
     * @returns url
     */
    protected createSessionRequestURL(startResumeParams: SessionParameters, sessionId?: string | undefined): string;
    /**
     * Creates the SessionRequestData JSON object which should be sent to server in new session and resume requests.
     * @param sessionParameters - contains some of the values to be sent to server.
     * @param resume - if set, the JSON data generated will adhere to the resume request protocol.
     * @param subSessionId - Id generated by SessionControl in startSession/resumeSession interfaces.
     * @returns string - stringified JSON object to be sent to server.
     */
    protected getSessionRequestData(sessionParameters: SessionParameters, resume: boolean, subSessionId: string): string;
    /**
     * Performs a single session related http request, handles the response, handles error cases and collects http telemetry.
     * Unless there is an exception in the catch block handling this function always resolves with ServerResponse object.
     * Developers should use this function instead of making direct http requests to server as this function generalizes the error handling, telemetry collection.
     * @param requestType - identifies the type of session request as response format from server can be different and helps decide if Http telemetry should be collected.
     * @param requestUrl - http url
     * @param body - http body to be sent to server.
     * @param abortController - passed to fetch API, caller can abort the fetch request by calling .abort on this object.
     * @param sessionId - optional sessionId, collected in telemetry.
     * @returns a promise which resolves with ServerResponse. @see ServerResponse for details.
     */
    protected performSessionRequest(requestType: SessionRequestType, requestUrl: string, body: string, abortController?: AbortController, sessionId?: string): Promise<ServerResponse>;
    /**
     * Provides the SessionUpdate interface populated using the session object provided from server.
     * Clients will use the returned object to display progress state/queue position/eta/ads to the user.
     * @see startOrResumeSession
     * @param pmSession - session object received from server.
     * @param lastQueuePosition - last queue position informed to client.
     *       In GeForce NOW server a session position in queue can move in either direction based on the requests from users with different subscriptions.
     *       If clients display progress bar based on queue position it might keeping going back and forth.
     *       This function prevents the queue position returned to client to be always <= the last provided queue position.
     * @param subSessionId - Id for the startSession/resumeSession instance.
     * @returns SessionUpdate
     */
    protected getSessionUpdate(pmSession: PM.Session, lastQueuePosition: number, subSessionId: string): SessionUpdate;
    /**
     * Returns the wait time between requests to server during session setup/resume process.
     * The interval is decided based on queue position/ads requirement.
     * @param pmSession - JSON session object received by server.
     * @returns the polling interval
     */
    protected getPollingInterval(pmSession: PM.Session): number;
    /**
     * Returns true if clients have configured the auth information through setAuthInfo.
     * @returns boolean
     */
    protected isAuthInfoAvailable(): boolean;
    /**
     * Implements the session start/resume process.
     * This is called from both startSession and resumeSessionAPI with the parameters provided by client.
     * The returned promise is resolved eventually once the session is ready for connection or in error case.
     * @param sessionParameters
     * @param cancelController
     * @param updateCallback
     * @param sessionId - if not set will be treated as new session setup process else resumes this session.
     * @returns
     */
    private startOrResumeSession;
    /**
     * Part of session setup process.
     * Initiates the GET session request during session setup/resume polling.
     * This further results in processing of next action during polling asynchronously.
     * @returns void
     */
    protected performSessionSetupPollingRequest(): void;
    /**
     * Part of session setup process.
     * Emits exception and resolves the sessions setup process.
     * @param err - Exception caught in one of the session setup process functions.
     */
    private processSessionSetupException;
    /**
     * Resolves the promise returned in startSession/resumeSession.
     * This is also responsible for emitting the launch telemetry event and clearing session setup related variables.
     * @param code - Result to be returned to client.
     * @param zoneName - zone which provided the response. undefined in network error/exception cases.
     * @param activeSessions - active sessions provided by server.
     * @returns void
     */
    private resolveStartResumeSession;
    /**
     * Implements the logic for next action after response from server during session setup process.
     * @param response - return value of performSessionRequest function.
     * @returns
     */
    private processSessionSetupServerResponse;
    /**
     * Collects exception telemetry event and logs exception.
     * @param error - argument passed to catch handler.
     * @param sourceFunc - function where exception was caught.
     */
    private processException;
}
export {};
