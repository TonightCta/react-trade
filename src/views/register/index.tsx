import { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import store from "../../store";
import { upFooterStatus } from "../../store/app/action_creators";
import { NavLink, useHistory } from "react-router-dom";
import './index.scss';
import { CheckShieldOutline, CloseOutline, DownOutline, LockOutline, MailOutline } from "antd-mobile-icons";
import { Button, PickerView, Popup, Toast } from "antd-mobile";
import { useTranslation } from 'react-i18next';
import { SendCodeApi, RegisterApi, CountryListApi } from '../../request/api';
import { GetUrlKey } from "../../utils";

interface Props {
    from: string
}
interface InpMsg {
    email: string,
    code: string | number,
    password: string,
}
let columns: any[][];
let defaultCountry: any;
let country: any[] = [];
CountryListApi().then(res => {
    defaultCountry = res.data.list[0].country;
    const arr: any[] = [];
    country = res.data.list;
    res.data.list.forEach((e: any) => {
        arr.push(e.country);
    });
    columns = [[...arr]]
});

const getCountryCode = (_country: string): string => {
    let code: string = '';
    country.forEach((e) => {
        if (_country === e.country) {
            code = e.country_iso;
        }
    })
    return code
}

// const columns = [['Singapore', 'Malaysia', 'Bahasa Indonesia', 'हिन्दी', 'เมืองไทย', 'Tiếng Vi', 'Tagalog']]

const RegisterIndex = (props: Props): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [count, setCount] = useState<number>(60);
    const [inpMsg, setInpMsg] = useState<InpMsg>({
        email: '',
        code: '',
        password: ''
    })
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
    const [country, setCountry] = useState<any[]>([defaultCountry]);
    const [selectCountry, setSelectCountry] = useState<string>('');
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
    }, []);

    const [selectCountryBox, setSelectCountryBox] = useState<boolean>(false);
    return (
        <div className="register-index">
            <div className="close-page">
                <CloseOutline fontSize={24} color="#333" onClick={() => {
                    history.goBack()
                }} />
                <NavLink to="/set-language"><img src={require('../../assets/images/language_icon.png')} alt="" /></NavLink>
            </div>
            <p className="page-remark">
                {/* 注册80年代 */}
                {t('public.regis_welcome')}
            </p>
            <div className="login-box">
                <div className="box-public select-country">
                    <p>
                        {/* 邮箱 */}
                        {t('public.country')}
                    </p>
                    <input type="text" value={selectCountry} onChange={() => { }} placeholder={t('public.type_country')} />
                    <p className="mask-select" onClick={() => { setSelectCountryBox(true) }}></p>
                    <span><DownOutline fontSize={18} color="#999" /></span>
                </div>
                <div className="box-public">
                    <p>
                        {/* 邮箱 */}
                        {t('public.email')}
                    </p>
                    <input type="text" value={inpMsg.email} onChange={(e) => {
                        setInpMsg({
                            ...inpMsg,
                            email: e.target.value
                        })
                    }} placeholder={t('public.enter_email')} />
                    <span><MailOutline color="#999" fontSize={18} /></span>
                </div>
                <div className="box-public">
                    <p>
                        {/* 邮箱验证码 */}
                        {t('public.email_code')}
                    </p>
                    <input type="text" value={inpMsg.code} onChange={(e) => {
                        setInpMsg({
                            ...inpMsg,
                            code: e.target.value
                        })
                    }} placeholder={t('public.enter_code')} />
                    <span><CheckShieldOutline color="#999" fontSize={18} /></span>
                    <p className={`send-code ${count === 60 ? '' : 'gra-btn'}`} onClick={count === 60 ? async () => {
                        if (!inpMsg.email) {
                            Toast.show(t('public.enter_email'));
                            return;
                        };
                        const result = await SendCodeApi({ email: inpMsg.email, scene: 1, type: 2 });
                        const { code } = result;
                        if (code !== 200) {
                            Toast.show(result.message);
                            return;
                        };
                        Toast.show(t('message.send_code_success'));
                        setInpMsg({
                            ...inpMsg,
                            code: result.data.code
                        })
                        countDown()
                    } : () => { }}>
                        {count === 60 ? t('public.send_code') : `${count}s${t('public.send_code')}`}
                    </p>
                </div>
                <div className="box-public">
                    <p>
                        {/* 登录密码 */}
                        {t('public.login_pass')}
                    </p>
                    <input type="password" value={inpMsg.password} onChange={(e) => {
                        setInpMsg({
                            ...inpMsg,
                            password: e.target.value
                        })
                    }} placeholder={t('public.enter_pass')} />
                    <span><LockOutline color="#999" fontSize={18} /></span>
                </div>
                <p className="login-btn">
                    <Button color="primary" block onClick={async () => {
                        if (!getCountryCode(selectCountry)) {
                            //请选择国家地区
                            Toast.show(t('message.type_country'));
                            return
                        }
                        if (!inpMsg.email) {
                            Toast.show(t('public.enter_email'));
                            return;
                        }
                        if (!inpMsg.code) {
                            Toast.show(t('public.enter_code'));
                            return;
                        }
                        if (!inpMsg.password) {
                            Toast.show(t('public.enter_pass'));
                            return;
                        };
                        if (inpMsg.password.length < 8) {
                            Toast.show(t('public.last_8'));
                            return;
                        };
                        const params = {
                            type: 2,
                            email: inpMsg.email,
                            password: inpMsg.password,
                            password_confirmation: inpMsg.password,
                            code: inpMsg.code,
                            country: getCountryCode(selectCountry),
                            invite_code: GetUrlKey('code', window.location.href) || null
                        };
                        const result = await RegisterApi(params);
                        const { code } = result;
                        if (code !== 200) {
                            Toast.show(result.message);
                            return;
                        };
                        Toast.show(t('message.regis_success'));
                        history.push('/login')
                    }}>
                        {/* 立即注册 */}
                        {t('public.regis_now')}
                    </Button>
                </p>
            </div>
            {/* 选择国家地区 */}
            <Popup visible={selectCountryBox} onMaskClick={() => {
                setSelectCountryBox(false)
            }}>
                <div className="select-country-popup">
                    <p onClick={() => { setSelectCountryBox(false) }}>
                        <CloseOutline color="#666" />
                    </p>
                    <PickerView value={country} onChange={(e) => {
                        setCountry(e);
                    }} columns={columns} />
                    <div>
                        <Button color="primary" block onClick={() => {
                            setSelectCountry(country[0])
                            setSelectCountryBox(false);
                        }}>
                            {t('public.confirm')}
                        </Button>
                    </div>
                </div>
            </Popup>
        </div>
    )
};

export default RegisterIndex;