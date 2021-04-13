<template>
  <div class="question-content__item">
    <h1>{{ id }}</h1>
    <h2>{{ question }}</h2>
    <p>
      {{ answer }}
    </p>
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
  },
}
</script>
<style lang="scss">
.question-content__item {
  p {
    line-height: 30px;
  }
  h2 {
    padding: 20px 0px 30px 0px;
  }
}
</style>
