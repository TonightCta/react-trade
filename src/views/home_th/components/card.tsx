import { Dialog } from "antd-mobile";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import store from "../../../store";

interface CardMsg {
    title: string,
    icon: string,
    url: string,
    outSide: boolean,
    inner: boolean
}

const HomeCard = (props: { history: any }): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [account, setAccount] = useState<any>(store.getState().account);
    const getAcc = () => {
        store.subscribe(() => {
            setAccount(store.getState().account)
        })
    };
    useEffect(() => {
        getAcc();
        return () => {
            setAccount({});
        }
    }, [])
    const list: Array<CardMsg> = [
        {
            title: t('public.inv'),
            icon: require('../../../assets/images/home_icon_1_th.png'),
            url: '/invite-th',
            outSide: false,
            inner: false,
        },
        {
            title: t('public.quotes'),
            icon: require('../../../assets/images/home_icon_2_th.png'),
            url: '/quotes',
            outSide: false,
            inner: false,
        },
        {
            title: t('public.customer'),
            icon: require('../../../assets/images/home_icon_3_th.png'),
            url: String(account.supportUrl),
            outSide: true,
            inner: false,
        },
        {
            title: t('public.set'),
            icon: require('../../../assets/images/home_icon_4_th.png'),
            url: '/setting',
            outSide: false,
            inner: false,
        }
    ];
    const [visible, setVisible] = useState<boolean>(false);
    const CSContent = (): ReactElement => {
        return (
            <div className="cs-content">
                <p className="cs-title">
                    {t('public.select_cs')}
                </p>
                <ul>
                    <li onClick={() => {
                        window.open(account.officeUrl['LINE'])
                    }}>
                        <img src={require('../../../assets/images/line_icon.png')} alt="" />
                        LINE
                    </li>
                    <li onClick={() => {
                        window.open(account.officeUrl['TG'])
                    }}>
                        <img src={require('../../../assets/images/tg_icon.png')} alt="" />
                        Telegram
                    </li>
                </ul>
                <p className="cancel-cs" onClick={() => { setVisible(false) }}>
                    {t('public.cancel')}
                </p>
            </div>
        )
    }
    return (
        <div className={`home-card-list ${localStorage.getItem('language') == 'ru' ? 'f-12-list' : ''}`}>
            <ul>
                {
                    list.map((el, index): ReactElement => {
                        return (
                            <li key={index} onClick={() => {
                                const out = () => {
                                    account.officeUrl ? setVisible(true) : window.open(account.supportUrl)
                                }
                                el.outSide ? out() : props.history.push(el.url)
                            }}>
                                <div className="img-box">
                                    <img src={el.icon} alt="" />
                                </div>
                                <p>{el.title}</p>
                            </li>
                        )
                    })
                }
            </ul>
            <Dialog visible={visible} closeOnMaskClick header={null} content={<CSContent />} />
        </div>
    )
};

export default HomeCard;