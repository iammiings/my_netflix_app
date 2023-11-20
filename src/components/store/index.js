import {applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createStore} from 'redux'
import rootReducer from './reducers';

const middleware = [thunk];
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))

);
export default store;

