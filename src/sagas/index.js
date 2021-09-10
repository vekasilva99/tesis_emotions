import { all } from "redux-saga/effects";
import signUpSagas from "./SignUp";
import authSagas from "./Auth";

export default function* rootSaga(getState) {
  yield all([signUpSagas(),authSagas()]);
}
