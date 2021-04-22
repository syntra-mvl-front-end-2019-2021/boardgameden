<template>
  <div class="home-page">
    <section class="container">
      <h2>Home Page</h2>
      <section class="s-search">
        <form>
          <label for="search"></label>
          <input id="search" type="text" placeholder="Search.." name="search" />

          <label for="city"></label>
          <input id="city" type="text" placeholder="City" name="city" />

          <label for="radius"></label>
          <input id="radius" type="text" placeholder="Radius" name="radius" />

          <button type="submit">Fetch</button>
        </form>

        <button>Game BOARD DEN</button>
      </section>

      <section class="s-month-game">
        <h3>Game of the month!</h3>
        <div class="month-game">
          <div class="month-game__img"></div>
          <div class="month-game__details"></div>
        </div>
      </section>

      <section class="s-newest-swaps">
        <h3>Newest SWAPS</h3>
        <div class="swaps">
          <GameComp
            v-for="game in games"
            :id="game.id"
            :key="game.id"
            :url="game.image_url"
            :title="game.name"
            :description="game.description_preview"
          />
          <!-- <GameComp
            :id="game.id"
            :key="game.id"
            :url="game.image_url"
            :title="game.name"
            :description="game.description_preview"
          />
          <GameComp
            :id="game.id"
            :key="game.id"
            :url="game.image_url"
            :title="game.name"
            :description="game.description_preview"
          /> -->
        </div>
      </section>
      <section class="s-newest-sells">
        <h3>Newest SELLS</h3>
        <div class="sells">
          <!-- <GameComp
            :id="game.id"
            :key="game.id"
            :url="game.image_url"
            :title="game.name"
            :description="game.description_preview"
          />
          <GameComp
            :id="game.id"
            :key="game.id"
            :url="game.image_url"
            :title="game.name"
            :description="game.description_preview"
          />
          <GameComp
            :id="game.id"
            :key="game.id"
            :url="game.image_url"
            :title="game.name"
            :description="game.description_preview"
          /> -->
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import GameComp from '~/components/GameComp.vue'
export default {
  name: 'Index',
  components: {
    GameComp,
  },
  data() {
    return {
      baseURL: 'https://api.boardgameatlas.com/api/',
      games: [],
      // game: {},
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
        // console.log(result)
        this.games = result.games
        // this.game = result.games[0]
        // console.log(result.games)
        // console.log(this.game.categories)
      })
      .catch(() => {})
  },
  methods: {
    getGameId() {
      // this.$refs.game.key = this.gameId
      // console.log(this.gameId)
      console.log('hallo')
    },
  },
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

  .s-search {
    form {
      padding: 1em;
      border-radius: 10px;
      display: flex;
      width: 100%;
      background-color: $orange;
      label,
      input,
      button {
        flex: 1;
      }
    }
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
