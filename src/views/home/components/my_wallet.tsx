import { ReactElement, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomeAssets = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    return (
        <div className="home-assets" onClick={() => {
            history.push('/mine-assets')
        }}>
            <img src={require('../../../assets/images/home_icon_4.png')} alt="" />
            <div className="assets-msg">
                {/* 我的资产 */}
                <p>{t('public.assets')}</p>
                <p>{t('public.assets_total_un')}({t('public.for_u')}USDT)</p>
                <p>0.00</p>
            </div>
        </div>
    )
};

export default HomeAssets;