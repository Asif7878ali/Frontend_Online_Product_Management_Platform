import axios from "axios";
import configCenter from "../lib/config";
import { setLoading } from "@/store/slices/loadingSlice";
import { useDispatch } from "react-redux";

export const useFetchApi = () => {
  const baseURL = configCenter.urls.base;
  const dispatch = useDispatch();

  return async ({ endpoint, method = "GET", payload = null }) => {
    dispatch(setLoading(true));

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(5000);

    try {
      const config = {
        method,
        url: `${baseURL}${endpoint}`,
      };

      if (payload instanceof FormData) {
        // ✅ if payload is FormData
        config.data = payload;
        config.headers = { "Content-Type": "multipart/form-data" };
      } else if (payload) {
        // ✅ if payload is a plain object (JSON)
        config.data = payload;
        config.headers = { "Content-Type": "application/json" };
      }

      const response = await axios(config);
      return response;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};
