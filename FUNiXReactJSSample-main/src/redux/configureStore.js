import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Staffs } from './staffs';
import { Department } from './departments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            department: Department,
        }),
       applyMiddleware(thunk, logger)
    );

    return store;
}