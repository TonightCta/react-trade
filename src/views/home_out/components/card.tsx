
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import store from '../../../store';
import { UMsg } from '../../../store/app/reducer';

export declare interface Oper {
    icon: string,
    title: string,
    url: string,
    outSide: boolean,
    inner: boolean
}



const OutsideCard = (props: { history: any }): ReactElement<ReactNode> => {
    const [account, setAccount] = useState<UMsg>(store.getState().account);
    const getAccount = () => {
        setAccount(store.getState().account);
    };
    const { t } = useTranslation();
    const list: Oper[] = [
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
            url: String(account.supportUrl),
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
    useEffect(() => {
        getAccount();
        return () => {
            setAccount(store.getState().account);
            getAccount();
        }
    }, []);
    const mineAssets: number = store.getState().assets;

    return (
        <div className='outside-card'>
            <div className='oper-assets'>
                <div className='left-card'>
                    <ul>
                        {
                            list.map((item: Oper, index: number): ReactElement => {
                                return (
                                    <li key={index} onClick={() => {
                                        item.outSide ? window.open(item.url) : props.history.push(item.url)
                                    }}>
                                        <img src={item.icon} alt="" />
                                        <p>{item.title}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className='right-card card-public' onClick={() => {
                    props.history.push('/mine-assets')
                }}>
                    <p>{t('public.assets')}</p>
                    <p>{t('public.assets_total_un')}({t('public.for_u')}USDT)</p>
                    <p>{mineAssets}</p>
                </div>
            </div>
            <div className='help-ann'>
                <div className='left-card'>
                    <ul>
                        <li onClick={() => {
                            props.history.push('/help')
                        }}>
                            <img src={require('../../../assets/images/out/out_1.png')} alt="" />
                            <div className='text-content'>
                                <p>HELP</p>
                                <p>Pertanyaan/<br />Pedoman/Informasi</p>
                            </div>
                        </li>
                        <li onClick={() => {
                            props.history.push('/ann')
                        }}>
                            <img src={require('../../../assets/images/out/out_2.png')} alt="" />
                            <div className='text-content'>
                                <p>ANNCMNT</p>
                                <p>Berita/Acara/<br />Informasi</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default OutsideCard;