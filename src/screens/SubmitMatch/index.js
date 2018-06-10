import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { compose, withState, withHandlers, withPropsOnChange, pure } from 'recompose'
import { Mutation, Query } from 'react-apollo'
import _ from 'lodash/fp'

import { withStateEz, withStateForInput, withStateForInputs } from '../../helpers'
import Search from '../../components/Search'

//gql-------------------------------------

const GET_ALL_PLAYERS = gql`
  query {
    allUsers {
      id
      name
    }
  }
`

const CREATE_MATCH = gql`
  mutation (
    $homeScore: Int!
    $homePlayer1Id: ID!
    $homePlayer2Id: ID!
    $awayScore: Int!
    $awayPlayer1Id: ID!
    $awayPlayer2Id: ID!
  ) {
    createMatch(
      homeScore: $homeScore
      homePlayer1Id: $homePlayer1Id
      homePlayer2Id: $homePlayer2Id
      awayScore: $awayScore
      awayPlayer1Id: $awayPlayer1Id
      awayPlayer2Id: $awayPlayer2Id
      dummy: "dummy"
    ) {
      id
    }
  }
`

//styled----------------------------------

const Spacing = styled.div`
  padding-top: 20px;
`

const Block = styled.div`
  position: relative;
  z-index: ${p => p.z};
  ${p => console.log(p.z)}
  ${console.log}
`

//enhance---------------------------------

const enhance = compose()

const inputNames = [
  'homeScore',
  'homePlayer1Id',
  'homePlayer2Id',
  'awayScore',
  'awayPlayer1Id',
  'awayPlayer2Id'
]

const enhanceForm = compose(
  withStateForInputs(inputNames),
  withHandlers({
    onSubmit: props => createMatch => () => {
      console.log({ createMatch })
      let variables = _.pick(inputNames)(props)
      
      console.log({ variables })

      variables = (
        Object.entries(variables)
        .reduce((acc, [key, value]) => {
          const transformedValue = (
            key.includes('Id')
            ? _.get('id')(value)
            : Number(value)
          )
          acc[key] = transformedValue
          return acc
        }, {})
      )
      let valid = true
      Object.values(variables).forEach(value => {
        if (value === undefined) valid = false
      })
      console.log({ variables })
      if (valid) {
        createMatch({ variables })
      } else {
        window.alert('Invalid variables.')
      }
    }
  })
)

//component-------------------------------

let TheForm = props => {
  return <Mutation mutation={CREATE_MATCH}>
    {(createMatch, { loading, error }) => {

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error :(</div>

    const searchProps = {
      items: props.users,
      displayKey: 'name'
    }

    return <React.Fragment>
      <Block z={6}>
        <input
          type='number'
          name='homeScore'
          value={props.homeScore}
          onChange={props.onChangeHomeScore}
        />
      </Block>
      <Block z={5}>
        <Search
          {...searchProps}
          onSubmit={props.setHomePlayer1Id}
        />
      </Block>
      <Block z={4}>
        <Search
          {...searchProps}
          onSubmit={props.setHomePlayer2Id}
        />
      </Block>

      <Spacing />

      <Block z={3}>
        <input
          type='number'
          name='awayScore'
          value={props.awayScore}
          onChange={props.onChangeAwayScore}
        />
      </Block>
      <Block z={2}>
        <Search
          {...searchProps}
          onSubmit={props.setAwayPlayer1Id}
        />
      </Block>
      <Block z={1}>
        <Search
          {...searchProps}
          onSubmit={props.setAwayPlayer2Id}
        />
      </Block>

      <Spacing />

      <Block>
        <input
          type='submit'
          value='Submit'
          onClick={props.onSubmit(createMatch)}
        />
      </Block>

    </React.Fragment>
  }
}
  </Mutation>
}
TheForm = enhanceForm(TheForm)

let SubmitMatch = props => {
  return <Query query={GET_ALL_PLAYERS}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>Error :(</div>

      console.log(data)
      console.log(props)

      return <TheForm users={data.allUsers} />
    }}
  </Query>
}

export default enhance(SubmitMatch)
