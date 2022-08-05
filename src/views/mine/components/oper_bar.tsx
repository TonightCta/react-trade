import { ReactElement, ReactNode } from "react";
import { List } from "antd-mobile";
import { CheckShieldOutline, FileOutline } from "antd-mobile-icons";
import { useHistory } from "react-router-dom";

const MineOperBar = () : ReactElement<ReactNode> => {
    const history = useHistory();
    return (
        <div className="mine-oper-bar">
            <List style={{"--font-size":"15px"}}>
                <List.Item prefix={<FileOutline />} onClick={() => {
                    history.push('/trade-order')
                }}>我的委托</List.Item>
                <List.Item prefix={<CheckShieldOutline />} onClick={() => {
                    history.push('/safe')
                }}>安全设置</List.Item>
            </List>
        </div>
    )
};

export default MineOperBar;