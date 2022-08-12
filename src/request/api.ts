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
export const UserAssetsApi = () => get<IResponse>('/assets/account/spot');
//行情
export const QUList = (p?: o) => get<IResponse>(`/quotation/list/${p ? p : ''}`);
//币种列表
export const CoinsListApi = () => get<IResponse>('/assets/coins');
//充值地址
export const RechargeAddressApi = (p: { coin: string, protocol: string }) => get<IResponse>(`/assets/address/${p.coin}/${p.protocol}`);
//交易密码
export const TradePassApi = (p: o) => post<IResponse>('/security/changePayPassword', p);
//重置登录密码
export const ResetPassApi = (p: o) => post<IResponse>('/security/changePassword', p);
//币币交易
export const PlaceCoinOrderApi = (p:o) => post<IResponse>("/spot/order/place",p);
//订单列表
export const OderListApi = (p:o) => post<IResponse>("/order/spot/list",p);
//取消委托
export const CancelOrderApi = (p:string) => get<IResponse>(`/spot/order/cancel/${p}`)