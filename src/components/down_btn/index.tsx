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
            {(location.pathname === '/home' || location.pathname === '/quotes' || location.pathname === '/trade') && <div className="down-btn">
                <img src={require('../../assets/images/close_icon.png')} alt="" onClick={() => {
                    const action = setDownApp(2);
                    store.dispatch(action)
                }} />
                <img src={require('../../assets/images/down_fixed.png')} alt="" onClick={() => {
                    history.push('/download')
                }} />
            </div>}
        </div>
    )
};
export default DownBtn;