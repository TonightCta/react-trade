import { ReactElement, ReactNode } from "react";
import { useHistory } from "react-router-dom";


const HomeHelp = (): ReactElement<ReactNode> => {
    const history = useHistory();
    return (
        <div className="home-help">
            <div className="help-public" onClick={() => {
                history.push('/help')
            }}>
                <img src={require('../../../assets/images/home_icon_5.png')} alt="" />
                <div className="public-title">
                    <p>帮助</p>
                    <p>问题/指南/资料</p>
                </div>
            </div>
            <p className="label-line"></p>
            <div className="help-public" onClick={() => {
                history.push('/ann')
            }}>
                <img src={require('../../../assets/images/home_icon_6.png')} alt="" />
                <div className="public-title">
                    <p>公告</p>
                    <p>新闻/活动/资讯</p>
                </div>
            </div>
        </div>
    )
};

export default HomeHelp;