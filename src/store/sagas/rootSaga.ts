import {all} from 'redux-saga/effects'
import {shopsSagas} from './shopsSaga';


export default function* rootSaga() {
    yield all([
        shopsSagas()
    ])
}