const pxtorem = require('postcss-pxtorem');

module.exports = {
    style: {
        postcss: {
            plugins: [
                pxtorem({
                    rootValue: 3.75, // 设计稿宽度/100，即分成多少份
                    unitPrecision: 5, // 小数精度
                    propList: [
                        "font",
                        "font-size",
                        "line-height",
                        "letter-spacing",
                        "width",
                        "height",
                    ],
                    selectorBlackList: [],
                    replace: true,
                    mediaQuery: false,
                    minPixelValue: 0,
                    exclude: /node_modules/i,
                }),
            ],
        },
    },
}