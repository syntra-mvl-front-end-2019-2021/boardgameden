<template>
  <section class="game-page">
    <h2>Game Page</h2>
    <div v-if="atlasGame">
      <div class="game">
        <div class="game-image">
          <img :src="atlasGame.image_url" alt="" />
          <p>
            Players &#128101; {{ atlasGame.min_players }} -
            {{ atlasGame.max_players }}
          </p>
          <p>
            Playtime &#128337; {{ atlasGame.min_playtime }} -
            {{ atlasGame.max_playtime }} min
          </p>
          <p>Rating:</p>
          <p>Username 💻</p>
          <p>Location &#127969;</p>
        </div>
        <div class="game-details">
          <h3>{{ atlasGame.name }}</h3>
          <p>{{ atlasGame.description_preview }}</p>
          <div class="game-btns">
            <button type="button" class="play-btn button-link__orange">
              PLAY
            </button>
            <div class="collection-btns">
              <button
                v-if="showAddToCollection"
                type="button"
                class="buy-btn button-link__orange"
                @click="addgame"
              >
                {{ addingGame ? '....' : 'Add Game to collection' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserBuys v-if="$auth.loggedIn" />
      <div v-else class="game-login__form">
        <NuxtLink to="/login" class="game-login__form--message"
          >log in to see who's selling</NuxtLink
        >
      </div>
    </div>
    <div v-else>Fetching game....</div>
  </section>
</template>

<script>
import UserBuys from '@/components/User_buy.vue'
export default {
  name: 'GamePage',
  components: { UserBuys },
  data() {
    return {
      addingGame: false,
      loading: false,
      game: null,
      atlasGame: null,
      isActive: true,
      isActiveBuy: false,
      isActiveSwap: false,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn
    },
    showAddToCollection() {
      if (!this.isLoggedIn) {
        return false
      }

      const filteredGames = this.$auth.user.boardgames.filter(
        (bg) => bg.boardgames_id.id === parseInt(this.$route.params.id)
      )
      return filteredGames.length === 0
    },
    user() {
      return this.$auth.user
    },
  },
  created() {
    this.fetchGame()
  },
  methods: {
    addgame() {
      this.addingGame = true
      this.$axios('/items/boardgames_directus_users', {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        data: {
          boardgames_id: this.game.id,
          users_id: this.$auth.user.id,
          is_swappable: false,
          is_for_sale: false,
        },
      })
        .then(() => {
          return this.resetUser()
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.addingGame = false
        })
    },
    resetUser() {
      return this.$axios('/users/me?fields=*.*.*')
        .then((response) => {
          this.$auth.setUser(response.data.data)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    fetchGame() {
      this.loading = true
      this.$axios('/items/boardgames/' + this.$route.params.id)
        .then((response) => {
          this.game = response.data.data
          return this.fetchAtlasGame(response.data.data.bg_atlas_id)
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    fetchAtlasGame(id) {
      return this.$axios(this.$config.gbURL + '/search', {
        params: {
          client_id: this.$config.gbClientId,
          ids: id,
        },
      }).then((response) => {
        if (!response.data.games) {
          throw new Error('could not find game')
        }
        this.atlasGame = response.data.games[0]
      })
    },
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
  position: relative;

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
</style>
