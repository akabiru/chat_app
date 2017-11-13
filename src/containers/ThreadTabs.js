import { connect } from 'react-redux'
import Tabs from '../components/Tabs'

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

export default ThreadTabs
