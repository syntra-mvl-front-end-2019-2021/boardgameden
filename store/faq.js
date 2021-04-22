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
}
