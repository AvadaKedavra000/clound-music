import {
    getHotSingerListRequest,
    getSingerListRequest
} from "../../../api/request";
import {
    CHANGE_SINGER_LIST,
    CHANGE_CATOGORY,
    CHANGE_ALPHA,
    CHANGE_PAGE_COUNT,
    CHANGE_PULLUP_LOADING,
    CHANGE_PULLDOWN_LOADING,
    CHANGE_ENTER_LOADING
} from './constants';
import {
    fromJS
} from 'immutable';

//设置歌手列表
const changeSingerList = (data) => ({
    type: CHANGE_SINGER_LIST,
    data: fromJS(data)
});

//设置页数
export const changePageCount = (data) => ({
    type: CHANGE_PAGE_COUNT,
    data
});

//设置进场loading状态
export const changeEnterLoading = (data) => ({
    type: CHANGE_ENTER_LOADING,
    data
});

//设置滑动到最底部loading状态
export const changePullUpLoading = (data) => ({
    type: CHANGE_PULLUP_LOADING,
    data
});

//设置顶部下拉刷新loading状态
export const changePullDownLoading = (data) => ({
    type: CHANGE_PULLDOWN_LOADING,
    data
});


//getHotSingerList,refreshMoreHotSingerList等函数可以称为thunk action creators
//它返回 thunk 函数。这些 action creator 可以接受可以在 thunk 中使用的参数
//将 thunk 中间件添加到 Redux store 后，我们可以直接将 thunk 函数 直接传递给 store.dispatch

//第一次加载热门歌手
export const getHotSingerList = () => {
    return (dispatch) => {
        getHotSingerListRequest(0).then(res => {
            const data = res.artists;
            dispatch(changeSingerList(data));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
        }).catch(() => {
            console.log('热门歌手数据获取失败');
        })
    }
};

//加载更多热门歌手
export const refreshMoreHotSingerList = () => {
    return (dispatch, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        getHotSingerListRequest(pageCount).then(res => {
            const data = [...singerList, ...res.artists];
            dispatch(changeSingerList(data));
            dispatch(changePullUpLoading(false));
        }).catch(() => {
            console.log('热门歌手数据获取失败');
        });
    }
};

//第一次加载分类歌手
export const getSingerList = (category, alpha) => {
    return (dispatch, getState) => {
        getSingerListRequest(category, alpha, 0).then(res => {
            const data = res.artists;
            dispatch(changeSingerList(data));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
        }).catch(() => {
            console.log('歌手数据获取失败');
        });
    }
};

//加载更多分类歌手
export const refreshMoreSingerList = (category, alpha) => {
    return (dispatch, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        getSingerListRequest(category, alpha, pageCount).then(res => {
            const data = [...singerList, ...res.artists];
            dispatch(changeSingerList(data));
            dispatch(changePullUpLoading(false));
        }).catch(() => {
            console.log('歌手数据获取失败');
        });
    }
};