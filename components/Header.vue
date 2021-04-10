<template>
  <header>
    <Nav />
    <button v-if="isLoggedIn" @click="logout">Logout</button>
    <button v-else @click="redirect">Login</button>
  </header>
</template>

<script>
import Nav from '~/components/Hero.vue'

export default {
  name: 'Header',
  compontents: {
    Nav,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn']
    },
  },
  methods: {
    logout() {
      this.$store.commit('auth/logout')
    },
    redirect() {
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/imports/mixins';

header {
  @include flexCenter;
  justify-content: space-between;
  position: absolute;
  width: 100%;
}
</style>
