export const state = function () {
  return {
    boardgames: [],
  }
}

export const getters = {
  getBoardGames(state) {
    return state.boardgames
  },
}
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
        Authorization: 'Bearer' + state.token,
      },
    })
      .then((response) => {
        console.log(response)
        context.commit('setBoardGames', response.data.data)
      })
      .catch((err) => {
        // TODO: error handling

        console.error(err)
      })
  },
}
