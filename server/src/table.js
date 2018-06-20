import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'
import { path } from 'ramda'

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

const playerKeys = [
  'homePlayer1',
  'homePlayer2',
  'awayPlayer1',
  'awayPlayer2'
]

function getPermutationIdFromMatch (match) {
  const homePlayerIds = [
    path('homePlayer1.id')(match),
    path('homePlayer2.id')(match)
  ]
  const awayPlayerIds = [
    path('awayPlayer1.id')(match),
    path('awayPlayer2.id')(match)
  ]
  const homePlayersKey = homePlayerIds.sort().join('+')
  const awayPlayersKey = awayPlayerIds.sort().join('+')
  const permutationId = [homePlayersKey, awayPlayersKey].join('_')
  return permutationId
}

function shapeMatchForUser (match, playerKey) {
  const permutationId = getPermutationIdFromMatch(match)
  const isHome = playerKey.slice(0, 4) === 'home'
  const goalsFor = isHome ? match.homeScore : match.awayScore
  const goalsAgainst = !isHome ? match.homeScore : match.awayScore
  // const win = Number(goalsFor > goalsAgainst)
  // const draw = Number(goalsFor === goalsAgainst)
  // const loss = Number(goalsFor < goalsAgainst)
  // const points = (win * 3) + (draw * 1)
  return {
    permutationId,
    goalsFor,
    goalsAgainst
  }
}

function shapePermutationForUser (shapedMatchesForUser = []) {
  const { goalsFor, goalsAgainst } = shapedMatchesForUser.reduce((acc, shapedMatch) => {
    return {
      goalsFor: shapedMatch.goalsFor + (acc.goalsFor || 0),
      goalsAgainst: shapedMatch.goalsAgainst + (acc.goalsAgainst || 0)
    }
  }, {})

  const permutationId = path('0.permutationId')(shapedMatchesForUser)
  const matches = shapedMatchesForUser.length
  const averageGoalsFor = goalsFor / matches
  const averageGoalsAgainst = goalsAgainst / matches
  const win = Number(goalsFor > goalsAgainst)
  const draw = Number(goalsFor === goalsAgainst)
  const loss = Number(goalsFor < goalsAgainst)
  const points = (win * 3) + (draw * 1)

  return {
    permutationId,
    matches,
    goalsFor,
    goalsAgainst,
    averageGoalsFor,
    averageGoalsAgainst,
    win,
    draw,
    loss,
    points
  }
}

// userId, user, matches, points, points average (per permutation), permutations, goals for, goals against, wins, losses, draws

function getTableFromMatches (matches) {
  console.log(matches)
  const usersMatches = {}

  matches.forEach(match => {
    playerKeys.forEach(key => {
      const userId = path(`${key}.id`)(match)
      const shapedMatch = shapeMatchForUser(match, key)
      usersMatches[userId] = (
        usersMatches[userId]
        ? [...usersMatches[userId], shapedMatch]
        : [shapedMatch]
      )
    })
  })

  return { msg: usersMatches }
}

export default async (event) => {
  console.log(event)

  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    const { allMatches } = await getAllMatches(api)

    const table = getTableFromMatches(allMatches)

    return {
      data: {
        rows: allMatches,
        info: table
      }
    }
  } catch (e) {
    console.log(e)
    return { error: 'An unexpected error occured fetching the table.' }
  }
}