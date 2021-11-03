import { all } from "redux-saga/effects";
import signUpSagas from "./SignUp";
import authSagas from "./Auth";
import brandsSagas from "./Brands";
import companySagas from "./Company";
import adminSagas from "./Admin";
import modelSagas from "./Model";
import statsSagas from "./Statistics";
export default function* rootSaga(getState) {
  yield all([signUpSagas(),authSagas(),brandsSagas(),companySagas(),adminSagas(),modelSagas(),statsSagas()]);
}