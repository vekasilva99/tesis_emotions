import { all, call, put, takeEvery, select } from "redux-saga/effects";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  EMOTIONS_IN_VIDEO_REQUEST,
  STAT_AGE_REQUEST,
  STAT_ATTENTION_REQUEST,
  STAT_COUNTRY_REQUEST,
  STAT_GENDER_REQUEST,
  STAT_PAYING_ATTENTION_REQUEST,
  STAT_PREDOMINANT_EMOTION_REQUEST,
  STAT_PREDOMINANT_EMOTION_SUCCESS,
  STAT_TOP_RESULT_AGE_REQUEST,
  STAT_TOP_RESULT_COUNTRY_REQUEST,
  STAT_TOP_RESULT_GENDER_REQUEST,
  STAT_TOTAL_VIEW_REQUEST,
} from "../constants/ActionTypes";
import {
  emotionsInVideoSuccess,
  emotionsInVideoError,
  statAgeSuccess,
  statAgeError,
  statAttentionSuccess,
  statAttentionError,
  statCountrySuccess,
  statCountryError,
  statGenderSuccess,
  statGenderError,
  statPredominantEmotionSuccess,
  statPredominantEmotionError,
  statPayingAttentionSuccess,
  statPayingAttentionError,
  statTopAgeSuccess,
  statTopAgeError,
  statTopCountrySuccess,
  statTopCountryError,
  statTopGenderSuccess,
  statTopGenderError,
  statTotalViewsSuccess,
  statTotalViewsError
} from "../actions/Statistics";
import axios from "axios";
import { storage } from "../firebase";

// import API_URL from '../constants/ApiURL';

const totalViewsRequest = async (payload) => {
  const options = {
    url: `http://localhost:5000/statistics/total-views/${payload.payload}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },

  };

  let res = await axios(options)
  .then((resp) => {
    return {status:200,res:resp.data.data};
  })
  .catch((error) => {
    return {status:error.response.status};
  });

return res;
};


const topGenderRequest = async (payload) => {
  const options = {
    url: `http://localhost:5000/statistics/top-results/gender/${payload.payload}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },

  };

  let res = await axios(options)
  .then((resp) => {

    return {status:200,res:resp.data.data[0]};
  })
  .catch((error) => {
    return {status:error.response.status};
  });

return res;
};

const topCountryRequest = async (payload) => {
  const options = {
    url: `http://localhost:5000/statistics/top-results/country/${payload.payload}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },

  };

  let res = await axios(options)
  .then((resp) => {

    return {status:200,res:resp.data.data[0]};
  })
  .catch((error) => {
    return {status:error.response.status};
  });

return res;
};

const topAgeRequest = async (payload) => {
  const options = {
    url: `http://localhost:5000/statistics/top-results/age/${payload.payload}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },

  };

  let res = await axios(options)
  .then((resp) => {
    return {status:200,res:resp.data.data[0]};
  })
  .catch((error) => {
    return {status:error.response.status};
  });

return res;
};

const payingAttentionRequest = async (payload) => {
  const options = {
    url: `http://localhost:5000/statistics/paying-attention/${payload.payload}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },

  };

  let res = await axios(options)
  .then((resp) => {
    return {status:200,res:resp.data.data};
  })
  .catch((error) => {
    return {status:error.response.status};
  });

return res;
};

const predominantEmotionRequest = async (payload) => {
  const options = {
    url: `http://localhost:5000/statistics/predominant-emotion`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data:{
      videoID:payload.payload.videoID,
      emotions:payload.payload.emotions
    }

  };

  let res = await axios(options)
  .then((resp) => {

    return {status:200,res:resp.data.data};
  })
  .catch((error) => {
    return {status:error.response.status};
  });

return res;
};

const genderRequest = async (payload) => {
  const options = {
    url: `http://localhost:5000/statistics/gender/${payload.payload}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },

  };

  let res = await axios(options)
  .then((resp) => {

    return {status:200,res:resp.data.data};
  })
  .catch((error) => {
    return {status:error.response.status};
  });

return res;
};

const countryRequest = async (payload) => {
  const options = {
    url: `http://localhost:5000/statistics/country/${payload.payload}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },

  };

  let res = await axios(options)
  .then((resp) => {

    return {status:200,res:resp.data.data};
  })
  .catch((error) => {
    return {status:error.response.status};
  });

return res;
};

const ageRequest = async (payload) => {
  const options = {
    url: `http://localhost:5000/statistics/age/${payload.payload}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },

  };

  let res = await axios(options)
  .then((resp) => {

    return {status:200,res:resp.data.data};
  })
  .catch((error) => {
    return {status:error.response.status};
  });

return res;
};

const attentionRequest = async (payload) => {
  const options = {
    url: `http://localhost:5000/statistics/attention-in-video/${payload.payload}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },

  };

  let res = await axios(options)
  .then((resp) => {
    return {status:200,res:resp.data.data};
  })
  .catch((error) => {
    return {status:error.response.status};
  });

return res;
};

const emotionsRequest = async (payload) => {
  console.log("EMO")
  const options = {
    url: `http://localhost:5000/statistics/emotions-in-video`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data:{
      videoID:payload.payload.videoID,
      emotions:payload.payload.emotions
    }
  };

  let res = await axios(options)
  .then((resp) => {
    console.log("EMOTIONS!!",resp)
    return {status:200,res:resp.data.data};
  })
  .catch((error) => {
    return {status:error.response.status};
  });

return res;
};

