//src/appliction/Home/index.js
import React from 'react';
import { Top, Tab, TabItem } from './style';
import { NavLink, Outlet } from 'react-router-dom';// 利用 NavLink 组件进行路由跳转

function TabNavLink(props) {
    const { to, label } = props
    return (
        <NavLink
            to={to}
            className={({ isActive }) => isActive ? "selected" : undefined}
        >
            <TabItem><span > {label} </span></TabItem>
        </NavLink>
    )
}

function Home(props) {
    return (
        <div>
            <Top>
                <span className="iconfont menu">&#xe65c;</span>
                <span className="title">WebApp</span>
                <span className="iconfont search">&#xe62b;</span>
            </Top>
            <Tab>
                <TabNavLink to="recommend" label="推荐" />
                <TabNavLink to="singers" label="歌手" />
                <TabNavLink to="rank" label="排行榜" />
            </Tab>

            <Outlet />
        </div>
    )
}

export default React.memo(Home);