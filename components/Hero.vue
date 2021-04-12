<template>
  <div class="hero">
    <svg
      class="bigBlueBackground"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 377 435"
      stroke-linejoin="round"
    >
      <path
        class="blue"
        d="M188.1 0l188.1 108.6 0 217.2 -188.1 108.6 -188.1-108.6 0-217.2 188.1-108.6Z"
      />
    </svg>
    <svg
      class="bigOrangeBackground"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 377 435"
      stroke-linejoin="round"
    >
      <path
        class="orange"
        d="M188.1 0l188.1 108.6 0 217.2 -188.1 108.6 -188.1-108.6 0-217.2 188.1-108.6Z"
      />
    </svg>
    <div class="logo">
      <img src="~/assets/images/logo.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/imports/mixins';

.hero {
  @include flexCenter;
  height: 80vh;
  width: 100%;
  background: linear-gradient(
    360deg,
    #ffffff 29.17%,
    rgba(129, 203, 235, 0.5) 100%
  );
  position: relative;
  .logo {
    @include flexCenter;

    width: 500px;
  }
  .bigBlueBackground {
    position: absolute;
    width: 700px;
    height: 700px;
    left: -5rem;
    top: -25rem;
    transform: rotate(135deg);

    .blue {
      fill: rgba(129, 203, 235);
      width: 500px;
      height: 500px;
    }
  }
  .bigOrangeBackground {
    position: absolute;

    top: -20rem;
    right: -5rem;
    width: 500px;
    height: 500px;
    transform: rotate(-135deg);

    .orange {
      fill: #ea5b30be;
    }
  }
}
</style>
