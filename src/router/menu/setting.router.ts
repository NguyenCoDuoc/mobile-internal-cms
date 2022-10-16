import UrlConfig from "config/url.config";
import { RouteMenu } from "model/other";
import React from "react";

const VersionScreen = React.lazy(() => import("screen/setting/version"));

const menu: Array<RouteMenu> = [
  {
    path: UrlConfig.VERSIONS,
    exact: true,
    title: "Phiên bản",
    icon: "icon-version",
    component: VersionScreen,
    key: "1.1",
    isShow: true,
    header: null,
    subMenu: [],
  },
];

export default menu;
