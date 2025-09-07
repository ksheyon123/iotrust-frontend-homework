import {
  requestGetBanners,
  requestGetDApps,
  requestGetFavorites,
} from "@/apis";
import Banner from "@/components/Banner/Banner";
import Carousel from "@/components/Carousel/Carosel";
import Layout from "@/components/Layout/Layout";
import DAppItem from "@/components/List/DAppItem/DAppItem";
import FavoriteItem from "@/components/List/FavoriteItem/FavoriteItem";
import List from "@/components/List/List";
import Title from "@/components/Title/Title";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

const Discovery = () => {
  const { lngSets } = useLanguage();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [bannerItems, setBannerItems] = useState<BannerItem[]>([]);
  const [dappItems, setDAppItems] = useState<DAppItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);

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

  const handleFavoriteToggle = (item: FavoriteItem) => {
    setFavoriteItems((prevItems) =>
      prevItems.filter((favItem) => favItem.service_url !== item.service_url)
    );
  };
  useEffect(() => {
    initialize();
  }, []);

  if (!isLoaded) return null;

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
            onFavoriteToggle={() => handleFavoriteToggle(item)}
            isFavorited={true}
          />
        )}
      />
      <Title<{ title: string }>
        data={{ title: lngSets.dapp_list_title }}
        children={(d) => <div>{d.title}</div>}
      />
      <List
        data={dappItems}
        children={(item) => <DAppItem item={item} onClick={() => {}} />}
      />
    </Layout>
  );
};

export default Discovery;
