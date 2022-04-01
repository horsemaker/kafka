import { CLEAR_EDITOR, COLOR, PIN_STATUS, TAGS, TITLE } from "../constants";

export const noteDetailsReducer = (state, action) => {
  switch (action.type) {
    case TITLE:
      return { ...state, title: action.payload };
    case PIN_STATUS:
      return { ...state, isPinned: !state.isPinned };
    case COLOR:
      return { ...state, color: action.payload };
    case TAGS:
      const newTags = state.tags.find((tag) => tag === action.payload)
        ? state.tags.filter((tag) => tag !== action.payload)
        : [...state.tags, action.payload];
      return { ...state, tags: newTags };
    case CLEAR_EDITOR:
      return action.payload;
    default:
      return state;
  }
};
