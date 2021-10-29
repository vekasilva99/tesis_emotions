import { all, call, put, takeEvery, select } from "redux-saga/effects";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  ACCEPT_COMPANY_REQUEST,
  REJECT_COMPANY_REQUEST,
  BLOCK_VIDEO_REQUEST,
  UNBLOCK_VIDEO_REQUEST,
  CREATE_VIEW_REQUEST,
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
import { createViewSuccess, createViewError } from "../actions/Model";
import {
  fetchCompaniesRequest,
  fetchAllVideosRequest,
} from "../actions/Brands";
import axios from "axios";
import { storage } from "../firebase";

import {API_URL} from '../constants/ApiURL';

const createViewRequest = async (payload) => {
  const req = payload.payload;

  const options = {
    url: API_URL+`views/add`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      videoID: req.videoID,
      time: req.time,
      embedding: req.embedding,
      attention: req.attention,
      age: req.user.age,
      gender: req.user.gender,
      country: req.user.country,
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

function* createView(payload) {
  try {
    const res = yield call(createViewRequest, payload);
    if (res.status === 200) {
      yield put(createViewSuccess(res.emotions));
    } else {
      let error = { emailError: null };
      if (res.status === 500) {
<<<<<<< HEAD
        error = { emailError: "Server Error" };
      } else {
        error = {
          error: "Oops. Something went wrong.",
=======
        error = { emailError: "Error de Servidor"
 };
      } else {
        error = {
          error: "Oops. Algo salió mal."
,
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
        };
      }
      yield put(createViewError(error));
    }
  } catch (error) {
    yield put(createViewError(error));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(CREATE_VIEW_REQUEST, createView)]);
}
