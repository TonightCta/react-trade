import { DotLoading } from "antd-mobile";
import { ReactElement } from "react";


const LoadData = (): ReactElement => {
    return (
        <div className="load-data">
            <div className="">
                <DotLoading color='primary' />
            </div>
        </div>
    )
};

export default LoadData;