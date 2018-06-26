import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'
import { get, pick } from 'lodash/fp'

function pushToKey (obj, key, item) {
  if (obj[key] && Array.isArray(obj[key])) {
    obj[key].push(item)
  } else {
    obj[key] = [item]
  }
}

function getNum (thing) {
  return Number(thing) || 0
}

function sumObjects (objA, objB, pickArr = null) {
  if (pickArr) {
    let pickedA = pick(pickArr)(objA)
    let pickedB = pick(pickArr)(objB)
  } else {
    let pickedA = objA
    let pickedB = objB
  }

  let summed = {}
  Object.keys(pickedA).forEach(key => {
    summed[key] = getNum(pickedA[key]) + getNum(pickedB[key])
  })
  return summed
}

async function getAllMatches (api) {
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

async function getAllUsers (api) {
  const query = `
  query {
    allUsers {
      id
      name
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
    get('homePlayer1.id')(match),
    get('homePlayer2.id')(match)
  ]
  const awayPlayerIds = [
    get('awayPlayer1.id')(match),
    get('awayPlayer2.id')(match)
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

  const permutationId = get('0.permutationId')(shapedMatchesForUser)
  const matches = shapedMatchesForUser.length
  const averageGoalsFor = goalsFor / matches
  const averageGoalsAgainst = goalsAgainst / matches
  const wins = Number(goalsFor > goalsAgainst)
  const draws = Number(goalsFor === goalsAgainst)
  const losses = Number(goalsFor < goalsAgainst)
  const points = (wins * 3) + (draws * 1)

  return {
    permutationId,
    matches,
    goalsFor,
    goalsAgainst,
    averageGoalsFor,
    averageGoalsAgainst,
    wins,
    draws,
    losses,
    points
  }
}



function getUserRowFromPermutations (userPermutations) {
  const pickArr = ['matches', 'goalsFor', 'goalsAgainst', 'wins', 'draws', 'losses', 'points']

  return userPermutations.reduce((row, permutation) => {
    return {
      ...sumObjects(permutation, row, pickArr),
      permutations: getNum(row.permutations) + 1
    }
  }, {})
}

// userId, user, matches, points, points average (per permutation), permutations, goals for, goals against, wins, losses, draws

function getTableFromMatches (matches) {
  console.log(matches)
  const usersMatches = {}

  matches.forEach(match => {
    playerKeys.forEach(key => {
      const userId = get(`${key}.id`)(match)
      const shapedMatch = shapeMatchForUser(match, key)
      usersMatches[userId] = (
        usersMatches[userId]
        ? [...usersMatches[userId], shapedMatch]
        : [shapedMatch]
      )
    })
  })

  const table = {}
  // const usersPermutations = {}

  Object.keys(usersMatches).forEach((userId) => {
    const userMatches = usersMatches[userId]
    // usersPermutations[userId] = {}
    // const userPermutations = usersPermutations[userId]
    const userPermutationArrays = {}
    userMatches.forEach(match => {
      pushToKey(userPermutationArrays, match.permutationId, match)
    })

    const userPermutations = []
    Object.keys(userPermutationArrays).forEach((permutationId) => {
      const permutationMatches = userPermutationArrays[permutationId]
      userPermutations.push(shapePermutationForUser(permutationMatches))
    })

    table[userId] = getUserRowFromPermutations(userPermutations)
  })

  return { msg: { table, usersMatches } }
}

export default async (event) => {
  console.log(event)

  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    const { allMatches } = await getAllMatches(api)
    const { allUsers } = await getAllUsers(api)

    const table = getTableFromMatches(allMatches, allUsers)

    return {
      data: {
        rows: {},
        info: table
      }
    }
  } catch (e) {
    console.log(e)
    return { error: 'An unexpected error occured fetching the table.' }
  }
}