<template>
  <div class="collection">
    <h1>Your collection</h1>
    <div class="collection_container">
      <CollectionItem v-for="game in games" :key="game.id" :game="game" />
    </div>
    <h1>Your Dens</h1>

    <div class="collection_container">
      <DenCollectionItem
        v-for="den in dens"
        :key="'dens_' + den.id"
        :den="den"
      />
    </div>

    <p>
      <NuxtLink class="button-link__orange" to="/event"
        >register event</NuxtLink
      >
    </p>
  </div>
</template>

<script>
import CollectionItem from '~/components/CollectionItem'
import DenCollectionItem from '~/components/DenCollectionItem'
export default {
  components: { CollectionItem, DenCollectionItem },
  computed: {
    games() {
      return this.$auth.user.boardgames
    },
    dens() {
      return this.$auth.user.boardgame_den
    },
    user() {
      return this.$auth.user
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
