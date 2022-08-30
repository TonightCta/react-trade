import { Swiper } from "antd-mobile";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { SoundOutline } from 'antd-mobile-icons'
import { useHistory } from "react-router-dom";
import { AdvListApi } from '../../../request/api'
import { upAnnID } from "../../../store/app/action_creators";
import store from "../../../store";
import { ADV } from '../../../utils/types'






const AdvSwiper = (props: { history: any }): ReactElement<ReactNode> => {
    const [advList, setAdvList] = useState<ADV[]>([]);
    const getAdvList = async () => {
        const result = await AdvListApi(3);
        setAdvList(result.data.lists);
    };
    useEffect(() => {
        getAdvList();
        return () => {
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



const HomeAdv = (): ReactElement<ReactNode> => {
    const history = useHistory();
    return (
        <div className="home-adv-card">
            <div className="home-adv">
                <SoundOutline fontSize={16} />
                <AdvSwiper history={history} />
            </div>
            {/* <Card history={history} /> */}
        </div>
    )
};

export default HomeAdv;