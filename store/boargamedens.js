export const state = function () {
  return {
    boardgamedens: [],
  }
}

export const getters = {
  getBoardgameden(state) {
    return state.boardgamedens
  },
}
export const mutations = {
  setBoardgameden(state, boardgamedenResponse) {
    state.boardgames = boardgamedenResponse
  },
}
export const actions = {
  getBoardgameden(context) {
    this.$axios('/items/boardgame_dens', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + state.token,
      },
    })
      .then((response) => {
        console.log(response)
        context.commit('setBoardgameden', response.data.data)
      })
      .catch((err) => {
        // TODO: error handling

        console.error(err)
      })
  },
}
