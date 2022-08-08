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
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
    },
    transformRequest: [
        (data) => {
            delete data.Authorization;
            data = qs.stringify(data);
            return data
        }
    ]
});
axiosInstance.interceptors.request.use(
    config => {
        token && (config.headers!.Authorization = token);
        return token
    },
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


export const get = (url: string, params?: any) => {
    return new Promise((resolve, reject): void => {
        axios.get(url, {
            params
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
};
export const post = (url: string, params: any) => {
    return new Promise((resolve, reject): void => {
        axios.post(url, params).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

