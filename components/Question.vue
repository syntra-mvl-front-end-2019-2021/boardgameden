<template>
  <div class="question-content__item">
    <p>{{ firstname }}</p>
    <p>{{ lastname }}</p>
    <p>question: {{ question }}</p>
    <p v-if="answer">answer: {{ answer }}</p>
  </div>
</template>
<script>
export default {
  name: 'Question',
  props: {
    id: {
      type: Number,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
  },
}
</script>
<style lang="scss">
.question-content__item {
  p {
    line-height: 30px;
  }
  h2 {
    padding: 20px 0 30px 0;
  }
}
</style>
