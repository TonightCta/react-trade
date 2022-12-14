import { ReactElement, ReactNode, useEffect, useRef } from "react";
import { Tabs } from "antd-mobile";
import * as echarts from 'echarts';
import React from "react";
import { setKData } from "../../../../store/app/action_creators";
import store from "../../../../store";

interface Props {
    upKMsg: {
        k: any
    },
    t: any,
    time: number,
    price: number,
    getMoreKChild?: (time: number) => void;
    // setLineDataMine: (second: number, type: string) => void,
}

const KTabs = [
    {
        title: 'M1',
        type: '1m',
        sec: 60,
    },
    {
        title: 'M5',
        type: '5m',
        sec: 300,
    },
    {
        title: 'M30',
        type: '30m',
        sec: 1800,
    },
    {
        title: 'H1',
        type: '1h',
        sec: 3600
    },
];

let echartsMine: any = null;

const convet = (_timestamp: number): string => {
    let month, day, hour, min;
    month = new Date(_timestamp).getMonth() + 1;
    day = new Date(_timestamp).getDate();
    hour = new Date(_timestamp).getHours();
    min = new Date(_timestamp).getMinutes();
    month = month < 10 ? (month = '0' + month) : month;
    day = day < 10 ? (day = '0' + day) : day;
    return month + '-' + day + ' ' + hour + ':' + min;
}

