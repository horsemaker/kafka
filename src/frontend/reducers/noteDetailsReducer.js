import { CLEAR_EDITOR, COLOR, LABELS, PIN_STATUS, TITLE } from "../constants";

export const noteDetailsReducer = (state, action) => {
  switch (action.type) {
    case TITLE:
      return { ...state, title: action.payload };
    case PIN_STATUS:
      return { ...state, isPinned: !state.isPinned };
    case COLOR:
      return { ...state, color: action.payload };
    case LABELS:
      const newLabels = state.labels.find((label) => label === action.payload)
        ? state.labels.filter((label) => label !== action.payload)
        : [...state.labels, action.payload];
      return { ...state, labels: newLabels };
    case CLEAR_EDITOR:
      return action.payload;
    default:
      return state;
  }
};
