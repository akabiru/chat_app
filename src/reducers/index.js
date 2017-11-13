import { combineReducers } from 'redux'

import activeThreadIdReducer from './activeThreadIdReducer'
import threadsReducer from './threadsReducer'

const reducer = combineReducers({
  activeThreadId: activeThreadIdReducer,
  threads: threadsReducer,
});

export default reducer
