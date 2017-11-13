import { combineReducers } from 'redux'

import activeThreadIdReducer from './activeThreadIdReducer'
import threadsReducer from './threadsReducer'

const RootReducer = combineReducers({
  activeThreadId: activeThreadIdReducer,
  threads: threadsReducer,
});

export default RootReducer
