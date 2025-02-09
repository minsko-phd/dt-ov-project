import { TelemetryEventBase } from "./internaltypes";
/**
 * Details of the client which generated the telemetry data. @see TelemetryEventPayload
 * Every module has its own telemetry schema, module name and Id. The uploader of telemetry should not modify this data.
 * Note: The telemetry end points doesn't accept grouping of telemetry events from different client module.
 * Its the responsibility of uploader to group events from different client module.
 */
export declare interface ClientTelemetryConfig {
    /** The telemetry client's name as defined in the event schema. */
    clientName: string;
    /** The telemetry client's Id as defined in the event schema. */
    clientId: string;
    /** The telemetry client's event schema version. */
    eventSchemaVer: string;
}
/**
 * Event payload interface for all Telemetry events forwarded to clients.
 * @see TelemetryCallback
 */
export declare interface TelemetryEventPayload {
    /** Event name as per the schema. */
    name: string;
    /** Event payload as per the schema. */
    parameters: any;
    /** Event gdpr level as per the schema. */
    gdprLevel: string;
    /** Timestamp when the event was generated. */
    ts: string;
    /** Schema config to be used for dispatching the event. */
    clientConfig: ClientTelemetryConfig;
}
/**
 * Visualization and backend processing of certain telemetry events requires additional information like system properties, user streaming properties selection etc.
 * Instead of collecting all the info in every telemetry event, collecting just the Ids of events like SystemInfo in telemetry event will help in backend processing merging the required data.
 * @see Telemetry.updateTelemetryEventIds
 */
export declare interface TelemetryEventIds {
    /** An UUID sent with every StreamingProfile event by client. */
    streamingProfileGuid?: string;
    /** An UUID sent with every SystemInfo event by client. */
    systemInfoGuid?: string;
    /** Identifier of the last network test instance. */
    networkTestId?: string;
}
/**
 * Syntax of the individual events contained in the telemetry data object uploaded to server.
 * @see TelemetryCommonData
 */
export declare interface FormattedEventDetail {
    name: string;
    ts: string;
    parameters: object;
}
/**
 * Represents all the data to be sent to the telemetry server in every http request.
 * This structure is part of the schema definition, not all parameters populated will be sent to server.
 * The telemetry upload module will override many values.
 * @todo add more detailed documentation of each parameters and what fields will be overridden by the session control library.
 */
export declare interface TelemetryCommonData {
    clientId?: string;
    clientVer?: string;
    eventSchemaVer?: string;
    eventSysVer?: string;
    eventProtocol?: string;
    deviceId?: string;
    userId?: string;
    externalUserId?: string;
    idpId?: string;
    sessionId?: string;
    platform?: string;
    sentTs?: string;
    events?: FormattedEventDetail[];
    gdprFuncOptIn?: string;
    gdprTechOptIn?: string;
    gdprBehOptIn?: string;
    deviceGdprFuncOptIn?: string;
    deviceGdprTechOptIn?: string;
    deviceGdprBehOptIn?: string;
    deviceOS?: string;
    deviceOSVersion?: string;
    deviceType?: string;
    deviceModel?: string;
    deviceMake?: string;
    clientType?: string;
    clientVariant?: string;
    integrationId?: string;
    browserType?: string;
}
/**
 * Callback which handles the telemetry data provided by library.
 * @see TelemetryConfiguration
 */
export declare type TelemetryCallback = (telemetry: TelemetryEventPayload) => void;
/**
 * Informs the telemetry handling mechanism to NVIDIAStreamKit/SessionControl/other streaming related libraries.
 * Clients must decide the telemetry upload mechanism and set either url or callback option.
 */
export declare interface TelemetryConfiguration {
    /**
     * If set to string, will be treated as url where telemetry should be uploaded..
     * Else if callback is set then library will provide all telemetry in callback. It will be clients responsibility to upload telemetry to appropriate end point.
     */
    option: string | TelemetryCallback;
}
/**
 * Provides functionality for configuring the telemetry handling mechanism and caching data updates from clients.
 * Clients can either let the library upload telemetry data to the configured server endpoint or get telemetry data in callback.
 * @see TelemetryConfiguration for more details.
 */
