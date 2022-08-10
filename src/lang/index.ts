import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ru from './ru.json'
import zhTW from "./zh-TW.json";
import store from "../store";

const resources = {
    en:{
        translation:en
    },
    ru:{
        translation:ru
    },
    zh_TW:{
        translation:zhTW
    },
};
console.log(store.getState().language)
i18n.use(initReactI18next).init({
    resources,
    lng:store.getState().language,
    interpolation:{
        escapeValue:false
    }
});

export default i18n;

