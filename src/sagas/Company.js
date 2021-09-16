import { all, call, put, takeEvery, select } from "redux-saga/effects";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  ADD_VIDEO_REQUEST,
  ADD_EMOTION_REQUEST,
} from "../constants/ActionTypes";
import { addVideoError, addVideoSuccess } from "../actions/Company";
import axios from "axios";
import { storage } from "../firebase";

// import API_URL from '../constants/ApiURL';

const addNewVideoRequest = async (payload) => {
  console.log("ENTRE PARA ACA",payload)
   storage
    .ref(`companies/videos/${payload._id}`)
    .put(payload.mainImg)
    .then(() => {
      storage
        .ref(`companies/videos`)
        .child(payload._id)
        .getDownloadURL()
        .then(async (url) => {
          console.log("ESTOY ACA",url);
          // const options = {
          //   url: "http://localhost:5000/video/add",
          //   method: "POST",
          //   headers: {
          //     Authorization: `Bearer ${localStorage.getItem("token")}`,
          //   },
          //   data: {
          //     name: payload.name,
          //     companyID: payload.companyID,
          //     mainImg: url,
          //     duration: payload.duration,
          //     link: payload.link,
          //     active: payload.active,
          //   },
          // };
          // let res = await axios(options)
          //   .then((resp2) => {
          //     console.log("IMAGE", resp2);
          //     return resp2;
          //   })
          //   .catch((err) => {
          //     console.log("Error: ", err);
          //     return err;
          //   });
          // return res;
        });
    });

  return "res2";
};

function* addVideo(payload) {
  try {
    const res = yield call(addNewVideoRequest, payload);
    if (res.data) {
      yield put(addVideoSuccess(res));
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
      yield put(addVideoError(error));
    }
  } catch (error) {
    yield put(addVideoError(error));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(ADD_VIDEO_REQUEST, addVideo)]);
}
