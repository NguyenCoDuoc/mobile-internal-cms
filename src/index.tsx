import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.min.css";
import "./index.scss";
import locale from "antd/lib/locale/vi_VN";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "assets/css/app.scss";

import App from "./App";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import store from "domain/store";
import "assets/font/iconmon/font.css";
import "assets/font/laundry/style.css";

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);
