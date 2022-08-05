import * as Type from "./types";

//设置语言
export const setLanguage = (language:string) => ({
    type:Type.SET_LANGUAGE,
    language
})
//更新底部导航显示状态
export const upFooterStatus = (status: number) => ({
    type: Type.UP_FOOTER_STATUS,
    status
});
//更新邀请查看等级
export const upInvLevel = (level:number) => ({
    type:Type.UP_INV_LEVEL,
    level
})

