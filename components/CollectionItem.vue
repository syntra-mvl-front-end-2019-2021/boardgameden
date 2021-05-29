<template>
  <!-- <div>
    <strong>{{ game.bg_atlas_id }}</strong>
  </div> -->
  <div v-if="game">
    <img class="game-img" :src="game.thumb_url" alt="game.name" />
    <p class="game-title">{{ game.gbId }}</p>
    <h3 class="game-title">{{ game.name }}</h3>
  <div class="shop-item">
    <div>
      <img
        class="game-img"
        :src="game.image_url"
        alt="game picture"
        width="300px"
        height="300px"
      />
      <NuxtLink :to="'/game/' + game.id" class="button-link__orange">
        {{ game.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectionItem',
  middleware: 'auth',
  props: {
    game: {
      type: Object,
      required: true,
    },
    title: { type: String, required: true },
    user: { type: String, required: true },
    gbId: { type: String, required: true },
    thumburl: { type: String, required: true },
  },
  data() {
    return {
      game: {},
    }
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
