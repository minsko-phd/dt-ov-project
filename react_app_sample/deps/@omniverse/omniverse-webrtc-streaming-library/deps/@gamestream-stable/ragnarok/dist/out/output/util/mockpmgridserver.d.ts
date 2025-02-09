import { GridServer, GsInitParams } from "../dependencies";
export declare class MockPMGridServer extends GridServer {
    constructor();
    initialize(initParams: GsInitParams): void;
    generateAuthToken(): Promise<unknown>;
}
