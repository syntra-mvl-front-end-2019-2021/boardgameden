<template>
  <div>
    <section class="container">
      <h2>FAQ</h2>
      <NuxtLink to="/contact">Ask a question</NuxtLink>
      <h3>New question</h3>
      <div class="fq-question__wrapper">
        <Question
          v-for="text in questions"
          :id="text.id"
          :key="text.id"
          :question="text.question"
          :answer="text.answer"
<<<<<<< HEAD
          :lastname="text.lastname"
          :firstname="text.firstname"
=======
>>>>>>> 426771090ee2e3c700d5b8ea3d05690ec489b817
        />
      </div>
      <h3>popular</h3>
    </section>
  </div>
</template>
<script>
import question from '~/components/Question'
export default {
  name: 'Faq',
  components: {
    question,
  },
  computed: {
    questions() {
      return this.$store.getters['faq/getQuestionAnswers']
    },
    isLoggedIn() {
      return this.$store.getters['faq/isLoggedIn']
    },
  },
  created() {
    this.$store.dispatch('faq/getQuestions', {})
  },
}
</script>
<style lang="scss" scoped></style>
