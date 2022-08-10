import { get, post } from './axios-mine';
import { IResponse } from '../utils/types'

type o = {};

//发送验证码
export const SendCodeApi = (p: o) => post<IResponse>('/user/sendCode', p);
//注册
export const RegisterApi = (p: o) => post<IResponse>('/user/register', p);
//登录
export const LoginApi = (p: o) => post<IResponse>('/user/login', p);
//忘记密码
export const ForgetPassApi = (p: o) => post<IResponse>('/user/forget', p);
//用户信息
export const UserInfoApi = (p?: o) => get<IResponse>('/user/profile', p);
//用户资产
export const UserAssetsApi = () => get<IResponse>('/assets/account/apot');
//行情
export const QUList = (p?:o) => get<IResponse>(`/quotation/list/${p ? p : ''}`);