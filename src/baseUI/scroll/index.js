import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from 'styled-components';
import Loading from '../loading';
import { debounce } from "../../api/utils";
import LoadingV2 from '../loading-v2';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PullUpLoading = styled.div`
  position: absolute;
  left:0; right:0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left:0; right:0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

const Scroll = forwardRef((props, ref) => {
    const [bScroll, setBScroll] = useState();

    const scrollContaninerRef = useRef();

    const { direction, click, refresh, bounceTop, bounceBottom } = props;

    const { pullUp, pullDown, onScroll, pullUpLoading, pullDownLoading } = props;

    let pullUpDebounce = useMemo(() => {
        return debounce(pullUp, 300)
    }, [pullUp]);

    let pullDownDebounce = useMemo(() => {
        return debounce(pullDown, 300)
    }, [pullDown]);

    //实例化BetterScroll，赋给bScroll
    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: direction === "horizental",//是否开启横向滚动
            scrollY: direction === "vertical",//是否开启纵向滚动
            probeType: 3,//任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
            click: click,
            bounce: {
                top: bounceTop,//是否开启顶部回弹动画
                bottom: bounceBottom//是否开启底部回弹动画
            }
        });

        setBScroll(scroll);

        return () => {
            setBScroll(null);
        }
        // eslint-disable-next-line
    }, []);

    //若props.onScroll存在:当scroll事件触发时，执行props.onScroll回调函数
    useEffect(() => {
        if (!bScroll || !onScroll) return;
        const handle = () => {
            onScroll()//执行传入的函数
            //其他的一些操作
        }
        bScroll.on('scroll', handle)
        return () => {
            bScroll.off('scroll', handle);
        }
    }, [onScroll, bScroll]);

    useEffect(() => {
        if (!bScroll || !pullUp) return;
        bScroll.on('scrollEnd', () => {
            //判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                pullUpDebounce();
            }
        });
        return () => {
            bScroll.off('scrollEnd');
        }
    }, [pullUpDebounce, pullUp, bScroll]);

    //若props.pullDown不为空:当scroll事件触发时，执行props.onScroll回调函数
    useEffect(() => {
        if (!bScroll || !pullDown) return;
        bScroll.on('touchEnd', (pos) => {//当用户手指离开滚动区域
            if (pos.y > 50) {//若是下拉动作
                pullDownDebounce();//防抖执行pullDown函数
            }
        });
        return () => {
            bScroll.off('touchEnd');
        }
    }, [pullDownDebounce, pullDown, bScroll]);

    //当存在未被请求、渲染的图片或列表时，bs执行计算可滚动高度会出错，故我们总是在渲染或更新之后执行refresh方法
    useEffect(() => {
        if (refresh && bScroll) {
            bScroll.refresh();
        }
    });

    useImperativeHandle(ref, () => ({
        refresh() {
            if (bScroll) {
                bScroll.refresh();
                bScroll.scrollTo(0, 0);
            }
        },
        getBScroll() {
            if (bScroll) {
                return bScroll;
            }
        }
    }));

    const PullUpdisplayStyle = pullUpLoading ? { display: "" } : { display: "none" };
    const PullDowndisplayStyle = pullDownLoading ? { display: "" } : { display: "none" };
    return (
        <ScrollContainer ref={scrollContaninerRef}>
            {props.children}
            {/* 滑到底部加载动画 */}
            <PullUpLoading style={PullUpdisplayStyle}>
                <Loading></Loading>
            </PullUpLoading>
            {/* 顶部下拉刷新动画 */}
            <PullDownLoading style={PullDowndisplayStyle}>
                <LoadingV2></LoadingV2>
            </PullDownLoading>
        </ScrollContainer>
    );
})

Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,//当存在未被请求、渲染的图片或列表时，bs执行计算可滚动高度会出错，所以我们总是在渲染或更新之后执行refresh方法,故默认为true
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
};

Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']),//滚动的方向
    refresh: PropTypes.bool,//是否重新计算 BetterScroll
    onScroll: PropTypes.func,
    pullUp: PropTypes.func,
    pullDown: PropTypes.func,
    pullUpLoading: PropTypes.bool,
    pullDownLoading: PropTypes.bool,
    bounceTop: PropTypes.bool,//是否开启顶部回弹动画
    bounceBottom: PropTypes.bool//是否开启底部回弹动画
};

export default Scroll;