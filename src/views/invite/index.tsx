import { DotLoading, Modal, Popover, Toast } from "antd-mobile";
import { CloseOutline, RightOutline } from "antd-mobile-icons";
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
import { useAsyncState } from "../../utils/hooks";

const test = [1, 2, 3, 4, 5, 6, 7];
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
            <div className="content-box" dangerouslySetInnerHTML={{ __html: props.invInfo.article.content }}></div>
        </div>
    )
};

const SwiperMine = (props: { invInfo: any }): ReactElement => {
    const printElementOne = useRef() as React.MutableRefObject<any>;
    const printElementTwo = useRef() as React.MutableRefObject<any>;
    const printElementThree = useRef() as React.MutableRefObject<any>;
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
    useEffect(() => {
        new Swiper('#poster-swiper', {
            slidesPerView: 3,
            spaceBetween: 20,
            initialSlide: 1,
            centeredSlides: true,
        });
        setTimeout(() => {
            createImgFn();
        }, 500)
    }, [])
    return (
        <>
            <div className="before-create-1" ref={printElementOne}>
                <img src={require('../../assets/images/poster_1.png')} alt="" />
                <p>{`${props.invInfo?.link}?code=${props.invInfo?.code}`}</p>
                <div className="qr-box">
                    <QRCode value={`${props.invInfo?.link}?code=${props.invInfo?.code}`} size={42} id="qrCode" />
                </div>
            </div>
            <div className="before-create-1" ref={printElementTwo}>
                <img src={require('../../assets/images/poster_2.png')} alt="" />
                <p>{`${props.invInfo?.link}?code=${props.invInfo?.code}`}</p>
                <div className="qr-box">
                    <QRCode value={`${props.invInfo?.link}?code=${props.invInfo?.code}`} size={42} id="qrCode" />
                </div>
            </div>
            <div className="before-create-1" ref={printElementThree}>
                <img src={require('../../assets/images/poster_3.png')} alt="" />
                <p>{`${props.invInfo?.link}?code=${props.invInfo?.code}`}</p>
                <div className="qr-box">
                    <QRCode value={`${props.invInfo?.link}?code=${props.invInfo?.code}`} size={42} id="qrCode" />
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

const InviteIndex = (): ReactElement<ReactNode> => {
    const [msgModal, setMsgModal] = useState<boolean>(false);
    const history = useHistory();
    const { t } = useTranslation();

    const [invInfo, setInvInfo] = useState<any>(null);
    const getInvInfo = useCallback(async () => {
        const result = await InvInfoApi();
        setInvInfo(result.data);
    }, []);

    const copyLink = () => {
        copy(`${invInfo?.link}?code=${invInfo?.code}`);
        Toast.show(t('message.copy_success'))
    };
    const [showPoster, setShowPoster] = useState<number>(0);
    const [loadPoster, setLoadposter] = useState<boolean>(false);
    const [rankList, setRandList] = useState<Rank[]>([]);
    const [outThree, setOutThree] = useState<Rank[]>([]);
    // const [listTotal, setListTotal] = useState<number | null>(null)
    const openLoading = () => {
        setLoadposter(true);
        setTimeout(() => {
            setLoadposter(false);
            setShowPoster(1);
        }, 500)
    };
    const getRankList = async () => {
        const result = await RankInviteApi();
        const forword: Rank[] = [];
        const end: Rank[] = [];
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
            getInvInfo();
            setInvInfo(null)
            getRankList();
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
        <div className="invite-index">
            <InnerNav leftArrow title={t('public.inv_title')} />
            <div className="invite-box">
                <div className="invite-top">
                    <div className="top-inner">
                        <p onClick={() => {
                            setMsgModal(true)
                        }}>Rules<span><RightOutline fontSize={12} /></span></p>
                        <p onClick={() => {
                            const action = upInvLevel(4);
                            store.dispatch(action);
                            history.push('/inv-detail')
                        }}>Invitation<span><RightOutline fontSize={12} /></span></p>
                    </div>
                </div>
                <div className="p-12">
                    <div className="invite-box-1">
                        <div className="box-1-top"></div>
                        <div className="box-1-bottom">
                            <div className="btn-qr">
                                <button onClick={() => {
                                    // createPoster();
                                    openLoading()
                                }}>Share and get rewarded</button>
                                <Popover
                                    content={<QrImg />}
                                    trigger='click'
                                    placement='top'
                                >
                                    <div className="share-qr">
                                        <img src={require('../../assets/images/qr_icon.png')} alt="" />
                                    </div>
                                </Popover>

                            </div>
                            <div className="share-link">
                                <div className="link-code link-public">
                                    <p className="label">Invitation code</p>
                                    <div className="link-inner">
                                        <p>{invInfo?.code}</p>
                                        <img src={require('../../assets/images/copy_icon.png')} alt="" onClick={() => {
                                            copyLink()
                                        }} />
                                    </div>
                                </div>
                                <div className="link-url link-public">
                                    <p className="label">Referral link</p>
                                    <div className="link-inner">
                                        <p>{invInfo?.link}</p>
                                        <img src={require('../../assets/images/copy_icon.png')} alt="" onClick={() => {
                                            copyLink()
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="invite-box-2">
                        <p className="ranking-mine">No.999+</p>
                        <div className="three-list">
                            <ul>
                                <li>
                                    {rankList.length > 1 ? <>
                                        <div className="three-avatar">
                                            <img src={rankList[1].avatar} alt="" />
                                        </div>
                                        <p>****{rankList[1].email.substring(rankList[1].email.length - 5, rankList[1].email.length)}</p>
                                        <p>{rankList[1].reward}&nbsp;USDT</p>
                                    </> : <div className="p-24">{rankList.length < 2 ? <p>Waiting</p> : <DotLoading color='primary' />}</div>}
                                </li>
                                <li>
                                    {rankList.length > 0 ? <>
                                        <div className="three-avatar">
                                            <img src={rankList[0].avatar} alt="" />
                                        </div>
                                        <p>****{rankList[0].email.substring(rankList[0].email.length - 5, rankList[0].email.length)}</p>
                                        <p>{rankList[0].reward}&nbsp;USDT</p>
                                    </> : <div className="p-24">{rankList.length === 0 ? <p>Waiting</p> : <DotLoading color='primary' />}</div>}
                                </li>
                                <li>
                                    {rankList.length > 2 ? <>
                                        <div className="three-avatar">
                                            <img src={rankList[2].avatar} alt="" />
                                        </div>
                                        <p>****{rankList[2].email.substring(rankList[2].email.length - 5, rankList[2].email.length)}</p>
                                        <p>{rankList[2].reward}&nbsp;USDT</p>
                                    </> : <div className="p-24">{rankList.length < 3 ? <p>Waiting</p> : <DotLoading color='primary' />}</div>}
                                </li>
                            </ul>
                        </div>
                        <div className="other-list">
                            {outThree.length > 0
                                ? <ul>
                                    {
                                        rankList.map((el: Rank, index: number): ReactElement => {
                                            return (
                                                <li key={index}>
                                                    <div className="other-left">
                                                        <p>{index + 4}</p>
                                                        <div className="other-avatar">
                                                            <img src={el.avatar} alt="" />
                                                        </div>
                                                        <p>****{el.email.substring(rankList[2].email.length - 5, rankList[2].email.length)}</p>
                                                    </div>
                                                    <p className="other-right">{el.reward}&nbsp;USDT</p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                : <>{outThree.length === 0 ? <p className="no-data">Waiting</p> : <DotLoading color='primary' />}</>}
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
                            <img src={require('../../assets/images/qr_2_icon.png')} alt="" />
                        </div>
                    </Popover>
                    <div className="invite-btn-inner">
                        <button onClick={() => {
                            // createPoster()
                            openLoading()
                        }}>Invite Friends</button>
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
                <SwiperMine invInfo={invInfo} />
                <div className="remark-save">
                    Long press to save the picture
                </div>
            </div>
            {
                loadPoster && <div className="load-data">
                    <DotLoading color='primary' />
                </div>
            }
        </div >
    )
};
export default InviteIndex;