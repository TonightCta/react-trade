import { ReactElement, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";


const HomeHelp = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    return (
        <div className="home-help">
            <div className="help-public" onClick={() => {
                history.push('/help')
            }}>
                <img src={require('../../../assets/images/home_icon_5.png')} alt="" />
                <div className="public-title">
                    {/* 帮助 */}
                    <p>{t('public.home_help')}</p>
                    {/* 问题/指南/资料 */}
                    <p>{t('public.help_more')}</p>
                </div>
            </div>
            <p className="label-line"></p>
            <div className="help-public" onClick={() => {
                history.push('/ann')
            }}>
                <img src={require('../../../assets/images/home_icon_6.png')} alt="" />
                <div className="public-title">
                    {/* 公告 */}
                    <p>{t('public.home_ann')}</p>
                    {/* 新闻/活动/资讯 */}
                    <p>{t('public.ann_more')}</p>
                </div>
            </div>
        </div>
    )
};

export default HomeHelp;