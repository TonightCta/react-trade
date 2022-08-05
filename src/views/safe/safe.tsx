import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../components/inner_nav/nav';
import store from "../../store";
import { upFooterStatus } from "../../store/app/action_creators";
import { List } from "antd-mobile";
import './index.scss'
import { CheckShieldFill } from "antd-mobile-icons";
import { useHistory } from "react-router-dom";

const safeList = [
    {
        title: '实名认证',
        url: '/auth-card'
    },
    {
        title: '修改登录密码',
        url: '/set-pass'
    },
    {
        title: '资金密码',
        url: '/assets-lock'
    }
]

const SafeIndex = (): ReactElement<ReactNode> => {
    const history = useHistory();
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="safe-index">
            <InnerNav leftArrow title="安全中心" />
            <div className="need-auth">
                <CheckShieldFill />
                <span>为了保障您的资金安全,请完成实名认证后方可进行交易</span>
            </div>
            <div className="safe-list">
                <List style={{ '--border-top': '1px solid rgba(0,0,0,0)' }}>
                    {
                        safeList.map((el, index): ReactElement => {
                            return (
                                <List.Item onClick={() => { 
                                    history.push(el.url)
                                 }} key={index}>{el.title}</List.Item>
                            )
                        })
                    }
                </List>
            </div>
        </div>
    )
};

export default SafeIndex;