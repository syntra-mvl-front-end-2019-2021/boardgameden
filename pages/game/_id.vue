<template>
  <section class="game-page">
    <!-- <h2>Game Page</h2> -->

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
            <button
              type="button"
              class="swap-btn button-link__orange"
              @click="toggleSwap"
            >
              SWAP!
            </button>
            <button
              type="button"
              class="buy-btn button-link__orange"
              @click="toggleBuy"
            >
              BUY!
            </button>
          </div>
        </div>
      </div>
    </div>
    <UserSwaps v-if="isActiveSwap === true" />
    <UserBuys v-if="isActiveBuy === true" :class="{ UserBuys: isActiveBuy }" />
  </section>
</template>

<script>
import UserSwaps from '@/components/User_swaps.vue'
import UserBuys from '@/components/User_buy.vue'
export default {
  name: 'GamePage',
  components: { UserSwaps, UserBuys },
  data() {
    return {
      isActive: true,
      isActiveBuy: false,
      isActiveSwap: false,

      game: {},
    }
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
  methods: {
    toggleActive() {
      this.isActive = !this.isActive
      this.isActiveBuy = false
      this.isActiveSwap = false
    },
    toggleBuy() {
      this.isActiveBuy = !this.isActiveBuy
      this.isActive = false
      this.isActiveSwap = false
    },
    toggleSwap() {
      this.isActiveSwap = !this.isActiveSwap
      this.isActiveBuy = false
      this.isActive = false
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
