<template>
  <div class="hero">
    <Logo />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Logo from '~/components/Logo'

export default {
  name: 'Hero',
  components: { Logo },
}
</script>

<style lang="scss" scoped>
.hero {
  @include flexCenter;
  height: 80vh;
  width: 100%;
  padding-top: 8rem;
  background: linear-gradient(360deg, #ffffff 1%, rgba(129, 203, 235, 0.7));
  z-index: -1;
}
</style>
