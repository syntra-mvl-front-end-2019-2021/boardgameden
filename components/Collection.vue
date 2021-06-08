<template>
  <div class="collection">
    <h1>Your collection</h1>
    <div class="collection_container">
      <CollectionItem
        v-for="game in games"
        :key="game.id"
        :game="game.boardgames_id"
        :user-game-id="game.id"
      />
    </div>
  </div>
</template>

<script>
import CollectionItem from '~/components/CollectionItem'
export default {
  components: { CollectionItem },
  computed: {
    games() {
      return this.$auth.user.boardgames
    },
  },
}
</script>

<style lang="scss">
.collection {
  h1 {
    color: $blue;
  }
  &_container {
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
  }
}
</style>
