<template>
  <div class="home-page">
    <HomePageSearch />
    <section class="s-month-game">
      <h2>Game of the month!</h2>
      <div class="month-game">
        <div class="month-game__img"></div>
        <div class="month-game__details"></div>
      </div>
    </section>

    <section class="s-newest-swaps">
      <h2>Newest SWAPS</h2>
      <div class="swaps">
        <GameComp
          :url="game.image_url"
          :title="game.name"
          :description="game.description_preview"
        />
        <GameComp
          :url="game.image_url"
          :title="game.name"
          :description="game.description_preview"
        />
        <GameComp
          :url="game.image_url"
          :title="game.name"
          :description="game.description_preview"
        />
      </div>
    </section>
    <section class="s-newest-sells">
      <h2>Newest SELLS</h2>
      <div class="sells">
        <GameComp
          :url="game.image_url"
          :title="game.name"
          :description="game.description_preview"
        />
        <GameComp
          :url="game.image_url"
          :title="game.name"
          :description="game.description_preview"
        />
        <GameComp
          :url="game.image_url"
          :title="game.name"
          :description="game.description_preview"
        />
      </div>
    </section>
  </div>
</template>

<script>
import GameComp from '../components/GameComp.vue'
import HomePageSearch from '../components/HomePageSearch.vue'

export default {
  name: 'GamePage',
  components: { GameComp, HomePageSearch },
  data() {
    return {
      baseURL: 'https://api.boardgameatlas.com/api/',
      // games: [],
      game: {},
      // categories: this.game.categories,
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
        // this.games = result.games
        this.game = result.games[0]
        console.log(result.games)
        console.log(this.game.categories)
      })
      .catch(() => {})
  },
  methods: {},
}
</script>

<style lang="scss">
.home-page {
  h1 {
    margin-bottom: 2rem;
  }

  section {
    width: 80%;
    margin: auto;
    margin-bottom: 3rem;
  }

  .s-month-game {
    .month-game {
      width: 30rem;
      height: 20rem;
      margin: auto;
      border: solid 1px gray;
    }
  }

  .swaps,
  .sells {
    display: flex;
  }
}
</style>
