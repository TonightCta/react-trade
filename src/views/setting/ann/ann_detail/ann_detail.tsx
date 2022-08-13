import { ReactElement, ReactNode, useEffect, useState } from "react";
import InnerNav from '../../../../components/inner_nav/nav'
import store from "../../../../store";
import { upFooterStatus } from "../../../../store/app/action_creators";
import { useTranslation } from "react-i18next";
import { AdvDetailApi } from '../../../../request/api'
import './index.scss'
import { DotLoading } from "antd-mobile";

const AnnDetail = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const AnnID = store.getState().annID;
    const [content, setContent] = useState<string | null>('');
    const getDetail = async () => {
        const result = await AdvDetailApi(AnnID);
        setContent(result.data.content);
    }
    useEffect(() => {
        getDetail();
        const action = upFooterStatus(0);
        store.dispatch(action);
        return () => {
            getDetail();
        }
    }, [])
    return (
        <div className="ann-detail">
            <InnerNav leftArrow title={t('public.ann_detail')} />
            {
                !!content
                    ?
                    <div className="detail-box">
                        <div dangerouslySetInnerHTML={{__html:content}}></div>
                    </div>
                    :
                    <div className="load-data">
                        <DotLoading color='primary' />
                    </div>}
        </div>
    )
};

export default AnnDetail;