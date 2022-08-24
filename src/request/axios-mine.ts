import axios, { AxiosInstance } from 'axios';
import store from '../store';
import error_en from './error/en.json';
import error_ru from './error/ru.json';
import error_th from './error/th.json'

let axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    timeout: 1000 * 60 * 10,
    headers: {
        "Accept": '*/*',
        "Content-Type": "application/json",
    },
});
axiosInstance.interceptors.request.use(
    config => {
        config.headers!.Authorization = String(sessionStorage.getItem('token_1'))
        config.headers!.Lang = store.getState().language || String(localStorage.getItem('language'))
        return config
    },
    error => {
        throw new Error(error)
    }
)
axiosInstance.interceptors.response.use(
    response => {
        const data = response.data;
        const lang = localStorage.getItem('language');
        const error = lang === 'en' && error_en || lang === 'en' && error_ru || lang === 'th' && error_th || {};
        if (<number>response.status == 200) {
            for (let i in error) {
                if (data.code == i) {
                    data.message = error[i as keyof typeof error]
                }else{
                    data.message = 'Pass'
                }
            };
            return data;
        }
    },
    error => {
        throw new Error(error);
    },

);
export const get = <T>(url: string, params?: any): Promise<T> => {
    return new Promise((resolve: any, reject: any): void => {
        axiosInstance({
            method: 'get',
            url,
            data: params
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
};
export const post = <T>(url: string, params: any): Promise<T> => {
    return new Promise((resolve: any, reject: any): void => {
        axiosInstance({
            method: 'post',
            url,
            data: params
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

// axiosInstance.interceptors.request.use(

//     error => {
//         throw new Error(error)
//     }
// )

