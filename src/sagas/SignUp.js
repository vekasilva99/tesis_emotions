import { all, call, put, takeEvery, select } from "redux-saga/effects";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  SIGN_UP_USER_REQUEST,
  SIGN_UP_COMPANY_REQUEST,
  SIGN_UP_ADMIN_REQUEST,
} from "../constants/ActionTypes";
import {
  signUpAdminError,
  signUpAdminSuccess,
  signUpCompanyError,
  signUpCompanySuccess,
  signUpUserError,
  signUpUserSuccess,
} from "../actions/SignUp";
import axios from "axios";
import { storage } from "../firebase";

// import API_URL from '../constants/ApiURL';

const signUpUserRequest = async (payload) => {
  const options = {
    url: "http://localhost:5000/users/register",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: payload.payload,
  };

  let res = await axios(options)
    .then((resp) => {
      return resp;
    })
    .catch((error) => {
      return error.response.status;
    });

  return res;
};

const signUpCompanyRequest = async (payload) => {
  const options = {
    url: "http://localhost:5000/companies/register",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      accepted: false,
      active: true,
      full_name: payload.payload.full_name,
      email: payload.payload.email,
      password: payload.payload.password,
      mainImg: " ",
    },
  };

  let res = await axios(options)
    .then((resp) => {
      storage
        .ref(`companies/${resp.data.data._id}`)
        .put(payload.payload.mainImg)
        .then(() => {
          storage
            .ref("companies")
            .child(resp.data.data._id)
            .getDownloadURL()
            .then(async (url) => {
              const options2 = {
                url: `http://localhost:5000/companies/register/${resp.data.data._id}/upload/image`,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                data: {
                  mainImg: url,
                },
              };
              let res2 = await axios(options2)
                .then((resp2) => {})
                .catch((err) => {});
            })
            .catch((err) => {});
        });
      return resp;
    })
    .catch((error) => {
      return error.response.status;
    });

  return res;
};

function* signUpUser(payload) {
  try {
    const res = yield call(signUpUserRequest, payload);
    if (res.data) {
      yield put(signUpUserSuccess(res));
    } else {
      let error = { emailError: null };
      if (res === 400) {
        error = {
          emailError: "There is already a user registered with this email.",
        };
      } else if (res === 500) {
        error = { emailError: "Server Error" };
      } else {
        error = {
          emailError: "Oops. Something went wrong.",
        };
      }
      yield put(signUpUserError(error));
    }
  } catch (error) {
    yield put(signUpUserError(error));
  }
}

function* signUpCompany(payload) {
  try {
    const res = yield call(signUpCompanyRequest, payload);
    if (res.data) {
      yield put(signUpCompanySuccess(res));
    } else {
      let error = { emailError: null };
      if (res === 400) {
        error = {
          emailError: "There is already a company registered with this email.",
        };
      } else if (res === 500) {
        error = { emailError: "Server Error" };
      } else {
        error = {
          emailError: "Oops. Something went wrong.",
        };
      }
      yield put(signUpCompanyError(error));
    }
  } catch (error) {
    yield put(signUpCompanyError(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(SIGN_UP_USER_REQUEST, signUpUser),
    takeEvery(SIGN_UP_COMPANY_REQUEST, signUpCompany),
  ]);
}
