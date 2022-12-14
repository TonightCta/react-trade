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
            icon: require('../../../assets/images/home_new/home_icon_1.png'),
            url: '/invite-new',
            outSide: false,
            inner: false,
        },
        {
            title: t('public.quotes'),
            icon: require('../../../assets/images/home_new/home_icon_2.png'),
            url: '/quotes',
            outSide: false,
            inner: false,
        },
        {
            title: t('public.customer'),
            icon: require('../../../assets/images/home_new/home_icon_3.png'),
            url: String(account.supportUrl),
            outSide: true,
            inner: false,
        },
        {
            title: t('public.set'),
            icon: require('../../../assets/images/home_new/home_icon_4.png'),
            url: '/setting',
            outSide: false,
            inner: false,
        }
    ]
    return (
        <div className={`home-card-list ${localStorage.getItem('language') == 'ru' ? 'f-12-list' : ''}`}>
            <ul>
                {
                    list.map((el, index): ReactElement => {
                        return (
                            <li key={index} onClick={() => {
                                el.outSide ? window.open(el.url) : props.history.push(el.url)
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
        </div>
    )
};

export default HomeCard;