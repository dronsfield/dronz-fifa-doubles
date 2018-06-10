import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'

import AllMatches from './screens/AllMatches'
import Home from './screens/Home'
import Root from './screens/Root'
import Login from './screens/Auth/Login'
import Signup from './screens/Auth/Signup'

export default () => (
  <Router>
    <Switch>
      <PrivateRoute exact path='/' component={Home} />

      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />

      <PrivateRoute path='/matches' component={AllMatches} />
    </Switch>
  </Router>
)