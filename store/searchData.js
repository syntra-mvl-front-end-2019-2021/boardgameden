export default {
  state: {
    games: [],
  },
  getters: {
    // eslint-disable-next-line prettier/prettier
    GAMES: (state) => {
      return state.games
    },
  },
  mutations: {
    SET_GAMES: (state, payload) => {
      state.games = payload
    },
  },
  actions: {
    GET_GAMES: async ({ commit }) => {
      const { data } = await this.axios.get(`games`)
      console.log(data)
      commit('SET_GAMES', data)
    },
  },
}
