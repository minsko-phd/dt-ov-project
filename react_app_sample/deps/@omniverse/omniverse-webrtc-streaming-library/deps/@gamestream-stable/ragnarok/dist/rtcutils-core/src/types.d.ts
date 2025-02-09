/** Network type enumerations:
 * Native clients on all platforms should be able to get the network type information.
 * However not all browsers provide network information.
 * LG and Samsung TVs provide custom events on window object to get the network type information.
 * ChromeOS only distinguishes between Wifi and ethernet and doesn't provide Wifi frequency information, use NetworkType.WIFI in this case.
 */
export declare const enum NetworkType {
    OTHER = "OTHER",
    ETHERNET = "ETHERNET",
    UNKNOWN = "UNKNOWN",
    WIFI = "WIFI",
    WIFI_2_4 = "WIFI_2_4",
    WIFI_5_0 = "WIFI_5_0",
    MOBILE = "MOBILE",
    MOBILE_2G = "MOBILE_2G",
    MOBILE_3G = "MOBILE_3G",
    MOBILE_4G = "MOBILE_4G",
    MOBILE_5G = "MOBILE_5G",
    WIMAX = "WIMAX",
    BLUETOOTH = "BLUETOOTH"
}
