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
          <input v-model="email" type="text" />
        </label>
      </div>
      <div>
        Your question*
        <textarea v-model="question" placeholder=""></textarea>
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
    }
  },
  computed: {
    questionBody() {
      return JSON.stringify({
        first_name: this.firstname,
        last_name: this.lastename,
        email: this.email,
        question: this.question,
      })
    },
    isLoggedIn() {
      return this.$store.getters['faq/isLoggedIn']
    },
  },
  methods: {
    createQuestion() {
      fetch('http://206.81.26.160/items/contact_form_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.questionBody,
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
    resetForm(event) {
      event.target.reset()
    },
  },
}
</script>
<style scoped></style>
