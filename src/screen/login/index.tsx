import { useCallback, useState } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "model/reducers/RootReducerType";
import { loginRequestAction } from "domain/actions/auth/auth.action";
import { useQuery } from "utils/useQuery";
import UrlConfig from "config/url.config";
import { LoginWeb } from "./LoginWeb";

const Login = () => {
  const query = useQuery();
  const dispatch = useDispatch();

  const userReducer = useSelector((state: RootReducerType) => state.userReducer);
  console.log("userReducer", userReducer);

  const [loading, setLoading] = useState(false);
  let { isLogin } = userReducer;
  const onFinish = useCallback(
    (values) => {
      dispatch(loginRequestAction(values.username, values.password, setLoading));
    },
    [dispatch]
  );
  console.log("isLogin", isLogin);

  if (isLogin) {
    let url = query.get("returnUrl");
    return <Redirect to={url !== null ? url : UrlConfig.HOME} />;
  }

  return <LoginWeb onFinish={onFinish} loading={loading} />;
};

export default Login;
