import { ReactElement, ReactNode, useEffect, useState } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import store from "../../../../store";
import { useTranslation } from "react-i18next";
import './index.scss'
import { HelpDetailApi } from "../../../../request/api";
import { DotLoading, Empty } from "antd-mobile";


const HelpDetail = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const AnnID = store.getState().annID;
    const [content, setContent] = useState<any>({});
    const getDetail = async () => {
        const result = await HelpDetailApi(AnnID);
        setContent(result.data);
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
                !!content.created_at
                    ?
                    <div className="detail-box">
                        {
                            content.content ? <div style={{ lineHeight: '22px' }} dangerouslySetInnerHTML={{ __html: content.content }}></div> : <Empty description={t('public.no_content')} />
                        }
                    </div>
                    :
                    <div className="load-data">
                        <DotLoading color='primary' />
                    </div>}
        </div>
    )
};

export default HelpDetail;