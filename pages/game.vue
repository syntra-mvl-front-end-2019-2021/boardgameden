<template>
  <div>
    <h1>Game Page</h1>
    <h2>{{ game.name }}</h2>
    <p>{{ game.description_preview }}</p>
    <p>Players {{ game.min_players }} - {{ game.max_players }}</p>
    <p>Playtime {{ game.min_playtime }} - {{ game.max_playtime }} min</p>
    <GameComp />
  </div>
</template>

<script>
import GameComp from '../components/GameComp.vue'
export default {
  name: 'GamePage',
  components: { GameComp },
  data() {
    return {
      baseURL: 'https://api.boardgameatlas.com/api/',
      game: {},
      category: 'this.game.categories.url',
    }
  },
  created() {
    fetch(this.baseURL + 'search?client_id=JLBr5npPhV&ids=i5Oqu5VZgP', {
      method: 'GET',
      headers: {},
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('could not fetch userdata')
        }

        return response.json()
      })
      .then((result) => {
        this.game = result.games[0]
        console.log(result.games[0])
      })
      .catch(() => {})
  },
  methods: {
    getCategory() {},
  },
}
</script>

<style scoped></style>
