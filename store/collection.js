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
