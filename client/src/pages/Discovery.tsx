import { requestGetBanners, requestGetDApps } from "@/apis";
import Carousel from "@/components/Carousel/Carosel";
import Layout from "@/components/Layout/Layout";
import List from "@/components/List/List";
import { useEffect, useState } from "react";

const Discovery = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const initialize = async () => {
    try {
      const [{ data: banners }, { data: dapps }] = await Promise.all([
        requestGetBanners(),
        requestGetDApps(),
      ]);
      console.log(banners);
      console.log(dapps);
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
      <></>
    </Layout>
  );
};

export default Discovery;
