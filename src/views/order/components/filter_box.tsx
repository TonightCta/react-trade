import { CloseOutline, DownOutline, FilterOutline } from "antd-mobile-icons";
import { ReactElement, useState, useRef } from "react";
import { Popup, PickerView, Dropdown, Button, DatePickerView } from "antd-mobile";
import { DropdownRef } from 'antd-mobile/es/components/dropdown'

type bol = boolean;

interface VisBool {
    selectFilter: bol,
    startTime: bol,
    endTime: bol,
}

interface VisValue {
    pickerValue: any,
    tradeCoin: string,
    tradeWay: string,
    tradeType: string,
    startTime: any,
    endTime: any,
}

interface EmitMsg {
    coin: string,
    way: string,
    type: string,
    startTime: number,
    endTime: number
};

interface Props {
    setFilterVal: (val: EmitMsg) => void,
}
const now = new Date();
const coinVol = [['BTC/USDT', 'ETH/USDT']];
const wayVol = [['买入', '卖出']];
const typeVol = [['市价委托', '限价委托']];

const ValDate = (_time: Date): string => {
    const date = new Date(_time);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
    return `${year}-${month}-${day}`
}

const FilterBox = (props: Props): ReactElement => {
    const DrapRef = useRef<DropdownRef>(null);
    //选择器数据
    const [volList, setVollist] = useState<string[][]>([[]]);
    //当前选择选择器类型
    const [popTitle, setPopTitle] = useState<string>('');
    //选择器弹出框
    const [visBool, setVisBool] = useState<VisBool>({
        selectFilter: false,
        startTime: false,
        endTime: false,
    });
    //选择器选中值
    const [visValue, setVisValue] = useState<VisValue>({
        pickerValue: [''],
        tradeCoin: '',
        tradeWay: '',
        tradeType: '',
        startTime: '',
        endTime: '',
    });
    //当前时间
    const [defaultNow] = useState<Date>(now);
    const showPop = (type: string): void => {
        setVisBool({
            ...visBool,
            selectFilter: type === 'filter' ? true : false,
            startTime: type === 'start' ? true : false,
            endTime: type === 'end' ? true : false,
        })
    };
    //关闭选择器
    const closeFilter = (): void => {
        setVisBool({
            ...visBool,
            selectFilter: false,
            startTime: false,
            endTime: false
        })
    }
    return (
        <div className="filter-box">
            <Dropdown ref={DrapRef}>
                <Dropdown.Item key="filter-mine" arrow="" title={<FilterOutline fontSize={16} />}>
                    <div className="filter-drap-box">
                        <div className="drap-box">
                            <p className="drap-lable">交易对</p>
                            <p className="drap-result" onClick={() => {
                                showPop('filter');
                                setVollist(coinVol);
                                setPopTitle('交易对');
                            }}>
                                <span className={`${!visValue.tradeCoin ? 'gray-span' : ''}`}>{visValue.tradeCoin ? visValue.tradeCoin : '请选择交易对'}</span>
                                <DownOutline color="#999" fontSize={14} />
                            </p>
                        </div>
                        <div className="drap-box">
                            <p className="drap-lable">交易方向</p>
                            <p className="drap-result" onClick={() => {
                                showPop('filter');
                                setVollist(wayVol);
                                setPopTitle('交易方向');
                            }}>
                                <span className={`${!visValue.tradeWay ? 'gray-span' : ''}`}>{visValue.tradeWay ? visValue.tradeWay : '请选择交易方向'}</span>
                                <DownOutline color="#999" fontSize={14} />
                            </p>
                        </div>
                        <div className="drap-box">
                            <p className="drap-lable">交易类型</p>
                            <p className="drap-result" onClick={() => {
                                showPop('filter');
                                setVollist(typeVol);
                                setPopTitle('交易类型');
                            }}>
                                <span className={`${!visValue.tradeType ? 'gray-span' : ''}`}>{visValue.tradeType ? visValue.tradeType : '请选择交易类型'}</span>
                                <DownOutline color="#999" fontSize={14} />
                            </p>
                        </div>
                        <div className="drap-box">
                            <p className="drap-lable">起止时间</p>
                            <div className="select-date">
                                <p className={`se-inp ${!visValue.startTime ? 'gray-span' : ''}`} onClick={() => {
                                    setVisBool({
                                        ...visBool,
                                        startTime: true,
                                    })
                                }}>{visValue.startTime ? ValDate(visValue.startTime) : '开始时间'}</p>
                                <p>-</p>
                                <p className={`se-inp ${!visValue.endTime ? 'gray-span' : ''}`} onClick={() => {
                                    setVisBool({
                                        ...visBool,
                                        endTime: true,
                                    })
                                }}>{visValue.endTime ? ValDate(visValue.endTime) : '结束时间'}</p>
                            </div>
                        </div>
                        <div className="drap-btn">
                            <Button color="default" block className="default-btn" onClick={() => {
                                setVisValue({
                                    pickerValue: [''],
                                    tradeCoin: '',
                                    tradeWay: '',
                                    tradeType: '',
                                    startTime: '',
                                    endTime: '',
                                });
                            }}>重置</Button>
                            <Button color="primary" block onClick={() => {
                                props.setFilterVal({
                                    coin: visValue.tradeCoin,
                                    way: visValue.tradeWay,
                                    type: visValue.tradeType,
                                    startTime: visValue.startTime,
                                    endTime: visValue.endTime
                                })
                                DrapRef.current?.close();
                            }}>确认</Button>
                        </div>
                    </div>
                </Dropdown.Item>
            </Dropdown>
            {/* 筛选条件选择 */}
            <Popup visible={visBool.selectFilter} onMaskClick={() => {
                closeFilter();
            }}>
                <div className="popup-con-mine">
                    <div className="popup-title-mine">
                        <p>{popTitle}</p>
                        <CloseOutline fontSize={14} color="#999" onClick={() => {
                            closeFilter();
                        }} />
                    </div>
                    <PickerView value={visValue.pickerValue} onChange={(val) => {
                        setVisValue({
                            ...visValue,
                            pickerValue: val
                        })
                    }} style={{ '--item-font-size': '14px' }} columns={volList} />
                    <p><Button color="primary" block onClick={() => {
                        setVisValue({
                            ...visValue,
                            tradeCoin: popTitle === '交易对' ? visValue.pickerValue : visValue.tradeCoin,
                            tradeWay: popTitle === '交易方向' ? visValue.pickerValue : visValue.tradeWay,
                            tradeType: popTitle === '交易类型' ? visValue.pickerValue : visValue.tradeType,
                        })
                        closeFilter();
                    }}>确认</Button></p>
                </div>
            </Popup>
            {/* 时间选择 - 开始时间 */}
            <Popup visible={visBool.startTime} onMaskClick={() => {
                closeFilter()
            }}>
                <div className="popup-con-mine">
                    <div className="popup-title-mine">
                        <p>开始时间</p>
                        <CloseOutline fontSize={14} color="#999" onClick={() => {
                            closeFilter()
                        }} />
                    </div>
                    <DatePickerView defaultValue={defaultNow} max={defaultNow} onChange={(val: Date) => {
                        setVisValue({
                            ...visValue,
                            startTime: val.getTime(),
                        })
                    }}></DatePickerView>
                    <p><Button color="primary" block onClick={() => {
                        closeFilter();
                        setVisValue({
                            ...visValue,
                            startTime: defaultNow.getTime(),
                        })
                    }}>确认</Button></p>
                </div>
            </Popup>
            {/* 时间选择 - 结束时间 */}
            <Popup visible={visBool.endTime} onMaskClick={() => {
                closeFilter()
            }}>
                <div className="popup-con-mine">
                    <div className="popup-title-mine">
                        <p>开始时间</p>
                        <CloseOutline fontSize={14} color="#999" onClick={() => {
                            closeFilter()
                        }} />
                    </div>
                    <DatePickerView defaultValue={defaultNow} max={defaultNow} onChange={(val: Date) => {
                        setVisValue({
                            ...visValue,
                            endTime: val.getTime(),
                        })
                    }}></DatePickerView>
                    <p><Button color="primary" block onClick={() => {
                        setVisValue({
                            ...visValue,
                            endTime: defaultNow.getTime(),
                        })
                        closeFilter()
                    }}>确认</Button></p>
                </div>
            </Popup>
        </div>
    )
};

export default FilterBox;