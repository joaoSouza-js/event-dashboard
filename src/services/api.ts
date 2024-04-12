import axios, { AxiosError } from "axios";
import { AppError } from "../_error/appError";
export const api_base_url = new URL("http://localhost:3333");

export const api = axios.create({
    baseURL: api_base_url.toString(),
});

api.interceptors.response.use(
    (response) => response.data,
    async (responseError: AxiosError<any>) => {
        if (
            responseError.response?.data && 
            responseError.response.data.message
        ) {
            return Promise.reject(
                new AppError(
                    responseError.response.data.message,
                    responseError.response.status
                    
                )
            )
        }
        return Promise.reject(responseError);
    }
);
