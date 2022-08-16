import { Button, Popover } from "antd-mobile";
import { CloseOutline, DeleteOutline, QuestionCircleOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import store from "../../../../store";
import { upFooterStatus } from "../../../../store/app/action_creators";
import { SwipeAction, Popup } from 'antd-mobile';
import './index.scss'


const AddressManage = (): ReactElement<ReactNode> => {
    const [addressList, setAddress] = useState<any[]>([1, 2, 3, 4]);
    const [addBox, setAddBox] = useState<boolean>(false);
    const [defaultNet, setDefaultNet] = useState<string>('ERC20');
    const [netList, setNetlist] = useState<string[]>(['ERC20', 'OMNI'])
    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, []);
    const closePop = () => {
        setAddBox(false)
    }
    return (
        <div className="address-manage">
            <InnerNav leftArrow title="地址管理" />
            <div className="address-list">
                {
                    addressList.map((item: any, index: number): ReactElement => {
                        return (
                            <div className="list-content">
                                <SwipeAction key={index} rightActions={[
                                    {
                                        key: 'delete',
                                        text: '删除',
                                        color: 'danger',
                                    },
                                ]}>
                                    <div className="address-content">
                                        <div className="address-remark">
                                            <p className="remark-text">
                                                这里是备注
                                            </p>
                                            <p className="remark-tag">
                                                ERC20
                                            </p>
                                        </div>
                                        <p className="address-text">TESuqEdPXAviVusYf6deBjKMprRBZa6yqE</p>
                                    </div>
                                </SwipeAction>
                            </div>
                        )
                    })
                }
            </div>
            <div className="add-address" onClick={() => { setAddBox(true) }}>
                <Button color="primary" block>添加地址</Button>
            </div>
            <Popup visible={addBox} onMaskClick={() => { closePop() }}>
                <div className="add-content">
                    <p className="add-title">
                        添加地址
                        <span onClick={() => {closePop()}}><CloseOutline /></span>
                    </p>
                    <div className="inp-box">
                        <p className="inp-title">
                            可用网络
                            <Popover
                                content='Hello World'
                                trigger='click'
                                placement='top'
                            >
                                <span><QuestionCircleOutline /></span>
                            </Popover>
                        </p>
                        <div className="net-list">
                            <ul>

                                {
                                    netList.map((el, index): ReactElement => {
                                        return (
                                            <li key={index} className={`${defaultNet === el ? 'select-net' : ''}`} onClick={() => {
                                                setDefaultNet(el)
                                            }}>
                                                {el}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="inp-list">
                            <p className="inp-label">地址</p>
                            <input type="text" placeholder="输入或长按粘贴地址" />
                        </div>
                        <div className="inp-list">
                            <p className="inp-label">备注</p>
                            <input type="text" placeholder="输入该地址备注" />
                        </div>
                    </div>
                    <div className="submit-address">
                        <Button color="primary" block>保存</Button>
                    </div>
                </div>
            </Popup>
        </div>
    )
};

export default AddressManage;