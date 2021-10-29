import { all, call, put, takeEvery, select } from "redux-saga/effects";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  SIGN_IN_USER_REQUEST,
  SIGN_IN_COMPANY_REQUEST,
  SIGN_IN_ADMIN_REQUEST,
  FETCH_USER_REQUEST,
} from "../constants/ActionTypes";
import {
  signInAdminError,
  signUpAdminSuccess,
  signInCompanyError,
  signInCompanySuccess,
  signInUserError,
  signInUserSuccess,
  fetchUserError,
  fetchUserSuccess,
} from "../actions/SignIn";
import axios from "axios";

// import API_URL from '../constants/ApiURL';

const signInUserRequest = async (payload) => {
  console.log("UPDATE RESUME", payload);
  const options = {
    url: "http://localhost:5000/login/user",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: payload.payload,
  };

  let res = await axios(options)
    .then((resp) => {
      console.log("RESPUESTA", resp);
      return resp;
    })
    .catch((error) => {
      console.log("ERROR", error.response.status);
      return error.response.status;
    });

  return res;
};

const fetchUserRequest = async (payload) => {
  console.log("UPDATE RESUME", payload);
  const options = {
    url: "http://localhost:5000/users/" + payload.payload,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    data: payload.payload,
  };

  let res = await axios(options)
    .then((resp) => {
      console.log("RESPUESTA", resp);
      return resp;
    })
    .catch((error) => {
      console.log("ERROR", error.response.status);
      return error.response.status
    });

  return res;
};

const signInCompanyRequest = async (payload) => {
  console.log("UPDATE RESUME", payload);
  const options = {
    url: "http://localhost:5000/login/company",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: payload.payload,
  };

  let res = await axios(options)
    .then((resp) => {
      console.log("RESPUESTA", resp);
      return resp;
    })
    .catch((error) => {
      console.log("ERROR", error.response.status);
      return error.response.status;
    });

  return res;
};

function* signInUser(payload) {
  try {
    const res = yield call(signInUserRequest, payload);
    if (res.data) {
      yield put(signInUserSuccess(res));
    } else {
      let error = { emailError: null, passwordError: null };
      if (res === 404) {
        error = {
          emailError: "The email or password you have provided is incorrect.",
          passwordError:
            "The email or password you have provided is incorrect.",
        };
      } else if (res === 400) {
        error = {
          emailError:
            "This user has been inactivated by the admins. You no longer have access to our system. Check your email for more information.",
          passwordError:
            "This user has been inactivated by the admins. You no longer have access to our system. Check your email for more information.",
        };
      } else if (res === 500) {
        error = { emailError: "Server Error", passwordError: "Server Error" };
      } else {
        error = {
          emailError: "Oops. Something went wrong.",
          passwordError: "Oops. Something went wrong.",
        };
      }
      yield put(signInUserError(error));
    }
  } catch (error) {
    yield put(signInUserError(error));
  }
}

function* fetchUser(payload) {
  try {
    const res = yield call(fetchUserRequest, payload);
    if (res.data.success) {
      yield put(fetchUserSuccess(res));
    } else {
      yield put(fetchUserError(res));
    }
  } catch (error) {
    yield put(fetchUserError(error));
  }
}

function* signInCompany(payload) {
  try {
    const res = yield call(signInCompanyRequest, payload);
    if (res.data) {
      yield put(signInCompanySuccess(res));
    } else {
      let error = { emailError: null, passwordError: null };
      if (res === 404) {
        error = {
          emailError: "The email or password you have provided is incorrect.",
          passwordError:
            "The email or password you have provided is incorrect.",
        };
      } else if (res === 400) {
        error = {
          emailError:
          'This company has been inactivated by the admins. You no longer have access to our system. Check your email for more information.',
          passwordError:
          'This company has been inactivated by the admins. You no longer have access to our system. Check your email for more information.',
        };
      } else if (res === 500) {
        error = { emailError: "Server Error", passwordError: "Server Error" };
      } else {
        error = {
          emailError: "Oops. Something went wrong.",
          passwordError: "Oops. Something went wrong.",
        };
      }
      yield put(signInCompanyError(error));
    }
  } catch (error) {
    yield put(signInCompanyError(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(SIGN_IN_USER_REQUEST, signInUser),
    takeEvery(FETCH_USER_REQUEST, fetchUser),
    takeEvery(SIGN_IN_COMPANY_REQUEST, signInCompany),
  ]);
}
