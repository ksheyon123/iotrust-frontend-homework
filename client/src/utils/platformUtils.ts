/**
 * 플랫폼 타입 정의
 */
export type Platform = "ios" | "android" | "web" | "unknown";

/**
 * 플랫폼 정보 인터페이스
 */
export interface PlatformInfo {
  platform: Platform;
  isIOS: boolean;
  isAndroid: boolean;
  isWeb: boolean;
  isMobile: boolean;
  version?: string;
}

/**
 * User Agent를 기반으로 플랫폼을 감지하는 함수
 */
export const detectPlatform = (): Platform => {
  if (typeof window === "undefined" || !window.navigator) {
    return "unknown";
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  // iOS 감지 (iPhone, iPad, iPod)
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return "ios";
  }

  // Android 감지
  if (/android/.test(userAgent)) {
    return "android";
  }

  // 웹 브라우저
  return "web";
};

/**
 * iOS 여부를 확인하는 함수
 */
export const isIOS = (): boolean => {
  return detectPlatform() === "ios";
};

/**
 * Android 여부를 확인하는 함수
 */
export const isAndroid = (): boolean => {
  return detectPlatform() === "android";
};

/**
 * 모바일 플랫폼 여부를 확인하는 함수
 */
export const isMobile = (): boolean => {
  const platform = detectPlatform();
  return platform === "ios" || platform === "android";
};

/**
 * 웹 플랫폼 여부를 확인하는 함수
 */
export const isWeb = (): boolean => {
  return detectPlatform() === "web";
};

/**
 * iOS 버전을 추출하는 함수
 */
export const getIOSVersion = (): string | null => {
  if (!isIOS()) return null;

  const userAgent = window.navigator.userAgent;
  const match = userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);

  if (match) {
    const major = match[1];
    const minor = match[2];
    const patch = match[3] || "0";
    return `${major}.${minor}.${patch}`;
  }

  return null;
};

/**
 * Android 버전을 추출하는 함수
 */
export const getAndroidVersion = (): string | null => {
  if (!isAndroid()) return null;

  const userAgent = window.navigator.userAgent;
  const match = userAgent.match(/Android (\d+(?:\.\d+)*)/);

  return match ? match[1] : null;
};

/**
 * 상세한 플랫폼 정보를 반환하는 함수
 */
export const getPlatformInfo = (): PlatformInfo => {
  const platform = detectPlatform();
  const platformIsIOS = platform === "ios";
  const platformIsAndroid = platform === "android";
  const platformIsWeb = platform === "web";
  const platformIsMobile = platformIsIOS || platformIsAndroid;

  let version: string | undefined;
  if (platformIsIOS) {
    version = getIOSVersion() || undefined;
  } else if (platformIsAndroid) {
    version = getAndroidVersion() || undefined;
  }

  return {
    platform,
    isIOS: platformIsIOS,
    isAndroid: platformIsAndroid,
    isWeb: platformIsWeb,
    isMobile: platformIsMobile,
    version,
  };
};

/**
 * 플랫폼별 클래스명을 반환하는 함수 (CSS 스타일링용)
 */
export const getPlatformClassName = (): string => {
  const platform = detectPlatform();
  return `platform-${platform}`;
};

/**
 * 플랫폼별 조건부 실행을 위한 헬퍼 함수
 */
export const runOnPlatform = (callbacks: {
  ios?: () => void;
  android?: () => void;
  web?: () => void;
  mobile?: () => void;
  default?: () => void;
}): void => {
  const platform = detectPlatform();

  if (platform === "ios" && callbacks.ios) {
    callbacks.ios();
  } else if (platform === "android" && callbacks.android) {
    callbacks.android();
  } else if (platform === "web" && callbacks.web) {
    callbacks.web();
  } else if (
    (platform === "ios" || platform === "android") &&
    callbacks.mobile
  ) {
    callbacks.mobile();
  } else if (callbacks.default) {
    callbacks.default();
  }
};
