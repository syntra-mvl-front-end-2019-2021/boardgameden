<template>
  <header>
    <button v-if="isLoggedIn" @click="logout">Logout</button>
    <button v-else @click="redirect">Login</button>
  </header>
</template>

<script>
export default {
  name: 'Header',
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

<style scoped>
header {
  background-color: goldenrod;
}
</style>
