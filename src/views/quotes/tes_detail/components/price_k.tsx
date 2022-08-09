import { ReactElement, ReactNode, useEffect, useRef } from "react";
import { Tabs } from "antd-mobile";
import dock from './test.json';
import * as echarts from 'echarts';


const KTabs = [
    {
        title: 'Time',
        type: 1
    },
    {
        title: 'M1',
        type: 2
    },
    {
        title: 'M5',
        type: 3
    },
    {
        title: 'M30',
        type: 4
    },
    {
        title: 'H1',
        type: 5
    },
    {
        title: 'D1',
        type: 6
    },
];


const convet = (_timestamp: number): string => {
    let year, month, day, hour, min;
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
const TesPriceK = (props: { t: any }): ReactElement<ReactNode> => {
    const option: any = {
        height: 300,
        legend: {
            show: false,
        },
        grid: [
            {
                left: 0,
                right: 62,
                top: 10,
                bottom: 30
            },
            {
                left: 0,
                right: 62,
                bottom: "9%",
                height: 60,
            }
        ],
        xAxis: [
            {
                type: 'category',
                data: [],
                boundaryGap: false,
                axisLine: { onZero: false },
                splitLine: { show: false },
                min: 'dataMin',
                max: 'dataMax',
                axisPointer: {
                    z: 100
                }
            },
            {
                type: 'category',
                gridIndex: 1,
                data: [],
                boundaryGap: false,
                axisLine: { onZero: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                min: 'dataMin',
                max: 'dataMax'
            }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#3070ff',
                    fontWeight: 'bold'
                }
            },
            formatter: function (param: any) {
                param = param[0];
                return [
                    `<div style='display:flex;justify-content:space-between;'><p style='width:60px;text-align:left;'>${props.t('public.time')}:</p>` + `<p>${param.name}</p></div>`,
                    `<div style='display:flex;justify-content:space-between;'><p style='width:60px;text-align:left;'>${props.t('public.open')}:</p>` + `<p>${param.data[0]}</p></div>`,
                    `<div style='display:flex;justify-content:space-between;'><p style='width:60px;text-align:left;'>${props.t('public.high')}:</p>` + `<p>${Number(param.data[3]).toFixed(2)}</p></div>`,
                    `<div style='display:flex;justify-content:space-between;'><p style='width:60px;text-align:left;'>${props.t('public.recive')}:</p>` + `<p>${Number(param.data[1]).toFixed(2)}</p></div>`,
                    `<div style='display:flex;justify-content:space-between;'><p style='width:60px;text-align:left;'>${props.t('public.low')}:</p>` + `<p>${Number(param.data[2]).toFixed(2)}</p></div>`,
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
                    lineStyle: {
                        color: '#637e9d'
                    }
                },
                axisLabel: {
                    show: true,
                    showMinLabel: false,
                    showMaxLabel: false,
                    formatter: (value: number, index: number): number | string => {
                        return value.toFixed(2)
                    }
                },

            },
            {
                gridIndex: 1,
                position: "right",
                scale: true,
                splitNumber: 3,
                boundaryGap: false,
                splitLine: { show: false },
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
                start: 70,
                end: 100,
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
                    color: '#d04c62'
                },
                {
                    value: -1,
                    color: '#06ac8f'
                }
            ],
            tooltip: { show: false }
        },
        series: [
            {
                name: 'K',
                type: 'candlestick',
                data: [],
                itemStyle: {
                    color: '#d04c62',
                    color0: '#06ac8f',
                    borderColor: '#d04c62',
                    borderColor0: '#06ac8f'
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
    }
    useEffect((): void => {
        const date = dock.k.map(item => {
            return convet(item.t)
        });
        const data = dock.k.map(item => {
            return [item.o, item.c, item.l, item.h, item.v]
        });
        let volume: any = data.map((item, i) => {
            return [i, item[4], item[0] > item[1] ? -1 : 1]
        });
        option.xAxis[0].data = date;
        option.xAxis[1].data = date;
        option.series[0].data = data;
        option.series[1].data = calculateMA(5, data)
        option.series[2].data = calculateMA(10, data)
        option.series[3].data = calculateMA(20, data)
        option.series[4].data = calculateMA(30, data);
        option.series[5].data = volume;
        const test = echarts.init(document.getElementById('echarts-box') as HTMLElement);
        test.setOption(option);
    }, [])
    return (
        <div className="tes-price-k">
            <Tabs style={{ '--title-font-size': '14px' }}>
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
        </div>
    )
};

export default TesPriceK;