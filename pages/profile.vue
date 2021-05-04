<template>
  <div>
    <h1>Profile123</h1>
    <ul v-if="userData">
      <li>email: {{ userData.email }}</li>
    </ul>
    <Collection />
    <h3>test</h3>
    <h2>{{ game.name }}</h2>
  </div>
</template>

<script>

export default {
  name: 'ProfilePage',

  data() {
    return {
      userData: null,
    }
  },
  created() {
    fetch('http://206.81.26.160/users/me?fields=*.*.*', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.$store.state.auth.token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('could not fetch userdata')
        }

        return response.json()
      })
      .then((body) => {
        this.userData = body.data
      })
      .catch(() => {
        this.$store.commit('auth/logout')
      })
  },
}
</script>

<style></style>
