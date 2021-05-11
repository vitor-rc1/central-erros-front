const STORAGE_ALL_LOGGERS = 'STORAGE_ALL_LOGGERS';
const VIEW_LOG = 'VIEW_LOG';
const LOADING = 'LOADING';
const OK = 'OK';
const CLOSE_LOG = 'CLOSE_LOG';
const INITIAL_STATE = {
  allLoggers: [],
  viewLog: [false],
  loading: false,
};

const loggers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORAGE_ALL_LOGGERS:
      return { ...state, allLoggers: [...action.value] };
    case VIEW_LOG:
      return { ...state, viewLog: [...action.value] };
    case CLOSE_LOG:
      return { ...state, viewLog: [false] };
    case LOADING:
      return { ...state, loading: true };
    case OK:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};

export default loggers;
