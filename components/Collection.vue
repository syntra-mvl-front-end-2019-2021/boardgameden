<template>
  <div class="collection">
    <h1>My collection</h1>
    <div class="collection_container">
      <CollectionItem v-for="game in games" :key="game.id" :game="game" />
    </div>
    <h1>My Dens</h1>
    <div class="collection_container">
      <DenCollectionItem
        v-for="den in dens"
        :key="'dens_' + den.id"
        :den="den"
        class="denCollection"
      />
    </div>
    <div class="event-btn center-btn">
      <p>
        <NuxtLink class="button-link__orange" to="/event"
          >register event</NuxtLink
        >
      </p>
    </div>
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
.center-btn {
  width: 80%;
  text-align: center;
}
.collection {
  h1 {
    color: $blue;
  }
  &_container {
    display: flex;
    justify-content: space-evenly;
    flex-shrink: 1;
    flex-direction: row;
    align-content: center;
    flex-wrap: wrap;
    width: 90%;
  }
}
</style>
