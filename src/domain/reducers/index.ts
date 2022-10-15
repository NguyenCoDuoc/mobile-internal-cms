import { combineReducers } from "redux";
import appSettingReducer from "./appseting.reducer";
import loadingReducer from "./loading.reducer";
import userReducer from "./user.reducer";
import permissionReducer from "./permisson.reducer";
import bootstrapReducer from "./bootstrap.reducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  loadingReducer: loadingReducer,
  appSettingReducer: appSettingReducer,
  permissionReducer: permissionReducer,
  bootstrapReducer: bootstrapReducer,
});

export default rootReducer;
