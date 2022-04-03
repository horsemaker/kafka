import {
  CLEAR_EDITOR,
  COLOR,
  NOTE,
  PIN_STATUS,
  TAGS,
  TITLE,
} from "../constants";

const initialEditorState = {
  title: "",
  isPinned: false,
  color: "color-note-bg",
  tags: [],
  note: "",
};

export const editorReducer = (state, action) => {
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
    case NOTE:
      return { ...state, note: action.payload };
    case CLEAR_EDITOR:
      return initialEditorState;
    default:
      return state;
  }
};
