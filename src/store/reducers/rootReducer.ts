import {combineReducers} from 'redux';
import {reducer} from './shopsReducer';

export const rootReducer = combineReducers({
    shops: reducer
});