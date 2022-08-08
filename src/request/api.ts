import { get,post } from './axios-mine';

const url = process.env.REACT_APP_BASEURL;

export const TestApi = (p:{}) => post(url + '/types',p);