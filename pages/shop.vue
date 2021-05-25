<template>
  <section class="container">
    <h2>Shop</h2>
    <div class="shop-wrapper">
      <div class="shop-wrapper__row">
        <h3>For sale:</h3>
        <div class="shop-wrapper__row--grid">
          <ShopItem
            v-for="game in getGamesForSale"
            :key="game.id"
            :title="game.boardgames_id.bg_name"
            :user="game.users_id.first_name"
            :gb-id="game.boardgames_id.bg_atlas_id"
            :thumburl="game.boardgames_id.bg_image"
          />
        </div>
      </div>
      <div class="shop-wrapper__row">
        <h3>For swap:</h3>
        <div class="shop-wrapper__row--grid">
          <ShopItem
            v-for="game in getGamesForSwap"
            :key="game.id"
            :title="game.boardgames_id.bg_name"
            :user="game.users_id.first_name"
            :gb-id="game.boardgames_id.bg_atlas_id"
            :thumburl="game.boardgames_id.bg_image"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ShopItem from '@/components/ShopItem.vue'
export default {
  name: 'Shop',
  components: { ShopItem },
  fetch() {
    this.$store.dispatch('boardgames/getGamesForSale')
    this.$store.dispatch('boardgames/getGamesForSwap')
  },
  computed: {
    getGamesForSale() {
      return this.$store.state.boardgames.gamesForSale
    },
    getGamesForSwap() {
      return this.$store.state.boardgames.gamesForSwap
    },
  },
}
</script>
<style lang="scss">
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
