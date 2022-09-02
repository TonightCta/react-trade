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
export const RechargeAddressApi = (p: { coin: string | null, protocol: string | null }) => get<IResponse>(`/assets/address/${p.coin}/${p.protocol}`);
//交易密码
export const TradePassApi = (p: o) => post<IResponse>('/security/changePayPassword', p);
//重置登录密码
export const ResetPassApi = (p: o) => post<IResponse>('/security/changePassword', p);
//币币交易
export const PlaceCoinOrderApi = (p: o) => post<IResponse>("/spot/order/place", p);
//订单列表
export const OderListApi = (p: o) => post<IResponse>("/order/spot/list", p);
//取消委托
export const CancelOrderApi = (p: string) => get<IResponse>(`/spot/order/cancel/${p}`);
//实名认证
export const AuthCardApi = (p: o) => post<IResponse>('/security/bindKyc', p);
//公告列表
export const AdvListApi = (p?: number) => get<IResponse>(`/cms/noticesList/${p}`);
//公告详情
export const AdvDetailApi = (p: number) => get<IResponse>(`/cms/notices/${p}`);
//资产流水
export const AssetsBillApi = (p: o) => post<IResponse>('/assets/account/list/spot', p);
//地区支持列表
export const CountryListApi = () => get<IResponse>('/user/country');
//邀请信息
export const InvInfoApi = () => get<IResponse>('/user/inviteInfo');
//意见反馈
export const FeedBackApi = (p: o) => post<IResponse>('/user/feedback', p);
//帮助中心
export const HelpListApi = () => get<IResponse>('/cms/help');
//帮助详情
export const HelpDetailApi = (p: number) => get<IResponse>(`/cms/article/${p}`);
//提币发起
export const WithDrawApi = (p: o) => post<IResponse>('/assets/withdraw', p);
//获取广告图
export const BannerListApi = () => get<IResponse>('/cms/banner');
//添加自选
export const AddOptionalApi = (p: o) => post<IResponse>('/quotation/collect', p);
//地址列表
export const AddressListApi = (p:o) => post<IResponse>('/assets/book/list',p);
//新增地址
export const AddAddressApi = (p:o) => post<IResponse>('/assets/book/create',p);
//删除地址
export const RemoveAddressApi = (p:string | number) => get<IResponse>(`/assets/book/delete/${p}`);
//上传头像
export const UpAvatarApi = (p:o) => post<IResponse>('/user/avatar',p);
//获取协议
export const GetSlugApi = (p:string) => get<IResponse>(`/cms/article/slug/${p}`);
//邀请排行
export const RankInviteApi = () => get<IResponse>(`/user/inviteRank`);
//邀请信息
export const InviteNumberApi = (p:number | string) => get<IResponse>(`/user/inviteUsersByLevel/${p}`);
//法币充值渠道
export const RechargeFaitListApi = () => get<IResponse>('rechargeBegin');
//法币充值
export const RechargePayApi = (p:o) => post<IResponse>('/putInInOnlineOrder',p);
//提币渠道
export const WithdrawNetApi = () => get<IResponse>('/withdrawBegin');
//提币啊
export const WithdrawApiNew = (p:o) => post<IResponse>('/putInWithdraw',p);
