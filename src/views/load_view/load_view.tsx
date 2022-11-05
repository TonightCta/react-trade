import { ReactElement, ReactNode, useEffect, useState } from "react";
import store from "../../store";
import { setLoadView } from "../../store/app/action_creators";
import { GetUrlKey } from '../../utils/index'



const LoadView: React.FC = (): ReactElement<ReactNode> => {
    const [showLoad, setShowload] = useState<string>('');
    const { loadView } = store.getState();
    useEffect((): void => {
        if (loadView === 0) {
            setTimeout(() => {
                setShowload('load-end');
                const action = setLoadView(1);
                store.dispatch(action)
            }, 1000);
        }
    }, []);
    const LAND : string | undefined = process.env.REACT_APP_LAND;
    return (
        <div>
            {
                loadView === 0 && !GetUrlKey('withoutload',window.location.href) ? <div className={`load-view ${showLoad}`}>
                    <img src={require(`../../assets/images/load_view${LAND == '3' ? '_new' : ''}.png`)} alt="" />
                </div> : null
            }
        </div>
    )
};

export default LoadView;