import { ReactElement, ReactNode, useEffect, useState } from "react";
import store from "../../../store";
import { upAnnID } from "../../../store/app/action_creators";
import InnerNav from '../../../components/inner_nav/nav';
import { DotLoading, PullToRefresh } from 'antd-mobile';
import { sleep } from 'antd-mobile/es/utils/sleep';
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ADV } from '../../../utils/types';
import { AdvListApi } from '../../../request/api'
import './index.scss'
import { PullStatus } from "antd-mobile/es/components/pull-to-refresh";

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
        getAnnListSet();
        return () => {
            setAnnList([])
        }
    }, []);
    const statusRecord: Record<PullStatus, ReactElement | string> = {
        pulling: t('public.pull_down'),//下拉刷新
        canRelease: t('public.freed_down'),//释放刷新
        refreshing: <DotLoading color='primary' />,
        complete: t('public.down_over'),//刷新完成
    }
    return (
        <div className="ann-index">
            <InnerNav leftArrow title={t('public.ann_center')} />
            <PullToRefresh
                onRefresh={async () => {
                    await sleep(1000)
                }}
                renderText={status => {
                    return <div>{statusRecord[status]}</div>
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
                                    <p className="ann-date">{el.created_at}</p>
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