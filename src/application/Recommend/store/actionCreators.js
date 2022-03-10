import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
});

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
});

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});

//getBannerList函数称之为thunk action creators。
//这些 action creator可以接受可以在 thunk 中使用的参数
//action creator返回thunk 函数
//将 thunk 中间件添加到 Redux store 后，可以直接将thunk 函数 直接传递给 store.dispatch
//http://cn.redux.js.org/tutorials/essentials/part-5-async-logic#thunk-%E5%87%BD%E6%95%B0
export const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest().then(data => {
      dispatch(changeBannerList(data.banners));
    }).catch(() => {
      console.log("轮播图数据传输错误");
    })
  }
};

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest().then(data => {
      dispatch(changeRecommendList(data.result));
      dispatch(changeEnterLoading(false));
    }).catch(() => {
      console.log("推荐歌单数据传输错误");
    });
  }
};

