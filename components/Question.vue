<template>
  <div class="question-content__item">
    <div class="question-wrapper">
      <h4 class="question-wrapper__question">{{ question }}</h4>
      <button
        :class="{
          'question-wrapper__button': true,
          'question-wrapper__button--open': isActive,
        }"
        @click="showAnswer"
      ></button>
    </div>
    <div
      :class="{
        'answer-wrapper': true,
        active: isActive,
      }"
    >
      <div v-if="answer" v-html="answer" />
    </div>
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
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    showAnswer() {
      this.isActive = !this.isActive
    },
  },
}
</script>
<style lang="scss">
.question-content__item {
  width: 60%;
  margin: auto;
  .question-wrapper {
    display: flex;
    justify-content: space-between;
    &__question {
      color: $orange;
    }
    &__button {
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      background-color: $orange;
      border: none;
      width: 17px;
      height: 17px;
      margin-top: 15px;
      transform: rotate(270deg);
      transition: $transition-normal;
    }
    &__button--open {
      transform: rotate(180deg);
    }
  }
  .answer-wrapper {
    display: none;
    transition: $transition-normal;
  }
  .active {
    display: block;
  }
}
</style>
