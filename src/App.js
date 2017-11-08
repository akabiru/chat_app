import React from 'react';
import uuid from 'uuid';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux'

const reducer = combineReducers({
  activeThreadId: activeThreadIdReducer,
  threads: threadsReducer,
})

// function reducer(state = {}, action) {
//   return {
//     activeThreadId: activeThreadIdReducer(state.activeThreadId, action),
//     threads: threadsReducer(state.threads, action),
//   };
// }

function activeThreadIdReducer(state = '1-fca2', action) {
  if (action.type === 'OPEN_THREAD') {
    return action.id;
  } else {
    return state;
  }
}

function findThreadIndex(threads, action) {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      return threads.findIndex(
        (t) => t.id === action.threadId
      );
    }
    case 'DELETE_MESSAGE': {
      return threads.findIndex(
        (t) => t.messages.find((m) => (
          m.id === action.id
        ))
      );
    }
  }
}

function threadsReducer(state = [
  {
    id: '1-fca2',
    title: 'Buzz Aldrin',
    messages: [
      {
        text: 'Twelve minutes to ignition.',
        timestamp: Date.now(),
        id: uuid.v4(),
      },
    ],
  },
  {
    id: '2-be91',
    title: 'Michael Collins',
    messages: [],
  },
], action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
    case 'DELETE_MESSAGE': {
      const threadIndex = findThreadIndex(state, action);

      const oldThread = state[threadIndex];
      const newThread = {
        ...oldThread,
        messages: messagesReducer(oldThread.messages, action),
      };

      return [
        ...state.slice(0, threadIndex),
        newThread,
        ...state.slice(
          threadIndex + 1, state.length
        ),
      ];
    }
    default: {
      return state;
    }
  }
}

function messagesReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const newMessage = {
        text: action.text,
        timestamp: Date.now(),
        id: uuid.v4(),
      };
      return state.concat(newMessage);
    }
    case 'DELETE_MESSAGE': {
      return state.filter(m => m.id !== action.id);
    }
    default: {
      return state;
    }
  }
}

const store = createStore(reducer);

/* eslint-disable react/prefer-stateless-function */

/*
 * Container component
 * * Interacts direclty with the store
 * * Defines methods for its presentation components
 */

const ThreadTabs = connect(
  mapStateToTabsProps,
  mapDispatchToTabsProps
)(Tabs)

const mapStateToTabsProps = (state) => (
  {
    tabs: state.threads.map(t => (
      {
        title: t.title,
        active: t.id === state.activeThreadId,
        id: t.id,
      }
    )),
  }
)

const mapDispatchToTabsProps = (dispatch) => (
  {
    onClick: (id) => (
      dispatch({
        type: 'OPEN_THREAD',
        id: id,
      })
    ),
  }
)

/*
 * presentational component
 * Does not interact directly with the redux store
 */
const Tabs = (props) => (
  <div className="ui top attached tabular menu">
    {
      props.tabs.map((tab, index) => (
        <div
          key={index}
          className={tab.active? 'active item' : 'item'}
          onClick={() => props.onClick(tab.id)}
        >
          {tab.title}
        </div>
      ))
    }
  </div>
)

class TextFieldSubmit extends React.Component {
  state = {
    value: '',
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.value)
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <div className='ui input'>
        <input
          onChange={this.onChange}
          value={this.state.value}
          type='text'
        />
        <button
          onClick={this.handleSubmit}
          className='ui primary button'
          type='submit'
        >
          Submit
        </button>
      </div>
    );
  }
}

const MessageList = (props) => (
  <div className="ui commets">
    {
      props.messages.map((m, index) => (
        <div
          className='comment'
          key={index}
          onClick={() => props.onClick(m.id)}
        >
          <div className="text">
            {m.text}
          </div>
          <span className="metadata">@{m.timestamp}</span>
        </div>
      ))
    }
  </div>
)

const Thread = (props) => (
  <div className="ui center aligned basic segment">
    <MessageList
      messages={props.thread.messages}
      onClick={props.onMessageClick}
    />
    <TextFieldSubmit  onSubmit={props.onMessageSubmit} />
  </div>
)

class ThreadDisplay extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate())
  }

  render() {
    const state = store.getState();
    const activeThreadId = state.activeThreadId
    const activeThread = state.threads.find(t => t.id === activeThreadId)

    return (
      <Thread
        thread={activeThread}
        onMessageClick={(id) => (
          store.dispatch({
            type: 'DELETE_MESSAGE',
            id: id
          })
        )}
        onMessageSubmit={(text) => (
          store.dispatch({
            type: 'ADD_MESSAGE',
            text: text,
            threadId: activeThreadId
          })
        )}
      />
    )
  }
}

const App = () => (
  <div className="ui segements">
    <ThreadTabs />
    <ThreadDisplay />
  </div>
)

const WrappedApp = () => (
  <Provider store={store} >
    <App />
  </Provider>
)

export default WrappedApp;
