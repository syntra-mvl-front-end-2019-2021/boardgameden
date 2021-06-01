<template>
  <section class="game-page">
    <h2>Game Page</h2>
    <div :key="game.id" class="game">
      <div class="game-image">
        <img :src="game.image_url" alt="" />
        <p>Players &#128101; {{ game.min_players }} - {{ game.max_players }}</p>
        <p>
          Playtime &#128337; {{ game.min_playtime }} -
          {{ game.max_playtime }} min
        </p>
        <p>Rating &#127942;</p>
        <p>Username 💻</p>
        <p>Location &#127969;</p>
      </div>
      <div class="game-details">
        <h3>{{ game.name }}</h3>
        <p>{{ game.description_preview }}</p>
        <div class="game-btns">
          <button type="button" class="play-btn button-link__orange">
            PLAY
          </button>
          <div class="collection-btns">
            <button type="button" class="swap-btn button-link__orange">
              SWAP!
            </button>
            <button type="button" class="buy-btn button-link__orange">
              BUY!
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="shop-wrapper">
      <div class="shop-wrapper__row">
        <h3>For swap:</h3>
        <div class="shop-wrapper__row--grid">
          <ShopItem
            v-for="games in getGamesForSwap"
            :key="games.id"
            :title="games.boardgames_id.bg_name"
            :user="games.users_id.first_name"
            :gb-id="games.boardgames_id.bg_atlas_id"
            :thumburl="games.boardgames_id.bg_image"
          />
        </div>
      </div>
      <div class="shop-wrapper__row">
        <h3>For sale:</h3>
        <div class="shop-wrapper__row--grid">
          <ShopItem
            v-for="games in getGamesForSale"
            :key="games.id"
            :title="games.boardgames_id.bg_name"
            :user="games.users_id.first_name"
            :gb-id="games.boardgames_id.bg_atlas_id"
            :thumburl="games.boardgames_id.bg_image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ShopItem from '@/components/ShopItem.vue'
export default {
  name: 'GamePage',
  components: { ShopItem },

  data() {
    return {
      // baseURL: 'GB_URL',
      game: {},
    }
  },
  fetch() {
    this.$store.dispatch('boardgames/getGamesForSale')
    this.$store.dispatch('boardgames/getGamesForSwap')
  },
  computed: {
    getGamesForSale() {
      return this.$store.state.boardgames.gamesForSale.filter((games) => {
        return games.boardgames_id.bg_atlas_id.match(this.$route.params.id)
      })
    },
    getGamesForSwap() {
      return this.$store.state.boardgames.gamesForSwap.filter((games) => {
        return games.boardgames_id.bg_atlas_id.match(this.$route.params.id)
      })
    },
  },
  created() {
    this.$axios(this.$config.gbURL + '/search', {
      params: {
        client_id: this.$config.gbClientId,
        ids: this.$route.params.id,
      },
    })
      .then((response) => {
        if (!response.data.games) {
          throw new Error('could not find game')
        }
        this.game = response.data.games[0]
        console.log('data=' + response.data.games[0])
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.loading = false
      })
  },
}
</script>

<style lang="scss">
.game-page {
  text-align: center;

  h2 {
    margin-bottom: 3rem;
    animation: moveIn 5s;
  }
}

.game {
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding: 2rem;
  border: solid 3px $bluegreen;
  border-radius: 20px;

  .game-image {
    width: 35%;
    text-align: left;

    p {
      line-height: 2.5rem;
    }

    img {
      width: 100%;
      margin-bottom: 2rem;
    }
  }

  .game-details {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      line-height: 2.5rem;
    }
  }
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

@keyframes moveIn {
  0% {
    opacity: 0;
    transform: translateX(150px);
  }

  80% {
    transform: translate(-30px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}

.button-link__orange {
  border: 2px solid $orange;
  padding: 0.5em 1em;
  border-radius: 5px;
  color: $orange;
  transition: $transition-normal;
}

.button-link__orange:hover {
  background-color: $orange;
  color: white;
}
.shop-wrapper {
  display: flex;
  flex-direction: column;
  margin: 3em 0;
  &__row {
    width: 100%;
    &--grid {
      display: flex;
      width: 100%;
      margin: 2em 0;
      flex-wrap: wrap;
    }
  }
}
</style>
