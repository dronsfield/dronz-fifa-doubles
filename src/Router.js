import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AllMatches from './screens/AllMatches'
import Root from './screens/Root'
import Login from './screens/Login'

export default () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/matches' component={AllMatches} />
    </Switch>
  </Router>
)