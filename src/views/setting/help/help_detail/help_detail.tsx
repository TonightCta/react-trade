import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import store from "../../../../store";
import { upFooterStatus } from "../../../../store/app/action_creators";
import './index.scss'


const HelpDetail = (): ReactElement<ReactNode> => {
    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="help-detail">
            <InnerNav leftArrow title="帮助详情" />
            <div className="help-con">
                帮助中心详情
            </div>
        </div>
    )
};

export default HelpDetail;