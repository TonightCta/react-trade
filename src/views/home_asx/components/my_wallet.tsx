import { ReactElement, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import store from "../../../store";

const HomeAssets = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    return (
        <div className="home-assets">
            {/* 帮助 & 公告 */}
            <div className="ann-help">
                <div className="inner-public help-inner" onClick={() => {
                    history.push('/help')
                }}>
                    {/* 帮助 */}
                    <p>{t('public.home_help')}</p>
                    {/* 问题/指南/资料 */}
                    <p>{t('public.help_more')}</p>
                </div>
                <div className="inner-public ann-inner" onClick={() => {
                    history.push('/ann')
                }}>
                    <p>{t('public.home_ann')}</p>
                    <p>{t('public.ann_more')}</p>
                </div>
            </div>
            {/* 资产 */}
            {/* <div className="assets-box" onClick={() => {
                history.push('/mine-assets')
            }}>
                <p>{t('public.assets')}<span>{t('public.assets_total_un')}({t('public.for_u')}USDT)</span></p>
                <p>{mineAssets}</p>
            </div> */}
        </div>
    )
};

export default HomeAssets;