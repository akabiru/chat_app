import { connect } from 'react-redux'
import Thread from '../components/Thread'

const mapStateToThreadProps = state => (
  {
    thread: state.threads.find(t => t.id === state.activeThreadId),
  }
)

const mapDispatchToThreadProps = dispatch => (
  {
    onMessageClick: (id) => (
      dispatch({
        type: 'DELETE_MESSAGE',
        id: id,
      })
    ),
    dispatch,
  }
)

/*
* Create a new object that contains
** All properties of state-props
** All properties of dispatch-props
** Additional property onMessageSubmit
*/
const mergeThreadProps = (stateProps, dispatchProps) => (
  {
    ...stateProps,
    ...dispatchProps,
    onMessageSubmit: (text) => (
      dispatchProps.dispatch({
        type: 'ADD_MESSAGE',
        text: text,
        threadId: stateProps.thread.id
      })
    ),
  }
)

const ThreadDisplay = connect(
  mapStateToThreadProps,
  mapDispatchToThreadProps,
  mergeThreadProps
)(Thread)

export default ThreadDisplay
