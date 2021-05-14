<template>
  <div class="container">
    <h2>Shop</h2>
    <div class="shop-wrapper">
      <div class="shop-wrapper__row">
        <h3>For sale:</h3>
        <div class="shop-wrapper__row--grid">
          <ShopItem
            v-for="game in gamesForSale"
            :key="game.id"
            :title="game.boardgames_id"
            :user="game.users_id"
          />
        </div>
      </div>
      <div class="shop-wrapper__row">
        <h3>For swap:</h3>
        <div class="shop-wrapper__row--grid">
          <ShopItem
            v-for="game in gamesForSwap"
            :key="game.id"
            :title="game.boardgames_id"
            :user="game.users_id"
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
      gamesForSale: [],
      gamesForSwap: [],
    }
  },
  computed: {
    getBoardgameShop() {
      return this.$store.state.shop.boardgameShop
    },
  },
  created() {
   return this.$axios(
    this.$config.baseURL +
        '/items/boardgames_directus_users?fields=*.boardgames_id.*',
        )
      .then((response) => {
        const games = response.data.data
        this.gamesForSale = games.filter(this.returnSales)
        this.gamesForSwap = games.filter(this.returnSwappable)
        console.log(this.getBoardgameShop)
      })
      .catch((e) => {
        console.error(e)
      })
  },
  methods: {
    returnSales(el) {
      return el.is_for_sale
    },
    returnSwappable(el) {
      return el.is_swappable
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
    }
  }
}
</style>
