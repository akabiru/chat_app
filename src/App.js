import React from 'react';
import { createStore } from 'redux';
import { Provider} from 'react-redux'

import RootReducer from './reducers'
import ThreadTabs from './containers/ThreadTabs'
import ThreadDisplay from './containers/ThreadDisplay'

const store = createStore(RootReducer);

/*
* Container Components
** Suscribe to the store in componentDidMount
** Massage data and pass to presentation components as props
** Map actions on the presentation components
*
* connect()
** For each presentational component, we can write functions
** that specify how state should map to props and how events
** should map to dispatches.
*/

const App = () => (
  <Provider store={store}>
    <div className="ui segment">
      <ThreadTabs />
      <ThreadDisplay />
    </div>
  </Provider>
)

export default App;
