import { SET_ARCHIVES } from "../constants";

export const archivesReducer = (state, action) => {
  switch (action.type) {
    case SET_ARCHIVES:
      return action.payload;
    default:
      return state;
  }
};
