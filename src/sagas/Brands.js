import { all, call, put, takeEvery, select } from "redux-saga/effects";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  FETCH_COMPANIES_REQUEST,
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEO_REQUEST,
  FETCH_ALL_VIDEOS_REQUEST,
} from "../constants/ActionTypes";
import {
  fetchCompaniesSuccess,
  fetchCompaniesError,
  fetchVideosError,
  fetchVideosSuccess,
  fetchVideoSuccess,
  fetchVideoError,
  fetchAllVideosError,
  fetchAllVideosSuccess,
} from "../actions/Brands";
import axios from "axios";
import { storage } from "../firebase";

import {API_URL} from '../constants/ApiURL';

const fetchAllCompaniesRequest = async (payload) => {
  const options = {
    url: API_URL+"companies",
    method: "GET",
    headers: { "Content-Type": "application/json" },
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

const fetchVideosRequest = async (payload) => {

  const options = {
    url: API_URL+`companies/${payload.payload}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const options2 = {
    url: API_URL+`videos`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    data: {
      companyID: payload.payload,
    },
  };

  let res = await axios(options)
    .then(async (resp) => {
      let companyAux = resp.data;

      let res2 = await axios(options2).then((resp2) => {
        return {
          company: companyAux.data,
          videos: resp2.data.data.docs,
          status: 200,
        };
      });
      return res2;
    })
    .catch((error) => {
      return { status: error.response.status };
    });

  return res;
};

const fetchAllVideosRequest = async (payload) => {
  const options = {
    url: API_URL+`videos`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  let res = await axios(options)
    .then(async (resp) => {
      return { status: resp.status, resp: resp.data.data.docs };
    })
    .catch((error) => {
      return { status: error.response.status };
    });

  return res;
};

const fetchVideoRequest = async (payload) => {
  const options = {
    url: API_URL+`companies/${payload.payload.company}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const options2 = {
    url: API_URL+`videos/${payload.payload.video}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  let res = await axios(options)
    .then(async (resp) => {
      let companyAux = resp.data;

      let res2 = await axios(options2).then((resp2) => {

        return {
          company: companyAux.data,
          video: resp2.data.data[0],
          status: 200,
        };
      });
      return res2;
    })
    .catch((error) => {
      return { status: error.response.status };
    });

  return res;
};

function* fetchCompanies(payload) {
  try {
    const res = yield call(fetchAllCompaniesRequest, payload);
    if (res.data) {
      yield put(fetchCompaniesSuccess(res.data.data.docs));
    } else {
      yield put(fetchCompaniesError(res));
    }
  } catch (error) {
    yield put(fetchCompaniesError(error));
  }
}

function* fetchVideos(payload) {
  try {
    const res = yield call(fetchVideosRequest, payload);
    if (res.status === 200) {
      yield put(fetchVideosSuccess(res));
    } else {
      yield put(fetchVideosError(res));
    }
  } catch (error) {
    yield put(fetchVideosError(error));
  }
}

function* fetchAllVideos(payload) {
  try {
    const res = yield call(fetchAllVideosRequest, payload);
    if (res.status === 200) {
      yield put(fetchAllVideosSuccess(res.resp));
    } else {
      yield put(fetchAllVideosError(res));
    }
  } catch (error) {
    yield put(fetchAllVideosError(error));
  }
}

function* fetchVideo(payload) {
  try {
    const res = yield call(fetchVideoRequest, payload);
    if (res.status === 200) {
      yield put(fetchVideoSuccess(res));
    } else {
      yield put(fetchVideoError(res));
      // payload.payload.history.goBack()
    }
  } catch (error) {
    yield put(fetchVideoError(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_COMPANIES_REQUEST, fetchCompanies),
    takeEvery(FETCH_VIDEOS_REQUEST, fetchVideos),
    takeEvery(FETCH_VIDEO_REQUEST, fetchVideo),
    takeEvery(FETCH_ALL_VIDEOS_REQUEST, fetchAllVideos),
  ]);
}
