import { RootReducerType } from "domain/reducers/RootReducerType";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { loadSettingAppAction, loadUserFromStorageAction } from "domain/actions/app.action";
import { profilePermissionAction } from "domain/actions/auth/permission.action";
import { BrowserRouter } from "react-router-dom";
import { Suspense, useEffect } from "react";
import SplashScreen from "screen/splash.screen";
import MainRoute from "router";
import { BASE_NAME_ROUTER } from "config/url.config";
import { GlobalStyle } from "utils/global-styles";

function App() {
  const dispatch = useDispatch();
  const isLoad = useSelector((state: RootReducerType) => {
    return state.userReducer.isLoad;
  });

  const user_id = useSelector((state: RootReducerType) => state.userReducer.account?.user_id);
  useEffect(() => {
    if (!isLoad) {
      dispatch(loadUserFromStorageAction());
      dispatch(loadSettingAppAction());
    }
  }, [dispatch, isLoad]);

  /**
   * @description: load permission for user
   */
  useEffect(() => {
    if (user_id) {
      dispatch(profilePermissionAction(user_id));
    }
  }, [dispatch, user_id]);

  return (
    <BrowserRouter basename={BASE_NAME_ROUTER}>
      <Suspense fallback={<SplashScreen />}>
        <MainRoute />
      </Suspense>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
