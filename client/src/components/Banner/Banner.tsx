import { useLanguage } from "@/contexts/LanguageContext";
import Button from "../Button/Button";

const Banner = (item: BannerItem) => {
  const { currentLanguage } = useLanguage();

  // 현재 언어에 맞는 배너 데이터 선택
  const localizedBanner = item[currentLanguage];
  const hasButton = !!item[currentLanguage].banner_btn_text;

  const onClickBanner = () => {
    if (!hasButton) window.open(localizedBanner.banner_link);
  };

  return (
    <div
      className="relative w-full h-64 bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden"
      style={{ backgroundImage: `url(${localizedBanner.banner_url})` }}
      onClick={onClickBanner}
    >
      {/* Description - 좌측 상단 */}
      {localizedBanner.banner_desc && (
        <div className="absolute top-4 left-4 z-10">
          <p className="text-white text-xl font-medium max-w-md leading-relaxed">
            {localizedBanner.banner_desc}
          </p>
        </div>
      )}

      {/* Button - 좌측 하단 */}
      {localizedBanner.banner_btn_text && (
        <Button
          className="absolute bottom-4 left-4 z-10"
          onClick={() => window.open(localizedBanner.banner_link)}
        >
          {localizedBanner.banner_btn_text}
        </Button>
      )}
    </div>
  );
};

export default Banner;
