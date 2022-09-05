import axios, {AxiosError, AxiosRequestConfig} from "axios";


export class BaseClient {
    static baseUrl = 'http://79.143.31.216'
    static async get<T>(url: string, options?: AxiosRequestConfig) {
        try {
            const response = await axios.get<T>(`${this.baseUrl}/${url}`, options)
            return response.data
        }catch (error) {
            return this.mapError(error as AxiosError<T>)
        }
    }
    static async post<T> (url: string, data: any, options?: AxiosRequestConfig) {
        try {
            const response = await axios.post<T>(`${this.baseUrl}/${url}`, data, options)
            return response.data;
        } catch (error) {
            return this.mapError(error as AxiosError<T>)
        }
    }
    static mapError<T>(error: AxiosError<T>) {
        return Promise.reject({data: error.response})
    }
}