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
    title: { type: String, required: true },
    user: { type: String, required: true },
    gbId: { type: String, required: true },
    thumburl: { type: String, required: true },
  },
  data() {
    return {
      games: [],
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
.shop-item {
  width: 200px;
  border: solid $orange 1px;
  border-radius: 10px;
  padding: 2em;
  margin: 1em;
}
</style>
