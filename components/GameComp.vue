<template>
  <div class="game-comp" @click="getGameId">
    <!-- https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1540147295104 -->
    <img class="game-img" :src="url" alt="" />
    <p class="game-title">{{ id }}</p>
    <h3 class="game-title">{{ title }}</h3>
    <p class="game-description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'GameComp',
  props: {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      game: {},
      gameId: '',
    }
  },
  methods: {
    getGameId() {
      this.gameId = this.id
      console.log(this.gameId)
    },
  },
}
</script>

<style lang="scss">
.game-comp {
  width: 15rem;
  height: 20rem;
  overflow: hidden;
  margin: auto;
  display: grid;
  place-items: center;

  .game-img {
    height: 10rem;

    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
  }
  .game-title {
    color: #549797;
  }
  .game-description {
    font-size: 0.6rem;
  }
}
</style>
