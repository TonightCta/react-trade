import { ReactElement, ReactNode } from "react";

const TesPriceMsg = (): ReactElement<ReactNode> => {
    return (
        <div className="tes-price-msg">
            <div className="price-box msg-public">
                <p>38.2308</p>
                <p>+7.85%</p>
            </div>
            <div className="price-high msg-public">
                <div className="high-public">
                    <p>高</p>
                    <p>38.552</p>
                </div>
                <div className="high-public">
                    <p>低</p>
                    <p>37.8951</p>
                </div>
                <div className="high-public">
                    <p>24H量</p>
                    <p>884217.6128</p>
                </div>
            </div>
        </div>
    )
};

export default TesPriceMsg;