<template>
  <div class="container">
    <h1>Collection</h1>
    <collection-item v-for="game in games" :key="game.name" :game="game" />
  </div>
</template>

<script>
import CollectionItem from "./CollectionItem"
export default {
components: {
    CollectionItem
},

computed: {
    games() {
        return this.$store.state.games;
    }
},

mounted() {
    this.$store.dispatch('getGames');
    }
};
</script>

<style lang="scss">
.container {
  h1 {
    color: $blue;
  }
}
</style>
