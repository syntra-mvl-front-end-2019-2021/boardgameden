export const state = {
  users: [],
}
export const getters = {
  getUsers(state) {
    return state.users
  },
}
export const mutations = {
  setUsers(state, usersResponse) {
    state.users = usersResponse
  },
}

export const actions = {
  getUsers(context) {
    this.$axios('/users?role=1eb0baf8-fbfb-40a6-b706-6146e6ffc1f0', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + state.token,
      },
    })
      .then((response) => {
        console.log(response)
        context.commit('setUsers', response.data.data)
      })
      .catch((err) => {
        // TODO: error handling

        console.error(err)
      })
  },
}
