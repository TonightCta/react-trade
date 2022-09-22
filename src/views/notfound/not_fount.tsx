
import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import InnerNav from '../../components/inner_nav/nav'
import './index.scss'

const NotFound = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    return (
        <div className='not-found'>
            <InnerNav leftArrow />
            <img src={require('../../assets/images/not_found.png')} alt="" />
            <p>
                {/* 访问错误 */}
                {t('public.not_found')}
            </p>
        </div>
    )
};

export default NotFound;