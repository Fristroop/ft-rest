export interface RestConfig {
  baseURL: string;
  token: string;
}

export interface RestResponse {
  ok: boolean;
  status: number;
  statusText?: string;
  data?: object;
}

export interface RestError {
  ok: boolean;
  errorMessage: string;
  status?: number;
  error?: object;
}
