import { all } from "redux-saga/effects";
import { accountSaga } from "./account/account.saga";
import { appSaga } from "./app.saga";
import { authSaga } from "./auth/auth.saga";
import { permissionSaga } from "./auth/permission.saga";
import { roleSaga } from "./auth/role.saga";
function* rootSaga() {
  yield all([appSaga(), authSaga(), accountSaga(), roleSaga(), permissionSaga()]);
}

export default rootSaga;
