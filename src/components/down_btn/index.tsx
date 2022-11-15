import { ReactElement, ReactNode } from "react";
import './index.scss'
import store from "../../store";
import { setDownApp } from "../../store/app/action_creators";
import { useHistory, useLocation } from "react-router-dom";

const DownBtn = (): ReactElement<ReactNode> => {
    const history = useHistory();
    const location = useLocation();
    const LAND : string | undefined = process.env.REACT_APP_LAND;
    return (
        <div className={`${LAND == '4' ? 'asx-down' : ''}`}>
            {(location.pathname === '/home' || location.pathname === '/quotes' || location.pathname === '/trade') && <div className={`down-btn ${LAND == '3' ? 'without-left' : ''}`}>
                <img src={require(`../../assets/images/close_icon${LAND == '1' && '_th' || LAND == '3' && '_new' || LAND == '4' && '_asx' || ''}.png`)} alt="" onClick={() => {
                    const action = setDownApp(2);
                    store.dispatch(action)
                }} />
                <img src={require(`../../assets/images/down_fixed${LAND == '1' && '_th' || LAND == '3' && '_new' || LAND == '4' && '_asx' || ''}.png`)} alt="" onClick={() => {
                    history.push(`/${LAND == '1' && 'download' || LAND == '3' && 'download-new' || LAND == '4' && 'download-asx' || 'download-en'}`)
                }} />
            </div>}
        </div>
    )
};
export default DownBtn;