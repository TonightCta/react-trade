import { get,post } from './axios-mine';

export const TestApi = (p:{}) => post('/types',p);