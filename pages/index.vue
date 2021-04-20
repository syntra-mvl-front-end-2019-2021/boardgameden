<template>
  <div class="container">
    <Hero />

    <NuxtLink to="/Faq">Faq page</NuxtLink>
    <NuxtLink to="/houseRules">House Rules</NuxtLink>

    <h1>Home</h1>
  </div>
</template>

<script>
import Hero from '~/components/Hero.vue'

export default {
  name: 'HomePage',
  components: {
    Hero,
  },
}
</script>

<style lang="scss">
.container {
  height: 2000px; //testHeight
  h1 {
    color: $blue;
  }
}
</style>
