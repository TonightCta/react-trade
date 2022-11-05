import { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import './index.scss';
import { CheckShieldOutline, CloseOutline, LockOutline, MailFill, MailOutline, PhonebookOutline, PhoneFill, RightOutline } from "antd-mobile-icons";
import { Button, Popup, Toast } from "antd-mobile";
import { useTranslation } from "react-i18next";
import { SendCodeApi, ForgetPassApi, CountryListApi } from '../../request/api';
import store from "../../store";

interface Props {
    from: string
}
interface InpMsg {
    email: string,
    code: string | number,
    newPass: string,
    repeatPass: string,
    phone: string | number,
    perfix: string,
}

const ForgetIndex = (props: Props): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    //区号列表
    const [countrySource, setCountrySource] = useState<any[]>([]);
    //选择区号
    const [selectPerfixBox, setSelectPerfix] = useState<boolean>(false);
    const [count, setCount] = useState<number>(60);
    const cbSaver: any = useRef();
    const timer = useRef<NodeJS.Timer>();
    const [loading, setLoading] = useState<boolean>(false);
    const [intWay, setIntWay] = useState<number>(1);
    const [inpMsg, setInpMsg] = useState<InpMsg>({
        email: '',
        code: '',
        newPass: '',
        repeatPass: '',
        phone: '',
        perfix: String(process.env.REACT_APP_AREA)
    });
    const getCountryList = async () => {
        const result = await CountryListApi();

        setCountrySource(result.data.list.filter((item: { reg_status: number; }) => {
            return item.reg_status === 1
        }));
    }
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
        getCountryList()
        return () => {
            clearInterval(timer.current);
            setCountrySource([]);
        }
    }, []);
    const history = useHistory();
    //发送验证码
    const sendCodeService = async () => {
        if (intWay === 1 && !inpMsg.email) {
            Toast.show(t('public.enter_email'));
            return;
        };
        if (intWay === 2 && !inpMsg.phone) {
            Toast.show(t('message.enter_phone'));
            return;
        };
        const params = {
            scene: 2,
            type: intWay === 1 ? 2 : 1,
            email: inpMsg.email,
            phone: inpMsg.phone,
            phone_prefix: inpMsg.perfix
        };
        const result = await SendCodeApi(params);
        const { code } = result;
        if (code !== 200) {
            Toast.show(result.message);
            return;
        };
        setInpMsg({
            ...inpMsg,
            code: result.data.code
        })
        Toast.show(t('message.send_code_success'));
        countDown();
    };
    const resetPassService = async () => {
        if (intWay === 1 && !inpMsg.email) {
            Toast.show(t('public.enter_email'));
            return;
        };
        if (intWay === 2 && !inpMsg.phone) {
            Toast.show(t('message.enter_phone'));
            return
        }
        if (!inpMsg.code) {
            Toast.show(t('public.enter_code'));
            return
        };
        if (!inpMsg.newPass) {
            Toast.show(t('public.enter_new_pass'));
            return;
        };
        if (inpMsg.newPass.length < 8) {
            Toast.show(t('public.last_8'));
            return;
        };
        if (!inpMsg.repeatPass) {
            Toast.show(t('public.type_turn'));
            return;
        };
        if (inpMsg.repeatPass !== inpMsg.newPass) {
            Toast.show(t('message.pass_faild'));
            return;
        };
        setLoading(true)
        const params = {
            type: intWay === 1 ? 2 : 1,
            email: inpMsg.email,
            phone: inpMsg.phone,
            phone_prefix: inpMsg.perfix,
            password: inpMsg.newPass,
            password_confirmation: inpMsg.repeatPass,
            code: inpMsg.code
        };
        const result = await ForgetPassApi(params);
        setLoading(false);
        const { code } = result;
        if (code !== 200) {
            Toast.show(result.message);
            return;
        };
        Toast.show(t('message.reset_success'));
        history.push('/login')
    };
    const LAND: string | undefined = process.env.REACT_APP_LAND
    return (
        <div className={`forget-pass ${LAND == '1' && 'fotget-pass-th' || LAND == '3' && 'fotget-pass-new' || ''}`}>
            <div className="int-bg-box"></div>
            <div className="up-bg-box">
                <div className="close-page">
                    <CloseOutline fontSize={24} color="#333" onClick={() => {
                        history.goBack()
                    }} />
                    <div className="language-box">
                        <NavLink to="/set-language"><img src={require(`../../assets/images/${store.getState().language}.png`)} alt="" /></NavLink>
                        <RightOutline fontSize={12} color="#5B646F" />
                    </div>
                </div>
                {/* 忘记密码 */}
                <div className="page-remark">
                    <img src={require(`../../assets/images/int_logo${LAND == '1' && '_th' || LAND == '3' && '_new' || ''}.png`)} alt="" />
                    <p>{t('public.forget')}</p>
                </div>
                <div className="register-way">
                    <ul>
                        <li className={`${intWay === 1 ? 'active-intway' : ''}`} onClick={() => { setIntWay(1) }}>
                            <span className="iconfont">
                                <MailFill />
                            </span>
                            {/* Mail */}
                            {t('public.mail')}
                        </li>
                        <li></li>
                        <li className={`${intWay === 2 ? 'active-intway' : ''}`} onClick={() => { setIntWay(2) }}>
                            <span className="iconfont">
                                <PhoneFill />
                            </span>
                            {/* Phone */}
                            {t('public.phone')}
                        </li>
                    </ul>
                </div>
                <div className="login-box">
                    <div className={`box-public ${intWay === 2 ? 'other-p-l' : ''}`}>
                        {/* 邮箱 */}
                        <p>{intWay === 1 ? t('public.email') : t('public.mobile_number')}</p>
                        {intWay === 1
                            ? <input type="text" value={inpMsg.email} onChange={(e) => {
                                setInpMsg({
                                    ...inpMsg,
                                    email: e.target.value
                                })
                            }} placeholder={t('public.enter_email')} />
                            :
                            <input type="number" value={inpMsg.phone} placeholder={t('public.enter_phone')} onChange={(e) => {
                                setInpMsg({
                                    ...inpMsg,
                                    phone: e.target.value
                                })
                            }} />
                        }
                        {/* 区号 */}
                        {
                            intWay === 2 && <div className="select-perfix" onClick={() => { setSelectPerfix(true) }}>
                                +{inpMsg.perfix}
                            </div>
                        }
                        <span>{intWay === 1 ? <MailOutline color="#999" fontSize={18} /> : <PhonebookOutline color="#999" fontSize={18} />}</span>
                    </div>
                    <div className="box-public">
                        {/* 邮箱验证码 */}
                        <p>{t('public.email_code')}</p>
                        <input type="text" value={inpMsg.code} onChange={(e) => {
                            setInpMsg({
                                ...inpMsg,
                                code: e.target.value
                            })
                        }} placeholder={t('public.enter_code')} />
                        <span><CheckShieldOutline color="#999" fontSize={18} /></span>
                        <p className={`send-code ${count === 60 ? '' : 'gra-btn'}`} onClick={count === 60 ? () => {
                            sendCodeService();
                        } : () => { }}>
                            {/* 发送验证码 */}
                            {count === 60 ? t('public.send_code') : `${count}s`}
                        </p>
                    </div>
                    <div className="box-public">
                        {/* 新密码 */}
                        <p>{t('public.new_pass')}</p>
                        <input type="password" value={inpMsg.newPass} onChange={(e) => {
                            setInpMsg({
                                ...inpMsg,
                                newPass: e.target.value
                            })
                        }} placeholder={t('public.enter_new_pass')} />
                        <span><LockOutline color="#999" fontSize={18} /></span>
                    </div>
                    <div className="box-public">
                        {/* 确认密码 */}
                        <p>{t('public.turn_pass')}</p>
                        <input type="password" value={inpMsg.repeatPass} onChange={(e) => {
                            setInpMsg({
                                ...inpMsg,
                                repeatPass: e.target.value
                            })
                        }} placeholder={t('public.type_turn')} />
                        <span><LockOutline color="#999" fontSize={18} /></span>
                    </div>
                    <p className="login-btn">
                        {/* 重置密码 */}
                        <Button loading={loading} disabled={loading} color="primary" block onClick={() => { resetPassService() }}>{t('public.reset_pass')}</Button>
                    </p>
                </div>
            </div>
            {/* 选择区号 */}
            <Popup visible={selectPerfixBox} bodyStyle={{ height: '70vh' }} onMaskClick={() => { setSelectPerfix(false) }}>
                <div className="select-area-code">
                    <div className="select-title" onClick={() => { setSelectPerfix(false) }}>
                        <p>
                            {/* Select area code */}
                            {t('public.select_code')}
                        </p>
                        <CloseOutline fontSize={16} />
                    </div>
                    {/* <div className="search-code">
                        <span><SearchOutline fontSize={16} color="#999" /></span>
                        <input type="number" placeholder="Search" />
                    </div> */}
                    <div className="code-list">
                        <ul>
                            {
                                countrySource.map((item, index): ReactElement => {
                                    return (
                                        <li key={index} className={`${inpMsg.perfix == item.prefix ? 'active-area' : ''}`} onClick={() => {
                                            setInpMsg({
                                                ...inpMsg,
                                                perfix: item.prefix
                                            });
                                            setSelectPerfix(false)
                                        }}>
                                            <div className="country-msg">
                                                <div className="country-logo">
                                                    {/* item.logo ? item.logo : require('../../assets/images/a.png') */}
                                                    <img src={item.logo} alt="" />
                                                </div>
                                                <p>
                                                    {item.country}
                                                </p>
                                            </div>
                                            <div className="code-text">
                                                <p>+{item.prefix}</p>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </Popup>
        </div>
    )
};

export default ForgetIndex;