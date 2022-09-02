import { ReactElement, ReactNode, useEffect, } from "react";
import { Redirect, Route, withRouter, RouteComponentProps } from "react-router-dom";
import { useAsyncState } from '../utils/hooks'
import store from '../store/index'

interface Props extends RouteComponentProps {
    children: ReactElement,
    path: string,
    locationMine?: any
}
const PrivateRoute = (props: Props): ReactElement<ReactNode> => {
    const [appToken, setAppToken] = useAsyncState<string | null>(localStorage.getItem('token_1'));
    const storeChange = () => {
        store.subscribe((): void => {
            setAppToken(store.getState().appToken)
        });
    };
    useEffect(() => {
        storeChange()
        return () => {
            storeChange()
        };
    },[])
    return (
        <div>
            <Route path={props.path} render={({ location }) => {
                return appToken ? props.children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
            }} />
        </div>
    )
};

export default withRouter(PrivateRoute);