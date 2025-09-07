type Language = "ko" | "en";

type LanguageObject = {
  [K in Language]: string;
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
