import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../../../components/inner_nav/nav'
import store from "../../../../store";
import { upFooterStatus } from "../../../../store/app/action_creators";
import './index.scss'

const AnnDetail = (): ReactElement<ReactNode> => {
    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
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