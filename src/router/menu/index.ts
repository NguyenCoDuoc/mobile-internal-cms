import UrlConfig from "config/url.config";
import { RouteMenu } from "model/other";
import React from "react";
import setting from "./setting.router";
const Dashboard = React.lazy(() => import("screen/dashboard"));

const menu: Array<RouteMenu> = [
  {
    path: UrlConfig.HOME,
    exact: true,
    title: "Tổng quan",
    icon: "icon-dashboard",
    component: Dashboard,
    key: "1",
    isShow: true,
    header: null,
    subMenu: [],
  },
  {
    path: UrlConfig.SETTINGS,
    exact: true,
    title: "Cài đặt",
    icon: "icon-setting",
    component: null,
    key: "2",
    isShow: true,
    header: null,
    subMenu: setting,
  },
];

export default menu;
