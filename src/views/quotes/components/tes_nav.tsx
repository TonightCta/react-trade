import { ReactElement, ReactNode } from "react";

const TesNav = (props:{t:any}) : ReactElement<ReactNode> => {
    return (
        <div className="tes-nav">
            <p>
            {/* 行情 */}
            {props.t('public.quotes')}
            </p>
        </div>
    )
};

export default TesNav;