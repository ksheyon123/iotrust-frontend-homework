// API 응답 타입
export interface ApiResponse<T = any> {
  data?: T;
  code?: number;
  count?: number;
  next?: string | null;
  previous?: string | null;
}

// 에러 타입
export interface ApiError {
  message: string;
  status: number;
  code: number;
}
