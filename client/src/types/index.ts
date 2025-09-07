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
  banner_url: LanguageObject;
  banner_link: LanguageObject;
  banner_desc?: LanguageObject;
  banner_btn_text?: LanguageObject;
};

type DAppItem = {
  name: string;
  image_url: string;
  service_url: string;
  description: LanguageObject;
  networks: string[];
  condition: string[];
};
