<template>
  <div class="game-comp">
    <div v-if="loading" class="game-comp__loading"></div>
    <div v-if="!loading && atlasGame" class="game-comp__content">
      <div class="game-comp__content">
        <img class="game-img" :src="atlasSource" alt="game.name" />
        <h4 class="game-title">{{ atlasName }}</h4>
        <NuxtLink :to="'/game/' + atlasId" class="button-link__orange">
          More Info
        </NuxtLink>
      </div>
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
  padding-top: 1rem;
  background-color: white;
  height: 25rem;
  transition: all 0.5s ease-in-out;
  border-radius: 4px;

  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h4 {
      margin-bottom: 1.5rem;
    }
  }

  &:hover {
    transform: translateY(-10px);
    outline: 0.5rem solid $orange;
    border: none;
  }
  .game-img {
    height: 100%;
    width: 100%;
    max-width: 250px;
    max-height: 250px;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: $medium) {
    .game-img {
      max-width: 300px;
      max-height: 300px;
    }
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
