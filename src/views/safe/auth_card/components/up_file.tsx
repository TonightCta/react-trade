import { Button, Toast } from "antd-mobile";
import { RedoOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { AuthCardApi } from '../../../../request/api'
import { upUserInfo } from "../../../../store/app/action_fn";

interface Card {
    name: string,
    id: string
}

const UpFile = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [cardMsg, setCardMsg] = useState<Card>({
        name: '',
        id: ''
    });
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);
    //正面
    const [frontCard, setFrontCard] = useState<File>();
    const [frontView, setFrontView] = useState<string>();
    //反面
    const [backCard, setBackCard] = useState<File>();
    const [backView, setBackView] = useState<string>();
    //人像
    const [faceCard, setFaceCard] = useState<File>();
    const [faceView, setFaceView] = useState<string>();

    const submitAuthCard = async () => {
        if (!cardMsg.name) {
            //请输入真实姓名
            Toast.show(t('message.type_real_name'));
            return;
        };
        if (!cardMsg.id) {
            //请输入证件号码
            Toast.show(t('message.type_card_id'));
            return;
        };
        if (!frontCard) {
            //请上传证件正面照片
            Toast.show(t('message.up_card_front'));
            return;
        }
        if (!backCard) {
            //请上传证件反面照片
            Toast.show(t('message.up_card_back'));
            return;
        }
        if (!faceCard) {
            //请上传人像照片
            Toast.show(t('message.up_face'));
            return;
        };
        setLoading(true);
        const formdata = new FormData();
        formdata.append('real_name', cardMsg.name);
        formdata.append('id_card_no', cardMsg.id);
        formdata.append('card_front', frontCard);
        formdata.append('card_back', backCard);
        formdata.append('card_hand', faceCard);
        const result = await AuthCardApi(formdata);
        const { code } = result;
        if (code !== 200) {
            Toast.show(result.message);
            setLoading(false);
            return;
        };
        const info = await upUserInfo();
        if (info.code !== 200) {
            Toast.show(info.message);
            setLoading(false);
            return;
        };
        //提交成功，请等待审核
        Toast.show(t('message.moderated'));
        setLoading(false);
        history.goBack();
    };
    return (
        <div className="up-file">
            <div className="card-text">
                <div className="text-public">
                    <p>
                        {/* 真实姓名 */}
                        {t('public.real_name')}
                    </p>
                    <input type="text" value={cardMsg.name} onChange={(e) => {
                        setCardMsg({
                            ...cardMsg,
                            name: e.target.value
                        })
                    }} placeholder={t('public.enter_real')} />
                </div>
                <p className="label-line"></p>
                <div className="text-public">
                    <p>
                        {/* 身份证号码 */}
                        {t('public.card_num')}
                    </p>
                    <input type="text" value={cardMsg.id} onChange={(e) => {
                        setCardMsg({
                            ...cardMsg,
                            id: e.target.value
                        })
                    }} placeholder={t('public.enter_card')} />
                </div>
            </div>
            <div className="card-file">
                <div className="file-public">
                    <p>
                        {/* 上传身份证照片 */}
                        {t('public.up_card')}
                    </p>
                    <div className="file-inp">
                        <div className="inp-box">
                            <input type="file" accept="image/*" onChange={($e: any): void => {
                                setFrontCard($e.target.files[0]);
                                const view = window.URL.createObjectURL($e.target.files[0]);
                                setFrontView(view);
                            }} />
                            {
                                frontCard
                                    ? <div className="view-img-box">
                                        <img className="view-img" src={frontView} alt="" />
                                        <p><RedoOutline fontSize={20} /><span>
                                            {/* 重新上传 */}
                                            {t('public.re_upload')}
                                        </span></p>
                                    </div>
                                    : <>
                                        <img src={require('../../../../assets/images/file_icon.png')} className="icon-img" alt="" />
                                        <p>
                                            {/* 上传身份证人像面 */}
                                            {t('public.up_face_card')}
                                        </p>
                                    </>
                            }
                        </div>
                        <div className="inp-box">
                            <input type="file" accept="image/*" onChange={($e: any): void => {
                                setBackCard($e.target.files[0]);
                                const view = window.URL.createObjectURL($e.target.files[0]);
                                setBackView(view);
                            }} />
                            {
                                backCard
                                    ? <div className="view-img-box">
                                        <img className="view-img" src={backView} alt="" />
                                        <p><RedoOutline fontSize={20} /><span>
                                            {/* 重新上传 */}
                                            {t('public.re_upload')}
                                        </span></p>
                                    </div>
                                    : <>
                                        <img src={require('../../../../assets/images/file_icon.png')} className="icon-img" alt="" />
                                        <p>
                                            {/* 上传身份证国徽面 */}
                                            {t('public.up_back_card')}
                                        </p>
                                    </>
                            }
                        </div>
                    </div>
                </div>
                <div className="file-public">
                    <p>
                        {/* 请上传您的脸部照片 */}
                        {t('public.up_face')}
                    </p>
                    <div className="file-inp">
                        <div className="inp-box">
                            <input type="file" accept="image/*" onChange={($e: any): void => {
                                setFaceCard($e.target.files[0]);
                                const view = window.URL.createObjectURL($e.target.files[0]);
                                setFaceView(view);
                            }} />
                            {
                                faceCard
                                    ? <div className="view-img-box">
                                        <img className="view-img" src={faceView} alt="" />
                                        <p><RedoOutline fontSize={20} /><span>
                                            {/* 重新上传 */}
                                            {t('public.re_upload')}
                                        </span></p>
                                    </div>
                                    : <>
                                        <img src={require('../../../../assets/images/file_icon.png')} className="icon-img" alt="" />
                                        <p>
                                            {/* 上传脸部照片 */}
                                            {t('public.up_face_pic')}
                                        </p>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <p className="submit-btn">
                <Button color="primary" loading={loading} disabled={loading} onClick={() => {
                    submitAuthCard()
                }} block>
                    {/* 提交 */}
                    {t('public.submit')}
                </Button>
            </p>
        </div>
    )
};

export default UpFile;