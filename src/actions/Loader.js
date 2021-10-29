import {
 LOADING,
 NOT_LOADING
} from "../constants/ActionTypes";

export const loading = () => {
  return {
    type: LOADING,
  };
};

export const notLoading = (payload) => {
  return {
    type: NOT_LOADING,
  };
};

