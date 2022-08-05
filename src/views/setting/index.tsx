import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../components/inner_nav/nav';
import store from "../../store";
import { upFooterStatus } from "../../store/app/action_creators";
import { Button, List } from "antd-mobile";
import { useHistory } from "react-router-dom";
import './index.scss';

const setList = [
    {
        title: '语言设置',
        url: '/set-language'
    },
    {
        title: '意见反馈',
        url: '/feedback'
    },
    {
        title: '公告',
        url: '/ann'
    },
    {
        title: '帮助',
        url: '/help'
    },
    {
        title: '关于我们',
        url: '/about-us'
    },
]

const SetIndex = (): ReactElement<ReactNode> => {
    const history = useHistory();
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="set-index">
            <InnerNav leftArrow title="设置中心" />
            <div className="set-list">
                <List style={{'--border-top':'1px solid rgba(0,0,0,0)'}}>
                    {
                        setList.map((el, index): ReactElement => {
                            return (
                                <List.Item onClick={() => {
                                    history.push(el.url)
                                 }} key={index}>{el.title}</List.Item>
                            )
                        })
                    }
                </List>
            </div>
            <Button color="primary" block>退出登录</Button>
        </div>
    )
};

export default SetIndex;