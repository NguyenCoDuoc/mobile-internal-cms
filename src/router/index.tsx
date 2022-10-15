import AuthRoute from "component/auth.route";
import UrlConfig from "config/url.config";
import { RouteMenu } from "model/other";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "screen/login";
import menu from "./menu";
const NotFoundScreen = React.lazy(() => import("screen/notfound.screen"));

const childRoute: Array<RouteMenu> = [];

const listMenu = () => {
  let list: Array<RouteMenu> = [];
  menu.forEach((item) => (list = [...list, ...getAllRoute(item)]));
  return list;
};

const getAllRoute = (route: RouteMenu) => {
  let temps: Array<RouteMenu> = [];
  if (route.subMenu.length > 0) {
    route.subMenu.forEach((subItem: RouteMenu) => {
      let menu = getAllRoute(subItem);
      temps = [...temps, ...menu];
    });
  }
  if (route.isShow) {
    if (route.path.includes(":")) {
      childRoute.push(route);
    } else {
      temps.push(route);
    }
  }
  return temps;
};

const MainRoute = () => {
  return (
    <Switch>
      {listMenu().map((item: RouteMenu) => (
        <AuthRoute
          key={item.key}
          component={item.component}
          exact={item.exact}
          path={item.path}
          title={item.title}
          permissions={item.permissions}
        />
      ))}
      {childRoute.map((item: RouteMenu) => (
        <AuthRoute
          key={item.key}
          component={item.component}
          exact={item.exact}
          path={item.path}
          title={item.title}
          permissions={item.permissions}
        />
      ))}
      <Route path={UrlConfig.LOGIN} exact={true} component={Login} />
      <Route component={NotFoundScreen} />
    </Switch>
  );
};

export default MainRoute;
