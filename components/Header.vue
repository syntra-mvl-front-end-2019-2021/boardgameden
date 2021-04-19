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
  width: 100%;
  height: 200px;
  position: absolute;
  z-index: 10000;
}
.inner_header {
  @include flexCenter;
  justify-content: space-between;
  margin: auto;
  max-width: 1200px;

  .login {
    a {
      color: #3a3939;
    }
  }
}
</style>
