import { ReactElement, ReactNode, useEffect } from "react";
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import InnerNav from '../..//../components/inner_nav/nav'

const About = (): ReactElement<ReactNode> => {
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="about-index">
            <InnerNav leftArrow title="关于我们"/>
        </div>
    )
};
export default About;