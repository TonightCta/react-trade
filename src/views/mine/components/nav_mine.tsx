import { SetOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode } from "react";
import { useHistory } from "react-router-dom";


const MineNav = (): ReactElement<ReactNode> => {
    const history = useHistory();
    return (
        <div className="mine-nav">
            <div className="nav-msg">
                <p>我的</p>
                <SetOutline fontSize={28} color="#333" onClick={() => {
                    history.push('/setting')
                }} />
            </div>
            <div className="account-box" onClick={() => {
                history.push('/login')
            }}>
                <p>欢迎来到80年代</p>
                <p>点击登录</p>
            </div>
        </div>
    )
};

export default MineNav;