import { ApiError, ApiResponse } from "@/types/https";

// SERVER END POINT URL
const API_BASE_URL = process.env.API_BASE_URL;

// 기본 fetch 함수
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    // Fetch에서 에러가 발생한 경우,
    if (!response.ok) {
      let errorMessage = `HTTP Error: ${response.status}`;
      const errorData = await response.json();

      try {
        errorMessage = errorData.message || errorData.detail || errorMessage;
      } catch {
        // JSON 파싱 실패 시 기본 메시지 사용
        throw {
          message: "HTTP Error: 에러 응답 값 파싱 실패",
          status: 500,
          code: errorData.code,
        } as ApiError;
      }

      throw {
        message: errorMessage,
        status: response.status,
        code: errorData.code,
      } as ApiError;
    }

    // if (response.status === 204) {
    //   return {} as ApiResponse<T>;
    // }

    return (await response.json()) as ApiResponse<T>;
  } catch (error) {
    // 이미 ApiError 형태로 던져진 경우 (HTTP 에러)
    if (error && typeof error === "object" && "status" in error) {
      throw error;
    }

    // 네트워크 에러, 타임아웃 등의 경우
    if (error instanceof Error) {
      throw {
        message: error.message,
        status: 0, // 네트워크 에러는 0으로 구분
        code: 0,
      } as ApiError;
    }

    throw error;
  }
}

// HTTP 메서드별 함수들
export const http = {
  get: <T>(endpoint: string): Promise<ApiResponse<T>> =>
    request<T>(endpoint, { method: "GET" }),

  post: <T>(endpoint: string, body?: any): Promise<ApiResponse<T>> =>
    request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body?: any): Promise<ApiResponse<T>> =>
    request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string): Promise<ApiResponse<T>> =>
    request<T>(endpoint, { method: "DELETE" }),
};
