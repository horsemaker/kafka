import { SET_NOTES } from "../constants";

export const notesReducer = (state, action) => {
  switch (action.type) {
    case SET_NOTES:
      return action.payload;
    default:
      return state;
  }
};
