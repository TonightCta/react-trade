import { Button, Dialog } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import store from "../../store";
import './index.scss'

const GuideHeader = (props: { closeDialog: (status: boolean) => void, t: any }): ReactElement => {
    return (
        <div className="guide-header">
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
    const saveDesktop = (name: string, url: string) => {
        const win: any = window;
        // @ts-ognore
        // new ActiveXObject()
        // const expoler = win.navigator.userAgent.toLowercase();
        // if (expoler.indexOf('trident') > 0) {
        //     // const wss = new ActiveXObject()
        //     console.log('unknow')
        // } else {

        // }
        const urlObj = window.URL || window.webkitURL || window;
        const blob = new Blob([url]);
        const link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a') as any;
        link.href = urlObj.createObjectURL(blob);
        link.download = name;
        saveClick(link);

    }
    const saveClick = (url: any) => {
        const e = document.createEvent("MouseEvents");
        e.initMouseEvent(
            'click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
        );
        url.dispatchEvent(e)
    }
    return (
        <div className="down-index">
            <img className="back-icon" src={require('../../assets/images/back_icon.png')} alt="" onClick={() => {
                history.goBack();
            }} />
            <img src={require(`../../assets/images/down_bg_${store.getState().language === 'th' ? 'th' : 'en'}.png`)} alt="" />
            <div className="left-android click-box" onClick={() => {
                const downImg = document.createElement("a");
                downImg.download = "BIBI.apk";
                downImg.href = `${process.env.REACT_APP_SHARE}/BIBI_version_07.apk`;
                document.body.appendChild(downImg);
                downImg.click();
                downImg.remove();
            }}></div>
            <div className="right-ios click-box" onClick={() => {
                setGuidebox(true)
            }}></div>
            <Dialog visible={guideBox} closeOnMaskClick header={<GuideHeader t={t} closeDialog={(status: boolean) => {
                setGuidebox(status)
            }} />} content={<GuideContent history={history} t={t} />}></Dialog>
        </div>
    )
};

export default DownIndex;