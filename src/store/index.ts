import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { RootStateType, AppActions } from "../types";

let store;

export function configureStore() {
    store = createStore<RootStateType, AppActions, any, any>(rootReducer, applyMiddleware(thunk, logger));
    return store;
}