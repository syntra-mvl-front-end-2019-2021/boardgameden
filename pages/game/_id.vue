<template>
  <section class="game-page">
    <h2>
      <span class="g">G</span>
      <span class="g">a</span>
      <span class="g">m</span>
      <span class="g">e</span>
      <span class="g"> </span>
      <span class="g">P</span>
      <span class="g">a</span>
      <span class="g">g</span>
      <span class="g">e</span>
    </h2>
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
          <button class="play-btn button-link">PLAY</button>
          <div class="collection-btns">
            <button class="swap-btn button-link">SWAP!</button>
            <button class="buy-btn button-link">BUY!</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'GamePage',
  data() {
    return {
      baseURL: 'https://api.boardgameatlas.com/api/',
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
}
</script>

<style lang="scss">
.game-page {
  text-align: center;

  h2 {
    margin-bottom: 3rem;

    span {
      animation: moveIn ease-in 1s;
    }
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
    transform: translate(100px, 100px);
  }

  60% {
    opacity: 0.2;
    transform: translate(60px);
  }

  80% {
    opacity: 0.4;
    transform: translate(20px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}
</style>
