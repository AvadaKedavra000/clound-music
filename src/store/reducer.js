//reducer.js
// import {combineReducers} from 'redux'; 从这里取 state 是一个js对象
import { combineReducers } from 'redux-immutable';// 从这里取  state 是一个immutable对象
import { reducer as recommendReducer } from "../application/Recommend/store/index";
import { reducer as singersReducer } from '../application/Singers/store/index';

export default combineReducers({
    // 之后开发具体功能模块的时候添加 reducer
    recommend: recommendReducer,
    singers: singersReducer
});