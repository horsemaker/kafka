import {
  CLEAR_FILTERS,
  FILTER_PRIORITIES,
  FILTER_SORT_BY,
  FILTER_TAGS,
} from "../constants";

const filtersInitialState = {
  sortBy: "old-to-new",
  priorities: [],
  tags: [],
};

const filtersReducer = (state, action) => {
  switch (action.type) {
    case CLEAR_FILTERS:
      return filtersInitialState;
    case FILTER_SORT_BY:
      return { ...state, sortBy: action.payload };
    case FILTER_PRIORITIES:
      const newPriorities = state.priorities.includes(action.payload)
        ? state.priorities.filter((priority) => priority !== action.payload)
        : [...state.priorities, action.payload];
      return { ...state, priorities: newPriorities };
    case FILTER_TAGS:
      const newTags = state.tags.includes(action.payload)
        ? state.tags.filter((tag) => tag !== action.payload)
        : [...state.tags, action.payload];
      return { ...state, tags: newTags };
    default:
      return state;
  }
};

export { filtersInitialState, filtersReducer };
