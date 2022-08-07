import { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import store from "../../store";
import { upFooterStatus } from "../../store/app/action_creators";
import { useHistory } from "react-router-dom";
import './index.scss';
import { CheckShieldOutline, CloseOutline, LockOutline, MailOutline } from "antd-mobile-icons";
import { Button } from "antd-mobile";
interface Props {
    from: string
}

const ForgetIndex = (props: Props): ReactElement<ReactNode> => {
    const [count, setCount] = useState<number>(60);
    const cbSaver: any = useRef();
    const timer = useRef<NodeJS.Timer>();
    cbSaver.current = () => {
        setCount(count - 1);
    };
    const countDown = useCallback((): void => {
        timer.current = setInterval(() => {
            cbSaver.current();
        }, 1000);
    }, []);

    useEffect(() => {
        if (count < 0) {
            clearInterval(timer.current);
            setCount(60)
        };
    }, [count]);

    useEffect(() => {
        return () => {
            clearInterval(timer.current);
        }
    }, []);
    const history = useHistory();
    useEffect((): void => {
        const aciton = upFooterStatus(0);
        store.dispatch(aciton);
    }, [])
    return (
        <div className="forget-pass">
            <div className="close-page">
                <CloseOutline fontSize={24} color="#333" onClick={() => {
                    history.goBack()
                }} />
                <img src={require('../../assets/images/language_icon.png')} alt="" />
            </div>
            <p className="page-remark">忘记密码</p>
            <div className="login-box">
                <div className="box-public">
                    <p>邮箱</p>
                    <input type="text" placeholder="请输入邮箱地址" />
                    <span><MailOutline color="#999" fontSize={18} /></span>
                </div>
                <div className="box-public">
                    <p>邮箱验证码</p>
                    <input type="text" placeholder="请输入邮箱验证码" />
                    <span><CheckShieldOutline color="#999" fontSize={18} /></span>
                    <p className={`send-code ${count === 60 ? '' : 'gra-btn'}`} onClick={count === 60 ? () => {
                        countDown()
                    } : () => { }}>
                        {count === 60 ? '发送验证码' : `${count}s后重发`}
                    </p>
                </div>
                <div className="box-public">
                    <p>新密码</p>
                    <input type="password" placeholder="请输入新密码" />
                    <span><LockOutline color="#999" fontSize={18} /></span>
                </div>
                <div className="box-public">
                    <p>确认密码</p>
                    <input type="password" placeholder="请再次输入新密码" />
                    <span><LockOutline color="#999" fontSize={18} /></span>
                </div>
                <p className="login-btn">
                    <Button color="primary" block>重置密码</Button>
                </p>
            </div>
        </div>
    )
};

export default ForgetIndex;