import UrlConfig, { SettingUrl } from "config/url.config";
import { RouteMenu } from "model/other";
import React from "react";
import VersionCreateScreen from "screen/setting/version/create";
import VersionDetailScreen from "screen/setting/version/detail";
import VersionUpdateScreen from "screen/setting/version/update";

const VersionScreen = React.lazy(() => import("screen/setting/version"));

const menu: Array<RouteMenu> = [
  {
    path: UrlConfig.VERSIONS,
    exact: true,
    title: "Phiên bản",
    icon: "icon-version",
    component: VersionScreen,
    key: "2.1",
    isShow: true,
    header: null,
    subMenu: [
      {
        path: SettingUrl.VERSION_CREATE,
        exact: true,
        title: "Thêm phiên bản",
        icon: "icon-version",
        component: VersionCreateScreen,
        key: "2.1.1",
        isShow: true,
        header: null,
        subMenu: [],
      },
      {
        path: SettingUrl.VERSION_DETAIL,
        exact: true,
        title: "Chi tiết phiên bản",
        icon: "icon-version",
        component: VersionDetailScreen,
        key: "2.1.2",
        isShow: true,
        header: null,
        subMenu: [],
      },
      {
        path: SettingUrl.VERSION_UPDATE,
        exact: true,
        title: "Cập nhật phiên bản",
        icon: "icon-version",
        component: VersionUpdateScreen,
        key: "2.1.3",
        isShow: true,
        header: null,
        subMenu: [],
      },
    ],
  },
];

export default menu;
