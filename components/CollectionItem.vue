<template>
  <div v-if="atlasGame">
    <h3 class="game-title">{{ game.bg_name }}</h3>
    <div class="collection-item">
      <div class="collection-item_card">
        <img
          class="game-img"
          :src="atlasGame.thumb_url"
          alt="game picture"
          width="auto"
          height="150px"
        />
        <NuxtLink :to="'/game/' + game.id" class="button-link__orange">
          {{ game.bg_name }}
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
  },
  data() {
    return {
      atlasGame: [],
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
.collection-item {
  width: 200px;
  border: solid $orange 1px;
  border-radius: 10px;
  padding: 2em;
  margin: 1em;

  &_card {
    display: flex;
    flex-direction: column;
    padding: 0.5em;
  }
}
</style>
