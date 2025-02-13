export declare const enum RErrorCode {
    Success = 15859712,
    AuthProviderError = 3237085185,
    InvalidOperation = 3237085186,
    NoNetwork = 3237089281,
    NetworkError = 3237089282,
    GetActiveSessionServerError = 3237089283,
    ExceptionHappened = 3237089284,
    AuthTokenNotUpdated = 3237093377,
    SessionFinishedState = 3237093378,
    ResponseParseFailure = 3237093379,
    GridAppNotInitialized = 3237093380,
    InvalidServerResponse = 3237093381,
    PutOrPostInProgress = 3237093382,
    GridServerNotInitialized = 3237093383,
    DOMExceptionInGridServer = 3237093384,
    SessionServerErrorBegin = 3237093632,
    RequestForbidden = 3237093634,
    ServerInternalTimeout = 3237093635,
    ServerInternalError = 3237093636,
    ServerInvalidRequest = 3237093637,
    ServerInvalidRequestVersion = 3237093638,
    SessionListLimitExceeded = 3237093639,
    InvalidRequestDataMalformed = 3237093640,
    InvalidRequestDataMissing = 3237093641,
    RequestLimitExceeded = 3237093642,
    SessionLimitExceeded = 3237093643,
    InvalidRequestVersionOutOfDate = 3237093644,
    SessionEntitledTimeExceeded = 3237093645,
    AuthFailure = 3237093646,
    InvalidAuthenticationMalformed = 3237093647,
    InvalidAuthenticationExpired = 3237093648,
    InvalidAuthenticationNotFound = 3237093649,
    EntitlementFailure = 3237093650,
    InvalidAppIdNotAvailable = 3237093651,
    InvalidAppIdNotFound = 3237093652,
    InvalidSessionIdMalformed = 3237093653,
    InvalidSessionIdNotFound = 3237093654,
    EulaUnAccepted = 3237093655,
    MaintenanceStatus = 3237093656,
    ServiceUnAvailable = 3237093657,
    SteamGuardRequired = 3237093658,
    SteamLoginRequired = 3237093659,
    SteamGuardInvalid = 3237093660,
    SteamProfilePrivate = 3237093661,
    InvalidCountryCode = 3237093662,
    InvalidLanguageCode = 3237093663,
    MissingCountryCode = 3237093664,
    MissingLanguageCode = 3237093665,
    SessionNotPaused = 3237093666,
    EmailNotVerified = 3237093667,
    InvalidAuthenticationUnsupportedProtocol = 3237093668,
    InvalidAuthenticationUnknownToken = 3237093669,
    InvalidAuthenticationCredentials = 3237093670,
    SessionNotPlaying = 3237093671,
    InvalidServiceReponse = 3237093672,
    AppPatching = 3237093673,
    GameNotFound = 3237093674,
    NotEnoughCredits = 3237093675,
    InvitationOnlyRegistration = 3237093676,
    RegionNotSupportedForRegistration = 3237093677,
    SessionTerminatedByAnotherClient = 3237093678,
    DeviceIdAlreadyUsed = 3237093679,
    ServiceNotExist = 3237093680,
    SessionExpired = 3237093681,
    SessionLimitPerDeviceReached = 3237093682,
    ForwardingZoneOutOfCapacity = 3237093683,
    RegionNotSupportedIndefinitely = 3237093684,
    RegionBanned = 3237093685,
    RegionOnHoldForFree = 3237093686,
    RegionOnHoldForPaid = 3237093687,
    AppMaintenanceStatus = 3237093688,
    ResourcePoolNotConfigured = 3237093689,
    InsufficientVmCapacity = 3237093690,
    InsufficientRouteCapacity = 3237093691,
    InsufficientScratchSpaceCapacity = 3237093692,
    RequiredSeatInstanceTypeNotSupported = 3237093693,
    ServerSessionQueueLengthExceeded = 3237093694,
    RegionNotSupportedForStreaming = 3237093695,
    SessionForwardRequestAllocationTimeExpired = 3237093696,
    SessionForwardGameBinariesNotAvailable = 3237093697,
    GameBinariesNotAvailableInRegion = 3237093698,
    UekRetrievalfailed = 3237093699,
    EntitlementFailureForResource = 3237093700,
    SessionInQueueAbandoned = 3237093701,
    MemberTerminated = 3237093702,
    SessionRemovedFromQueueMaintenance = 3237093703,
    ZoneMaintenanceStatus = 3237093704,
    GuestModeCampaignDisabled = 3237093705,
    RegionNotSupportedAnonymousAccess = 3237093706,
    InstanceTypeNotSupportedInSingleRegion = 3237093707,
    InvalidZoneForQueuedSession = 3237093710,
    SessionServerErrorEnd = 3237093887,
    StreamerErrorCategory = 3237093888,
    StreamErrorGeneric = 3237093889,
    StreamerSignInFailure = 3237093890,
    StreamerHanginGetFailure = 3237093891,
    StreamerNetworkError = 3237093892,
    StreamerVideoPlayError = 3237093893,
    StreamerIceConnectionFailed = 3237093894,
    StreamerGetRemotePeerTimedOut = 3237093895,
    StreamInputChannelError = 3237093896,
    StreamCursorChannelError = 3237093897,
    StreamControlChannelError = 3237093898,
    StreamerReConnectionFailed = 3237093899,
    StreamerNoVideoPacketsReceivedEver = 3237093900,
    StreamerNoVideoFramesLossyNetwork = 3237093901,
    StreamerSetSDPFailure = 3237093902,
    StreamerNoLocalCandidates = 3237093903,
    StreamerNoRemoteCandidates = 3237093904,
    StreamerNoVideoTrack = 3237093905,
    StreamerIceReConnectionFailed = 3237093906,
    StreamerSignInTimeout = 3237093907,
    StreamerSignInWorkerFailure = 3237093908,
    StreamerNoTracksReceivedInSdp = 3237093909,
    StreamerNvstSdpFailure = 3237093910,
    StreamerNvstSdpParseFailure = 3237093911,
    StreamerNoPeerInfo = 3237093912,
    StreamerNoOffer = 3237093913,
    StreamerNoAudioTrack = 3237093914,
    StreamerInvalidRemoteConfigOverride = 3237093915,
    StreamerInvalidServerOverride = 3237093916,
    StreamerInvalidClientOverride = 3237093917,
    StreamerConfigUpdateFailure = 3237093918,
    StreamerInputChannelNotOpen = 3237093919,
    StreamerCursorChannelNotOpen = 3237093920,
    StreamerControlChannelNotOpen = 3237093921,
    StreamerVideoAdapterInitTimeOut = 3237093922,
    StreamerVideoFrameProviderInitTimeOut = 3237093923,
    StreamerVideoEncoderInitTimeOut = 3237093924,
    StreamerVideoSetupTimeOut = 3237093925,
    StreamerNoStunResponsesReceived = 3237093926,
    StreamerNoNominatedCandidatePairs = 3237093927,
    StreamerNoSucceededCandidatePairs = 3237093928,
    SessionSetupCancelled = 15867905,
    SessionSetupCancelledDuringQueuing = 15867906,
    StreamerDataChannelClosing = 15867907,
    SystemSleepDuringStreaming = 15867908,
    SystemSleepDuringSessionSetup = 15867909,
    PauseSession = 15867910,
    DelayedSessionError = 15867911,
    WebPageClosed = 15867912,
    ClientDisconnectedUserIdle = 15867913,
    UnhandledException = 3237093392,
    NoInternetDuringSessionSetup = 15868417,
    NoInternetDuringStreaming = 15868418,
    StreamDisconnectedFromServer = 15868672,
    ServerDisconnectedNoResponce = 3237094145,
    ServerDisconnectedRemoteInputError = 3237094146,
    ServerDisconnectedFrameGrabFailed = 3237094147,
    ServerDisconnectedConfigUnAvailable = 3237094148,
    ServerDisconnectedInvalidCommand = 3237094149,
    ServerDisconnectedInvalidMouseState = 3237094150,
    ServerDisconnectedNetworkError = 3237094151,
    ServerDisconnectedGameLaunchFailed = 3237094152,
    ServerDisconnectedVideoFirstFrameSendFailed = 3237094153,
    ServerDisconnectedVideoNextFrameSendFailed = 3237094154,
    ServerDisconnectedFrameGrabTimedOut = 3237094155,
    ServerDisconnectedFrameEncodeTimedOut = 3237094156,
    ServerDisconnectedFrameSendTimedOut = 3237094157,
    ServerDisconnectedNetworkTimedOut = 3237094158,
    ServerDisconnectedPeerRemovedByServer = 3237094159,
    ServerDisconnectedUnknownError = 3237094160,
    ServerDisconnectedPeerRemovedBeforeStream = 3237094161,
    ServerDisconnectedIntended = 15868704,
    ServerDisconnectedHotKey = 15868705,
    ServerDisconnecteduserLoggedinDifferenAccount = 15868706,
    ServerDisconnectedWindowedMode = 15868707,
    ServerDisconnectedUserIdle = 15868708,
    ServerDisconnectedUnAuthorizedProcessDetected = 15868709,
    ServerDisconnectedMaliciousProcessDetected = 15868710,
    ServerDisconnectedUnKnownProcessDetected = 15868711,
    ServerDisconnectedMinerProcessDetected = 15868712,
    ServerDisconnectedStreamingUnsupported = 15868713,
    ServerDisconnectedAnotherClient = 15868714,
    ServerDisconnectedCodeIntegrityViolation = 15868715,
    ServerDisconnectedUnauthorizedActivityDetected = 15868716,
    ServerDisconnectedGameNotOwnedByUser = 15868717,
    ServerDisconnectedProtectedContent = 15868718,
    ServerDisconnectedUnknownFromPm = 15868736,
    ServerDisconnectedUserEntitledMinutesExceeded = 15868737,
    ServerDisconnectedClientReconnectTimeLimitExceeded = 15868738,
    ServerDisconnectedOperatorCommandedTermination = 15868739,
    ServerDisconnectedConcurrentSessionLimitExceeded = 15868740,
    ServerDisconnectedMaxSessionTimeLimitExceeded = 15868741,
    ServerDisconnectedBifrostInitiatedSessionPause = 15868742,
    ServerDisconnectedSystemCommandTermination = 15868743,
    ServerDisconnectedMultipleLogin = 15868744,
    ServerDisconnectedMaintenanceMode = 15868745,
    InvalidVideoElement = 3237094400,
    InvalidAudioElement = 3237094401
}
