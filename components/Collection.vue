<template>
  <div class="collection">
    <h1>My collection</h1>
    <div class="collection_container_item">
      <CollectionItem v-for="game in games" :key="game.id" :game="game" />
    </div>
    <h1>My Dens</h1>
    <div class="event-btn center-btn">
      <NuxtLink class="button-link__orange" to="/event"
        >register event</NuxtLink
      >
    </div>
    <div class="collection_container_den">
      <DenCollectionItem
        v-for="den in dens"
        :key="'dens_' + den.id"
        :den="den"
        class="denCollection"
      />
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
  margin: auto;
}
.collection {
  h1 {
    color: $blue;
    margin: 2em 0 1em;
  }
  &_container_item {
    @include flexCenter();
    margin: auto;
    flex-shrink: 1;
    flex-wrap: wrap;
    width: 90%;
  }
}
.collection {
  text-align: center;
  h1 {
    color: $blue;
  }
  &_container_den {
    @include flexCenter();
    margin: auto;
    justify-content: space-evenly;
    flex-shrink: 1;
    flex-wrap: wrap;
    width: 90%;
    padding-top: 4rem;
  }
}
</style>
