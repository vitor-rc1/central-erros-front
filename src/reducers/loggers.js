const STORAGE_ALL_LOGGERS = 'STORAGE_ALL_LOGGERS';
const VIEW_LOG = 'VIEW_LOG';
const LOADING = 'LOADING';
const OK = 'OK';
const CLOSE_LOG = 'CLOSE_LOG';
const RECENT_REQUEST_URL = 'RECENT_REQUEST_URL';
const SHOW_MENU = 'SHOW_MENU';
const INITIAL_STATE = {
  allLoggers: [],
  viewLog: [false],
  loading: false,
  menu: false,
  url: 'https://centraldeerrosjava.herokuapp.com/loggers',
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
    case SHOW_MENU:
      return { ...state, menu: !state.menu };
    case OK:
      return { ...state, loading: false };
    case RECENT_REQUEST_URL:
      return { ...state, url: action.value };
    default:
      return { ...state };
  }
};

export default loggers;
