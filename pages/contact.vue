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
    <h2>Contact</h2>
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
  },
  methods: {
    createQuestion() {
      this.$axios('/items/contact_form_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: this.questionBody,
      })
        .then((response) => {
          // TODO: notify user
          console.log(response.data)
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
