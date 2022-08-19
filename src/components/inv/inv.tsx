import { Popup, Toast } from "antd-mobile";
import { CloseOutline, VideoOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import store from "../../store";
import { setInvBox } from "../../store/app/action_creators";
import copy from 'copy-to-clipboard';
import { InvInfoApi } from '../../request/api';
import { useTranslation } from "react-i18next";
import './index.scss'



const InvBox = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [invBox, setInvBoxInner] = useState<boolean>(false);
    const [openStatus, setOpenStstus] = useState<number>(store.getState().invBox);
    const [link, setLink] = useState<string>('');
    const storeChange = () => {
        store.subscribe(() => {
            setOpenStstus(store.getState().invBox)
        });
    };
    const getInvInfo = async () => {
        const result = await InvInfoApi();
        setLink(result.data.link)
    };
    useEffect(() => {
        openStatus === 1 && setInvBoxInner(true);
    }, [openStatus])
    useEffect(() => {
        storeChange();
        getInvInfo();
        return () => {
            storeChange()
        }
    }, []);
    const closeInvBox = () => {
        const action = setInvBox(0);
        store.dispatch(action);
        setInvBoxInner(false)
    }
    return (
        <div className="inv-link-box">
            <Popup visible={invBox} onMaskClick={() => { closeInvBox() }}>
                <div className="inv-inner">
                    <div className="inv-title">
                        <p>
                            {/* 更多分享方式 */}
                            {t('public.more_share')}
                        </p>
                        <p onClick={() => { closeInvBox() }}>
                            <CloseOutline />
                        </p>
                    </div>
                    <div className="inv-content">
                        <p>
                            {/* 邀请链接 */}
                            {t('public.share_link')}
                        </p>
                        <p>
                            <span>{link}</span>
                            <span>
                                <VideoOutline onClick={() => {
                                    copy(link);
                                    Toast.show({ content: t('message.copy_success'), position: 'bottom', })
                                }} />
                            </span>
                        </p>
                    </div>
                </div>
            </Popup>
        </div>
    )
};

export default InvBox;