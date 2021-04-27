<template>
  <div>
    <section class="container faq">
      <h2>FAQ</h2>
      <NuxtLink class="button-link__orange" to="/contact">
        Ask a question
      </NuxtLink>
      <div class="fq-question__wrapper">
        <Question
          v-for="text in questions"
          :id="text.id"
          :key="text.id"
          :question="text.question"
          :answer="text.answer"
          :lastname="text.lastname"
          :firstname="text.firstname"
        />
      </div>
    </section>
  </div>
</template>
<script>
import question from '~/components/question'
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
<style lang="scss">
section.faq {
  h2 {
    display: inline;
  }
  .button-link__orange {
    float: right;
  }
  .fq-question__wrapper {
    margin: 3em 0;
    .question-content__item {
      padding: 1em 0;
      border-bottom: 1px solid $black;
    }
  }
}
</style>
