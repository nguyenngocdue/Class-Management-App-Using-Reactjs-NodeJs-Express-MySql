import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./reducers"

// Middleware cho phép viết các Action trả về một function
// xử lý bất đồng bộ phức tạp cần truy cập đến Store
import thunk from 'redux-thunk';

const initialState = {};

const middWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Step 1: Initialize State
const store = createStore (
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middWare))
    
)

export default store;