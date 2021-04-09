<template>
  <div class="game-page">
    <h1>Game Page</h1>
    <div v-for="game in games" :key="game.id" class="game">
      <h2>{{ game.name }}</h2>
      <p>{{ game.description_preview }}</p>
      <p>Players {{ game.min_players }} - {{ game.max_players }}</p>
      <p>Playtime {{ game.min_playtime }} - {{ game.max_playtime }} min</p>
      <p>{{ game.id }}</p>
      <GameComp :url="game.image_url" :category="game.categories" />
    </div>
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
      games: [],
    }
  },
  created() {
    fetch(this.baseURL + 'search?client_id=JLBr5npPhV', {
      // &ids=i5Oqu5VZgP
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
        console.log(result)
        this.games = result.games
      })
      .catch(() => {})
  },
  // methods: {
  //   getCategory() {},
  // },
}
</script>

<style scoped>
.game-page {
  width: 80%;
  margin: auto;
}

.game {
  margin-top: 2rem;
  width: 500px;
  margin-bottom: 3rem;
}
</style>
