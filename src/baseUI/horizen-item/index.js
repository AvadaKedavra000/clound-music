import React, { useState, useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import Scroll from '../scroll/index'
import { PropTypes } from 'prop-types';
import style from '../../assets/global-style';

//样式部分
const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  justify-content: center;
  overflow: hidden;
  >span:first-of-type{
    //display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    color: grey;
    font-size: ${style["font-size-m"]};
    //vertical-align: middle;
  }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 5px;
  border-radius: 10px;
  &.selected{
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`

function Horizen(props) {
    const [refreshCategoryScroll, setRefreshCategoryScroll] = useState(false);
    const Category = useRef(null);
    const { list, oldVal, title } = props;
    const { handleClick } = props;

    useEffect(() => {
        let categoryDOM = Category.current;
        let tagElems = categoryDOM.querySelectorAll("span");
        let totalWidth = 0;
        Array.from(tagElems).forEach(ele => {
            totalWidth += ele.offsetWidth;
        });
        totalWidth += 2;
        categoryDOM.style.width = `${totalWidth}px`;
        setRefreshCategoryScroll(true);
    }, [refreshCategoryScroll]);

    const clickHandle = (item) => {
        handleClick(item.key);//将props.list的某项item的key属性传递给props.handleClick
    }
    return (
        <Scroll direction={"horizental"} >
            <div ref={Category} >
                <List>
                    <span>{title}</span>
                    {
                        list.map((item) => {
                            return (
                                <ListItem
                                    key={item.key}
                                    className={oldVal === item.key ? 'selected' : ''}
                                    onClick={() => clickHandle(item)}>
                                    {item.name}
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        </Scroll>
    );
}

Horizen.defaultProps = {
    title: '',//列表左边的标题
    list: [],//接受的列表数据
    oldVal: '',//当前的 item 值
    handleClick: null//点击不同的 item 执行的方法
};

Horizen.propTypes = {
    list: PropTypes.array,
    oldVal: PropTypes.string,
    title: PropTypes.string,
    handleClick: PropTypes.func
};

export default memo(Horizen);