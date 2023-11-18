import axios, { AxiosResponse } from "axios";
import { URLSearchParams } from "url";

import { RequestMethods } from "./enums.js";
import { RestConfig, RestResponse, RestError } from "./types/index.js";

/**
 * REST module is developed in order to make easier to work with REST API's.
 * This module uses axios for making requests.
 * It is flexible
 */
export class REST {
  baseURL: string;
  token: string;
  constructor(restConf: RestConfig) {
    this.baseURL = restConf.baseURL;
    this.token = restConf.token;
  }

  makeRequest = async (
    path: string,
    data: object,
    method: string
  ): Promise<RestResponse | RestError> => {
    if (!this.baseURL || !this.token) {
      return {
        ok: false,
        errorMessage: "Validation Error",
      };
    }

    try {
      const res = await axios({
        url: this.baseURL + path,
        method,
        data,
        headers: {
          Authorization: this.token,
        },
      });

      return {
        ok: res.status >= 200 && res.status < 300,
        status: res.status,
        statusText: res.statusText,
        data: this._responseResolver(res),
      };
    } catch (error: any) {
      return {
        ok: false,
        status: error.response.status,
        error: this._errorResolver(error),
        errorMessage: String(error),
      };
    }
  };

  async get(path: string, body: object) {
    path = path + "?" + this._bodyToQueryParams(body);
    body = {};
    return this.makeRequest(path, body, RequestMethods.Get);
  }

  async delete(path: string, body: object) {
    return this.makeRequest(path, body, RequestMethods.Delete);
  }

  async post(path: string, body: object) {
    return this.makeRequest(path, body, RequestMethods.Post);
  }

  async put(path: string, body: object) {
    return this.makeRequest(path, body, RequestMethods.Put);
  }

  setToken(token: string) {
    this.token = token;
    return this;
  }

  setBaseURL(baseURL: string) {
    this.baseURL = baseURL;
    return this;
  }

  _responseResolver(res: AxiosResponse) {
    return res.data;
  }

  _errorResolver(error: any) {
    return error.response.data;
  }

  _bodyToQueryParams(body: any) {
    const params = new URLSearchParams();

    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        params.append(key, body[key]);
      }
    }
    return params.toString();
  }
}
