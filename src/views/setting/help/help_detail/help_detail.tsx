import { ReactElement, ReactNode } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import './index.scss'


const HelpDetail = (): ReactElement<ReactNode> => {
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