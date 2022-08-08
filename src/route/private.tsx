import { ReactElement, ReactNode, useState } from "react";
import { Redirect, Route } from "react-router-dom";

interface Props {
    children: ReactElement,
    path: string,
    location?: unknown
}
const PrivateRoute = (props: Props): ReactElement<ReactNode> => {
    const [isAuth, setIsAuth] = useState(1);
    return (
        <div>
            <Route path={props.path} render={({ location }) => {
                return isAuth === 1 ? props.children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
            }} />
        </div>
    )
};

export default PrivateRoute;