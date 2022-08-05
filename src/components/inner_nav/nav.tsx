import { LeftOutline, SearchOutline, SendOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode } from "react";
import { useHistory, RouteComponentProps, withRouter } from "react-router-dom";
import './nav.scss'

interface Props extends RouteComponentProps {
    title?: string,
    leftArrow?: boolean,
    share?: boolean,
    withBorder?:boolean,
    search?:boolean,
}

const InnerNav = (props: Props): ReactElement<ReactNode> => {
    const history = useHistory();
    return (
        <div className={`inner-nav ${props.withBorder ? 'with-border-nav' : ''}`}>
            <div className="left-arrow">
                {props.leftArrow && <LeftOutline fontSize={16} onClick={() => {
                    history.goBack()
                }} />}
            </div>
            <div className="nav-title">{props.title}</div>
            <div className="right-oper">
                {props.share && <SendOutline fontSize={16} />}
                {props.search && <SearchOutline fontSize={16} />}
            </div>
        </div>
    )
};

export default withRouter(InnerNav);