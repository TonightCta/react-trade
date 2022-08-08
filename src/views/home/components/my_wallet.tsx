import { ReactElement, ReactNode } from "react";
import { useHistory } from "react-router-dom";

const HomeAssets = () : ReactElement<ReactNode> => {
    const history = useHistory();
    return(
        <div className="home-assets" onClick={() => {
            history.push('/mine-assets')
        }}>
            <img src={require('../../../assets/images/home_icon_4.png')} alt="" />
            <div className="assets-msg">
                <p>我的资产</p>
                <p>总资产约(折合USDT)</p>
                <p>0.00</p>
            </div>
        </div>
    )
};

export default HomeAssets;