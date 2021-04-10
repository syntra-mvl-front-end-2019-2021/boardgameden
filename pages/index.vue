<template>
  <Hero />
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
