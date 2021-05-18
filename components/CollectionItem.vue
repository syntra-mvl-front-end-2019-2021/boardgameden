<template>
  <!-- <div>
    <strong>{{ game.bg_atlas_id }}</strong>
  </div> -->
  <div v-if="game">
    <img class="game-img" :src="game.thumb_url" alt="game.name" />
    <p class="game-title">{{ game.gbId }}</p>
    <h3 class="game-title">{{ game.name }}</h3>
  </div>
</template>

<script>
export default {
  name: 'CollectionItem',
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.$axios
      .get(
        `https://www.boardgameatlas.com/api/game/${this.game.bg_atlas_id}/basegame?client_id=KrUdcULOvp`,
        {
          headers: { Authorization: '' },
        }
      )
      .then((response) => {
        console.log(response)
      })
  },
}
</script>

<style></style>
