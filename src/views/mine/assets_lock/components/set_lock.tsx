import { ReactElement, ReactNode } from "react";
import { Button, Toast } from "antd-mobile";
import { useHistory } from "react-router-dom";

const SetLock = (): ReactElement<ReactNode> => {
    const history = useHistory();
    return (
        <div className="set-lock">
            <div className="form-item">
                <p>登录密码</p>
                <input type="text" placeholder="请输入登录密码" />
            </div>
            <div className="form-item">
                <p>交易密码</p>
                <input type="text" placeholder="请输入新的交易密码" />
            </div>
            <div className="form-item">
                <p>确认密码</p>
                <input type="text" placeholder="请再次输入新的交易密码" />
            </div>
            <Button color='primary' block onClick={() => {
                Toast.show('修改成功');
                history.goBack()
            }}>确认</Button>
        </div>
    )
};

export default SetLock;