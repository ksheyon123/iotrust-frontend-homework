import {
  requestGetBanners,
  requestGetDApps,
  requestGetFavorites,
} from "@/apis";
import Banner from "@/components/Banner/Banner";
import AppInfoModal from "@/components/BottomUpModal/AppInfoModal";
import BottomUpModal from "@/components/BottomUpModal/BottomUpModal";
import Carousel from "@/components/Carousel/Carosel";
import Layout from "@/components/Layout/Layout";
import DAppItem from "@/components/List/DAppItem/DAppItem";
import FavoriteItem from "@/components/List/FavoriteItem/FavoriteItem";
import List from "@/components/List/List";
import Title from "@/components/Title/Title";
import { useLanguage } from "@/contexts/LanguageContext";
import { useModal } from "@/contexts/ModalContext";
import { detectPlatform } from "@/utils";
import { useEffect, useState } from "react";

const Discovery = () => {
  // Custom Hooks
  const { lngSets, currentLanguage } = useLanguage();
  const { showModal } = useModal();

  // States
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bottomUpItem, setBottomUpItem] = useState<DAppItem>();
  const [bannerItems, setBannerItems] = useState<BannerItem[]>([]);
  const [dappItems, setDAppItems] = useState<DAppItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);

  // condition에 따른 DApp 필터링 함수
  const filterDAppsByCondition = (
    dapps: DAppItem[],
    currentLanguage: string
  ): DAppItem[] => {
    const currentPlatform = detectPlatform();
    const currentEnv = process.env.NODE_ENV || "development";

    return dapps.filter((dapp) => {
      const languageData = dapp[currentLanguage as keyof DAppItem];
      if (!languageData || !languageData.condition) return true;

      const conditions = languageData.condition;

      // condition이 빈 배열인 경우 항상 표시
      if (conditions.length === 0) return true;

      // 플랫폼 조건 확인
      const platformConditions = conditions.filter(
        (cond) => cond === "ios" || cond === "android" || cond === "web"
      );

      // 언어 조건 확인
      const languageConditions = conditions.filter(
        (cond) => cond === "ko" || cond === "en"
      );

      // 환경 조건 확인
      const envConditions = conditions.filter(
        (cond) => cond === "dev" || cond === "stage" || cond === "prod"
      );

      let platformMatch = true;
      let languageMatch = true;
      let envMatch = true;

      // 플랫폼 조건이 있는 경우 확인
      if (platformConditions.length > 0) {
        const validPlatforms = ["ios", "android", "web"] as const;
        platformMatch =
          validPlatforms.includes(currentPlatform as any) &&
          platformConditions.includes(currentPlatform as any);
      }

      // 언어 조건이 있는 경우 확인
      if (languageConditions.length > 0) {
        const validLanguages = ["ko", "en"] as const;
        languageMatch =
          validLanguages.includes(currentLanguage as any) &&
          languageConditions.includes(currentLanguage as any);
      }

      // 환경 조건이 있는 경우 확인
      if (envConditions.length > 0) {
        const envMapping: { [key: string]: string } = {
          development: "dev",
          staging: "stage",
          production: "prod",
        };
        const mappedEnv = envMapping[currentEnv] || "dev";
        const validEnvs = ["dev", "stage", "prod"] as const;
        envMatch =
          validEnvs.includes(mappedEnv as any) &&
          envConditions.includes(mappedEnv as any);
      }

      return platformMatch && languageMatch && envMatch;
    });
  };

  const initialize = async () => {
    try {
      const [{ data: banners }, { data: dapps }, { data: favorites }] =
        await Promise.all([
          requestGetBanners(),
          requestGetDApps(),
          requestGetFavorites(),
        ]);
      if (banners) {
        // 새로운 API 응답 형식에서 ko 배열을 사용
        setBannerItems(banners || []);
      }
      if (dapps) {
        // 새로운 API 응답 형식에서 ko 배열을 사용
        setDAppItems(dapps || []);
      }

      if (favorites) {
        setFavoriteItems(favorites);
      }
    } catch (e) {
      throw e;
    } finally {
      setIsLoaded(true);
    }
  };

  const onClickFavorite = (item: FavoriteItem) => {
    showModal(
      {
        title: `${lngSets.dapp_favorite_title} ${lngSets.dapp_favorite_delete}`,
        message: lngSets.dapp_favorite_delete_confirm,
        confirmText: lngSets.button_confirm,
        cancelText: lngSets.button_cancel,
      },
      () => {
        setFavoriteItems((prevItems) =>
          prevItems.filter(
            (favItem) => favItem.service_url !== item.service_url
          )
        );
      },
      () => {}
    );
  };

  const onClickDApp = (item: DAppItem) => {
    setIsOpen(true);
    setBottomUpItem(item);
  };
  useEffect(() => {
    initialize();
  }, []);

  if (!isLoaded) return null;

  // condition에 따라 필터링된 DApp 목록
  const filteredDAppItems = filterDAppsByCondition(dappItems, currentLanguage);

  return (
    <Layout>
      <div>
        <Carousel>
          {bannerItems.map((item) => {
            return <Banner {...item} />;
          })}
        </Carousel>
      </div>
      <Title<{ title: string }>
        data={{ title: lngSets.dapp_favorite_title }}
        children={(d) => <div>{d.title}</div>}
      />
      <List
        data={favoriteItems}
        children={(item) => (
          <FavoriteItem
            item={item}
            onClick={() => {}}
            onClickFavorite={(item) => onClickFavorite(item)}
            isFavorited={true}
          />
        )}
      />
      <Title<{ title: string }>
        data={{ title: lngSets.dapp_list_title }}
        children={(d) => <div>{d.title}</div>}
      />
      <List
        data={filteredDAppItems}
        children={(item) => (
          <DAppItem item={item} onClick={(item) => onClickDApp(item)} />
        )}
      />
      <BottomUpModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AppInfoModal
          dappItem={bottomUpItem}
          onClose={() => setIsOpen(false)}
        />
      </BottomUpModal>
    </Layout>
  );
};

export default Discovery;
