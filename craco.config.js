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

//NW9pUjVyV0w1cTI3NUwyZzU2Q0I3N3lNNW91LzZaS3g1N3VaNUwyZzVaQ1g1NVdaNTUyQTVMbXc1cU82NXAyUTc3eU01TDJnNlllTzU1U2Y1NXFFNTRpNTVMbWY1WWlyNW91SjVMaUw=
