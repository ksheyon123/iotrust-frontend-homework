import { http } from "./http";

const API_VERSION = "v1";

export const requestGetBanners = async () => {
  try {
    const response = await http.get<BannerItem[]>(`/api/${API_VERSION}/banner`);
    return response;
  } catch (e) {
    throw e;
  }
};

export const requestGetDApps = async () => {
  try {
    const response = await http.get<BannerItem[]>(`/api/${API_VERSION}/dapp`);
    return response;
  } catch (e) {
    throw e;
  }
};
