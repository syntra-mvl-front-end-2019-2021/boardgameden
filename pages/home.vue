<template>
  <div class="home-page">
    <HomePageSearch />
    <div class="players">
      <div class="players_text">
        <h1>There are <span>#</span>in <span>City</span></h1>
      </div>
      <button class="players_join">Join them!</button>
    </div>
    <GameOfTheMonth />

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
import GameOfTheMonth from '../components/GameOfTheMonth.vue'

export default {
  name: 'GamePage',
  components: { GameComp, HomePageSearch, GameOfTheMonth },
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
@import '~/assets/styles/imports/mixins';

.players {
  @include flexCenter();
  flex-direction: column;
  height: 250px;
  width: 100%;
  &_text {
    margin: auto;
  }
  &_join {
    width: 150px;
    height: 50px;
    background: transparent;
    border: 2px solid #ea5c30;
    font-size: 1.2rem;
    font-weight: bold;
    color: #ea5c30;
  }
}
</style>
