import {
  defaultFetchingState,
  finishFetchingState,
  startFetchingState,
} from '~/utils/helperFunctions'

export const state = function () {
  return {
    token: '',
    loginState: defaultFetchingState(),
  }
}

export const getters = {
  isLoggedIn(state) {
    return state.token.length > 0
  },
}

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  logout(state) {
    state.token = ''
    state.loginState = defaultFetchingState()
  },
  setLoginState(state, loginState) {
    state.loginState = loginState
  },
}

export const actions = {
  login(context, body) {
    context.commit('setLoginState', startFetchingState())
    fetch('http://206.81.26.160/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('could not login')
        }

        return response.json()
      })
      .then((body) => {
        context.commit('setToken', body.data.access_token)
        context.commit('setLoginState', finishFetchingState())
      })
      .catch((err) => {
        context.commit('setLoginState', finishFetchingState([err.message]))
      })
  },
}
