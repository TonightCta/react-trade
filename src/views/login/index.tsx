import { ReactElement, ReactNode, useEffect } from "react";
import store from "../../store";
import { upFooterStatus } from "../../store/app/action_creators";
import { useHistory } from "react-router-dom";
import './index.scss';
import { CloseOutline, LockOutline, MailOutline } from "antd-mobile-icons";
import { Button } from "antd-mobile";
interface Props {
    from: string
}

const LoginIndex = (props: Props): ReactElement<ReactNode> => {
    const history = useHistory();
    useEffect((): void => {
        const aciton = upFooterStatus(0);
        store.dispatch(aciton);
        console.log(props)
    }, [])
    return (
        <div className="login-index">
            <div className="close-page">
                <CloseOutline fontSize={24} color="#333" onClick={() => {
                    history.goBack()
                }} />
                <img src={require('../../assets/images/language_icon.png')} alt="" />
            </div>
            <p className="page-remark">欢迎来到80年代</p>
            <div className="login-box">
                <div className="box-public">
                    <p>邮箱</p>
                    <input type="text" placeholder="请输入邮箱地址" />
                    <span><MailOutline color="#999" fontSize={18} /></span>
                </div>
                <div className="box-public">
                    <p>登录密码</p>
                    <input type="password" placeholder="请输入登录密码" />
                    <span><LockOutline color="#999" fontSize={18} /></span>
                </div>
                <p className="login-btn">
                    <Button color="primary" block>登录</Button>
                </p>
                <p className="register-btn">
                    <span onClick={() => {history.push('/register')}}>立即注册</span>
                    <span onClick={() => {history.push('/forget')}}>忘记密码？</span>
                </p>
            </div>
        </div>
    )
};

export default LoginIndex;