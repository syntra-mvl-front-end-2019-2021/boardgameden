<template>
  <div>
    <Hero />
    <div class="container">
      <NuxtLink to="/Faq">Faq page</NuxtLink>
      <h1>Home</h1>
    </div>
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
  h1 {
    color: $blue;
  }
}
</style>
