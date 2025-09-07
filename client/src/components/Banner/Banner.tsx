import { useLanguage } from "@/contexts/LanguageContext";

const Banner = (item: BannerItem) => {
  const { currentLanguage } = useLanguage();

  // 현재 언어에 맞는 배너 데이터 선택
  const localizedBanner = item[currentLanguage];

  return (
    <div className="relative">
      <img
        src={localizedBanner.banner_url}
        alt={localizedBanner.banner_desc || "배너 이미지"}
        className="w-full h-auto"
      />
      {localizedBanner.banner_desc && (
        <p className="mt-2 text-gray-600">{localizedBanner.banner_desc}</p>
      )}
      {localizedBanner.banner_btn_text && (
        <a
          href={localizedBanner.banner_link}
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {localizedBanner.banner_btn_text}
        </a>
      )}
    </div>
  );
};

export default Banner;