export declare interface Telemetry {
    /**
     * Configure whether library should upload the telemetry or provide the telemetry data in onTelemetryEvent callback.
     * @param config - @see TelemetryConfiguration for details.
     * @returns - true if configured successfully. False if the configuration value is invalid.
     */
    configure(config: TelemetryConfiguration): boolean;
    /**
     * Provide the client/device/user specific information that needs to be sent to the server in http request.
     * Clients must call this every time user related parameters are changed.
     * This function must be invoked if clients want the library to upload the data.
     * If telemetry callback is set, this function can be optional and clients can fill the common data to the telemetry payload before uploading to the server.
     * @param data - common details part of the http request sent to server.
     */
    updateTelemetryCommonData(data: TelemetryCommonData): void;
    /**
     * Clients are responsible for collecting telemetry events like SystemInfo, user selected StreamingProfile, NetworkTest etc.
     * The above data is required in backend data processing of the events collected by NvidiaStreamKit/SessionControl/other libraries.
     * The Ids passed in this API will be collected in some of the telemetry events. The backend data processing merges appropriate data based on the Id.
     * @param ids - system info Id, streaming profile Id, network test Id etc.
     */
    updateTelemetryEventIds(ids: TelemetryEventIds): void;
}
/**
 * Wraps the implementation of caching/uploading/callback of telemetry.
 * All the libraries which provides telemetry support should override this class and invoke processEvent of this class.
 * This class should not be exported to clients.
 * todo: we don't rely on navigator.onLine or listeners for (offline/online). Need to evaluate its reliability on non browser platforms as this code
 * will be used in CEF framework on multiple platforms.
 */
export declare class TelemetryImpl implements Telemetry {
    protected telemetryCommonData?: TelemetryCommonData;
    protected telemetryEventIds: TelemetryEventIds;
    private clientTelemetryConfig;
    private serverUrl?;
    private telemetryCallback?;
    private pendingEventPayloads;
    private uploadToServerTimerId;
    private readonly httpConfiguration;
    constructor(clientConfig: ClientTelemetryConfig);
    configure(config: TelemetryConfiguration): boolean;
    updateTelemetryCommonData(data: TelemetryCommonData): void;
    updateTelemetryEventIds(ids: TelemetryEventIds): void;
    /**
     * Processes the generated telemetry from the derived class.
     * If telemetry handling mechanism is not set through configure API then just cache in runtime memory.
     * Else:
     *      If callback is configured then pass the data to clients immediately.
     *      Else: telemetry upload to server:
     *          If consent not configured then cache in runtime memory.
     *          If user not consented for the current telemetry then discard it.
     *          Else upload the data to server.
     * @param event - Telemetry event types generated from schema.
     * @param priority - In telemetry upload configuration, if set, will use browsers sendBeacon API to upload the data to server.
     */
    protected processEvent(event: TelemetryEventBase<any>, priority?: boolean): void;
    /**
     * Indicates if user consent type has been registered by clients.
     * @returns true - consent type available, else false.
     * @see hasUserConsentedForEvent to determine if a particular event can be sent to server.
     */
    private isUserConsentTypeAvailable;
    /**
     * Returns true if the event GDPR level has been consented by user to send the data to server.
     * @note  User consent might not be registered yet as EULA might not have been accepted by user.
     *        @see isUserConsentTypeAvailable to check if we have consent type registered by client.
     * @param event - Telemetry event whose GDPR level has to be checked with users GDPR selection.
     * @returns true - if the event can be sent to server else false.
     */
    private hasUserConsentedForEvent;
    /**
     * Generates the http request data to be sent to the telemetry server for all the cached telemetry events.
     * @returns http request data
     */
    private createTelemetryRequestData;
    /**
     * Initiates telemetry upload request if upload is not in progress or queued for uploading.
     * @param delay - optional delay(milliseconds) in uploading to server.
     */
    private uploadTelemetry;
    /**
     * Uploads all the cached telemetry events to server in a single http request.
     * Once a request is attempted, the events are flushed irrespective of result of upload.
     * Once telemetry upload is completed and more events are queued we initiate next telemetry upload after some delay.
     */
    private performTelemetryUpload;
}
