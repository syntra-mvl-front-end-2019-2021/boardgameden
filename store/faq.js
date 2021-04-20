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
  getQuestions(context, body) {
    console.log('Getting questions')
    fetch('http://206.81.26.160/items/faqs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + state.token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('could not get questions')
        }
        return response.json()
      })
      .then((body) => {
        context.commit('setQuestionAnswers', body.data)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  createQuestion(context, body) {
    fetch('http://206.81.26.160/items/faqs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0MzQzNjNmLTBkZWQtNGFmMi05Y2JiLTk2NDJlODFjZDcxYSIsImlhdCI6MTYxODg2MDk0MSwiZXhwIjoxNjE4ODYxODQxfQ.RUrsn9AUeSHIAL35djXMeTBWa4LKEePspapW62EdjHU',
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
        console.error(err)
      })
  },
}
