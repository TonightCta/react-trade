import { Button } from "antd-mobile";
import { ReactElement, ReactNode, useRef, useState } from "react";
import { useTranslation } from "react-i18next";


const UpFile = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    //正面
    const [frontCard, setFrontCard] = useState<File>();
    const [frontView, setFrontView] = useState<string>();
    //反面
    const [backCard, setBackCard] = useState<File>();
    const [backView, setBackView] = useState<string>();
    //人像
    const [faceCard, setFaceCard] = useState<File>();
    const [faceView, setFaceView] = useState<string>();
    return (
        <div className="up-file">
            <div className="card-text">
                <div className="text-public">
                    <p>
                        {/* 真实姓名 */}
                        {t('public.real_name')}
                    </p>
                    <input type="text" placeholder={t('public.enter_real')} />
                </div>
                <p className="label-line"></p>
                <div className="text-public">
                    <p>
                        {/* 身份证号码 */}
                        {t('public.card_numer')}
                    </p>
                    <input type="text" placeholder={t('public.enter_card')} />
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
                                frontCard ? <img className="view-img" src={frontView} alt="" /> : <>
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
                                backCard ? <img className="view-img" src={backView} alt="" /> : <>
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
                                faceCard ? <img className="view-img" src={faceView} alt="" /> : <>
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
                <Button color="primary" block>
                    {/* 提交 */}
                    {t('public.submit')}
                </Button>
            </p>
        </div>
    )
};

export default UpFile;