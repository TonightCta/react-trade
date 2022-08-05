import { RightOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../../components/inner_nav/nav'
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import { useHistory } from "react-router-dom";
import './index.scss'

const helpList = [
    {
        title: '新手指南',
        list: [
            {
                title: '如何保障资金安全',
                date: '2018-01-15 15:15:15'
            },
        ]
    },
    {
        title: '交易指南',
        list: [
            {
                title: '什么是限价交易',
                date: '2018-01-15 15:15:15'
            },
            {
                title: '什么是市价交易',
                date: '2018-01-15 15:15:15'
            },
        ]
    },

]

const Help = (): ReactElement<ReactNode> => {
    const history = useHistory();
    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="help-index">
            <InnerNav leftArrow title="帮助中心" />
            <div className="help-list">
                {
                    helpList.map((el, index): ReactElement => {
                        return (
                            <div className="list-con" key={index}>
                                <p className="parent-title">{el.title}</p>
                                <ul>
                                    {
                                        el.list.map((item, index): ReactElement => {
                                            return (
                                                <li key={`item-${index}`} onClick={(): void => {
                                                    history.push('/help-detail')
                                                }}>
                                                    <div className="title-msg">
                                                        <p>{item.title}</p>
                                                        <p>{item.date}</p>
                                                    </div>
                                                    <RightOutline color="#999" fontSize={16} />
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};
export default Help;