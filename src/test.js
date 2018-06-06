import gql from 'graphql-tag'

import client from './apollo'

console.log('testing...')

// client.query({
//   query: gql`
//     query {
//       allMatches {
//         id
//         homeScore
//         awayScore
//         homePlayer1 {
//           name
//         }
//         homePlayer2 {
//           name
//         }
//         awayPlayer1 {
//           name
//         }
//         awayPlayer2 {
//           name
//         }
//       }
//     }
//   `
// }).then(console.log)