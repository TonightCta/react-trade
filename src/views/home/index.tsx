import React,{ ReactNode,useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import './index.scss'

interface Props{
    type?:string
}
const HomeIndex = (props:Props) : React.ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [state,setState] = useState('')
    useEffect(() : void => {
        console.log('Mounted')
    },[])
    return (
        <>
            <h1>{t('public.name')}</h1>
        </>
    )
};

export default React.memo(HomeIndex);


