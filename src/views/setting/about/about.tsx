import { ReactElement, ReactNode, useEffect, useRef } from "react";
import InnerNav from '../..//../components/inner_nav/nav';
import { useTranslation } from "react-i18next";
import { GetSlugApi } from '../../../request/api'
import './index.scss'

const About = (): ReactElement<ReactNode> => {
    const abountContent = useRef<string>('');
    const getUS = async () => {
        const result = await GetSlugApi('INDEX_ABOUT');
        abountContent.current = result.data.content;
    };
    useEffect(() => {
        getUS();
    }, [])
    const { t } = useTranslation();
    return (
        <div className="about-index">
            <InnerNav leftArrow title={t('public.about_us')} />
            <div style={{lineHeight:'22px'}} dangerouslySetInnerHTML={{__html:abountContent.current}}></div>
        </div>
    )
};
export default About;