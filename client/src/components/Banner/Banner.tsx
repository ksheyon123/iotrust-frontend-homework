import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalizedValue } from "@/utils/languageUtils";

const Banner = (item: BannerItem) => {
  const { currentLanguage } = useLanguage();
  const getLocalizedBanner = (
    bannerItem: BannerItem,
    currentLanguage: Language
  ) => {
    return {
      url: getLocalizedValue(bannerItem.banner_url, currentLanguage),
      link: getLocalizedValue(bannerItem.banner_link, currentLanguage),
      desc: getLocalizedValue(bannerItem.banner_desc, currentLanguage),
      btnText: getLocalizedValue(bannerItem.banner_btn_text, currentLanguage),
    };
  };

  const localizedBanner = getLocalizedBanner(item, currentLanguage);

  return (
    <div className="relative">
      <img
        src={localizedBanner.url}
        alt={localizedBanner.desc || "배너 이미지"}
        className="w-full h-auto"
      />
      {localizedBanner.desc && (
        <p className="mt-2 text-gray-600">{localizedBanner.desc}</p>
      )}
      {localizedBanner.btnText && (
        <a
          href={localizedBanner.link}
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {localizedBanner.btnText}
        </a>
      )}
    </div>
  );
};

export default Banner;
