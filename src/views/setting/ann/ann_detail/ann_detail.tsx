import { ReactElement, ReactNode } from "react";
import InnerNav from '../../../../components/inner_nav/nav'
import './index.scss'

const AnnDetail = (): ReactElement<ReactNode> => {
    return (
        <div className="ann-detail">
            <InnerNav leftArrow title="公告详情" />
            <div className="detail-box">
                公告详细信息
            </div>
        </div>
    )
};

export default AnnDetail;