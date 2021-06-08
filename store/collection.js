import { defaultFetchingState } from '@/utils/helperFunctions'

export const state = function () {
  return {
    users: [],
    boardgames: [],
    gamesInCollectionState: defaultFetchingState(),
    gamesInCollection: [],
  }
}

export const getters = {}

export const mutations = {
  setBoardGames(state, boardGamesResponse) {
    state.boardgames = boardGamesResponse
  },
  setGamesInCollection(state, gamesInCollection) {
    state.gamesInCollection = gamesInCollection
  },
  setGamesInCollectionState(state, gamesInCollectionState) {
    state.gamesInCollectionState = gamesInCollectionState
  },
}

export const actions = {
  getBoardGames(context) {
    this.$axios('/items/boardgames', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        context.commit('setBoardGames', response.data.data)
      })
      .catch((err) => {
        // TODO: error handling

        console.error(err)
      })
  },
  getUserId(context) {
    this.$axios('baseUrl' + '/users?fields=id&fields=user_name', {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzMjY3NTRjLWM5MjgtNDg1NS1iZmM2LTQ4MDQ4Y2NjMDIzMSIsImlhdCI6MTYyMTk2MTg2MSwiZXhwIjoxNjIxOTYyNzYxfQ.O8ImrKCgBOhy9RAyGjw2lPUSl_G4DyW4MHuc85racJM',
      },
    })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.error(err)
      })
  },
}
