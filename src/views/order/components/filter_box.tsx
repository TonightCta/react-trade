import { CloseOutline, DownOutline, FilterOutline } from "antd-mobile-icons";
import { ReactElement, useState, useRef } from "react";
import { Popup, PickerView, Dropdown, Button, DatePickerView } from "antd-mobile";
import { DropdownRef } from 'antd-mobile/es/components/dropdown';
import { useTranslation } from 'react-i18next';
import { QUList } from '../../../request/api'

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
const coinVol : string[][] = [[]];

const getCoinList = async () => {
    const result = await QUList();
    for(let i in result.data.list){
        coinVol[0].push(`${result.data.list[i].base}/${result.data.list[i].target}`)
    };
};
getCoinList();

const ValDate = (_time: Date): string => {
    const date = new Date(_time);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
    return `${year}-${month}-${day}`
}

const FilterBox = (props: Props): ReactElement => {
    const { t } = useTranslation();
    const wayVol = [[t('public.buy_in'), t('public.sell_out')]];
    const typeVol = [[t('public.way_city'), t('public.way_limit')]];
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
                            <p className="drap-lable">
                                {/* 交易对 */}
                                {t('public.trade_qu')}
                            </p>
                            <p className="drap-result" onClick={() => {
                                showPop('filter');
                                setVollist(coinVol);
                                setPopTitle(t('public.trade_qu'));
                            }}>
                                <span className={`${!visValue.tradeCoin ? 'gray-span' : ''}`}>{visValue.tradeCoin ? visValue.tradeCoin : t('public.select_qu')}</span>
                                <DownOutline color="#999" fontSize={14} />
                            </p>
                        </div>
                        <div className="drap-box">
                            <p className="drap-lable">
                                {/* 交易方向 */}
                                {t('public.trade_way')}
                            </p>
                            <p className="drap-result" onClick={() => {
                                showPop('filter');
                                setVollist(wayVol);
                                setPopTitle(t('public.trade_way'));
                            }}>
                                <span className={`${!visValue.tradeWay ? 'gray-span' : ''}`}>{visValue.tradeWay ? visValue.tradeWay : t('public.select_way')}</span>
                                <DownOutline color="#999" fontSize={14} />
                            </p>
                        </div>
                        <div className="drap-box">
                            <p className="drap-lable">
                                {/* 交易类型 */}
                                {t('public.trade_type')}
                            </p>
                            <p className="drap-result" onClick={() => {
                                showPop('filter');
                                setVollist(typeVol);
                                setPopTitle(t('public.trade_type'));
                            }}>
                                <span className={`${!visValue.tradeType ? 'gray-span' : ''}`}>{visValue.tradeType ? visValue.tradeType : t('public.select_type')}</span>
                                <DownOutline color="#999" fontSize={14} />
                            </p>
                        </div>
                        <div className="drap-box">
                            <p className="drap-lable">
                                {/* 起止时间 */}
                                {t('public.filter_time')}
                            </p>
                            <div className="select-date">
                                <p className={`se-inp ${!visValue.startTime ? 'gray-span' : ''}`} onClick={() => {
                                    setVisBool({
                                        ...visBool,
                                        startTime: true,
                                    })
                                }}>{visValue.startTime ? ValDate(visValue.startTime) : t('public.start_time')}</p>
                                <p>-</p>
                                <p className={`se-inp ${!visValue.endTime ? 'gray-span' : ''}`} onClick={() => {
                                    setVisBool({
                                        ...visBool,
                                        endTime: true,
                                    })
                                }}>{visValue.endTime ? ValDate(visValue.endTime) : t('public.end_time')}</p>
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
                            }}>
                                {/* 重置 */}
                                {t('public.reset')}
                            </Button>
                            <Button color="primary" block onClick={() => {
                                props.setFilterVal({
                                    coin: visValue.tradeCoin,
                                    way: visValue.tradeWay,
                                    type: visValue.tradeType,
                                    startTime: visValue.startTime,
                                    endTime: visValue.endTime
                                })
                                DrapRef.current?.close();
                            }}>
                                {/* 确认 */}
                                {t('public.confirm')}
                            </Button>
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
                            tradeCoin: popTitle === t('public.trade_qu') ? visValue.pickerValue : visValue.tradeCoin,
                            tradeWay: popTitle === t('public.trade_way') ? visValue.pickerValue : visValue.tradeWay,
                            tradeType: popTitle === t('public.trade_type') ? visValue.pickerValue : visValue.tradeType,
                        })
                        closeFilter();
                    }}>
                        {/* 确认 */}
                        {t('public.confirm')}</Button></p>
                </div>
            </Popup>
            {/* 时间选择 - 开始时间 */}
            <Popup visible={visBool.startTime} onMaskClick={() => {
                closeFilter()
            }}>
                <div className="popup-con-mine">
                    <div className="popup-title-mine">
                        <p>
                            {/* 开始时间 */}
                            {t('public.start_time')}
                        </p>
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
                    }}>
                        {/* 确认 */}
                        {t('public.confirm')}</Button></p>
                </div>
            </Popup>
            {/* 时间选择 - 结束时间 */}
            <Popup visible={visBool.endTime} onMaskClick={() => {
                closeFilter()
            }}>
                <div className="popup-con-mine">
                    <div className="popup-title-mine">
                        <p>
                            {/* 结束时间 */}

                        </p>
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
                    }}>{/* 确认 */}
                        {t('public.confirm')}</Button></p>
                </div>
            </Popup>
        </div>
    )
};

export default FilterBox;