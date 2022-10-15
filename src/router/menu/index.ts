import UrlConfig from "config/url.config";
import { RouteMenu } from "model/other";
import product from "./product.route";

const menu: Array<RouteMenu> = [
  {
    path: UrlConfig.HOME,
    exact: true,
    title: "Tổng quan",
    icon: "icon-dashboard",
    component: product,
    key: "1",
    isShow: true,
    header: null,
    subMenu: [],
  },
];

export default menu;
