<template>
  <section class="container">
    <h2>Shop</h2>
    <div class="filter-buttons container">
      <button
        :class="{
          'button-link__black': true,
          active: isActive,
        }"
        @click="toggleActive"
      >
        ALL
      </button>
      <button
        :class="{
          'button-link__black': true,
          active: isActiveBuy,
        }"
        @click="toggleBuy"
      >
        BUY
      </button>
      <button
        :class="{
          'button-link__black': true,
          active: isActiveSwap,
        }"
        @click="toggleSwap"
      >
        SWAP
      </button>
    </div>
    <div class="shop-wrapper">
      <div v-if="isActive || isActiveBuy" class="shop-wrapper__row">
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
      <div v-if="isActive || isActiveSwap" class="shop-wrapper__row">
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
  data() {
    return {
      isActive: true,
      isActiveBuy: false,
      isActiveSwap: false,
    }
  },
  fetch() {
    // console.log(this.$route.query.search)
    this.$store.dispatch('boardgames/getGamesForSale', this.$route.query.search)
    this.$store.dispatch('boardgames/getGamesForSwap', this.$route.query.search)
  },
  computed: {
    getGamesForSale() {
      return this.$store.state.boardgames.gamesForSale.filter((game) => {
        return game.boardgames_id.bg_name.match(this.$route.query.search)
      })
    },
    getGamesForSwap() {
      return this.$store.state.boardgames.gamesForSwap.filter((game) => {
        return game.boardgames_id.bg_name.match(this.$route.query.search)
      })
    },
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive
      this.isActiveBuy = false
      this.isActiveSwap = false
    },
    toggleBuy() {
      this.isActiveBuy = !this.isActiveBuy
      this.isActive = false
      this.isActiveSwap = false
    },
    toggleSwap() {
      this.isActiveSwap = !this.isActiveSwap
      this.isActiveBuy = false
      this.isActive = false
    },
  },
}
</script>
<style lang="scss">
.filter-buttons {
  display: flex;
  margin-top: -2em;
  flex-direction: row;
  justify-content: center;
  button {
    margin: 0.5em;
  }
}
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
