import type { OS } from "./types";

interface UADataLike {
  platform?: string;
}

export function detectOS(): OS | null {
  if (typeof navigator === "undefined") return null;
  const uaData = (navigator as Navigator & { userAgentData?: UADataLike }).userAgentData;
  const platform = (uaData?.platform ?? navigator.platform ?? "").toLowerCase();
  const ua = navigator.userAgent.toLowerCase();
  if (platform.includes("mac") || ua.includes("mac os")) return "macos";
  if (platform.includes("win") || ua.includes("windows")) return "windows";
  if (platform.includes("linux") || ua.includes("linux")) return "linux";
  return null;
}
