import React, { useEffect } from 'react';
import Slider from '../../components/slider/';
//import { connect } from "react-redux";
import { useSelector, useDispatch } from 'react-redux'
import { forceCheck } from 'react-lazyload';
import * as actionTypes from './store/actionCreators';
import RecommendList from '../../components/list/';

import { Content } from './style';
import Scroll from '../../baseUI/scroll/index';
import Loading from '../../baseUI/loading/index';

function Recommend(props) {

  //取得Redux store中dispatch函数的引用
  const dispatch = useDispatch()

  //第一次渲染时时获取轮播图数据和推荐列表数据
  useEffect(() => {
    dispatch(actionTypes.getBannerList())
    dispatch(actionTypes.getRecommendList())
  }, [])

  //从Redux store的state中提取数据
  //由于state中存储的是immutable数据，故要用getIn获取 immutable 对象属性,类似于state.recommend.bannerList
  const bannerList = useSelector(state => state.getIn(['recommend', 'bannerList']))
  const recommendList = useSelector(state => state.getIn(['recommend', 'recommendList']))
  const enterLoading = useSelector(state => state.getIn(['recommend', 'enterLoading']))

  //将 immutable 对象转换为 JS 对象，传递给Slider和RecommendList组件
  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? <Loading /> : null}
    </Content>
  );
}
export default React.memo(Recommend)


