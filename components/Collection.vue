<template>
  <div class="collection">
    <h1>Your collection</h1>
    <div class="collection_container">
      <CollectionItem v-for="game in games" :key="game.id" :game="game" />
    </div>
    <h1>Your Dens</h1>

    <p>
      <NuxtLink class="button-link__orange" to="/event"
        >register event</NuxtLink
      >
    </p>
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
    dens() {
      return this.$auth.user.items.boardgame_dens
    },
  },
  created() {
    this.$axios
      .get(
        `/items/boardgame_dens?fields[]=id,user.first_name,location,boardgame.bg_name,attendees.users_id,boargame_dens.id`,
        {
          headers: { Authorization: '' },
        }
      )
      .then((response) => {
        console.log(this.results)
        this.results = response.data.data
      })
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
