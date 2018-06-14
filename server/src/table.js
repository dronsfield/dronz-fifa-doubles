import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'

async function getAllMatches(api) {
  const query = `
  query {
    allMatches {
      id
      homeScore
      awayScore
      homePlayer1 {
        name
        id
      }
      homePlayer2 {
        name
        id
      }
      awayPlayer1 {
        name
        id
      }
      awayPlayer2 {
        name
        id
      }
    }
  }`
  
  return api.request(query)
}

// userId, user, matches, points, permutations, goals for, goals against

function getTableFromMatches(matches) {
  const usersMap = {}

  matches.forEach(match => {
    
  })
}

export default async (event) => {
  console.log(event)

  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    const allMatches = await getAllMatches(api)

    return {
      data: {
        rows: allMatches
      }
    }
  } catch (e) {
    console.log(e)
    return { error: 'An unexpected error occured fetching the table.' }
  }
}