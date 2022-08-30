import { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import './index.scss';
import { CheckShieldOutline, CloseOutline, DownOutline, LinkOutline, LockOutline, MailOutline } from "antd-mobile-icons";
import { Button, PickerView, Popup, Toast } from "antd-mobile";
import { useTranslation } from 'react-i18next';
import { SendCodeApi, RegisterApi, CountryListApi, GetSlugApi } from '../../request/api';
import { GetUrlKey } from "../../utils";

interface Props {
    from: string
}
interface InpMsg {
    email: string,
    code: string | number,
    password: string,
    invite_code: any,
}


// const columns = [['Singapore', 'Malaysia', 'Bahasa Indonesia', 'हिन्दी', 'เมืองไทย', 'Tiếng Vi', 'Tagalog']]

const RegisterIndex = (props: Props): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [count, setCount] = useState<number>(60);
    const [inpMsg, setInpMsg] = useState<InpMsg>({
        email: '',
        code: '',
        password: '',
        invite_code: ''
    });
    const [columns, setColumns] = useState<any[][]>([]);
    // const defaultCountry = localStorage.getItem('country') || 'South Africa';
    const [countrySource, setCountrySource] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [country, setCountry] = useState<any[]>([]);
    const disableInvite = useRef<boolean>(false)
    const getCountryList = async () => {
        const result = await CountryListApi();
        const arr: any[] = [];
        setCountrySource(result.data.list);
        console.log(result)
        result.data.list.forEach((e: any) => {
            arr.push(e.country);
        });
        // const index = arr.indexOf(defaultCountry);
        // index > -1 && arr.splice(index, 1)
        // arr.unshift(localStorage.getItem('country') || 'South Africa')
        setColumns([[...arr]]);
        setCountry([result.data.list[0].country])
    }
    const getCountryCode = (_country: string): string => {
        let code: string = '';
        countrySource.forEach((e) => {
            if (_country === e.country) {
                code = e.country_iso;
            }
        })
        return code
    }
    const cbSaver: any = useRef();
    const timer = useRef<NodeJS.Timer>();
    const [slug, setSlug] = useState<string>('');
    const getSlug = async () => {
        const result = await GetSlugApi('REGISTER_RULE');
        setSlug(result.data.content);
    }
    cbSaver.current = () => {
        setCount(count - 1);
    };
    const countDown = useCallback((): void => {
        timer.current = setInterval(() => {
            cbSaver.current();
        }, 1000);
    }, []);
    const [selectCountry, setSelectCountry] = useState<string>('');
    useEffect(() => {
        if (count < 0) {
            clearInterval(timer.current);
            setCount(60)
        };
    }, [count]);
    useEffect(() => {
        getSlug();
        getCountryList();
        if (GetUrlKey('code', window.location.href)) {
            setInpMsg({
                ...inpMsg,
                invite_code: GetUrlKey('code', window.location.href)
            });
            disableInvite.current = true;
        }
        return () => {
            setSlug('');
            clearInterval(timer.current);
            setCountrySource([]);
            setColumns([]);
        }
    }, []);

    const history = useHistory();

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
                        {/* 国家地区 */}
                        {t('public.country')}
                    </p>
                    <input type="text" value={selectCountry} onChange={() => { }} placeholder={t('public.type_country')} />
                    <p className="mask-select" onClick={() => { setSelectCountryBox(true) }}></p>
                    <span><DownOutline fontSize={18} color="#999" /></span>
                </div>
                <div className="box-public">
                    <p>
                        {/* 邀请码 */}
                        {t('invite.code')}
                    </p>
                    <input type="text" disabled={disableInvite.current} value={inpMsg.invite_code} onChange={(e) => {
                        setInpMsg({
                            ...inpMsg,
                            invite_code: e.target.value
                        })
                    }} placeholder={t('invite.enter_code')} />
                    <span><LinkOutline color="#999" fontSize={18} /></span>
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
                        {count === 60 ? t('public.send_code') : `${count}s`}
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
                    <Button loading={loading} disabled={loading} color="primary" block onClick={async () => {
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
                        setLoading(true)
                        const params = {
                            type: 2,
                            email: inpMsg.email,
                            password: inpMsg.password,
                            password_confirmation: inpMsg.password,
                            code: inpMsg.code,
                            country: getCountryCode(selectCountry),
                            invite_code: GetUrlKey('code', window.location.href) || null,
                            channel_id:GetUrlKey('ch', window.location.href) || null,
                            source:GetUrlKey('s', window.location.href) || null,
                            link_id:GetUrlKey('cl', window.location.href) || null
                        };
                        const result = await RegisterApi(params);
                        setLoading(false)
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
                <div className="register-remark">
                    <div style={{ lineHeight: '22px' }} dangerouslySetInnerHTML={{ __html: slug }}></div>
                </div>
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