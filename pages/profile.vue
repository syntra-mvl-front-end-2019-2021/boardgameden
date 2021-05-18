<template>
  <div>
    <div class="profile">
      <img :src="$auth.user.avatar" />
      <h2>Welcome, {{ $auth.user.user_name }}</h2>
      <ul v-if="$auth.user">
        <li>First name: {{ $auth.user.first_name }}</li>
        <li>Last name: {{ $auth.user.last_name }}</li>
        <li>Email: {{ $auth.user.email }}</li>
        <li>Location: {{ $auth.user.location }}</li>
        <NuxtLink to="/edit_profile">Edit Profile</NuxtLink>
      </ul>
      <h4>Search boardgame</h4>
      <input v-model="searchTerm" type="text" />
      <ul>
        <li v-for="game in results" :key="game.id">{{ game.name }}</li>
      </ul>
      <Collection />
    </div>
  </div>
</template>

<script>
import Collection from '~/components/Collection'

export default {
  name: 'ProfilePage',
  components: { Collection },
  middleware: ['auth'],
  data() {
    return {
      searchTerm: '',
      results: [],
    }
  },

  watch: {
    searchTerm(newSearchTerm) {
      if (newSearchTerm.length < 4) {
        return
      }
      this.$axios(this.$config.gbURL + '/search', {
        params: {
          client_id: this.$config.gbClientId,
          name: newSearchTerm,
          limit: 5,
        },
      })
        .then((response) => {
          console.log(response.data)
          this.results = response.data.games
        })
        .catch((e) => {
          console.error(e)
        })
    },
  },
}
</script>

<style>
.profile {
  margin-left: 200px;
}
</style>
