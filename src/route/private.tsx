import { ReactElement, ReactNode, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import AnimatedRouter from "react-animated-router";

interface Props {
    children: ReactElement | ReactNode,
    path: string
}
const PrivateRoute = (props: Props): ReactElement<ReactNode> => {
    const [isAuth, setIsAuth] = useState(1);
    return (
        <Route path={props.path} render={({ location }) => {
            return isAuth == 1 ? props.children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
        }} />

    )
};

export default PrivateRoute;