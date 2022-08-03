import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import zhCN from "./zh-CN.json";
import zhTW from "./zh-TW.json";


const resources = {
    en:{
        translation:en
    },
    zh_TW:{
        translation:zhTW
    },
    zh_CN:{
        translation:zhCN
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng:'zh_TW',
    interpolation:{
        escapeValue:false
    }
});

export default i18n;

