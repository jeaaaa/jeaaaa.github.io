import React, { useEffect } from "react";
import { deviceStore } from "@/stores/deviceStore";

export function DeviceDetector() {
  useEffect(() => {
    const setDevice = () => {
      const isMobile = window.innerWidth <= 768;
      deviceStore.set(isMobile ? "mobile" : "desktop");
    };
    setDevice();
    window.addEventListener("resize", setDevice);
    return () => window.removeEventListener("resize", setDevice);
  }, []);
  return null;
}
