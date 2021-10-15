import { all, call, put, takeEvery, select } from "redux-saga/effects";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  ACCEPT_COMPANY_REQUEST,
  REJECT_COMPANY_REQUEST,
  BLOCK_VIDEO_REQUEST,
  UNBLOCK_VIDEO_REQUEST,
} from "../constants/ActionTypes";
import {
  acceptCompanyError,
  acceptCompanySuccess,
  rejectCompanyError,
  rejectCompanySuccess,
  blockVideoSuccess,
  blockVideoError,
  unblockVideoError,
  unblockVideoSuccess,
} from "../actions/Admin";
import {
  fetchCompaniesRequest,
  fetchAllVideosRequest,
} from "../actions/Brands";
import axios from "axios";
import { storage } from "../firebase";

import {API_URL} from '../constants/ApiURL';

const acceptCompanyRequest = async (payload) => {
  const req = payload.payload;

  const options = {
    url: API_URL+`companies/accept/${payload.payload._id}/true`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  let res = await axios(options)
    .then((resp) => {
      return { status: 200 };
    })
    .catch((error) => {
      return { status: error.response.status };
    });
  return res;
};

const rejectCompanyRequest = async (payload) => {
  const req = payload.payload;

  const options = {
    url: API_URL+`companies/accept/${payload.payload._id}/false`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  let res = await axios(options)
    .then((resp) => {
      return { status: 200 };
    })
    .catch((error) => {
      return { status: error.response.status };
    });
  return res;
};

const blockVideoRequest = async (payload) => {
  const req = payload.payload;

  const options = {
    url: API_URL+`videos/update/${req._id}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      active: false,
      name: req.name,
      _id: req._id,
      duration: req.duration,
      link: req.link,
      mainImg: req.mainImg,
      publishDate: req.publishDate,
    },
  };
  let res = await axios(options)
    .then((resp) => {
      return { status: 200 };
    })
    .catch((error) => {
      return { status: error.response.status };
    });
  return res;
};

const unblockVideoRequest = async (payload) => {
  const req = payload.payload;

  const options = {
    url: API_URL+`videos/update/${req._id}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      active: true,
      name: req.name,
      _id: req._id,
      duration: req.duration,
      link: req.link,
      mainImg: req.mainImg,
      publishDate: req.publishDate,
    },
  };
  let res = await axios(options)
    .then((resp) => {
      return { status: 200 };
    })
    .catch((error) => {
      return { status: error.response.status };
    });
  return res;
};

function* acceptCompany(payload) {
  try {
    const res = yield call(acceptCompanyRequest, payload);
    if (res.status === 200) {
      yield put(acceptCompanySuccess(res.emotions));
      yield put(fetchCompaniesRequest());
    } else {
      let error = { emailError: null };
      if (res.status === 500) {
        error = { emailError: "Error de Servidor"
 };
      } else {
        error = {
          error: "Oops. Algo salió mal."
,
        };
      }
      yield put(acceptCompanyError(error));
    }
  } catch (error) {
    yield put(acceptCompanyError(error));
  }
}

function* rejectCompany(payload) {
  try {
    const res = yield call(rejectCompanyRequest, payload);
    if (res.status === 200) {
      yield put(rejectCompanySuccess(res.emotions));
      yield put(fetchCompaniesRequest());
    } else {
      let error = { emailError: null };
      if (res.status === 500) {
        error = { emailError: "Error de Servidor"
 };
      } else {
        error = {
          error: "Oops. Algo salió mal."
,
        };
      }
      yield put(rejectCompanyError(error));
    }
  } catch (error) {
    yield put(rejectCompanyError(error));
  }
}

function* blockVideo(payload) {
  try {
    const res = yield call(blockVideoRequest, payload);
    if (res.status === 200) {
      yield put(blockVideoSuccess(res.emotions));
      yield put(fetchAllVideosRequest());
    } else {
      let error = { emailError: null };
      if (res.status === 500) {
        error = { emailError: "Error de Servidor"
 };
      } else {
        error = {
          error: "Oops. Algo salió mal."
,
        };
      }
      yield put(blockVideoError(error));
    }
  } catch (error) {
    yield put(blockVideoError(error));
  }
}

function* unblockVideo(payload) {
  try {
    const res = yield call(unblockVideoRequest, payload);
    if (res.status === 200) {
      yield put(unblockVideoSuccess(res.emotions));
      yield put(fetchAllVideosRequest());
    } else {
      let error = { emailError: null };
      if (res.status === 500) {
        error = { emailError: "Error de Servidor"
 };
      } else {
        error = {
          error: "Oops. Algo salió mal."
,
        };
      }
      yield put(unblockVideoError(error));
    }
  } catch (error) {
    yield put(unblockVideoError(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(ACCEPT_COMPANY_REQUEST, acceptCompany),
    takeEvery(REJECT_COMPANY_REQUEST, rejectCompany),
    takeEvery(BLOCK_VIDEO_REQUEST, blockVideo),
    takeEvery(UNBLOCK_VIDEO_REQUEST, unblockVideo),
  ]);
}
