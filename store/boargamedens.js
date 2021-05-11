export const state = function () {
  return {
    boardgamedens: [],
  }
}

export const getters = {}
export const mutations = {
  setBoardgameden(state, boardgamedenResponse) {
    state.boardgamedens = boardgamedenResponse
  },
}
export const actions = {
  getBoardgameden(context) {
    if (context.state.boardgamedens.length > 0) {
      return
    }

    this.$axios('/items/boardgame_dens', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
