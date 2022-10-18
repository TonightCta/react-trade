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
        config.headers!.Authorization = String(localStorage.getItem('token_1'))
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
        const error = lang === 'en' && error_en || lang === 'ru' && error_ru || lang === 'th' && error_th || {};
        if (<number>response.status === 200) {
            for (let i in error) {
                if (data.code === Number(i) && data.code !== 400) {
                    data.message = error[i as keyof typeof error];
                    break
                } else if (data.code === 401) {
                    // data.message = 'Login expired';
                    window.location.replace(`${process.env.REACT_APP_SHARE}/#/login`)
                    break;
                }
            };
            return data;
        }
    },
    error => {
        // const config = error.config;
        // if (!config || !config.retryTimes) return Promise.reject(error);
        // const { __retryCount = 0, retryDelay = 1000, retryTimes } = config;
        // config.__retryCount = __retryCount;
        // if (__retryCount > retryTimes) {
        //     return Promise.reject(error);
        // };
        // config.__retryCount++;
        // const delay = new Promise<void>((resolve) => {
        //     setTimeout(() => {
        //         resolve()
        //     }, retryDelay)
        // });
        // return delay.then(() => {
        //     return axiosInstance(config);
        // })
        throw new Error(error)
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

