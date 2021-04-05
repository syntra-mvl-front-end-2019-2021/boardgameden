<template>
  <div>
    <h1>Login Page</h1>
    <form @submit.prevent="login">
      <div>
        <label>
          E-mailadres:
          <input v-model="email" type="text" />
        </label>
      </div>
      <div>
        <label>
          Wachtwoord:
          <input v-model="password" type="password" />
        </label>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    loginBody() {
      return JSON.stringify({
        email: this.email,
        password: this.password,
      })
    },
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', this.loginBody)
    },
  },
}
</script>

<style scoped></style>
