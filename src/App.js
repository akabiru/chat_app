import React from 'react';
import ThreadTabs from './containers/ThreadTabs'
import ThreadDisplay from './containers/ThreadDisplay'

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
  <div className="ui segment">
    <ThreadTabs />
    <ThreadDisplay />
  </div>
)

export default App;
