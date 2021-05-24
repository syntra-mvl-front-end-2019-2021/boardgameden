import {
  defaultFetchingState,
  finishFetchingState,
  startFetchingState,
} from '@/utils/helperFunctions'

export const state = function () {
  return {
    boardgames: [],
    gamesForSaleState: defaultFetchingState(),
    gamesForSale: [],
    gamesForSwapState: defaultFetchingState(),
    gamesForSwap: [],
  }
}

export const getters = {}

export const mutations = {
  setBoardGames(state, boardGamesResponse) {
    state.boardgames = boardGamesResponse
  },
  setGamesForSale(state, gamesForSale) {
    state.gamesForSale = gamesForSale
  },
  setGamesForSaleState(state, gamesForSaleState) {
    state.gamesForSaleState = gamesForSaleState
  },
  setGamesForSwap(state, gamesForSwap) {
    state.gamesForSwap = gamesForSwap
  },
  setGamesForSwapState(state, gamesForSwapState) {
    state.gamesForSwapState = gamesForSwapState
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
  getGamesForSale(context) {
    if (context.state.gamesForSaleState.success) {
      return
    }

    context.commit('setGamesForSaleState', startFetchingState())
    this.$axios('/items/boardgames_directus_users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        fields: '*.*',
        filter: { is_for_sale: { _eq: 1 } },
      },
    })
      .then((response) => {
        context.commit('setGamesForSale', response.data.data)
        context.commit('setGamesForSaleState', finishFetchingState([]))
      })
      .catch((err) => {
        console.error(err)
        context.commit(
          'setGamesForSaleState',
          finishFetchingState([err.message])
        )
      })
  },
  getGamesForSwap(context) {
    if (context.state.gamesForSwapState.success) {
      return
    }

    context.commit('setGamesForSwapState', startFetchingState())
    this.$axios('/items/boardgames_directus_users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        fields: '*.*',
        filter: { is_swappable: { _eq: 1 } },
      },
    })
      .then((response) => {
        context.commit('setGamesForSwap', response.data.data)
        context.commit('setGamesForSwapState', finishFetchingState([]))
      })
      .catch((err) => {
        console.error(err)
        context.commit(
          'setGamesForSwapState',
          finishFetchingState([err.message])
        )
      })
  },
}
