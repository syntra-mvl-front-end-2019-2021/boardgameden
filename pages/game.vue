<template>
  <div class="game-page">
    <h1>Game Page</h1>
    <div :key="game.id" class="game">
      <h2>{{ game.name }}</h2>
      <p>{{ game.description_preview }}</p>
      <p>Players {{ game.min_players }} - {{ game.max_players }}</p>
      <p>Playtime {{ game.min_playtime }} - {{ game.max_playtime }} min</p>
      <!-- <p>{{ game.id }}</p> -->
      <img :src="game.image_url" alt="" />
      <!-- <p>{{ category }}</p> -->
      <p>Rating</p>
      <p>Username</p>
      <p>Location</p>
      <button class="play-btn">PLAY</button>
      <div class="collection-btns">
        <button class="swap-btn">SWAP!</button>
        <button class="buy-btn">BUY!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GamePage',
  data() {
    return {
      baseURL: 'https://api.boardgameatlas.com/api/',
      // games: [],
      game: {},
      // categories: this.game.categories,
    }
  },
  created() {
    fetch(this.baseURL + 'search?client_id=KrUdcULOvp', {
      // &ids=i5Oqu5VZgP
      // JLBr5npPhV

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
        // this.games = result.games
        this.game = result.games[0]
        // console.log(result.games)
        // console.log(this.game.categories)
      })
      .catch(() => {})
  },
  methods: {
    // getCategory() {
    //   if(this.categories.id === )
    // },
  },
}
</script>

<style lang="scss">
.game-page {
  width: 80%;
  margin: auto;
}

.game {
  margin-top: 2rem;
  width: 500px;
  margin-bottom: 3rem;
}
.play-btn {
  width: 100%;
  margin-bottom: 1rem;
  height: 3rem;
}

.swap-btn,
.buy-btn {
  width: calc((100% - 1rem) / 2);
  height: 3rem;
}

.collection-btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
