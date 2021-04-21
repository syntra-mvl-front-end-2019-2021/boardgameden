<template>
  <header>
    <div class="inner_header">
      <Nav />

      <div class="login">
        <a v-if="isLoggedIn" @click="logout">Logout</a>
        <a v-else @click="redirect">Login</a>
        <a>Register</a>
      </div>
    </div>
  </header>
</template>

<script>
import Nav from '~/components/Nav.vue'

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
  width: 100%;
  position: fixed;
  z-index: 10000;
  padding: 4rem 10rem;
  border-bottom: black 1px solid;
}
.inner_header {
  @include flexCenter;
  justify-content: space-between;
  width: 100%;

  .login {
    a {
      color: #3a3939;
    }
  }
}
</style>
