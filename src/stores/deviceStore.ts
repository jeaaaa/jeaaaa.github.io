import { atom } from "nanostores";

export type DeviceType = "desktop" | "mobile";

export const deviceStore = atom<DeviceType>("desktop");
