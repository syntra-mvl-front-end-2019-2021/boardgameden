export const state = {
  games: [],
}

export const mutations = {
  setGames(state, games) {
    state.games = games
  },
}

export const actions = {
  getGames(context) {
    this.$axios
      .get(
        'https://api.boardgameatlas.com/api/search?name=Catan&client_id=KrUdcULOvp'
      )
      .then((response) => {
        context.commit('setGames', response.data)
      })
  },
}
