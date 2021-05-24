const STORAGE_ALL_LOGGERS = 'STORAGE_ALL_LOGGERS';
const VIEW_LOG = 'VIEW_LOG';
const LOADING = 'LOADING';
const OK = 'OK';
const CLOSE_LOG = 'CLOSE_LOG';
const SHOW_MENU = 'SHOW_MENU';
const CURRENT_PAGE_LOG = 'CURRENT_PAGE_LOG';
const CURRENT_ORDENATION = 'CURRENT_ORDENATION';
const FILTER = 'FILTER';
const FILTER_BAR_VALUES = 'FILTER_BAR_VALUES';
const ORDER_COLUMN = 'ORDER_COLUMN';
const INITIAL_STATE = {
  allLoggers: [],
  viewLog: [false],
  loading: false,
  menu: false,
  pageLog: { size: 8, page: 0, totalPages: 1 },
  ordenation: { column: 'id', order: 'desc' },
  filter: { column: '', value: '' },
  filterBar: {
    column: '', value: '', dateStart: '', dateEnd: '',
  },
};

const loggers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORAGE_ALL_LOGGERS:
      return {
        ...state,
        allLoggers: [...action.value.logs],
        pageLog: { ...state.pageLog, totalPages: action.value.totalPages },
      };
    case CURRENT_PAGE_LOG: {
      return { ...state, pageLog: { ...state.pageLog, page: action.value } };
    }
    case CURRENT_ORDENATION: {
      return { ...state, ordenation: { ...action.value } };
    }
    case FILTER: {
      return {
        ...state,
        filter: {
          column: action.value.column,
          value: action.value.value,
        },
      };
    }
    case FILTER_BAR_VALUES: {
      return {
        ...state,
        filterBar: { ...state.filterBar, [action.value.column]: action.value.value },
      };
    }
    case ORDER_COLUMN:
      return { ...state, ordenation: { ...action.value } };
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
    default:
      return { ...state };
  }
};

export default loggers;
