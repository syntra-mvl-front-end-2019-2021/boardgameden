<template>
  <nav class="c-nav">
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/shop">Shop</NuxtLink>
    <NuxtLink to="/gameDen">PLAY!</NuxtLink>
    <NuxtLink to="/Faq">FAQ</NuxtLink>
    <NuxtLink to="/contact">Contact</NuxtLink>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  components: {},
}
</script>

<style lang="scss" scoped>
nav {
  @include flexCenter;
  justify-content: space-evenly;
  width: 450px;
  height: 100px;

  a {
    color: $orange;
    text-decoration: none;
    position: relative;
  }

  a::after {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: $orange;
    content: '';
    opacity: 0;
    -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
    -moz-transition: opacity 0.3s, -moz-transform 0.3s;
    transition: opacity 0.3s, transform 0.3s;
    -webkit-transform: translateY(10px);
    -moz-transform: translateY(10px);
    transform: translateY(10px);
  }

  a:hover::after {
    opacity: 1;
  }
}
</style>
