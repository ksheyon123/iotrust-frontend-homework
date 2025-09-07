import { requestGetBanners, requestGetDApps } from "@/apis";
import Banner from "@/components/Banner/Banner";
import Carousel from "@/components/Carousel/Carosel";
import Layout from "@/components/Layout/Layout";
import List from "@/components/List/List";
import ListItem from "@/components/List/ListItem";
import Title from "@/components/Title/Title";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalizedValue } from "@/utils/languageUtils";
import { useEffect, useState } from "react";

const Discovery = () => {
  const { lngSets } = useLanguage();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [bannerItems, setBannerItems] = useState<BannerItem[]>([]);
  const [dappItems, setDAppItems] = useState<DAppItem[]>([]);

  const initialize = async () => {
    try {
      const [{ data: banners }, { data: dapps }] = await Promise.all([
        requestGetBanners(),
        requestGetDApps(),
      ]);
      if (banners) {
        setBannerItems(banners);
      }
      if (dapps) {
        setDAppItems(dapps);
      }
    } catch (e) {
      throw e;
    } finally {
      setIsLoaded(true);
    }
  };
  useEffect(() => {
    initialize();
  }, []);

  if (!isLoaded) return null;

  return (
    <Layout>
      <Carousel>
        {bannerItems.map((item) => {
          return <Banner {...item} />;
        })}
      </Carousel>
      <Title<{ title: string }>
        data={{ title: lngSets.dapp_favorite_title }}
        children={(d) => <div>{d.title}</div>}
      />
      <List data={dappItems} children={(item) => <ListItem {...item} />} />
    </Layout>
  );
};

export default Discovery;