const calculateMA = (dayCount: number, data: string[][]) => {
    var result = [];
    for (var i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += Number(data[i - j][1]);
        }
        result.push(sum / dayCount);
    };
    return result;
}
const TesPriceK = (props: Props): ReactElement<ReactNode> => {
    const zoom = JSON.parse(sessionStorage.getItem('dataZoom') || '{"start":50,"end":100}');
    const option: any = {
        height: 300,
        legend: {
            show: false,
        },
        grid: [
            {
                left: 0,
                top: 10,
                right: props.price > 10000 && 62 || props.price < 0.1 && 72 || 40,
                bottom: 30
            },
            {
                left: 0,
                bottom: "9%",
                right:62,
                height: 60,
            }
        ],
        xAxis: [
            {
                type: 'category',
                data: [],
                boundaryGap: false,
                axisLine: {
                    onZero: false, lineStyle: {
                        color: '#eee'
                    }
                },
                splitLine: { show: false },
                min: 'dataMin',
                max: 'dataMax',
                axisPointer: {
                    z: 100
                },
                axisLabel: {
                    color: '#333',
                }
            },
            {
                type: 'category',
                gridIndex: 1,
                data: [],
                boundaryGap: false,
                axisLine: {
                    onZero: false, lineStyle: {
                        color: '#eee'
                    }
                },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                min: 'dataMin',
                max: 'dataMax',
            }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#3070ff',
                    fontWeight: '500'
                }
            },
            formatter: function (param: any) {
                param = param[0];
                return [
                    `<div style='display:flex;justify-content:space-between;'><p style='width:60px;text-align:left;'>${props.t('public.time')}:</p>` + `<p>${param.name}</p></div>`,
                    `<div style='display:flex;justify-content:space-between;'><p style='width:60px;text-align:left;'>${props.t('public.open')}:</p>` + `<p>${param.data[4]}</p></div>`,
                    `<div style='display:flex;justify-content:space-between;'><p style='width:60px;text-align:left;'>${props.t('public.high')}:</p>` + `<p>${Number(param.data[2])}</p></div>`,
                    `<div style='display:flex;justify-content:space-between;'><p style='width:60px;text-align:left;'>${props.t('public.recive')}:</p>` + `<p>${Number(param.data[1])}</p></div>`,
                    `<div style='display:flex;justify-content:space-between;'><p style='width:60px;text-align:left;'>${props.t('public.low')}:</p>` + `<p>${Number(param.data[3])}</p></div>`,
                ].join('');
            }
        },
        yAxis: [
            {
                type: 'value',
                position: "right",
                scale: true,
                splitNumber: 5,
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#637e9d'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#eee'
                    }
                },
                axisTick: {
                    show: true
                },
                axisLabel: {
                    show: true,
                    showMinLabel: false,
                    showMaxLabel: false,
                    color: '#333',
                    formatter: (value: number, index: number): number | string => {
                        return value < 0.1 ? value.toFixed(6) : value.toFixed(2)
                    }
                },
            },
            {
                gridIndex: 1,
                position: "right",
                scale: true,
                splitNumber: 3,
                boundaryGap: false,
                axisLine: {
                    show: false,
                    onZero: true,
                    lineStyle: {
                        color: '#637e9d'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false,
                },
            }
        ],
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: zoom.start,
                end: zoom.end,
                top: 30,
                height: 20,
            }
        ],
        visualMap: {
            show: false,
            seriesIndex: 5,
            dimension: 2,
            pieces: [
                {
                    value: 1,
                    color: '#00c087'
                },
                {
                    value: -1,
                    color: 'rgb(226,5,4)'
                }
            ],
            tooltip: { show: false }
        },

        series: [

            {
                name: 'K',
                type: 'candlestick',
                barMaxWidth: '10px',
                data: [],
                itemStyle: {
                    color: '#00c087',
                    color0: 'rgb(226,5,4)',
                    borderColor: '#00c087',
                    borderColor0: 'rgb(226,5,4)'
                },
                label: {
                    show: true,
                    position: 'top'
                },
            },

            {
                name: 'MA5',
                type: 'line',
                data: [],
                smooth: true,
                lineStyle: {
                    opacity: 1,
                    width: 0.8,
                },
                animationDuration: 0,
                itemStyle: {
                    opacity: 0,
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: [],
                smooth: true,
                lineStyle: {
                    opacity: 1,
                    width: 0.8,
                },
                animationDuration: 0,
                itemStyle: {
                    opacity: 0
                }
            },
            {
                name: 'MA20',
                type: 'line',
                data: [],
                smooth: true,
                lineStyle: {
                    opacity: 1,
                    width: 0.8,
                },
                animationDuration: 0,
                itemStyle: {
                    opacity: 0
                }
            },
            {
                name: 'MA30',
                type: 'line',
                data: [],
                smooth: true,
                lineStyle: {
                    opacity: 1,
                    width: 0.8,
                },
                animationDuration: 0,
                itemStyle: {
                    opacity: 0
                }
            },
            {
                name: 'Volume',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: [],
            },

        ]
    };

    useEffect((): void => {
        if (props.upKMsg.k) {
            console.log(option)
            const date = props.upKMsg.k!.map((item: any) => {
                return convet(item.t)
            });
            const data = props.upKMsg.k!.map((item: any) => {
                return [item.o, item.c, item.l, item.h, item.v]
            });
            let volume: any = data!.map((item: any, i: number) => {
                return [i, item[4], item[0] > item[1] ? -1 : 1]
            });
            option.xAxis[0].data = date;
            option.xAxis[1].data = date;
            option.series[0].data = data;
            option.series[1].data = calculateMA(5, data);
            option.series[2].data = calculateMA(10, data);
            option.series[3].data = calculateMA(20, data);
            option.series[4].data = calculateMA(30, data);
            option.series[5].data = volume;
            let test = echarts.getInstanceByDom(document.getElementById('echarts-box') as HTMLElement);
            if (!test) {
                test = echarts.init(document.getElementById('echarts-box') as HTMLElement);
            }
            test.setOption(option);
            test.off('dataZoom')
            test.on('dataZoom', (params: any) => {
                const data = {
                    start: Math.ceil(params.batch[0].start),
                    end: Math.ceil(params.batch[0].end)
                }
                sessionStorage.setItem('dataZoom', JSON.stringify(data));
                if (params.batch[0].start === 0) {
                    // props.getMoreK(props.upKMsg.k[0].t)
                    const win: any = window;
                    win.getMoreK(props.upKMsg.k[0].t)
                }
            })
        };
    }, [props])
    return (
        <div className="tes-price-k">
            <Tabs style={{ '--title-font-size': '14px' }} onChange={(type) => {
                KTabs.forEach(e => {
                    if (e.type === type) {
                        const action = setKData(JSON.stringify({
                            "second": e.sec,
                            "type": type
                        }));
                        store.dispatch(action)
                    }
                })
            }}>
                {
                    KTabs.map((el): ReactElement => {
                        return (
                            <Tabs.Tab title={el.title} key={el.type}></Tabs.Tab>
                        )
                    })
                }
            </Tabs>
            <div className="echarts-box" id="echarts-box">

            </div>
        </div >
    )
};

export default React.memo(TesPriceK);