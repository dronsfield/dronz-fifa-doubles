import React from 'react'
import { Redirect } from 'react-router-dom'

import { getAuthToken } from '../services/auth'

//gql-------------------------------------

//styled----------------------------------

//enhance---------------------------------

//component-----------------------------------

const Home = props => {
  return <Redirect to='/matches' />
}

export default Home
