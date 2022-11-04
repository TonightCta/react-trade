import { ReactElement, ReactNode } from "react";
import './index.scss'
import store from "../../store";
import { setDownApp } from "../../store/app/action_creators";
import { useHistory, useLocation } from "react-router-dom";

const DownBtn = (): ReactElement<ReactNode> => {
    const history = useHistory();
    const location = useLocation();
    return (
        <div>
            {(location.pathname === '/home' || location.pathname === '/quotes' || location.pathname === '/trade') && <div className={`down-btn ${process.env.REACT_APP_LAND == '3' ? 'without-left' : ''}`}>
                <img src={require(`../../assets/images/close_icon${process.env.REACT_APP_LAND == '1' && '_th' || process.env.REACT_APP_LAND == '3' && '_new' || ''}.png`)} alt="" onClick={() => {
                    const action = setDownApp(2);
                    store.dispatch(action)
                }} />
                <img src={require(`../../assets/images/down_fixed${process.env.REACT_APP_LAND == '1' && '_th' || process.env.REACT_APP_LAND == '3' && '_new' || ''}.png`)} alt="" onClick={() => {
                    history.push(`/${process.env.REACT_APP_AREA === '63' ? 'download-en' : 'download'}`)
                }} />
            </div>}
        </div>
    )
};
export default DownBtn;