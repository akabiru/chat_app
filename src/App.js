import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'

import RootReducer from './reducers'
import Thread from './components/Thread'
import Tabs from './components/Tabs'

const store = createStore(RootReducer);

/*
 * Describe how state maps to Tabs props
 */
const mapStateToTabsProps = state => (
  {
    tabs: state.threads.map((t) => (
      {
        title: t.title,
        active: t.id === state.activeThreadId,
        id: t.id,
      }
    )),
  }
)

const mapDispatchToTabsProps = dispatch => (
  {
    onClick: (id) => (
      dispatch({
        type: 'OPEN_THREAD',
        id: id,
      })
    ),
  }
)

const ThreadTabs = connect(
  mapStateToTabsProps,
  mapDispatchToTabsProps
)(Tabs)

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
