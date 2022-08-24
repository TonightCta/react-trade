import { ReactElement, ReactNode, useEffect, useState } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import store from "../../../../store";
import { useTranslation } from "react-i18next";
import './index.scss'
import { HelpDetailApi } from "../../../../request/api";
import { DotLoading } from "antd-mobile";


const HelpDetail = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const AnnID = store.getState().annID;
    const [content, setContent] = useState<string | null>('');
    const getDetail = async () => {
        const result = await HelpDetailApi(AnnID);
        setContent(result.data.content);
    }
    useEffect(() => {
        getDetail();
        return () => {
            getDetail();
        }
    }, [window.location.href]);
    return (
        <div className="help-detail">
            <InnerNav leftArrow title={t('public.help_detail')} />
            {
                !!content
                    ?
                    <div className="detail-box">
                        <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    </div>
                    :
                    <div className="load-data">
                        <DotLoading color='primary' />
                    </div>}
        </div>
    )
};

export default HelpDetail;