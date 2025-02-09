declare global {
    interface Window {
        webapis: {
            productinfo: {
                /** Retrieves the firmware information. */
                getFirmware(): string;
                /** Retrieves the full model name, such as UN65JS9500. */
                getRealModel(): string;
                /** Query if 4k panel supports 4k */
                isUdPanelSupported(): boolean;
                /** Retrieves the manufacturer's information, such as Samsung */
                getLicensedVendor(): string;
                /** Retrieves the infolink server version, such as "T-INFOLINK2014-1002" */
                getSmartTVServerVersion(): string;
            };
        };
    }
}
export {};
