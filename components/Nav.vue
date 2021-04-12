<template>
  <nav>
    <a href="">Home</a>
    <a href="">Shop</a>
    <a href="">PLAY!</a>
    <a href="">FAQ</a>
    <a href="">Contact</a>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  components: {},
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/imports/mixins';

nav {
  @include flexCenter;
  justify-content: space-evenly;
  width: 450px;
  height: 100px;

  a {
    color: #ea5d2f;
    text-decoration: none;
  }
}
</style>
