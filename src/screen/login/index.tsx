import { useCallback, useState } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "model/reducers/RootReducerType";
import { loginRequestAction } from "domain/actions/auth/auth.action";
import { useQuery } from "utils/useQuery";
import UrlConfig from "config/url.config";
import { hotlineNumber } from "config/app.config";
import { LoginWeb } from "./LoginWeb";

const Login = () => {
  const query = useQuery();
  const dispatch = useDispatch();

  const userReducer = useSelector((state: RootReducerType) => state.userReducer);

  const [loading, setLoading] = useState(false);
  let { isLogin } = userReducer;
  const onFinish = useCallback(
    (values) => {
      dispatch(loginRequestAction(values.username, values.password, setLoading));
    },
    [dispatch]
  );
  if (isLogin) {
    let url = query.get("returnUrl");
    return <Redirect to={url !== null ? url : UrlConfig.HOME} />;
  }

  const callHotlineSupport = () => {
    window.location.href = `tel:${hotlineNumber}`;
  };

  return <LoginWeb callHotlineSupport={callHotlineSupport} onFinish={onFinish} loading={loading} />;
};

export default Login;
