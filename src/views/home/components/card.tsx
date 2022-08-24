import { ReactElement, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import store from "../../../store";
import { setInvBox } from "../../../store/app/action_creators";

interface CardMsg {
    title: string,
    icon: string,
    url: string,
    outSide: boolean,
    inner: boolean
}

const HomeCard = (props: { history: any }): ReactElement<ReactNode> => {
    const { t } = useTranslation();

    const list: Array<CardMsg> = [
        {
            title: t('public.inv'),
            icon: require('../../../assets/images/home_icon_1.png'),
            url: '/invite',
            outSide: false,
            inner: false,
        },
        {
            title: t('public.quotes'),
            icon: require('../../../assets/images/home_icon_2.png'),
            url: '/quotes',
            outSide: false,
            inner: false,
        },
        {
            title: t('public.customer'),
            icon: require('../../../assets/images/home_icon_3.png'),
            url: 'https://www.baidu.com',
            outSide: true,
            inner: false,
        },
        {
            title: t('public.set'),
            icon: require('../../../assets/images/setting_icon.png'),
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
                                <img src={el.icon} alt="" />
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