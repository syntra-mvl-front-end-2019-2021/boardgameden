<template>
  <div class="container">
    <h1>Collection</h1>
    <CollectionItem
      v-for="game in games"
      :key="game.bg_atlas_id"
      :game="game"
    />
  </div>
</template>

<script>
import CollectionItem from '~/components/CollectionItem'
export default {
  components: { CollectionItem },
  computed: {
    games() {
      return this.$auth.user.boardgames.map((val) => val.boardgames_id)
    },
  },
}
</script>

<style lang="scss">
.container {
  h1 {
    color: $blue;
  }
}
</style>
