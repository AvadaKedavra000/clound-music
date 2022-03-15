import React, { useState, useEffect } from 'react';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import {
    NavContainer,
    ListContainer,
    List,
    ListItem,
} from "./style";
import {
    getSingerList,
    getHotSingerList,
    changeEnterLoading,
    changePageCount,
    refreshMoreSingerList,
    changePullUpLoading,
    changePullDownLoading,
    refreshMoreHotSingerList
} from './store/actionCreators';

import LazyLoad, { forceCheck } from 'react-lazyload';
import Scroll from './../../baseUI/scroll/index';
import { connect } from 'react-redux';
import Loading from '../../baseUI/loading';
import { useSelector, useDispatch } from 'react-redux'

function Singers(props) {
    let [category, setCategory] = useState('');
    let [alpha, setAlpha] = useState('');

    const singerList = useSelector(state => state.getIn(['singers', 'singerList']))
    const enterLoading = useSelector(state => state.getIn(['singers', 'enterLoading']))
    const pullUpLoading = useSelector(state => state.getIn(['singers', 'pullUpLoading']))
    const pullDownLoading = useSelector(state => state.getIn(['singers', 'pullDownLoading']))
    const pageCount = useSelector(state => state.getIn(['singers', 'pageCount']))

    const dispatch = useDispatch()

    //以下以Dispatch结尾的辅助函数对分发不同的thunk函数的行为做了一层包装

    //获取热门歌手列表的处理
    const getHotSingerDispatch = () => {
        //dispatch(changeEnterLoading(true));//初始值已经设置为true
        //dispatch(changePageCount(0));//初始值已经设置为0
        dispatch(getHotSingerList());//获取热门歌手列表
    }

    //初始渲染时:
    useEffect(() => {
        getHotSingerDispatch()//获取热门歌手列表
        // eslint-disable-next-line
    }, []);

    //选择某个分类或首字母时的处理
    const updateDispatch = (category, alpha) => {
        dispatch(changeEnterLoading(true));
        dispatch(changePageCount(0));//页数置为0
        dispatch(getSingerList(category, alpha));//根据分类和首字母获取歌手列表
    }
    // 底部下拉加载的处理
    const pullUpRefreshDispatch = (category, alpha, count) => {
        dispatch(changePullUpLoading(true));
        dispatch(changePageCount(count + 1));//页数+1
        if (category === '' && alpha === '') {
            dispatch(refreshMoreHotSingerList());
        } else {
            dispatch(refreshMoreSingerList(category, alpha));
        }
    }
    //顶部下拉刷新的处理
    const pullDownRefreshDispatch = (category, alpha) => {
        dispatch(changePullDownLoading(true));
        dispatch(changePageCount(0));
        if (category === '' && alpha === '') {
            dispatch(getHotSingerList());
        } else {
            dispatch(getSingerList(category, alpha));
        }
    }

    //以下函数以props形式传递给当前Singer组件的子组件
    let handleUpdateAlpha = (newVal) => {//参数newVal为Horizen.props.list的某项item的key属性
        if (newVal === alpha) { return }//若点击同一个选项，则忽略
        setAlpha(newVal);//更新alpha为val
        updateDispatch(category, newVal);//触发某个分类或首字母时的处理
    };

    let handleUpdateCatetory = (newVal) => {//参数newVal为Horizen.props.list的某项item的key属性
        if (newVal === category) { return }
        setCategory(newVal);
        updateDispatch(newVal, alpha);
    };

    const handlePullUp = () => {
        pullUpRefreshDispatch(category, alpha, pageCount);
    };

    const handlePullDown = () => {
        pullDownRefreshDispatch(category, alpha);
    };

    const renderSingerList = () => {
        const list = singerList ? singerList.toJS() : [];
        console.log(props)
        return (
            <List>
                {
                    list.map((item, index) => {
                        return (
                            <ListItem key={item.accountId + "" + index}>
                                <div className="img_wrapper">
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music" />}>
                                        <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                                    </LazyLoad>
                                </div>
                                <span className="name">{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    };

    return (
        <div>
            <NavContainer>
                <Horizen
                    list={categoryTypes}
                    title={"分类(默认热门):"}
                    handleClick={(val) => handleUpdateCatetory(val)}
                    oldVal={category}
                >
                </Horizen>
                <Horizen
                    list={alphaTypes}
                    title={"首字母:"}
                    handleClick={val => handleUpdateAlpha(val)}
                    oldVal={alpha}
                >
                </Horizen>
            </NavContainer>
            <ListContainer>
                <Scroll
                    pullUp={handlePullUp}
                    pullDown={handlePullDown}
                    pullUpLoading={pullUpLoading}
                    pullDownLoading={pullDownLoading}
                    onScroll={forceCheck}
                >
                    {renderSingerList()}
                </Scroll>
                {enterLoading ? <Loading /> : null}
            </ListContainer>
        </div>
    )
}

export default Singers;