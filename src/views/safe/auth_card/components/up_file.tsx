import { Button, Toast } from "antd-mobile";
import { RedoOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { AuthCardApi } from '../../../../request/api'
import store from "../../../../store";
import { upUserInfo } from "../../../../store/app/action_fn";

interface Card {
    name: string,
    id: string
}

const convertBase64 = async (file: File) : Promise<File> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = new Image();
            img.src = String(reader.result);
            img.onload = () => {
                let w = img.width;
                let h = img.height;
                const scale = w / h;
                const quality = 0.5;
                w = w > 300 ? w * quality : w;
                h = w > 300 ? w / scale : h;
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = w;
                canvas.height = h;
                ctx?.drawImage(img, 0, 0, w, h);
                const base64 = canvas.toDataURL('image/jpeg', quality);
                const arr = base64.split(',');
                /* @ts-ignore */
                const mine = arr[0].match(/:(.*?);/)[1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                let u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                };
                resolve(new File([u8arr],file.name ,{ type: mine }))
            };
        };
    })
}

const UpFile = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const account = store.getState().account;
    const [cardMsg, setCardMsg] = useState<Card>({
        name: '',
        id: ''
    });
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);
    //??????
    const [frontCard, setFrontCard] = useState<File>();
    const [frontView, setFrontView] = useState<string>();
    //??????
    const [backCard, setBackCard] = useState<File>();
    const [backView, setBackView] = useState<string>();
    //??????
    const [faceCard, setFaceCard] = useState<File>();
    const [faceView, setFaceView] = useState<string>();

    const submitAuthCard = async () => {
        if (!cardMsg.name) {
            //?????????????????????
            Toast.show(t('message.type_real_name'));
            return;
        };
        if (!cardMsg.id) {
            //?????????????????????
            Toast.show(t('message.type_card_id'));
            return;
        };
        if (!frontCard) {
            //???????????????????????????
            Toast.show(t('message.up_card_front'));
            return;
        }
        if (!backCard) {
            //???????????????????????????
            Toast.show(t('message.up_card_back'));
            return;
        }
        if (!faceCard) {
            //?????????????????????
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
        //??????????????????????????????
        Toast.show(t('message.moderated'));
        setLoading(false);
        history.goBack();
    };
    return (
        <div className="up-file">
            <div className="card-text">
                <div className="text-public">
                    <p>
                        {/* ???????????? */}
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
                        {/* ??????????????? */}
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
                        {/* ????????????????????? */}
                        {t('public.up_card')}
                    </p>
                    <div className="file-inp">
                        <div className="inp-box">
                            <input type="file" accept="image/*" onChange={async ($e: any) => {
                                setFrontCard(await convertBase64($e.target.files[0]));
                                const view = window.URL.createObjectURL($e.target.files[0]);
                                setFrontView(view);
                            }} />
                            {
                                frontCard
                                    ? <div className="view-img-box">
                                        <img className="view-img" src={frontView} alt="" />
                                        <p><RedoOutline fontSize={20} /><span>
                                            {/* ???????????? */}
                                            {t('public.re_upload')}
                                        </span></p>
                                    </div>
                                    : <>
                                        <img src={require('../../../../assets/images/file_icon.png')} className="icon-img" alt="" />
                                        <p>
                                            {/* ???????????????????????? */}
                                            {t('public.up_face_card')}
                                        </p>
                                    </>
                            }
                        </div>
                        <div className="inp-box">
                            <input type="file" accept="image/*" onChange={async ($e: any) => {
                                setBackCard(await convertBase64($e.target.files[0]));
                                const view = window.URL.createObjectURL($e.target.files[0]);
                                setBackView(view);
                            }} />
                            {
                                backCard
                                    ? <div className="view-img-box">
                                        <img className="view-img" src={backView} alt="" />
                                        <p><RedoOutline fontSize={20} /><span>
                                            {/* ???????????? */}
                                            {t('public.re_upload')}
                                        </span></p>
                                    </div>
                                    : <>
                                        <img src={require('../../../../assets/images/file_icon.png')} className="icon-img" alt="" />
                                        <p>
                                            {/* ???????????????????????? */}
                                            {t('public.up_back_card')}
                                        </p>
                                    </>
                            }
                        </div>
                    </div>
                </div>
                <div className="file-public">
                    <p>
                        {/* ??????????????????????????? */}
                        {t('public.up_face')}
                    </p>
                    <div className="file-inp">
                        <div className="inp-box">
                            <input type="file" accept="image/*" onChange={async ($e: any) => {
                                setFaceCard(await convertBase64($e.target.files[0]));
                                const view = window.URL.createObjectURL($e.target.files[0]);
                                setFaceView(view);
                            }} />
                            {
                                faceCard
                                    ? <div className="view-img-box">
                                        <img className="view-img" src={faceView} alt="" />
                                        <p><RedoOutline fontSize={20} /><span>
                                            {/* ???????????? */}
                                            {t('public.re_upload')}
                                        </span></p>
                                    </div>
                                    : <>
                                        <img src={require('../../../../assets/images/file_icon.png')} className="icon-img" alt="" />
                                        <p>
                                            {/* ?????????????????? */}
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
                    {/* ?????? */}
                    {t('public.submit')}
                </Button>
            </p>
        </div>
    )
};

export default UpFile;