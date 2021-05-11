<template>
  <div>
    <h2>{{ $auth.user.first_name }}</h2>
    <img :src="userData.first_name" />

    <ul v-if="$auth.user">
      <li>email: {{ $auth.user.email }}</li>
    </ul>
    <Collection />

    <input v-model="searchTerm" type="text" />
    <ul>
      <li v-for="game in results" :key="game.id">{{ game.name }}</li>
    </ul>
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

<style></style>
