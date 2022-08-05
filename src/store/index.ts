import { createStore } from "redux";
import reducer from './app/reducer';

const win : any = window;

const store = createStore(
    reducer,
    win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;