export const state = function () {
  return {
    questionAnswers: [],
    token: '',
  }
}

export const getters = {
  getQuestionAnswers(state) {
    return state.questionAnswers
  },
  isLoggedIn(state) {
    return state.token.length > 0
  },
}
export const mutations = {
  setQuestionAnswers(state, questionsAnswersResponse) {
    state.questionAnswers = questionsAnswersResponse
  },

  setToken(state, token) {
    state.token = token
  },
}

export const actions = {
  getQuestions(context) {
    this.$axios('/items/faqs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + state.token,
      },
    })
      .then((response) => {
        console.log(response)
        context.commit('setQuestionAnswers', response.data.data)
      })
      .catch((err) => {
        // TODO: error handling

        console.error(err)
      })
  },

  createQuestion(context, body) {
    fetch('http://206.81.26.160/items/faqs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + state.token,
      },
      body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('could not create question')
        }
        return response.json()
      })
      .then((body) => {
        context.commit('setToken', body.data.access_token)
        console.log(body)
      })
      .catch((err) => {
        registratieform
        console.error(err)
      })
  },
}
