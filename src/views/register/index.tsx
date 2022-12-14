import { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import './index.scss';
import { CheckShieldOutline, CloseOutline, DownOutline, LinkOutline, LockOutline, MailFill, MailOutline, PhonebookOutline, PhoneFill, RightOutline, SearchOutline } from "antd-mobile-icons";
import { Button, Checkbox, Popup, Toast } from "antd-mobile";
import { useTranslation } from 'react-i18next';
import { SendCodeApi, RegisterApi, CountryListApi, GetSlugApi } from '../../request/api';
import { GetUrlKey } from "../../utils";
import store from "../../store";

interface Props {
    from: string
}
interface InpMsg {
    email: string,
    code: string | number,
    password: string,
    invite_code: any,
    phone: number | string,
    perfix: number | string,
    iso: string,
    country: string
}


// const columns = [['Singapore', 'Malaysia', 'Bahasa Indonesia', 'हिन्दी', 'เมืองไทย', 'Tiếng Vi', 'Tagalog']]

const RegisterIndex = (props: Props): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [count, setCount] = useState<number>(60);
    const [inpMsg, setInpMsg] = useState<InpMsg>({
        email: '',
        code: '',
        password: '',
        invite_code: '',
        phone: '',
        perfix: String(process.env.REACT_APP_AREA),
        iso: '',
        country: '',
    });
    const [columns, setColumns] = useState<any[]>([]);
    // const defaultCountry = localStorage.getItem('country') || 'South Africa';
    const [countrySource, setCountrySource] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const disableInvite = useRef<boolean>(false);
    //注册方式 1 - 邮箱 2 - 手机
    const [intWay, setIntWay] = useState<number>(1);
    //选择区号
    const [selectPerfixBox, setSelectPerfix] = useState<boolean>(false);
    const getCountryList = async () => {
        const result = await CountryListApi();

        setCountrySource(result.data.list.filter((item: { reg_status: number; }) => {
            return item.reg_status === 1
        }));
        // const index = arr.indexOf(defaultCountry);
        // index > -1 && arr.splice(index, 1)
        // arr.unshift()
        const first = localStorage.getItem('country') || 'Philippines';
        // const index = result.data.list.country.search(first);
        result.data.list.forEach((e: { country: string; }, index: number) => {
            if (e.country === first) {
                [result.data.list[0], result.data.list[index]] = [result.data.list[index], result.data.list[0]]
            }
        });
        setColumns(result.data.list);

    }
    // const getCountryCode = (_country: string): string => {
    //     let code: string = '';
    //     countrySource.forEach((e) => {
    //         if (_country === e.country) {
    //             code = e.country_iso;
    //         }
    //     })
    //     return code
    // }
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
    useEffect(() => {
        if (count < 0) {
            clearInterval(timer.current);
            setCount(60)
        };
    }, [count]);
    // 
    const protocol: string =
        process.env.REACT_APP_LAND == '1' &&
        'https://sites.google.com/view/terms-of-use2privacy-policy' ||
        process.env.REACT_APP_LAND == '3' &&
        'https://sites.google.com/view/yd-exchange-privacy-policy' ||
        `${process.env.REACT_APP_SHARE}/PrivacyPolicy.html`;
    const [readPrototal, setReadPrototal] = useState<boolean>(true);
    useEffect(() => {
        getSlug();
        getCountryList();
        if (GetUrlKey('code', window.location.href) || sessionStorage.getItem('inv_code')) {
            setInpMsg({
                ...inpMsg,
                invite_code: GetUrlKey('code', window.location.href) || sessionStorage.getItem('inv_code')
            });
            sessionStorage.setItem('inv_code', GetUrlKey('code', window.location.href) as string);
            disableInvite.current = true;
        }
        if (GetUrlKey('ch', window.location.href)) {
            sessionStorage.setItem('ch', GetUrlKey('ch', window.location.href) as string)
        }
        if (GetUrlKey('s', window.location.href)) {
            sessionStorage.setItem('s', GetUrlKey('s', window.location.href) as string)
        }
        if (GetUrlKey('cl', window.location.href)) {
            sessionStorage.setItem('cl', GetUrlKey('cl', window.location.href) as string)
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
    const LAND: string | undefined = process.env.REACT_APP_LAND;
    return (
        <div className={`register-index ${LAND == '1' && 'register-index-th' || LAND == '3' && 'register-index-new' || LAND == '4' && 'register-index-asx' || ''}`}>
            <div className="bg-box"></div>
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
                <div className="page-remark">
                    <img src={require(`../../assets/images/int_logo${LAND == '1' && '_th' || LAND == '3' && '_new' || LAND == '4' && '_asx' || ''}.png`)} alt="" />
                    <p>{t('public.regis_now')}</p>
                </div>
                {/* 注册方式 */}
                <div className="register-way">
                    <ul>
                        <li className={`${intWay === 1 ? 'active-intway' : ''}`} onClick={() => { setIntWay(1) }}>
                            <span className="iconfont">
                                <MailFill />
                            </span>
                            {/* Mail */}
                            {t('public.mail')}
                            {LAND == '4' && <p className="active-line"></p>}
                        </li>
                        <li></li>
                        <li className={`${intWay === 2 ? 'active-intway' : ''}`} onClick={() => { setIntWay(2) }}>
                            <span className="iconfont">
                                <PhoneFill />
                            </span>
                            {/* Phone */}
                            {t('public.phone')}
                            {LAND == '4' && <p className="active-line"></p>}
                        </li>
                    </ul>
                </div>
                <div className="login-box">
                    <div className="box-public select-country">
                        <p>
                            {/* 国家地区 */}
                            {t('public.country')}
                        </p>
                        <input type="text" value={inpMsg.country} onChange={() => { }} placeholder={t('public.type_country')} />
                        <p className="mask-select" onClick={() => { setSelectCountryBox(true) }}></p>
                        <span><DownOutline fontSize={18} color="#999" /></span>
                    </div>
                    {!GetUrlKey('ch', window.location.href) && <div className="box-public">
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
                    </div>}
                    <div className={`box-public ${intWay === 2 ? 'other-p-l' : ''}`}>
                        <p>
                            {/* 邮箱 */}
                            {intWay === 1 ? t('public.email') : t('public.mobile_number')}
                        </p>
                        {
                            intWay === 1
                                //邮箱
                                ? <input type="text" value={inpMsg.email} onChange={(e) => {
                                    setInpMsg({
                                        ...inpMsg,
                                        email: e.target.value
                                    })
                                }} placeholder={t('public.enter_email')} />
                                :
                                //手机
                                <input type="number" placeholder={t('public.enter_phone')} value={inpMsg.phone} onChange={(e) => {
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
                        <p>
                            {/* 邮箱验证码 */}
                            {t('public.email_code')}
                        </p>
                        <input type="text" autoComplete="new-password" value={inpMsg.code} onChange={(e) => {
                            setInpMsg({
                                ...inpMsg,
                                code: e.target.value
                            })
                        }} placeholder={t(`public.${'enter_code'}`)} />
                        <span><CheckShieldOutline color="#999" fontSize={18} /></span>
                        <p className={`send-code ${count === 60 ? '' : 'gra-btn'}`} onClick={count === 60 ? async () => {
                            if (intWay === 1 && !inpMsg.email) {
                                Toast.show(t('public.enter_email'));
                                return;
                            };
                            if (intWay === 2 && !inpMsg.phone) {
                                Toast.show(t('message.enter_phone'));
                                return;
                            };
                            const result = await SendCodeApi({
                                phone_prefix: String(inpMsg.perfix),
                                email: inpMsg.email,
                                phone: inpMsg.phone,
                                scene: 1,
                                type: intWay === 1 ? 2 : 1
                            });
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
                        <input type="password"  autoComplete="new-password" value={inpMsg.password} onChange={(e) => {
                            setInpMsg({
                                ...inpMsg,
                                password: e.target.value
                            })
                        }} placeholder={t('public.enter_pass')} />
                        <span><LockOutline color="#999" fontSize={18} /></span>
                    </div>
                    <p className="read-protocol">
                        <Checkbox defaultChecked onChange={(e) => {
                            setReadPrototal(e);
                        }} style={{
                            '--icon-size': '18px',
                            '--font-size': '14px',
                            '--gap': '6px',
                        }}>{t('public.need_read')} <span className="need-outline" onClick={() => {
                            window.open(protocol)
                        }}>{t('public.protocol')}</span></Checkbox>
                    </p>
                    <p className="login-btn">
                        <Button loading={loading} disabled={loading} color="primary" block onClick={async () => {
                            if (!inpMsg.iso) {
                                //请选择国家地区
                                Toast.show(t('message.type_country'));
                                return
                            }
                            if (intWay === 1 && !inpMsg.email) {
                                Toast.show(t('public.enter_email'));
                                return;
                            }
                            if (intWay === 2 && !inpMsg.phone) {
                                Toast.show(t('message.enter_phone'));
                                return;
                            }
                            if (!inpMsg.invite_code && !GetUrlKey('ch', window.location.href)) {
                                Toast.show(t('message.enter_invite'))
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
                            if (!readPrototal) {
                                Toast.show('message.agree_protocol');
                                return;
                            }
                            setLoading(true)
                            const params = {
                                type: intWay === 1 ? 2 : 1,
                                email: inpMsg.email,
                                phone: inpMsg.phone,
                                phone_prefix: String(inpMsg.perfix),
                                password: inpMsg.password,
                                password_confirmation: inpMsg.password,
                                code: inpMsg.code,
                                country: inpMsg.iso,
                                invite_code: GetUrlKey('code', window.location.href) || sessionStorage.getItem('inv_code') || null,
                                channel_id: GetUrlKey('ch', window.location.href) || sessionStorage.getItem('ch') || null,
                                source: GetUrlKey('s', window.location.href) || sessionStorage.getItem('s') || null,
                                link_id: GetUrlKey('cl', window.location.href) || sessionStorage.getItem('cl') || null
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
                </div>
                <div className="register-remark">
                    <div style={{ lineHeight: '24px' }} dangerouslySetInnerHTML={{ __html: slug }}></div>
                </div>
            </div>
            {/* 选择国家地区 */}
            <Popup visible={selectCountryBox} bodyStyle={{ height: '70vh' }} onMaskClick={() => {
                setSelectCountryBox(false)
            }}>
                <div className="select-area-code">
                    <div className="select-title" onClick={() => { setSelectCountryBox(false) }}>
                        <p>
                            {/* Select area */}
                            {t('public.select_area')}
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
                                columns.map((item, index): ReactElement => {
                                    return (
                                        <li key={index} className={`${inpMsg.country == item.country ? 'active-area' : ''}`} onClick={() => {
                                            setInpMsg({
                                                ...inpMsg,
                                                iso: item.country_iso,
                                                country: item.country
                                            });
                                            setSelectCountryBox(false)
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
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </Popup>
            {/* 选择区号 */}
            <Popup visible={selectPerfixBox} bodyStyle={{ height: '70vh' }} onMaskClick={() => { setSelectPerfix(false) }}>
                <div className="select-area-code">
                    <div className="select-title" onClick={() => { setSelectPerfix(false) }}>
                        <p>{t('public.select_code')}</p>
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

export default RegisterIndex;