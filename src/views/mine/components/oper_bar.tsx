import { ReactElement, ReactNode } from "react";
import { List } from "antd-mobile";
import { CheckShieldOutline, FileOutline } from "antd-mobile-icons";

const MineOperBar = () : ReactElement<ReactNode> => {
    return (
        <div className="mine-oper-bar">
            <List style={{"--font-size":"15px"}}>
                <List.Item prefix={<FileOutline />} onClick={() => {}}>我的委托</List.Item>
                <List.Item prefix={<CheckShieldOutline />} onClick={() => {}}>安全设置</List.Item>
            </List>
        </div>
    )
};

export default MineOperBar;