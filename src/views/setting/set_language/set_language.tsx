import { ReactElement, ReactNode, useEffect, useState } from "react";
import store from "../../../store";
import { setLanguage, upFooterStatus } from "../../../store/app/action_creators";
import InnerNav from '../../../components/inner_nav/nav';
import './index.scss'
import { List } from "antd-mobile";
import i18n from "../../../lang";
import { CheckOutline } from "antd-mobile-icons";
import { useTranslation } from "react-i18next";

const langList = [
    {
        name: '中國台灣',
        cation: 'zh_TW',
        langIcon: require('../../../assets/images/test.png')
    },
    {
        name: 'English',
        cation: 'en',
        langIcon: require('../../../assets/images/en.png')
    },
    {
        name: 'Русский',
        cation: 'ru',
        langIcon: require('../../../assets/images/ru.png')
    },
];

const SetLanguage = (): ReactElement<ReactNode> => {
    const [lang, setLang] = useState<string>(localStorage.getItem('language') || 'zh-TW');
    const storeChange = () => {
        store.subscribe(() => {
            setLang(store.getState().language)
        });
    };
    useEffect(() => {
        storeChange()
        const action = upFooterStatus(0);
        store.dispatch(action);
        return () => {
            storeChange()
        }
    }, []);
    const { t } = useTranslation();
    return (
        <div className="set-language">
            <InnerNav title={t('title.language_set')} leftArrow />
            <div className="lang-list">
                <List>
                    {
                        langList.map((el, index): ReactElement => {
                            return (
                                <List.Item key={index} prefix={
                                    <img className="lang-icon" src={el.langIcon} />
                                } onClick={() => {
                                    const action = setLanguage(el.cation);
                                    store.dispatch(action)
                                    i18n.changeLanguage(el.cation);
                                    // window.location.reload();
                                }}>
                                    {el.name}
                                    {lang === el.cation && <span><CheckOutline color="#3070ff" fontSize={16} /></span>}
                                </List.Item>
                            )
                        })
                    }
                </List>
            </div>
        </div>
    )
};

export default SetLanguage;