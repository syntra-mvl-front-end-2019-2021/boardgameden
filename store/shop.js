export const state = function () {
  return {
    boardgameShop: {},
  }
}

export const getters = {
  gamesForSale: (state) => {
    return state.filter((game) => game.is_for_sale)
  },
  gamesForSwap: (state) => {
    return state.filter((game) => game.is_swappable)
  },
}
export const mutations = {
  setBoardgameden(state, boardgamedenResponse) {
    state.boardgameShop = boardgamedenResponse
  },
}
export const actions = {
  getBoardgameden(context) {
    if (context.state.boardgameShop.length > 0) {
      return
    }
    return this.$axios(
      this.$config.baseURL +
        '/items/boardgames_directus_users?fields=*.boardgames_id.*',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        context.commit('setBoardgameden', response.data.data)
      })
      .catch((err) => {
        // TODO: error handling

        console.error(err)
      })
  },
}
