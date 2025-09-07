type Language = "ko" | "en";

type LanguageObject = {
  [K in Language]: string;
};

type DefaultLngSets = {
  dapp_favorite_title: string;
  dapp_favorite_delete: string;
  dapp_favorite_delete_confirm: string;
  dapp_list_title: string;
  go_to_dapp: string;
  button_cancel: string;
  button_confirm: string;
};

type BannerItem = {
  ko: {
    banner_name: string;
    banner_url: string;
    banner_link: string;
    banner_desc?: string;
    banner_btn_text?: string;
  };
  en: {
    banner_name: string;
    banner_url: string;
    banner_link: string;
    banner_desc?: string;
    banner_btn_text?: string;
  };
};

type DAppItem = {
  ko: {
    name: string;
    image_url: string;
    service_url: string;
    description: string;
    networks: string[];
    condition: string[];
  };
  en: {
    name: string;
    image_url: string;
    service_url: string;
    description: string;
    networks: string[];
    condition: string[];
  };
};

type FavoriteItem = {
  title: string;
  image_url: string;
  service_url: string;
};

// 플랫폼 관련 타입
type Platform = "ios" | "android" | "web" | "unknown";

type PlatformInfo = {
  platform: Platform;
  isIOS: boolean;
  isAndroid: boolean;
  isWeb: boolean;
  isMobile: boolean;
  version?: string;
};
