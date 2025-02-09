export declare const enum IndexDbErrorCode {
    DbNotYetOpen = 1,
    DbClosing = 2,
    IndexDbObjectNotFound = 17,
    DbOpenFailed = 18,
    DbOpenBlocked = 19,
    DbExceptionInOpen = 20,
    DbGetFailed = 32,
    DbExceptionInGet = 33,
    DbPutFailed = 48,
    DbExceptionInPut = 49,
    DbDeleteFailed = 64,
    DbExceptionInDelete = 65,
    DbClearFailed = 80,
    DbExceptionInClear = 81,
    DbGetAllFailed = 96,
    DbExceptionInGetAll = 97
}
export interface StoreDetails {
    storeName: string;
    storeOptions: IDBObjectStoreParameters;
    storeIndexName: string;
}
export declare class IndexedDb {
    private indexedDb;
    private version;
    private name;
    private storeDetails;
    private dbInstance?;
    private isDbClosing;
    private didDbCloseUnexpectedly;
    constructor(dbName: string, storeDetails: StoreDetails[]);
    open(): Promise<void>;
    private getDbStateError;
    get(storeName: string, key: string[]): Promise<any>;
    set(storeName: string, data: any): Promise<void>;
    delete(storeName: string, key: string[]): Promise<void>;
    clear(storeName: string): Promise<void>;
    getAll(storeName: string): Promise<any[]>;
    close(): void;
    private createDbInstance;
}
