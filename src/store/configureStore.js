import { createStore } from 'redux'
import RootReducer from '../reducers'

function configureStore(initialState) {
  return createStore(RootReducer, initialState)
}

export default configureStore
