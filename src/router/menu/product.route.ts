import UrlConfig from "config/url.config";
import { RouteMenu } from "model/other";
import React from "react";
const Product = React.lazy(() => import("screen/products"));

const product: Array<RouteMenu> = [
  {
    path: UrlConfig.VARIANTS,
    exact: true,
    title: "Sản phẩm",
    icon: "icon-dot",
    component: Product,
    key: "submenu21",
    isShow: true,
    header: null,
    subMenu: [],
  },
];

export default product;
