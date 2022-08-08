import axios, { AxiosInstance } from 'axios';
import store from '../store';
import qs from 'qs';
import { Toast } from 'antd-mobile';

const token = store.getState().appToken;

export interface IResponse {
    code: string | number,
    data: any,
    message: string
};

let axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    timeout: 1000 * 60 * 10,
    headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json"
    },
});
axiosInstance.interceptors.request.use(
    config => {
        token && (config.headers!.Authorization = token);
        return token || config
    },
    error => {
        throw new Error(error)
    }
)
axiosInstance.interceptors.response.use(
    response => {
        if (<any>response.status == 200) {
            switch (response.data.code) {
                case 100001:
                    Toast.show('Crazy');
                    break;
            };
            return response.data;
        }
    },
    error => {
        throw new Error('KFC Crazy Thursday Need $50');
    },

);
// 'KFC Crazy Thursday Need $50'

export const get = (url: string, params?: any) => {
    return new Promise((resolve, reject): void => {
        axiosInstance({
            method:'get',
            url,
            data:params
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
};
export const post = (url: string, params: any) => {
    return new Promise((resolve, reject): void => {
        axiosInstance({
            method:'post',
            url, 
            data:params
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

