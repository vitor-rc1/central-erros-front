const STORAGE_ALL_LOGGERS = 'STORAGE_ALL_LOGGERS';
const INITIAL_STATE = {
  allLoggers: [],
};

const loggers = (state = INITIAL_STATE, action) => {
  console.log(action.value);
  switch (action.type) {
    case STORAGE_ALL_LOGGERS:
      return { ...state, allLoggers: [...action.value] };
    default:
      return { ...state };
  }
};

export default loggers;
