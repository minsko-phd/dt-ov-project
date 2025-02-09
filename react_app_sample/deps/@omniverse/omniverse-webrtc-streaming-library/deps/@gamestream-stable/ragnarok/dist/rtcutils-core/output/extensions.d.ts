declare global {
    interface Window {
        webapis: {
            productinfo: {
                getFirmware(): string;
                getRealModel(): string;
                isUdPanelSupported(): boolean;
                getLicensedVendor(): string;
            };
        };
    }
}
export {};