function* totalViews(payload) {
  try {
    const res = yield call(totalViewsRequest, payload);
    if (res.status === 200) {
      yield put(
        statTotalViewsSuccess(res.res)
      );
    } else {
      let error = { emailError: null };

      error = {
        error: "Oops. Something went wrong.",
      };
      yield put(statTotalViewsError(error));
    }
  } catch (error) {
    yield put(statTotalViewsError(error));
  }
}

function* topGender(payload) {
  try {
    const res = yield call(topGenderRequest, payload);
    if (res.status === 200) {
      yield put(
        statTopGenderSuccess(res.res)
      );
    } else {
      let error = { emailError: null };

      error = {
        error: "Oops. Something went wrong.",
      };
      yield put( statTopGenderError(error));
    }
  } catch (error) {
    yield put( statTopGenderError(error));
  }
}

function* topCountry(payload) {
  try {
    const res = yield call(topCountryRequest, payload);
    if (res.status === 200) {
      yield put(
        statTopCountrySuccess(res.res)
      );
    } else {
      let error = { emailError: null };

      error = {
        error: "Oops. Something went wrong.",
      };
      yield put( statTopCountryError(error));
    }
  } catch (error) {
    yield put( statTopCountryError(error));
  }
}
function* topAge(payload) {
  try {
    const res = yield call(topAgeRequest, payload);
    if (res.status === 200) {
      yield put(
        statTopAgeSuccess(res.res)
      );
    } else {
      let error = { emailError: null };

      error = {
        error: "Oops. Something went wrong.",
      };
      yield put( statTopAgeError(error));
    }
  } catch (error) {
    yield put( statTopAgeError(error));
  }
}

function* payingAttention(payload) {
  try {
    const res = yield call(payingAttentionRequest, payload);
    if (res.status === 200) {
      yield put(
        statPayingAttentionSuccess(res.res)
      );
    } else {
      let error = { emailError: null };

      error = {
        error: "Oops. Something went wrong.",
      };
      yield put( statPayingAttentionError(error));
    }
  } catch (error) {
    yield put( statPayingAttentionError(error));
  }
}

function* predominantEmotion(payload) {
  try {
    const res = yield call(predominantEmotionRequest, payload);
    if (res.status === 200) {
      yield put(
        statPredominantEmotionSuccess(res.res)
      );
    } else {
      let error = { emailError: null };

      error = {
        error: "Oops. Something went wrong.",
      };
      yield put( statPredominantEmotionError(error));
    }
  } catch (error) {
    yield put( statPredominantEmotionError(error));
  }
}

function* gender(payload) {
  try {
    const res = yield call(genderRequest, payload);
    if (res.status === 200) {
      yield put(
        statGenderSuccess(res.res)
      );
    } else {
      let error = { emailError: null };

      error = {
        error: "Oops. Something went wrong.",
      };
      yield put( statGenderError(error));
    }
  } catch (error) {
    yield put( statGenderError(error));
  }
}

function* country(payload) {
  try {
    const res = yield call(countryRequest, payload);
    if (res.status === 200) {
      yield put(
        statCountrySuccess(res.res)
      );
    } else {
      let error = { emailError: null };

      error = {
        error: "Oops. Something went wrong.",
      };
      yield put( statCountryError(error));
    }
  } catch (error) {
    yield put( statCountryError(error));
  }
}

function* age(payload) {
  try {
    const res = yield call(ageRequest, payload);
    if (res.status === 200) {
      yield put(
        statAgeSuccess(res.res)
      );
    } else {
      let error = { emailError: null };

      error = {
        error: "Oops. Something went wrong.",
      };
      yield put( statAgeError(error));
    }
  } catch (error) {
    yield put( statAgeError(error));
  }
}

function* attention(payload) {
  try {
    const res = yield call(attentionRequest, payload);
    if (res.status === 200) {
      yield put(
        statAttentionSuccess(res.res)
      );
    } else {
      let error = { emailError: null };

      error = {
        error: "Oops. Something went wrong.",
      };
      yield put( statAttentionError(error));
    }
  } catch (error) {
    yield put( statAttentionError(error));
  }
}

function* emotions(payload) {
  try {
    const res = yield call(emotionsRequest, payload);
    if (res.status === 200) {
      yield put(
        emotionsInVideoSuccess(res.res)
      );
    } else {
      let error = { emailError: null };

      error = {
        error: "Oops. Something went wrong.",
      };
      yield put( emotionsInVideoError(error));
    }
  } catch (error) {
    yield put( emotionsInVideoError(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(STAT_TOTAL_VIEW_REQUEST, totalViews),
    takeEvery(STAT_TOP_RESULT_GENDER_REQUEST, topGender),
    takeEvery(STAT_TOP_RESULT_COUNTRY_REQUEST, topCountry),
    takeEvery(STAT_TOP_RESULT_AGE_REQUEST, topAge),
    takeEvery(STAT_PAYING_ATTENTION_REQUEST, payingAttention),
    takeEvery(STAT_PREDOMINANT_EMOTION_REQUEST, predominantEmotion),
    takeEvery(STAT_GENDER_REQUEST, gender),
    takeEvery(STAT_COUNTRY_REQUEST, country),
    takeEvery(STAT_AGE_REQUEST, age),
    takeEvery(STAT_ATTENTION_REQUEST, attention),
    takeEvery(EMOTIONS_IN_VIDEO_REQUEST, emotions),
  ]);
}
