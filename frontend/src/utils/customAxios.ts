import axios from "axios";
import { BACKEND_URL } from "../../config";

const CustomAxios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export default CustomAxios;
