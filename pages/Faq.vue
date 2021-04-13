<template>
  <div>
    <NuxtLink to="/Questionpage">Ask a question</NuxtLink>
    <div>
      <h1>New question</h1>
    </div>

    <h1>popular</h1>
    <div class="fq-question__wrapper">
      <question
        v-for="text in questions"
        :key="text.id"
        :question="text.question"
        :answer="text.answer"
      />
    </div>
  </div>
</template>
<script>
import question from '@/components/question'
export default {
  name: 'Faq',
  components: {
    question,
  },
  computed: {
    questions: function() {
      return this.$store.getters['faq/getQuestionAnswers']
    }
  },
  created() {
    this.$store.dispatch('faq/getQuestions', {})
  },
}
</script>
<style lang="scss" scoped></style>
