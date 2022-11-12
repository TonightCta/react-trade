import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ru from './ru.json'
import zhTW from "./zh-TW.json";
import th from './th.json'
import vie from './vie.json'
import store from "../store";

const resources = {
    en: {
        translation: en
    },
    ru: {
        translation: ru
    },
    zh_TW: {
        translation: zhTW
    },
    th: {
        translation: th
    },
    vie:{
        translation:vie
    }
};
i18n.use(initReactI18next).init({
    resources,
    lng: store.getState().language,
    interpolation: {
        escapeValue: false
    }
});

export default i18n;

