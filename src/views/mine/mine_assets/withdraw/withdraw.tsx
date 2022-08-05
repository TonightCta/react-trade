import { ReactElement, ReactNode } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import './index.scss'

const WithdrawIndex = (): ReactElement<ReactNode> => {
    return (
        <div className="with-draw">
            <InnerNav leftArrow title="提币" />
        </div>
    )
};

export default WithdrawIndex;