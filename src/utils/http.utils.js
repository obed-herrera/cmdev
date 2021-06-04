import axios from "axios";
import { BASE_URL_PATH } from "../utils";
import { getAuth, removeAuth } from "../services"


export default function http() {
    const CREDI_API = axios.create({
        baseURL: BASE_URL_PATH,
        headers: {
            ...getAuth()
        },
        validateStatus: status => {
            if (status === 401) {
                removeAuth();
                return true;
            }
            if (status === 404) {
                window.location.href = "/404";
            }
            return status >= 200 && status < 300;
        }
    });
    return CREDI_API;
}
