import { getCookie } from "@/lib/helper";
import axios from "axios";

axios.interceptors.request.use((config) => {
  config.headers["X-Auth-Token"] = getCookie("x-auth-token");

  return config;
});

export default axios;
