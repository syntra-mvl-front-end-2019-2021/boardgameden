import { defaultFetchingState } from '@/utils/helperFunctions'

export const state = function () {
  return {
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
}
