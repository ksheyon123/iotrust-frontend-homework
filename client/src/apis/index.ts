import { http } from "./http";
import { ApiError } from "@/types/https";

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
    const response = await http.get<DAppItem[]>(`/api/${API_VERSION}/dapp`);
    return response;
  } catch (e) {
    throw e;
  }
};

export const requestGetFavorites = async () => {
  try {
    const response = await http.get<FavoriteItem[]>(
      `/api/${API_VERSION}/favorite`
    );
    return response;
  } catch (e) {
    throw e;
  }
};

export const requestLngSet = async (lng: string) => {
  try {
    // 상대 경로를 사용하여 public 폴더의 파일에 접근
    // 빌드 시에도 정상적으로 작동하도록 수정
    const response = await fetch(`/language/${lng}.json`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result;
    } else {
      throw {
        message: "Unknown error",
        status: response.status,
        code: 4001,
      } as ApiError;
    }
  } catch (e) {
    throw e;
  }
};
