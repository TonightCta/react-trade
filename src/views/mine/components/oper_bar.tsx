import { ReactElement, ReactNode } from "react";
import { List } from "antd-mobile";
import { CheckShieldOutline, FileOutline } from "antd-mobile-icons";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MineOperBar = (): ReactElement<ReactNode> => {
    const history = useHistory();
    const { t } = useTranslation();
    return (
        <div className="mine-oper-bar">
            <List style={{ "--font-size": "15px" }}>
                <List.Item prefix={<img src={require('../../../assets/images/other_1.png')} />} onClick={() => {
                    history.push('/trade-order')
                }}>
                    {/* 我的委托 */}
                    {t('public.mine_en')}
                </List.Item>
                <List.Item prefix={<img src={require('../../../assets/images/other_2.png')} />} onClick={() => {
                    history.push('/safe')
                }}>
                    {/* 安全设置 */}
                    {
                        t('public.safe_set')
                    }
                </List.Item>
            </List>
        </div>
    )
};

export default MineOperBar;