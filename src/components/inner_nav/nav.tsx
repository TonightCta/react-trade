import { LeftOutline, SearchOutline, SendOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode } from "react";
import { useHistory, RouteComponentProps, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './nav.scss'

interface Props extends RouteComponentProps {
    title?: string,
    leftArrow?: boolean,
    share?: boolean,
    withBorder?: boolean,
    search?: boolean,
    backMine?: boolean,
    getSearchVal?: (val: string) => void;
    owneMine?: boolean,
    owneAmount?: number
}

const InnerNav = (props: Props): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    return (
        <div className={`inner-nav ${props.withBorder ? 'with-border-nav' : ''} ${props.owneMine ? 'show-owne' : ''}`}>
            <div className="left-arrow">
                {props.leftArrow && <LeftOutline fontSize={16} onClick={() => {
                    history.goBack()
                }} />}
                {props.backMine && <LeftOutline fontSize={16} onClick={() => {
                    history.push('/mine')
                }} />}
            </div>
            <div className="nav-title">
                {props.title}
                {props.owneMine && <div className="owne-msg">
                    <img src={require('../../assets/images/arrow_top.png')} alt="" />
                    <p>{t('public.experience')}&nbsp;{Number(props.owneAmount).toFixed(6)}&nbsp;USDT</p>
                </div>}
            </div>
            <div className="right-oper">
                {props.share && <SendOutline fontSize={16} />}
                {props.search && <div className="search-inp"><input placeholder={t('public.coin')} onChange={(e) => {
                    props.getSearchVal && props.getSearchVal(e.target.value)
                }} /><span><SearchOutline fontSize={16} /></span></div>}
            </div>
        </div>
    )
};

export default withRouter(InnerNav);