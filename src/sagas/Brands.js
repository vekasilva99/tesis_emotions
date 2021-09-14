import { all, call, put, takeEvery, select } from "redux-saga/effects";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
FETCH_COMPANIES_REQUEST
} from "../constants/ActionTypes";
import {
fetchCompaniesSuccess,
fetchCompaniesError
} from "../actions/Brands";
import axios from "axios";
import { storage } from "../firebase";

// import API_URL from '../constants/ApiURL';

const fetchAllCompaniesRequest = async (payload) => {
  console.log("UPDATE RESUME", payload);
  const options = {
    url: "http://localhost:5000/companies",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    
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



export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_COMPANIES_REQUEST, fetchCompanies),
    
  ]);
}
