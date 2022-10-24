import { Button, Dialog } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import store from "../../store";
import './index.scss'

const GuideHeader = (props: { closeDialog: (status: boolean) => void, t: any }): ReactElement => {
    return (
        <div className={`guide-header ${process.env.REACT_APP_AREA == '66' ? 'guide-header-th' : ''}`}>
            <div className="close-icon" onClick={() => {
                props.closeDialog(false)
            }}><CloseOutline fontSize={16} /></div>
            <div className="header-title">
                <p>
                    {/* iOS如何快捷访问bibi */}
                    — {props.t('public.guide_title')} —
                </p>
            </div>
        </div>
    )
};

interface Step {
    class?: string,
    index?: string,
    text?: string,
    line: boolean,
    line_img?: string,
    step_img?: string
}

const GuideContent = (props: { history: any, t: any }): ReactElement<ReactNode> => {
    const step: Step[] = [
        {
            class: 'left-tree',
            index: props.t('public.one'),
            text: props.t('public.guide_1'),
            line: false,
            step_img: require('../../assets/images/guide_1.png'),
        },
        {
            line: true,
            line_img: require('../../assets/images/line_right.png')
        },
        {
            class: 'right-tree',
            index: props.t('public.two'),
            text: props.t('public.guide_2'),
            line: false,
            step_img: require('../../assets/images/guide_2.png'),
        },
        {
            line: true,
            line_img: require('../../assets/images/line_left.png')
        },
        {
            class: 'left-tree',
            index: props.t('public.three'),
            text: props.t('public.guide_3'),
            line: false,
            step_img: require('../../assets/images/guide_3.png'),
        },
        {
            line: true,
            line_img: require('../../assets/images/line_right.png')
        },
        {
            class: 'right-tree',
            index: props.t('public.four'),
            text: props.t('public.guide_4'),
            line: false,
            step_img: require('../../assets/images/guide_4.png'),
        },
    ]
    return (
        <div className="guide-box">
            <ul>
                {
                    step.map((item: Step, index: number): ReactElement => {
                        return (
                            <div key={index}>
                                {
                                    item.line
                                        ? <li className="line-li">
                                            <img src={item.line_img} alt="" />
                                        </li>
                                        : <li className={`con-li ${item.class}`}>
                                            {item.class === 'left-tree' && <img src={item.step_img} alt="" />}
                                            <div className="text-box">
                                                <p>{item.index}:</p>
                                                <p>{item.text}</p>
                                            </div>
                                            {item.class === 'right-tree' && <img src={item.step_img} alt="" />}
                                        </li>
                                }
                            </div>
                        )
                    })
                }
            </ul>
            <p className="back-home">
                <button color="primary" onClick={() => {
                    props.history.push('/')
                }}>
                    {props.t('public.back_home')}
                    <img src={require('../../assets/images/right_double.png')} alt="" />
                </button>
            </p>
        </div>
    )
};

const DownIndex = (): ReactElement<ReactNode> => {
    const [guideBox, setGuidebox] = useState<boolean>(false);
    const history = useHistory();
    const { t } = useTranslation();
    //设备型号
    const [mobileType, setMobileType] = useState<string>('');
    useEffect(() => {
        const userAgent = navigator.userAgent;
        if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
            setMobileType('IOS')
        }
        if (userAgent.includes('Android')) {
            setMobileType('Android')
        }
    }, [])
    return (
        <div className="down-index">
            <img className="back-icon" src={require('../../assets/images/back_icon_th.png')} alt="" onClick={() => {
                history.goBack();
            }} />
            <img className="bg-img" src={require(`../../assets/images/down_en_th.png`)} alt="" />
            {mobileType === 'Android' && <div className="left-android click-box-use-to-rem" onClick={() => {
                const downImg = document.createElement("a");
                downImg.download = "BIBI.apk";
                downImg.href = `${process.env.REACT_APP_SHARE}/BIBI_version_09.apk`;
                document.body.appendChild(downImg);
                downImg.click();
                downImg.remove();
            }}>
                <p className="iconfont icon-android"></p>
                <div className="">
                    <p>Android</p>
                    <p>Download</p>
                </div>
            </div>}
            {/* {mobileType === 'Android' && <div className="left-android click-box-use-to-rem" onClick={() => {
                window.open()
            }}>
                <p className="iconfont icon-android"></p>
                <div className="">
                    <p>Android</p>
                    <p>Download</p>
                </div>
            </div>} */}
            {mobileType === 'IOS' && <div className="right-ios click-box-use-to-rem" onClick={() => {
                setGuidebox(true)
            }}>
                <p className="iconfont icon-iOS"></p>
                <div className="">
                    <p>IOS</p>
                    <p>Download</p>
                </div>
            </div>}
            <Dialog visible={guideBox} closeOnMaskClick header={<GuideHeader t={t} closeDialog={(status: boolean) => {
                setGuidebox(status)
            }} />} content={<GuideContent history={history} t={t} />}></Dialog>
        </div>
    )
};

export default DownIndex;