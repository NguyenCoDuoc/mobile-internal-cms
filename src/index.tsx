import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import locale from "antd/lib/locale/vi_VN";
import App from "./App";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import store from "domain/store";
import "assets/css/app.scss";
import "antd/dist/antd.min.css";

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);
