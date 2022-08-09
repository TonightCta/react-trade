import { ReactElement, ReactNode, useEffect } from "react";
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import InnerNav from '../..//../components/inner_nav/nav';
import { useTranslation } from "react-i18next";
import './index.scss'

const About = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="about-index">
            <InnerNav leftArrow title={t('public.about_us')} />
            <p>hello 大家好，哥是周杰伦，目前哥的新专辑整体已经制作完成，很快将会与大家见面。哥目前有一首联动肯德基的歌曲，文山说他在歌词创作上缺少一点灵感，今天疯狂星期四，v哥五十块，新歌创作署名加上你</p>
            <p>hello 大家好，哥是周杰伦，目前哥的新专辑整体已经制作完成，很快将会与大家见面。哥目前有一首联动肯德基的歌曲，文山说他在歌词创作上缺少一点灵感，今天疯狂星期四，v哥五十块，新歌创作署名加上你</p>
            <p>哥目前有一首联动肯德基的歌曲，文山说他在歌词创作上缺少一点灵感，今天疯狂星期四，v哥五十块，新歌创作署名加上你</p>
            <p>hello 大家好，哥是周杰伦，目前哥的新专辑整体已经制作完成，很快将会与大家见面。哥目前有一首联动肯德基的歌曲，文山说他在歌词创作上缺少一点灵感，今天疯狂星期四，v哥五十块，新歌创作署名加上你</p>
            <p>hello 大家好，哥是周杰伦，目前哥的新专辑整体已经制作完成，很快将会与大家见面。哥目前有一首联动肯德基的歌曲，文山说他在歌词创作上缺少一点灵感，今天疯狂星期四，v哥五十块，新歌创作署名加上你</p>
            <p>hello 大家好，哥是周杰伦，目前哥的新专辑整体已经制作完成，很快将会与大家见面。哥目前有一首联动肯德基的歌曲，文山说他在歌词创作上缺少一点灵感，今天疯狂星期四，v哥五十块，新歌创作署名加上你</p>
            <p>hello 大家好，哥是周杰伦，目前哥的新专辑整体已经制作完成，很快将会与大家见面。哥目前有一首联动肯德基的歌曲，文山说他在歌词创作上缺少一点灵感，今天疯狂星期四，v哥五十块，新歌创作署名加上你</p>
        </div>
    )
};
export default About;