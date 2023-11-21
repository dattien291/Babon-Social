import axios from "axios";

const axiosConfig = {
  baseURL: "http://localhost:5000/api/v1",
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "App-Id": "hieutran@0901",
  },
};

const handleResponse = (response: any) => response?.data?.data || response?.data || response;

const handleError = (error: any) => Promise.reject(error);

let token: any = null;

export const setToken = (val: any) => {
  token = val;
};

const privateRequest = axios.create(axiosConfig);
privateRequest.interceptors.request.use((config) => {
  if (!!token) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});
privateRequest.interceptors.response.use(handleResponse, handleError);

const publicRequest = axios.create(axiosConfig);
publicRequest.interceptors.response.use(handleResponse, handleError);

export { privateRequest, publicRequest };
