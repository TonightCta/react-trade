import axios, { AxiosInstance } from 'axios';
import store from '../store';

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
        if (<any>response.status == 200) {
            switch (data.code) {
                case 100001:
                    data.message = 'Crazy'
                    break;
                case 10004:
                    data.message = '账号已存在';
                    break;
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

