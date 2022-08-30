import { RightOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import InnerNav from '../../../components/inner_nav/nav'
import store from "../../../store";
import { upAnnID } from "../../../store/app/action_creators";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HelpListApi } from '../../../request/api'
import './index.scss'

const Help = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    const [helpList, setHelpList] = useState<any[]>([]);
    const getHelpList = useCallback(async () => {
        const result = await HelpListApi();
        setHelpList(result.data)
    }, [])
    useEffect(() => {
        getHelpList();
        return () => {
            getHelpList();
        }
    }, [window.location.href]);
    return (
        <div className="help-index">
            <InnerNav leftArrow title={t('public.help_center')} />
            <div className="help-list">
                <ul>
                    {
                        helpList.map((item, index): ReactElement => {
                            return (
                                <li key={`item-${index}`} onClick={(): void => {
                                    const action = upAnnID(item.id);
                                    store.dispatch(action);
                                    history.push('/help-detail')
                                }}>
                                    <div className="title-msg">
                                        <p>{item.title}</p>
                                        <p>{item.created_at}</p>
                                    </div>
                                    <RightOutline color="#999" fontSize={16} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
};
export default Help;