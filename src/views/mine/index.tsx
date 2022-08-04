import React,{ ReactNode } from "react";
import MineAssetsManage from "./components/assets_manage";
import MineInvMsg from "./components/inv_msg";
import MineNav from "./components/nav_mine";
import MineOperBar from "./components/oper_bar";
import './index.scss'

const MineIndex = () : React.ReactElement<ReactNode> => {
    return (
        <div className="mine-index">
            {/* 头部信息 */}
            <MineNav/>
            {/* 资产管理 */}
            <MineAssetsManage/>
            {/* 我的邀请 */}
            <MineInvMsg/>
            {/* 更多操作 */}
            <MineOperBar/>
        </div>
    )
};

export default MineIndex;