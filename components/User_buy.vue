<template>
  <div class="shop-wrapper">
    <div class="shop-wrapper__row">
      <h3>For sale:</h3>
      <div class="shop-wrapper__row--grid">
        <ShopItem
          v-for="games in getGamesForSale"
          :key="games.id"
          :title="games.boardgames_id.bg_name"
          :user="games.users_id.first_name"
          :gb-id="games.boardgames_id.bg_atlas_id"
          :thumburl="games.boardgames_id.bg_image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ShopItem from '@/components/ShopItem.vue'

export default {
  name: 'UserSwaps',
  components: { ShopItem },

  data() {
    return {
      isActive: true,
      isActiveBuy: false,
    }
  },
  fetch() {
    this.$store.dispatch('boardgames/getGamesForSale')
  },
  computed: {
    getGamesForSale() {
      return this.$store.state.boardgames.gamesForSale.filter((games) => {
        return games.boardgames_id.bg_atlas_id.match(this.$route.params.id)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.shop-wrapper {
  display: flex;
  flex-direction: column;
  margin: 3em 0;
  &__row {
    width: 100%;
    &--grid {
      display: flex;
      width: 100%;
      margin: 2em 0;
      flex-wrap: wrap;
    }
  }
}
</style>
