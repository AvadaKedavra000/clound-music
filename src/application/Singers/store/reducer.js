import * as actionTypes from './constants';
import { fromJS } from 'immutable';

//声明初始化 state
const defaultState = fromJS({
    artist: {},
    pageCount: 0,
    enterLoading: false,
    songsOfArtist: [],
    pullDownLoading: false,
    pullUpLoading: false
});


export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_SINGER_LIST:
            return state.set('singerList', action.data);
        case actionTypes.CHANGE_PAGE_COUNT:
            return state.set('pageCount', action.data);
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading', action.data);
        case actionTypes.CHANGE_PULLUP_LOADING:
            return state.set('pullUpLoading', action.data);
        case actionTypes.CHANGE_PULLDOWN_LOADING:
            return state.set('pullDownLoading', action.data);
        default:
            return state;
    }
}