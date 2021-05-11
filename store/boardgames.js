export const state = function () {
  return {
    boardgames: [],
  }
}

export const getters = {}
export const mutations = {
  setBoardGames(state, boardGamesResponse) {
    state.boardgames = boardGamesResponse
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
