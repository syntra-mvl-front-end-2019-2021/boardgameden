<template>
  <div class="game-comp">
    <div v-if="loading" class="game-comp__loading"></div>
    <div v-if="!loading && atlasGame" class="game-comp__content">
      <img class="game-img" :src="atlasGame.thumb_url" alt="game.name" />
      <h3 class="game-title">{{ game.bg_name }}</h3>
      <NuxtLink :to="'/game/' + game.id" class="button-link__orange">
        More Info
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameComp',
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      atlasGame: null,
    }
  },
  created() {
    this.$axios(this.$config.gbURL + '/search', {
      params: {
        client_id: this.$config.gbClientId,
        ids: this.game.bg_atlas_id,
      },
    })
      .then((response) => {
        if (!response.data.games) {
          throw new Error('could not find game')
        }
        this.atlasGame = response.data.games[0]
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {},
}
</script>

<style lang="scss">
.game-comp {
  &__content {
    overflow: hidden;
    margin: auto;
    display: grid;
    place-items: center;
    border-radius: 5px;
    border: 1px solid $orange;
  }

  .game-img {
    height: 10rem;
    // box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    //   0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    //   0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    //   0 100px 80px rgba(0, 0, 0, 0.12);
  }
  .game-title {
    color: #549797;
  }
  .game-description {
    font-size: 0.6rem;
  }

  &__loading {
    position: relative;
    height: 20rem;

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -1rem;
      margin-left: -1rem;
      border-top: 3px solid rgba(255, 255, 255, 0.2);
      border-right: 3px solid rgba(255, 255, 255, 0.2);
      border-bottom: 3px solid rgba(255, 255, 255, 0.2);
      border-left: 3px solid $orange;
      animation: load8 1.1s infinite linear;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
    }
  }
}

@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
