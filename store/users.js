export const state = function () {
  return { users: [] }
}
export const getters = {}
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
      },
    })
      .then((response) => {
        context.commit('setUsers', response.data.data)
      })
      .catch((err) => {
        // TODO: error handling

        console.error(err)
      })
  },
}
