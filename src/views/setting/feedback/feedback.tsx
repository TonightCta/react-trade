import { ReactElement, ReactNode, useEffect } from "react";
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import InnerNav from '../../../components/inner_nav/nav'
import './index.scss'
import { Button } from "antd-mobile";


const FeedBack = (): ReactElement<ReactNode> => {
    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action);
    }, [])
    return (
        <div className="feed-back">
            <InnerNav leftArrow title="意见反馈" />
            <img src={require('../../../assets/images/test.png')} alt="" />
            <p>反馈内容</p>
            <textarea placeholder="欢迎您给我们提出产品的使用感受和建议，我们将尽快处理您提交的宝贵意见，感谢您的支持！"></textarea>
            <p>
                <Button color="primary" block>提交</Button>
            </p>
        </div>
    )
};

export default FeedBack;