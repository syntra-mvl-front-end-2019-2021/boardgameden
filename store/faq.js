export const state = function () {
  return {
    questionAnswers: [],
  }
}

export const getters = {
  getQuestionAnswers(state) {
    return state.questionAnswers
  },
}
export const mutations = {
  setQuestionAnswers(state, questionsAnswersResponse) {
    state.questionAnswers = questionsAnswersResponse
  },
}

export const actions = {
  getQuestions(context, body) {
    console.log('Getting questions')
    fetch('http://206.81.26.160/items/faqs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0MzQzNjNmLTBkZWQtNGFmMi05Y2JiLTk2NDJlODFjZDcxYSIsImlhdCI6MTYxODg0Nzg3OSwiZXhwIjoxNjE4ODQ4Nzc5fQ.JBgUW-42KCDu8rQOl9BANxNRm234K6PG6Y1zosHZWkU',
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
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0MzQzNjNmLTBkZWQtNGFmMi05Y2JiLTk2NDJlODFjZDcxYSIsImlhdCI6MTYxODg0Nzg3OSwiZXhwIjoxNjE4ODQ4Nzc5fQ.JBgUW-42KCDu8rQOl9BANxNRm234K6PG6Y1zosHZWkU',
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
        console.log(body)
      })
      .catch((err) => {
        console.error(err)
      })
  },
}
