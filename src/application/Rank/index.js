import React, { useEffect } from 'react';
import { getRankList } from './store/index'
import Loading from '../../baseUI/loading';
import {
    List,
    ListItem,
    SongList,
    Container
} from './style';
import Scroll from '../../baseUI/scroll/index';
import { EnterLoading } from './../Singers/style';
import { filterIndex, filterIdx } from '../../api/utils';
import { useSelector, useDispatch } from 'react-redux'


function Rank(props) {

    const rankListImmutable = useSelector(state => state.getIn(['rank', 'rankList']))
    const loading = useSelector(state => state.getIn(['rank', 'loading']))

    const dispatch = useDispatch()

    //获取排行榜数据的处理
    const getRankListDataDispatch = () => {
        dispatch(getRankList());
    }

    //将immutable对象转为JS对象
    const rankList = rankListImmutable ? rankListImmutable.toJS() : [];

    useEffect(() => {
        if (!rankList.length) {
            getRankListDataDispatch();
        }
        // eslint-disable-next-line
    }, []);

    let globalStartIndex = filterIndex(rankList);//全球榜开始索引
    let officialList = rankList.slice(0, globalStartIndex);//官方榜列表
    let globalList = rankList.slice(globalStartIndex);//全球榜列表

    const enterDetail = (id) => {
        // const idx = filterIdx(name);
        // if (idx === null) {
        //     alert("暂无相关数据");
        //     return;
        // }
    }
    const renderSongList = (list) => {
        return list.length ? (
            <SongList>
                {
                    list.map((item, index) => {
                        return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
                    })
                }
            </SongList>
        ) : null;
    }
    //list为要渲染的列表，global为是否为全球榜单
    const renderRankList = (list, global) => {
        return (
            <List globalRank={global}>
                {
                    list.map((item) => {
                        return (
                            <ListItem
                                key={item.id}
                                tracks={item.tracks}/*全球榜单时才有这个tracks属性*/
                                onClick={() => enterDetail(item.id)}
                            >
                                <div className="img_wrapper">
                                    <img src={item.coverImgUrl} alt="" />
                                    <div className="decorate"></div>
                                    <span className="update_frequecy">{item.updateFrequency}</span>
                                </div>
                                {renderSongList(item.tracks)/*全球榜单时才有这个tracks属性*/}
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    let displayStyle = loading ? { "display": "none" } : { "display": "" };
    return (
        <Container>
            <Scroll>
                <div>
                    <h1 className="offical" style={displayStyle}>官方榜</h1>
                    {renderRankList(officialList, false)}
                    <h1 className="global" style={displayStyle}>全球榜</h1>
                    {renderRankList(globalList, true)}
                    {loading ? <EnterLoading><Loading></Loading></EnterLoading> : null}
                </div>
            </Scroll>
            {/* {renderRoutes(props.route.routes)} */}
        </Container>
    );
}

export default React.memo(Rank);