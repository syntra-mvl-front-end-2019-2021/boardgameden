<template>
  <div class="game-comp">
    <!-- https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1540147295104 -->
    <img class="game-img" :src="url" alt="" />
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
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      game: {},
    }
  },

  // methods: {
  //   getCategory() {

  //   }
  // },
}
</script>

<style lang="scss">
.game-comp {
  width: 15rem;
  height: 20rem;
  overflow: hidden;
  .game-img {
    height: 10rem;
  }

  .game-title {
    font-size: 0.8rem;
  }

  .game-description {
    font-size: 0.6rem;
  }
}
</style>
