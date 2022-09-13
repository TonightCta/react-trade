
import { Button } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import './index.scss'

export const AnnboxView = (): ReactElement<ReactNode> => {
    const [annClass,setAnnclass] = useState<string>('');
    // useEffect(() => {
    //     setAnnclass('open-ann')
    // },[])
    return (
        <div className={`annbox-view ${annClass}`}>
            <div className='annbox-mask' onClick={() => {
                setAnnclass('')
            }}></div>
            <div className='ann-content'>
                <p className='close-icon' onClick={() => {
                    setAnnclass('')
                }}>
                    <CloseOutline fontSize={14} color="#666" />
                </p>
                <div className='annbox-title'>
                    <p className='title-line'></p>
                    <p>公告</p>
                    <p className='title-line'></p>
                </div>
                <p className='annbox-text'>
                    这是文字文字是生生世世生生世世生生世世生生世世生生世世生生世世生生世这是文字文字是生生世世生生世世生生世世生生世世生生世世生生世世生生世
                </p>
                <p className='view-ann'>
                    <Button block color='primary'>查看详情</Button>
                </p>
            </div>
        </div>
    )
};

export default AnnboxView;