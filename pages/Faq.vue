<template>
  <div>
    <Hero />
    <section class="container">
      <h2>FAQ</h2>
      <NuxtLink to="/Questionpage">Ask a question</NuxtLink>
      <h3>New question</h3>
      <div class="fq-question__wrapper">
        <question
          v-for="text in questions"
          :key="text.id"
          :question="text.question"
          :answer="text.answer"
          :lastname="text.lastname"
          :firstname="text.firstname"
        />
      </div>
      <h3>popular</h3>
    </section>
  </div>
</template>
<script>
import question from '@/components/question'
import Hero from '~/components/Hero.vue'
export default {
  name: 'Faq',
  components: {
    question,
    Hero,
  },
  computed: {
    questions() {
      return this.$store.getters['faq/getQuestionAnswers']
    },
  },
  created() {
    this.$store.dispatch('faq/getQuestions', {})
  },
}
</script>
<style lang="scss" scoped></style>
