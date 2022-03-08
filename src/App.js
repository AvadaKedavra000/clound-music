import React from "react";
import { Provider } from "react-redux";
import { IconStyle } from "./assets/iconfont/iconfont";//样式文件
import { GlobalStyle } from "./style";//全局样式
// import { renderRoutes } from "react-router-config"; //renderRoutes 读取路由配置转化为 Route 标签
import routes from "./routes/index.js";
import { HashRouter, useRoutes } from "react-router-dom";
import store from "./store/index";

function App() {
  return useRoutes(routes);
}
function AppWrapper() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <App />
      </HashRouter>
    </Provider>
  )
}

export default AppWrapper;
