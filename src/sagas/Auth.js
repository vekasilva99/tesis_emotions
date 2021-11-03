import { all, call, put, takeEvery, select } from "redux-saga/effects";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  SIGN_IN_USER_REQUEST,
  SIGN_IN_COMPANY_REQUEST,
  SIGN_IN_ADMIN_REQUEST,
  FETCH_USER_REQUEST,
  SIGN_OUT,
  CHANGE_PASSWORD_REQUEST,
  UPDATE_PROFILE_REQUEST
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
  signOutSuccess,
  changePasswordError,
  changePasswordSuccess,
  updateProfileError,
  updateProfileSuccess
} from "../actions/SignIn";
import axios from "axios";

import {API_URL} from '../constants/ApiURL';

const signInUserRequest = async (payload) => {
  const options = {
    url: API_URL+"login/user",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: payload.payload,
  };

  let res = await axios(options)
    .then((resp) => {

      return {status:200,data:resp.data};
    })
    .catch((error) => {

      return {status:error.response.status};
    });

  return res;
};

const fetchUserRequest = async (payload) => {
  const options = {
    url: API_URL+"account",
    method: "GET",
    headers: { Authorization: `Bearer ${payload.payload}` },
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

const signInCompanyRequest = async (payload) => {
  const options = {
    url: API_URL+"login/company",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: payload.payload,
  };

  let res = await axios(options)
    .then((resp) => {
      return { status: 200, resp: resp };
    })
    .catch((error) => {
      return { status: error.response.status };
    });

  return res;
};

const signOutRequest = async (payload) => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("_id");

  return "res";
};



const changePasswordRequest = async (payload) => {
  const req=payload.payload
  const options = {
    url: req.company ? API_URL+`companies/changepassword/${req._id}`:API_URL+`users/changepassword/${req._id}`,
    method: "POST",
    headers: { Authorization: `Bearer ${window.localStorage.getItem("token")}` },
    data: {
      password:req.password,
      old_password:req.old_password
    },
  };

  let res = await axios(options)
    .then((resp) => {
     
      return { status: 200, resp: resp };
    })
    .catch((error) => {
      return { status: error.response.status };
    });

  return res;
};
const updateProfileRequest = async (payload) => {
  const req=payload.payload
  
  const options = {
    url:  req.isAdmin != undefined ? API_URL+`users/update/${req._id}`:API_URL+`companies/update/${req._id}`,
    method: "POST",
    headers: { Authorization: `Bearer ${window.localStorage.getItem("token")}` },
    data: req,
  };

  let res = await axios(options)
    .then((resp) => {

      return { status: 200, resp: resp };
    })
    .catch((error) => {
      return { status: error.response.status };
    });

  return res;
};

function* signInUser(payload) {
  try {
    const res = yield call(signInUserRequest, payload);
    if (res.status===200) {
      yield put(signInUserSuccess(res));
      payload.payload.history.push("/home");
    } else {
      let error = { emailError: null, passwordError: null };
      if (res.status === 404) {
        error = {
          emailError: "El correo electrónico o la contraseña que proporcionaste son incorrectos."
,
          passwordError:
            "El correo electrónico o la contraseña que proporcionaste son incorrectos."
,
        };
      } else if (res.status === 400) {
        error = {
          emailError:
            "Los administradores han desactivado a este usuario. Ya no tienes acceso a nuestro sistema. Consulte su correo electrónico para obtener más información."
,
          passwordError:
            "Los administradores han desactivado a este usuario. Ya no tienes acceso a nuestro sistema. Consulte su correo electrónico para obtener más información."
,
        };
      } else if (res.status === 500) {
        error = { emailError: "Error de Servidor"
, passwordError: "Error de Servidor"
 };
      } else {
        error = {
          emailError: "Oops. Algo salió mal."
,
          passwordError: "Oops. Algo salió mal."
,
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
    if (res.status === 200) {
      yield put(signInCompanySuccess(res.resp));
      payload.payload.history.push("/homeCompany");
    } else {
      let error = { emailError: null, passwordError: null };
      if (res.status === 404) {
        error = {
          emailError: "El correo electrónico o la contraseña que proporcionaste son incorrectos."
,
          passwordError:
            "El correo electrónico o la contraseña que proporcionaste son incorrectos."
,
        };
      } else if (res.status === 400) {
        error = {
          emailError:
            "Los administradores han desactivado esta empresa. Ya no tienes acceso a nuestro sistema. Consulte su correo electrónico para obtener más información."
,
          passwordError:
            "Los administradores han desactivado esta empresa. Ya no tienes acceso a nuestro sistema. Consulte su correo electrónico para obtener más información."
,
        };
      } else if (res.status === 500) {
        error = { emailError: "Error de Servidor"
, passwordError: "Error de Servidor"
 };
      } else {
        error = {
          emailError: "Oops. Algo salió mal."
,
          passwordError: "Oops. Algo salió mal."
,
        };
      }
      yield put(signInCompanyError(error));
    }
  } catch (error) {
    yield put(signInCompanyError(error));
  }
}

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
function* signOut(payload) {
  const res = yield call(signOutRequest, payload);
  yield call(delay, 2000);

  yield put(signOutSuccess());
  payload.payload.history.push("/home");
}

function* changePassword(payload) {
  try {
    const res = yield call(changePasswordRequest, payload);
    if (res.status === 200) {
      yield put(changePasswordSuccess(res.resp));
      payload.payload.setOpen(false)
    } else {
      let error = { emailError: null, passwordError: null };
      if (res.status === 404) {
        error = {
          emailError: "La contraseña anterior es incorrecta."
,
          passwordError:
            "La contraseña anterior es incorrecta."
,
        };
    
      } else if (res.status === 500) {
        error = { emailError: "Error de Servidor"
, passwordError: "Error de Servidor"
 };
      } else {
        error = {
          emailError: "Oops. Algo salió mal."
,
          passwordError: "Oops. Algo salió mal."
,
        };
      }
      yield put(changePasswordError(error));
    }
  } catch (error) {
    yield put(changePasswordError(error));
  }
}

function* updateProfile(payload) {
  try {
    const res = yield call(updateProfileRequest, payload);
    if (res.status === 200) {
      yield put(updateProfileSuccess(res.resp));
   
    } else {
      let error = { emailError: null, passwordError: null };
      if (res.status === 400) {
        error = {
          emailError: "Ya hay otro usuario registrado con ese correo electrónico."
,
          passwordError:
            "",
        };
    
      } else if (res.status === 500) {
        error = { emailError: "Error de Servidor"
, passwordError: "Error de Servidor"
 };
      } else {
        error = {
          emailError: "Oops. Algo salió mal."
,
          passwordError: "Oops. Algo salió mal."
,
        };
      }
      yield put(updateProfileError(error));
    }
  } catch (error) {
    yield put(updateProfileError(error));
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(SIGN_IN_USER_REQUEST, signInUser),
    takeEvery(FETCH_USER_REQUEST, fetchUser),
    takeEvery(SIGN_IN_COMPANY_REQUEST, signInCompany),
    takeEvery(SIGN_OUT, signOut),
    takeEvery(CHANGE_PASSWORD_REQUEST, changePassword),
    takeEvery(UPDATE_PROFILE_REQUEST, updateProfile),
  ]);
}
