<<<<<<< HEAD
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
=======
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
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
