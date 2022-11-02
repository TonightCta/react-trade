import { DotLoading, Modal, Popover, Popup, Toast } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import React, { ReactElement, ReactNode, useCallback, useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import InnerNav from '../../components/inner_nav/nav';
import { InvInfoApi } from "../../request/api";
import store from "../../store";
import { upInvLevel } from "../../store/app/action_creators";
import printPage from 'html2canvas'
import copy from 'copy-to-clipboard';
import QRCode from 'qrcode.react';
import Swiper from 'swiper';
import { RankInviteApi } from '../../request/api'
import 'swiper/css'
import './index.scss'

interface Rank {
    email: string,
    reward: string,
    avatar: string
}

const ModalContent = (props: { closeModal: () => void, invInfo: any }): ReactElement => {
    const { t } = useTranslation();
    return (
        <div className="modal-content-inv">
            <p className="close-icon" onClick={() => { props.closeModal() }}><CloseOutline /></p>
            <p className="modal-title-mine">
                {/* 奖励规则 */}
                {t('public.reward_rule')}
            </p>
            <div className="modal-inv-reward">
                <p>
                    {/* 一代:60% */}
                    Level 1 :
                    {
                        props.invInfo?.levels[0].reward
                    }
                    %
                </p>
                <p>
                    {/* 二代:30% */}
                    Level 2 :
                    {
                        props.invInfo?.levels[1].reward
                    }
                    %
                </p>
                <p>
                    {/* 三代:10% */}
                    Level 3 :
                    {
                        props.invInfo?.levels[2].reward
                    }
                    %
                </p>
            </div>
            <p className="modal-title-mine">
                {/* 推广计划奖励制度详情 */}
                {
                    props.invInfo.article.title
                }
            </p>
            <div className="content-box" style={{ lineHeight: '22px' }} dangerouslySetInnerHTML={{ __html: props.invInfo.article.content }}></div>
        </div>
    )
};

const url = encodeURIComponent(String(process.env.REACT_APP_SHARE));
const shareList = [
    {
        icon: require('../../assets/images/face_icon.png'),
        name: 'Facebook',
        url: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    },
    {
        icon: require('../../assets/images/tg_icon.png'),
        name: 'Telegram',
        url: `https://t.me/share/url?url=${url}&text=${encodeURIComponent('BIBI')}`
    },
    {
        icon: require('../../assets/images/reddit_icon.png'),
        name: 'Reddit',
        url: `http://www.reddit.com/submit?url=${url}&title=${encodeURIComponent('BIBI')}`
    },
    {
        icon: require('../../assets/images/whats_icon.png'),
        name: 'Whatsapp',
        url: `https://web.whatsapp.com/send?text=${encodeURIComponent('BIBI')}&url=${url}`
    },
    {
        icon: require('../../assets/images/line_icon.png'),
        name: 'Line',
        url: `https://lineit.line.me/share/ui?url=${url}`
    },
]

const SwiperMine = (props: { invInfo: any, lang: string | null }): ReactElement => {
    const printElementOne = useRef() as React.MutableRefObject<any>;
    const printElementTwo = useRef() as React.MutableRefObject<any>;
    const printElementThree = useRef() as React.MutableRefObject<any>;
    const [invInfo, setInvInfo] = useState<any>({});
    const getInvInfo = useCallback(async () => {
        const result = await InvInfoApi();
        setInvInfo(result.data);
        createImgFn();
    }, []);
    useEffect(() => {
        getInvInfo();
        new Swiper('#poster-swiper', {
            slidesPerView: 3,
            spaceBetween: 20,
            initialSlide: 1,
            centeredSlides: true,
        });
        return () => {
            setInvInfo({});
        }
    }, [])
    // const [scaleName, setScaleName] = useState<string | null>(null)
    const [createImg, setCreateImg] = useState<any>({
        img_1: null,
        img_2: null,
        img_3: null
    });
    const createImgFn = async () => {
        const ele = printElementOne.current as HTMLDivElement;
        const ele2 = printElementTwo.current as HTMLDivElement;
        const ele3 = printElementThree.current as HTMLDivElement;
        const canvas = await printPage(ele);
        const canvas2 = await printPage(ele2);
        const canvas3 = await printPage(ele3);
        setCreateImg({
            img_1: canvas.toDataURL('image/png'),
            img_2: canvas2.toDataURL('image/png'),
            img_3: canvas3.toDataURL('image/png')
        })
        // setScaleName('show-scale-8')
    };
    return (
        <>
            <div className="before-create-1" ref={printElementOne}>
                <img src={require(`../../assets/images/poster_1_th_${props.lang}.png`)} alt="" />
                <p>{`${invInfo?.link}?code=${invInfo?.code}`}</p>
                <div className="qr-box">
                    <QRCode value={`${invInfo?.link}?code=${invInfo?.code}`} size={30} id="qrCode" />
                </div>
            </div>
            <div className="before-create-1" ref={printElementTwo}>
                <img src={require(`../../assets/images/poster_2_th_${props.lang}.png`)} alt="" />
                <p>{`${invInfo?.link}?code=${invInfo?.code}`}</p>
                <div className="qr-box">
                    <QRCode value={`${invInfo?.link}?code=${invInfo?.code}`} size={30} id="qrCode" />
                </div>
            </div>
            <div className="before-create-1" ref={printElementThree}>
                <img src={require(`../../assets/images/poster_3_th_${props.lang}.png`)} alt="" />
                <p>{`${invInfo?.link}?code=${invInfo?.code}`}</p>
                <div className="qr-box">
                    <QRCode value={`${invInfo?.link}?code=${invInfo?.code}`} size={30} id="qrCode" />
                </div>
            </div>
            <div className="swiper-container" id="poster-swiper">
                <div className="swiper-wrapper">
                    <div className={`swiper-slide`}>
                        <img src={createImg.img_1} alt="" />
                    </div>
                    <div className={`swiper-slide`}>
                        <img src={createImg.img_2} alt="" />
                    </div>
                    <div className={`swiper-slide`}>
                        <img src={createImg.img_3} alt="" />
                    </div>
                </div>
            </div>
        </>


    )
}

const InviteIndexTh = (): ReactElement<ReactNode> => {
    const [msgModal, setMsgModal] = useState<boolean>(false);
    const history = useHistory();
    const { t } = useTranslation();

    const [invInfo, setInvInfo] = useState<any>(null);
    const getInvInfo = useCallback(async () => {
        const result = await InvInfoApi();
        setInvInfo(result.data);
    }, []);

    const copyLink = (_url: string) => {
        copy(_url);
        Toast.show(t('message.copy_success'))
    };
    const [showPoster, setShowPoster] = useState<number>(0);
    const [loadPoster, setLoadposter] = useState<boolean>(false);
    const [rankList, setRandList] = useState<Rank[]>([]);
    const [outThree, setOutThree] = useState<Rank[]>([]);
    const [rankMine, setRandMin] = useState<number>(0);
    // const [listTotal, setListTotal] = useState<number | null>(null)
    const openLoading = () => {
        setLoadposter(true);
        setTimeout(() => {
            setLoadposter(false);
            setShowPoster(1);
        }, 1000)
    };
    const [shareBox, setShareBox] = useState<boolean>(false);
    const lang = localStorage.getItem('language') || 'en';
    const getRankList = async () => {
        const result = await RankInviteApi();
        const forword: Rank[] = [];
        const end: Rank[] = [];
        setRandMin(result.data.mine)
        result.data.lists.forEach((e: any, index: number) => {
            if (index <= 2) {
                forword.push(e)
            } else {
                end.push(e)
            }
        })
        // setListTotal(result.data.lists.length);
        setRandList(forword);
        setOutThree(end);
    };
    useEffect(() => {
        getInvInfo();
        getRankList();
        return () => {
            setInvInfo(null)
        }
    }, []);
    const QrImg = (): ReactElement => {
        return (
            <div className="create-link">
                <QRCode value={`${invInfo?.link}?code=${invInfo?.code}`} size={60} id="qrCode" />
            </div>
        )
    };
    return (
        <div className={`invite-index-th`}>
            <InnerNav withOutBg leftArrow title={t('public.inv_title')} />
            <div className="invite-box">
                <div className="top-bg"></div>
                <div className="invite-top">
                    <div className="top-inner-left">
                        <p>
                            {/* Invite friends to earn */}
                            {t('invite.share_1')}
                            <br />
                            {/* money together */}
                            {t('invite.share_2')}
                        </p>
                        <p>
                            {/* Share highest with friends */}
                            {t('invite.share_3')}
                        </p>
                        <p>
                            <span>3~10%</span>
                            {/* commission rebates */}
                            {t('invite.share_4')}
                        </p>
                    </div>
                    <div className="top-inner">
                        <p onClick={() => {
                            setMsgModal(true)
                        }}>
                            {/* Rules */}
                            {t('invite.rules')}
                        </p>
                        <p onClick={() => {
                            const action = upInvLevel(4);
                            store.dispatch(action);
                            history.push('/inv-detail')
                        }}>
                            {/* My recommendation */}
                            {t('invite.recom')}
                        </p>
                    </div>
                </div>
                <div className="banner-text">
                    <p>
                        {/* After recharging, you will get： */}
                        {t('invite.share_after')}
                    </p>
                    <p><span>10%~60%</span>
                        {/* Invitation commission */}
                        {t('invite.commission')}
                    </p>
                    <div className="top-text">
                        <p>
                            {/* Every successful recommendation of a friend */}
                            {t('invite.share_5')}
                        </p>
                        <img src={require('../../assets/images/right_invite_th.png')} alt="" />
                    </div>
                    <p>
                        {/* Enjoy multi-level commission return */}
                        {t('invite.share_6')}
                    </p>
                </div>
                <div className="p-12">
                    <div className="invite-box-1">
                        <div className="box-1-bottom">
                            <div className="btn-qr">
                                <button onClick={() => {
                                    // createPoster();
                                    openLoading()
                                }}>
                                    {/* Share and get rewarded */}
                                    <span>
                                        {t('invite.share')}
                                    </span>
                                    <span>
                                        {/* Earn coins with friends */}
                                        {t('invite.share_earn')}
                                    </span>
                                </button>
                                <Popover
                                    content={<QrImg />}
                                    trigger='click'
                                    placement='top'
                                >
                                    <div className="share-qr">
                                        <img src={require('../../assets/images/qr_2_icon_th.png')} alt="" />
                                    </div>
                                </Popover>
                            </div>
                            <div className="share-link">
                                <div className="link-code link-public" onClick={() => {
                                    copyLink(invInfo?.code)
                                }}>
                                    <p>
                                        {/* Copy Code */}
                                        {t('invite.copy_code')}
                                    </p>
                                </div>
                                <div className="link-url link-public" onClick={() => {
                                    copyLink(`${invInfo?.link}?code=${invInfo?.code}`)
                                }}>
                                    <p>
                                        {/* Copy Link */}
                                        {t('invite.copy_link')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="invite-box-2">
                        <p className="ranking-mine">
                            {/* Your ranking in the first 24 hours */}
                            {t('invite.rank_remark')}
                        </p>
                        {/* <p className="">No.{rankMine}{rankMine > 999 ? '+' : ''}</p> */}
                        <p className="ranking-num">
                            No.{rankMine}{rankMine >= 99 ? '+' : ''}
                        </p>
                        <div className="three-list">
                            <ul>
                                <li>
                                    {rankList.length > 1 ? <>
                                        <div className="three-avatar">
                                            <img src={rankList[1].avatar ? rankList[1].avatar : require('../../assets/images/default_avatar.png')} alt="" />
                                        </div>
                                        <p>****{rankList[1].email.substring(rankList[1].email.length - 5, rankList[1].email.length)}</p>
                                        <p>{Number(rankList[1].reward).toFixed(0)}&nbsp;USDT</p>
                                    </> : <div className="p-24">{rankList.length < 2 ? <p>
                                        {/* Waiting */}
                                        {t('invite.waiting')}
                                    </p> : <DotLoading color='primary' />}</div>}
                                </li>
                                <li>
                                    {rankList.length > 0 ? <>
                                        <div className="three-avatar">
                                            <img src={rankList[0].avatar ? rankList[0].avatar : require('../../assets/images/default_avatar.png')} alt="" />
                                        </div>
                                        <p>****{rankList[0].email.substring(rankList[0].email.length - 5, rankList[0].email.length)}</p>
                                        <p>{Number(rankList[0].reward).toFixed(0)}&nbsp;USDT</p>
                                    </> : <div className="p-24">{rankList.length === 0 ? <p>
                                        {/* Waiting */}
                                        {t('invite.waiting')}
                                    </p> : <DotLoading color='primary' />}</div>}
                                </li>
                                <li>
                                    {rankList.length > 2 ? <>
                                        <div className="three-avatar">
                                            <img src={rankList[2].avatar ? rankList[2].avatar : require('../../assets/images/default_avatar.png')} alt="" />
                                        </div>
                                        <p>****{rankList[2].email.substring(rankList[2].email.length - 5, rankList[2].email.length)}</p>
                                        <p>{Number(rankList[2].reward).toFixed(0)}&nbsp;USDT</p>
                                    </> : <div className="p-24">{rankList.length < 3 ? <p>
                                        {/* Waiting */}
                                        {t('invite.waiting')}
                                    </p> : <DotLoading color='primary' />}</div>}
                                </li>
                            </ul>
                        </div>
                        <div className="other-list">
                            {outThree.length > 0
                                ? <ul>
                                    {
                                        outThree.map((el: Rank, index: number): ReactElement => {
                                            return (
                                                <li key={index}>
                                                    <div className="other-left">
                                                        <p>{index + 4}</p>
                                                        <div className="other-avatar">
                                                            <img src={el.avatar ? el.avatar : require('../../assets/images/default_avatar.png')} alt="" />
                                                        </div>
                                                        <p>****{el.email.substring(el.email.length - 5, el.email.length)}</p>
                                                    </div>
                                                    <p className="other-right">{el.reward}&nbsp;USDT</p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                : <>{outThree.length === 0 ? <p className="no-data">
                                    {/* Waiting */}
                                    Waiting
                                </p> : <DotLoading color='primary' />}</>}
                        </div>
                    </div>
                </div>
                <div className="invite-btn">
                    <Popover
                        content={<QrImg />}
                        trigger='click'
                        placement='top'
                    >
                        <div className="invite-qr">
                            <img src={require('../../assets/images/qr_2_icon_th.png')} alt="" />
                        </div>
                    </Popover>
                    <div className="invite-btn-inner">
                        <button onClick={() => {
                            // createPoster()
                            // openLoading()
                            setShareBox(true)
                        }}>
                            {/* Invite Friends */}
                            {t('invite.inv_more')}
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                visible={msgModal}
                content={<ModalContent invInfo={invInfo} closeModal={() => { setMsgModal(false) }} />}
                closeOnMaskClick
                closeOnAction
                onClose={() => {
                    setMsgModal(false)
                }}
            />
            <div className={`poster-box ${showPoster === 1 ? 'show-poster' : ''}`}>
                <div className="poster-mask" onClick={() => {
                    setShowPoster(0)
                }}></div>
                <SwiperMine invInfo={invInfo} lang={lang} />
                <div className="remark-save">
                    {/* Long press to save the picture */}
                    {t('invite.save')}
                </div>
            </div>
            {
                loadPoster && <div className="load-data">
                    <DotLoading color='primary' />
                </div>
            }
            {/* 分享 */}
            <Popup visible={shareBox} onMaskClick={() => { setShareBox(false) }}>
                <div className="share-popup">
                    <div className="share-title">
                        <p>
                            {/* Share to */}
                            {t('invite.share_to')}
                        </p>
                        <CloseOutline fontSize={16} color="#666" onClick={() => { setShareBox(false) }} />
                    </div>
                    <div className="share-apps">
                        <ul>
                            {
                                shareList.map((el: any, index: number): ReactElement => {
                                    return (
                                        <li key={index} onClick={() => {
                                            window.open(el.url)
                                        }}>
                                            <div className="apps-icon">
                                                <div className="icon-box">
                                                    <img src={el.icon} alt="" />
                                                </div>
                                                <p>{el.name}</p>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </Popup>
        </div >
    )
};
export default InviteIndexTh;