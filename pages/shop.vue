<template>
  <div class="container">
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
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ShopItem from '@/components/ShopItem.vue'
export default {
  name: 'Shop',
  components: { ShopItem },
  data() {
    return {
      games: [],
      users: [],
    }
  },
  computed: {
    getGamesForSale() {
      return this.games.filter((game) => game.is_for_sale)
    },
    getGamesForSwap() {
      return this.games.filter((game) => game.is_swappable)
    },
  },
  created() {
    return this.$axios('/items/boardgames_directus_users?fields=*.*.*', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        this.games = response.data.data
        console.log(this.games)
      })
      .catch((err) => {
        // TODO: error handling

        console.error(err)
      })
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
    }
  }
}
</style>
