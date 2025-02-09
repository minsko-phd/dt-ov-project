export declare const enum WireProtocolPacketId {
    MOUSE_GROUP = 32,
    RI_PACKET = 33,
    RI_NO_SIZE = 34,
    SENT_TIMESTAMP = 35,
    CHROME_CALLBACK_TIMESTAMP = 36,
    SEQUENCE_NUMBER = 37,
    INPUT_GROUP = 255
}
export declare const CHROME_CALLBACK_LEN = 9;
export declare const SENT_TIMESTAMP_LEN = 9;
export declare const SEQUENCE_NUMBER_LEN = 3;
export declare const MOUSE_GROUP_HEADER_LEN = 19;
export declare const enum PacketId {
    PACKET_HEARTBEAT = 2,
    PACKET_KEYDOWN = 3,
    PACKET_KEYUP = 4,
    PACKET_MOUSEMOVE_ABS = 5,
    PACKET_MOUSEMOVE_ABS_VIRT = 6,
    PACKET_MOUSEMOVE_REL = 7,
    PACKET_MOUSEDOWN = 8,
    PACKET_MOUSEUP = 9,
    PACKET_MOUSEWHEEL = 10,
    PACKET_GAMEPAD = 11,
    PACKET_GAMEPAD_MULTIUSER = 12,
    PACKET_HAPTICS_CONTROL = 13,
    PACKET_HID = 17,
    PACKET_HID_ENABLE = 18,
    PACKET_LOCK_KEYS = 19,
    PACKET_UNICODE = 23,
    PACKET_TOUCH_LOW_LEVEL = 24,
    PACKET_HAPTICS_EVENT = 267
}
export declare const enum ServerCommands {
    STREAMER_SERVER_HAPTICS_EVENT = 267,
    STREAMER_INPUT_CHANNEL_VERSION_INFO = 526
}
export declare const enum HapticsCommands {
    HAPTICS_NOOP = 0,
    HAPTICS_SIMPLE = 1,
    HAPTICS_DURATION = 2
}
export declare const enum InputModifierFlags {
    NVST_MF_NONE = 0,
    NVST_MF_SHIFT = 1,
    NVST_MF_CONTROL = 2,
    NVST_MF_ALT = 4,
    NVST_MF_META = 8,
    NVST_MF_SHIFT_RIGHT = 16,
    NVST_MF_CONTROL_RIGHT = 32,
    NVST_MF_ALT_RIGHT = 64,
    NVST_MF_META_RIGHT = 128,
    NVST_MF_ABSCOORDS = 2048,
    NVST_MF_VIRTUAL = 4096
}
export declare const enum LockKeyBitMask {
    NVST_LKB_NONE = 0,
    NVST_LKB_CAPS = 1,
    NVST_LKB_NUM = 2,
    NVST_LKB_SCROLL = 4,
    NVST_LKB_CAPS_VALID = 16,
    NVST_LKB_NUM_VALID = 32,
    NVST_LKB_SCROLL_VALID = 64
}
export declare const enum HidDeviceId {
    NVST_HID_DEV_INVALID = 0,
    NVST_HID_DEV_INTUOS_PRO_M = 1,
    NVST_HID_DEV_DUALSENSE_A = 2,
    NVST_HID_DEV_DUALSENSE_B = 3,
    NVST_HID_DEV_DUALSENSE_C = 4,
    NVST_HID_DEV_DUALSENSE_D = 5,
    NVST_HID_DEV_DUALSHOCK4_A = 6,
    NVST_HID_DEV_DUALSHOCK4_B = 7,
    NVST_HID_DEV_DUALSHOCK4_C = 8,
    NVST_HID_DEV_DUALSHOCK4_D = 9
}
export declare const enum HidControl {
    NVST_HC_NOOP = 0,
    NVST_HC_ENABLE = 1,
    NVST_HC_RESET = 2,
    NVST_HC_DISABLE = 3,
    NVST_HC_SIZE = 4
}
export declare const enum HidChangeFlags {
    NVST_HCF_NONE = 0,
    NVST_HCF_SUPPORTS_OUTPUT = 1
}
