<template>
  <section class="container">
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
  </section>
</template>
<script>
import ShopItem from '@/components/ShopItem.vue'
export default {
  name: 'Shop',
  components: { ShopItem },
  data() {
    return {
      gamesForSale: {},
      gamesForSwap: {},
    }
  },
  computed: {
    getGamesForSale() {
      return this.$store.getters.gamesForSale
    },
    getGamesForSwap() {
      return this.$store.getters.gamesForSwap
    },
  },
  created() {
    this.gamesForSale = this.getGamesForSale
    this.gamesForSwap = this.getGamesForSwap
    console.log('shopSale = ' + this.$store.getters.gamesForSale)
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
