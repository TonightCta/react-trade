import { Swiper } from "antd-mobile";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { SoundOutline } from 'antd-mobile-icons'
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AdvListApi } from '../../../request/api'
import { setInvBox, upAnnID } from "../../../store/app/action_creators";
import store from "../../../store";
import { ADV } from '../../../utils/types'




interface CardMsg {
    title: string,
    icon: string,
    url: string,
    outSide: boolean,
    inner: boolean
}


const AdvSwiper = (props: { history: any }): ReactElement<ReactNode> => {
    const [advList, setAdvList] = useState<ADV[]>([]);
    const getAdvList = async () => {
        const result = await AdvListApi(3);
        setAdvList(result.data.lists);
    };
    useEffect(() => {
        getAdvList();
        return () => {
            getAdvList();
            setAdvList([]);
        }
    }, [])
    return (
        <div className="adv-banner">
            <Swiper loop autoplay direction='vertical' style={{ '--height': '34px' }}>
                {
                    advList.map((el, index): ReactElement<ReactNode> => {
                        return (
                            <Swiper.Item className="adv-item" key={index}>
                                <p onClick={() => {
                                    const action = upAnnID(el.id);
                                    store.dispatch(action);
                                    props.history.push('/ann-detail')
                                }}>{el.title}</p>
                            </Swiper.Item>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}

//卡片选项

const Card = (props: { history: any }): ReactElement<ReactNode> => {
    const { t } = useTranslation();

    const list: Array<CardMsg> = [
        {
            title: t('public.inv'),
            icon: require('../../../assets/images/home_icon_1.png'),
            url: '',
            outSide: false,
            inner: true,
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
        <div className="card-list">
            <ul>
                {
                    list.map((el, index): ReactElement => {
                        return (
                            <li key={index} onClick={() => {
                                if (el.inner) {
                                    const action = setInvBox(1);
                                    store.dispatch(action)
                                    return
                                }
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
}

const HomeAdv = (): ReactElement<ReactNode> => {
    const history = useHistory();
    return (
        <div className="home-adv-card">
            <div className="home-adv">
                <SoundOutline fontSize={16} />
                <AdvSwiper history={history} />
            </div>
            <Card history={history} />
        </div>
    )
};

export default HomeAdv;