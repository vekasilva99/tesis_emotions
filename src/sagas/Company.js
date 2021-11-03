import { all, call, put, takeEvery, select } from "redux-saga/effects";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  ADD_VIDEO_REQUEST,
  ADD_EMOTION_REQUEST,
  FETCH_EMOTIONS_REQUEST,
  DISABLE_VIDEO_REQUEST,
  UPDATE_PROFILE_IMAGE_REQUEST,
  UPDATE_EMOTION_REQUEST,
} from "../constants/ActionTypes";
import {
  addVideoError,
  addVideoSuccess,
  addEmotionError,
  addEmotionSuccess,
  fetchEmotionsSuccess,
  fetchEmotionsError,
  disableVideoError,
  disableVideoSuccess,
  updateImageError,
  updateImageSuccess,
  updateEmotionSuccess,
  updateEmotionError,
  fetchEmotionsRequest,
} from "../actions/Company";
import {
  fetchVideosRequest
} from "../actions/Brands"
import axios from "axios";
import { storage } from "../firebase";
import moment from "moment";

import { API_URL } from "../constants/ApiURL";

const addNewVideoRequest = async (payload) => {
  const req = payload.payload;

  let res2 = storage
    .ref(`companies/videos/${req.companyID}/${req.name}`)
    .put(req.mainImg)
    .then(() => {
      let res3 = storage
        .ref(`companies/videos/${req.companyID}/${req.name}`)
        .getDownloadURL()
        .then(async (url) => {
          const options = {
            url: API_URL + "videos/add",
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

const fetchEmotionsRequest2 = async (payload) => {
  const req = payload.payload;

  const options = {
    url: API_URL + "emotions",
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

const disableVideoRequest = async (payload) => {
  const req = payload.payload;

  const options = {
    url: API_URL + `videos/update/${req._id}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: req,
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

const addEmotionRequest = async (payload) => {
  const options = {
    url: API_URL + "emotions/add",
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
  let cont = 0;

  let res = await axios(options)
    .then(async (resp) => {
      for (let i = 0; i < payload.payload.embeddings.length; i++) {
        let storageRes = await storage
          .ref(
            `companies/emotions/${payload.payload.company}/${resp.data.emotion._id}/${i}`
          )
          .put(payload.payload.embeddings[i].img)
          .then(async () => {
            let res3 = await storage
              .ref(
                `companies/emotions/${payload.payload.company}/${resp.data.emotion._id}/${i}`
              )
              .getDownloadURL()
              .then(async (url) => {
                const options2 = {
                  url: API_URL + `embeddings/add`,
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
                    cont++;
                    return 200;
                  })
                  .catch((errRes2) => {
                    return errRes2.response.status;
                  });
              })
              .catch((errorRes3) => {
                return { status: errorRes3.response.status };
              });
          })
          .catch((errorStorageRes) => {
            return { status: errorStorageRes.response.status };
          });
      }
    })
    .catch((errorRes) => {
      return { status: errorRes.response.status };
    });

  if (cont === 3) {
    return { status: 200 };
  } else {
    return { status: 502 };
  }
};

const updateImageRequest = async (payload) => {
  const req = payload.payload;

  let res = storage
    .ref(`companies/${req._id}`)
    .put(req.mainImg)
    .then(() => {
      return { status: 200 };
    })
    .catch((error) => {
      return { status: error.response.status };
    });

  return res;
};

const updateEmotionRequest = async (payload) => {
  let cont = 0;
  let storageRes = await storage
    .ref(
      `companies/emotions/${payload.payload.company}/${payload.payload.emotion}/${payload.payload.index}`
    )
    .put(payload.payload.embeddings.img)
    .then(async () => {
      let date=new Date().toISOString();
      const options2 = {
        url: API_URL + `embeddings/update/${payload.payload.embeddings._id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    
        data: {
          img: payload.payload.url+`?date=${date}`,
          embedding: payload.payload.embeddings.embedding,
          emotionID: payload.payload.emotion,
        },
      };
      let res2 = await axios(options2)
        .then((resp2) => {
          cont++;
          return 200;
        })
        .catch((errRes2) => {
          return errRes2.response.status;
        });
    })
    .catch((errorStorageRes) => {
      return { status: errorStorageRes.response.status };
    });

  if (cont === 1) {
    return { status: 200 };
  } else {
    return { status: 502 };
  }
};
function* addVideo(payload) {
  try {
    const res = yield call(addNewVideoRequest, payload);
    if (res === 200) {
      yield put(
        addVideoSuccess({ success: "El video se ha agregado correctamente." })
      );

      yield put(fetchVideosRequest(payload.payload.companyID))
      
    } else {
      let error = { emailError: null };
      if (res === 400) {
        error = {
          error:
            "Ya hay otro video llamado así. Por favor, ingrese otro nombre.",
        };
      } else if (res === 500) {
        error = { emailError: "Error de Servidor"
 };
      } else {
        error = {
          error: "Oops. Algo salió mal."
,
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
    if (res.status === 200) {
      yield put(fetchEmotionsRequest());
      yield put(
        addEmotionSuccess({
          success: "La emoción se ha agregado con éxito.",
        })
      );

    } else {
      let error = { emailError: null };
      if (res.status === 400) {
        error = {
          error:
            "Ya hay otra emoción llamada así. Por favor, ingrese otro nombre.",
        };
      } else if (res.status === 500) {
        error = { emailError: "Error de Servidor"
 };
      } else {
        error = {
          error: "Oops. Algo salió mal."
,
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
    const res = yield call(fetchEmotionsRequest2, payload);
    if (res.status === 200) {
      yield put(fetchEmotionsSuccess(res.emotions));
    } else {
      let error = { emailError: null };
      if (res.status === 400) {
        error = {
          error:
            "Ya hay otra emoción llamada así. Por favor, ingrese otro nombre.",
        };
      } else if (res.status === 500) {
        error = { emailError: "Error de Servidor"
 };
      } else {
        error = {
          error: "Oops. Algo salió mal."
,
        };
      }
      yield put(fetchEmotionsError(error));
    }
  } catch (error) {
    yield put(fetchEmotionsError(error));
  }
}

function* disableVideo(payload) {
  try {
    const res = yield call(disableVideoRequest, payload);
    if (res.status === 200) {
      yield put(disableVideoSuccess(res.emotions));
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
      yield put(fetchEmotionsError(error));
    }
  } catch (error) {
    yield put(fetchEmotionsError(error));
  }
}
function* updateImage(payload) {
  try {
    const res = yield call(updateImageRequest, payload);
    if (res.status === 200) {
      yield put(updateImageSuccess(res.emotions));
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
      yield put(updateImageError(error));
    }
  } catch (error) {
    yield put(updateImageError(error));
  }
}

function* updateEmotion(payload) {
  try {
    const res = yield call(updateEmotionRequest, payload);
    if (res.status === 200) {
      yield put(fetchEmotionsRequest());
      yield put(updateEmotionSuccess(res.emotions));

      yield put(payload.payload.setOpen(false))
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
      yield put(updateEmotionError(error));
    }
  } catch (error) {
    yield put(updateEmotionError(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(ADD_VIDEO_REQUEST, addVideo),
    takeEvery(ADD_EMOTION_REQUEST, addEmotion),
    takeEvery(FETCH_EMOTIONS_REQUEST, fetchEmotions),
    takeEvery(DISABLE_VIDEO_REQUEST, disableVideo),
    takeEvery(UPDATE_PROFILE_IMAGE_REQUEST, updateImage),
    takeEvery(UPDATE_EMOTION_REQUEST, updateEmotion),
  ]);
}
