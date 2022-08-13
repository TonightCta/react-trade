import { ReactElement, ReactNode, useEffect, useState } from "react";
import store from "../../../store";
import { upAnnID, upFooterStatus } from "../../../store/app/action_creators";
import InnerNav from '../../../components/inner_nav/nav';
import { PullToRefresh } from 'antd-mobile';
import { sleep } from 'antd-mobile/es/utils/sleep';
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ADV } from '../../../utils/types';
import { AdvListApi } from '../../../request/api'
import './index.scss'

const annList = [
    {
        title: '派大星',
        date: '2022-08-05 00:03:07'
    },
    {
        title: '海绵宝宝',
        date: '2022-08-05 14:30:20'
    },
]

const Ann = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [annList, setAnnList] = useState<ADV[]>([]);
    const getAnnListSet = async () => {
        const result = await AdvListApi(100);
        setAnnList(result.data.lists)
    }
    const history = useHistory();
    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action);
        getAnnListSet();
        return () => {
            getAnnListSet()
        }
    }, [])
    return (
        <div className="ann-index">
            <InnerNav leftArrow title={t('public.ann_center')} />
            <PullToRefresh
                onRefresh={async () => {
                    await sleep(1000)
                }}
            >
                <ul>
                    {
                        annList.map((el, index): ReactElement => {
                            return (
                                <li key={index} onClick={() => {
                                    const action = upAnnID(el.id);
                                    store.dispatch(action);
                                    history.push('/ann-detail')
                                }}>
                                    <p className="ann-title">{el.title}</p>
                                    <p className="ann-date">{el.updated_at}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </PullToRefresh>

        </div>
    )
};

export default Ann;