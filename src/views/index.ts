import HomeIndex from "./home";
import QuotesIndex from './quotes';
import TradeIndex from "./trade";
import MineIndex from "./mine";
import TradeOrder from "./order/order";
import AssetsBill from "./mine/assets_bill/assets_bill";
import MineAssets from "./mine/mine_assets/mine_assets";
import AssetsLock from "./mine/assets_lock/assets_lock";
import LoginIndex from "./login";
import InvDetail from "./mine/inv_detail/inv_detail";
import SetIndex from "./setting";
import SafeIndex from "./safe/safe";
import TesDetail from "./quotes/tes_detail/tes_detail";
import AuthCard from "./safe/auth_card/auth_card";
import SetPass from "./safe/set_pass/set_pass";
import About from "./setting/about/about";
import Ann from "./setting/ann/ann";
import FeedBack from "./setting/feedback/feedback";
import Help from "./setting/help/help";
import SetLanguage from "./setting/set_language/set_language";
import RegisterIndex from "./register/index";
import ForgetIndex from "./forget";
import AnnDetail from "./setting/ann/ann_detail/ann_detail";
import HelpDetail from "./setting/help/help_detail/help_detail";
import WithdrawIndex from "./mine/mine_assets/withdraw/withdraw";
import RechargeIndex from "./mine/mine_assets/recharge/recharge";


export {
    LoginIndex,//登陆
    HomeIndex,//首页
    QuotesIndex,//行情
    TesDetail,//行情详情
    TradeIndex,//交易
    MineIndex,//我的
    TradeOrder,//订单
    AssetsBill,//资金流水
    MineAssets,//我的资产
    AssetsLock,//资金密码
    InvDetail,//邀请详情
    SetIndex,//设置中心
    SafeIndex,//安全中心
    AuthCard,//实名认证
    SetPass,//设置登录密码
    About,//关于我们
    Ann,//公告中心
    FeedBack,//意见反馈
    Help,//帮助中心
    SetLanguage,//语言设置
    RegisterIndex,//注册
    ForgetIndex,//忘记密码
    AnnDetail,//公告详情
    HelpDetail,//帮助中心详情
    WithdrawIndex,//提币
    RechargeIndex,//充币
}