<template>
  <div class="shop-item">
    <div>
      <NuxtLink :to="'/game/' + game.id" class="button-link__orange">
        {{ game.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectionItem',
  data() {
    return {
      game: [],
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
