<template>
  <div>
    <h1>My question</h1>
    <form @submit.prevent="createQuestion" @submit="resetForm">
      <div>
        <label>
          First Name*
          <input v-model="firstname" type="text" />
        </label>
      </div>
      <div>
        <label>
          Last Name*
          <input v-model="lastename" type="text" />
        </label>
      </div>
      <div>
        <label>
          E-mailadres*
          <input v-model="email" type="email" />
        </label>
      </div>
      <div>
        Your question*
        <textarea v-model="question" placeholder=""></textarea>
      </div>
      <div>
        answer*
        <textarea v-if="answer" v-model="answer" placeholder=""></textarea>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Faqquestion',
  data() {
    return {
      firstname: '',
      lastename: '',
      email: '',
      question: '',
      answer: '',
    }
  },
  computed: {
    questionBody() {
      return JSON.stringify({
        firstname: this.firstname,
        lastename: this.lastename,
        email: this.email,
        question: this.question,
        answer: this.answer,
      })
    },
  },
  methods: {
    createQuestion() {
      this.$store.dispatch('faq/createQuestion', this.questionBody)
    },
    resetForm(event) {
      event.target.reset()
    },
  },
}
</script>
<style scoped></style>
