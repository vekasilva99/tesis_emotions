import { all, call, put, takeEvery, select } from "redux-saga/effects";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  ADD_VIDEO_REQUEST,
  ADD_EMOTION_REQUEST,
  FETCH_EMOTIONS_REQUEST,
} from "../constants/ActionTypes";
import {
  addVideoError,
  addVideoSuccess,
  addEmotionError,
  addEmotionSuccess,
  fetchEmotionsSuccess,
  fetchEmotionsError,
} from "../actions/Company";
import axios from "axios";
import { storage } from "../firebase";

// import API_URL from '../constants/ApiURL';

const addNewVideoRequest = async (payload) => {
  const req = payload.payload;

  let res2 = storage
    .ref(`companies/videos/${req._id}`)
    .put(payload.mainImg)
    .then(() => {
      let res3 = storage
        .ref(`companies/videos/${req._id}`)
        .getDownloadURL()
        .then(async (url) => {
          const options = {
            url: "http://localhost:5000/videos/add",
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: {
              name: req.name,
              companyID: req.companyID,
              mainImg: url,
              duration: req.duration,
              link: req.link,
              active: req.active,
            },
          };
          let res = await axios(options)
            .then((resp2) => {
              return resp2.status;
            })
            .catch((err) => {
              return err;
            });
          return res;
        })
        .catch((err) => {});
      return res3;
    });

  return res2;
};

const fetchEmotionsRequest = async (payload) => {
  const req = payload.payload;

  const options = {
    url: "http://localhost:5000/emotions",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  let res = await axios(options)
    .then((resp) => {
      return { status: 200, emotions: resp.data.data.docs };
    })
    .catch((error) => {
      return { status: error.response.status };
    });
  return res;
};

const addEmotionRequest = async (payload) => {
  const options = {
    url: "http://localhost:5000/emotions/add",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      active: true,
      name: payload.payload.emotion,
      companyID: payload.payload.company,
    },
  };
  let res = await axios(options)
    .then((resp) => {
      for (let i = 0; i < payload.payload.embeddings.length; i++) {
        storage
          .ref(`companies/emotions/${payload.payload.company}`)
          .put(payload.payload.embeddings[i].img)
          .then(() => {
            let res3 = storage
              .ref(`companies/emotions/${payload.payload.company}`)
              .getDownloadURL()
              .then(async (url) => {
                const options2 = {
                  url: `http://localhost:5000/embeddings/add`,
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                  data: {
                    img: url,
                    embedding: payload.payload.embeddings[i].embedding,
                    emotionID: resp.data.emotion._id,
                  },
                };
                let res2 = await axios(options2)
                  .then((resp2) => {
                    return 200;
                  })
                  .catch((err) => {
                    return err.response.status;
                  });
              })

              .catch((err) => {
                return err.response.status;
              });
          });
      }

      return 200;
    })
    .catch((error) => {
      return error.response.status;
    });

  return res;
};
function* addVideo(payload) {
  try {
    const res = yield call(addNewVideoRequest, payload);
    if (res === 200) {
      yield put(
        addVideoSuccess({ success: "The video has been successfully added." })
      );
    } else {
      let error = { emailError: null };
      if (res === 400) {
        error = {
          error:
            "There's already another video called like this one. Please, enter another name.",
        };
      } else if (res === 500) {
        error = { emailError: "Server Error" };
      } else {
        error = {
          error: "Oops. Something went wrong.",
        };
      }
      yield put(addVideoError(error));
    }
  } catch (error) {
    yield put(addVideoError(error));
  }
}

function* addEmotion(payload) {
  try {
    const res = yield call(addEmotionRequest, payload);
    if (res === 200) {
      yield put(
        addEmotionSuccess({
          success: "The emotion has been successfully added.",
        })
      );
    } else {
      let error = { emailError: null };
      if (res === 400) {
        error = {
          error:
            "There's already another emotion called like this one. Please, enter another name.",
        };
      } else if (res === 500) {
        error = { emailError: "Server Error" };
      } else {
        error = {
          error: "Oops. Something went wrong.",
        };
      }
      yield put(addEmotionError(error));
    }
  } catch (error) {
    yield put(addEmotionError(error));
  }
}

function* fetchEmotions(payload) {
  try {
    const res = yield call(fetchEmotionsRequest, payload);
    if (res.status === 200) {
      yield put(fetchEmotionsSuccess(res.emotions));
    } else {
      let error = { emailError: null };
      if (res.status === 400) {
        error = {
          error:
            "There's already another emotion called like this one. Please, enter another name.",
        };
      } else if (res.status === 500) {
        error = { emailError: "Server Error" };
      } else {
        error = {
          error: "Oops. Something went wrong.",
        };
      }
      yield put(fetchEmotionsError(error));
    }
  } catch (error) {
    yield put(fetchEmotionsError(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(ADD_VIDEO_REQUEST, addVideo),
    takeEvery(ADD_EMOTION_REQUEST, addEmotion),
    takeEvery(FETCH_EMOTIONS_REQUEST, fetchEmotions),
  ]);
}
