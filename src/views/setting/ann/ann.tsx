import { ReactElement, ReactNode, useEffect } from "react";
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import InnerNav from '../../../components/inner_nav/nav';
import { PullToRefresh } from 'antd-mobile';
import { sleep } from 'antd-mobile/es/utils/sleep';
import { useHistory } from "react-router-dom";
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
    const history = useHistory();
    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="ann-index">
            <InnerNav leftArrow title="公告中心" />
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
                                    history.push('/ann-detail')
                                }}>
                                    <p className="ann-title">{el.title}</p>
                                    <p className="ann-date">{el.date}</p>
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