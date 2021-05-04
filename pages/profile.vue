<template>
  <div>
    <h1>Profile</h1>
    <ul v-if="$auth.user">
      <li>email: {{ $auth.user.email }}</li>
    </ul>
    <Collection />
    <h3>test</h3>
    <!--    <h2>{{ game.name }}</h2>-->

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
