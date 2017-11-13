import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'

import RootReducer from './reducers'
import ThreadTabs from './containers/ThreadTabs'
import Thread from './components/Thread'

const store = createStore(RootReducer);

class ThreadDisplay extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const state = store.getState();
    const activeThreadId = state.activeThreadId;
    const activeThread = state.threads.find(
      t => t.id === activeThreadId
    );

    return (
      <Thread
        thread={activeThread}
        onMessageClick={(id) => (
          store.dispatch({
            type: 'DELETE_MESSAGE',
            id: id,
          })
        )}
        onMessageSubmit={(text) => (
          store.dispatch({
            type: 'ADD_MESSAGE',
            text: text,
            threadId: activeThreadId,
          })
        )}
      />
    );
  }
}

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
