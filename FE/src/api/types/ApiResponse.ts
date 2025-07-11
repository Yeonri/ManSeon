export type ApiResponse<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
  timestamp: string;
  path: string;
};
