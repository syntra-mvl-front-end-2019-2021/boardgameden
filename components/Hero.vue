<template>
  <div class="hero">
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
  .logo {
    @include flexCenter;

    width: 500px;
  }
}
</style>
