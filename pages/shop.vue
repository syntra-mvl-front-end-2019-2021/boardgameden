<template>
  <section class="container">
    <h2>Shop</h2>
    <div class="filter-buttons container">
      <button
        :class="{
          'button-link__black': true,
          active: isActive,
        }"
        @click="toggleAllItems"
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
    <div class="filter-buttons__categories">
      <div
        v-for="game in categories"
        :key="game.id"
        class="filter-buttons__categories-dropdown"
      >
        <div @click="filterBy(game.name, game.bg_atlas_id)">
          <ul>
            <li>{{ game.name }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="shop-wrapper">
      <div v-if="filtering" class="shop-wrapper__row">
        <div :class="{ loading: loader }">
          <h3>{{ newCategory }}</h3>
          <div v-if="!loader" class="shop-wrapper__row--grid">
            <ShopItem
              v-for="game in filteredForSale"
              :key="game.id"
              :title="game.boardgames_id.bg_name"
              :user="game.users_id.first_name"
              :gb-id="game.boardgames_id.bg_atlas_id"
              :thumburl="game.boardgames_id.bg_image"
              :buyOrSwap="'buy'"
              :forSaleOrSwap="'For Sale'"
            />
          </div>
        </div>
      </div>
      <div v-if="!filtering">
        <div v-if="isActive || isActiveBuy" class="shop-wrapper__row">
          <div class="shop-wrapper__row--grid">
            <ShopItem
              v-for="game in getGamesForSale"
              :key="game.id"
              :title="game.boardgames_id.bg_name"
              :user="game.users_id.first_name"
              :gb-id="game.boardgames_id.bg_atlas_id"
              :thumburl="game.boardgames_id.bg_image"
              :buyOrSwap="'buy'"
              :forSaleOrSwap="'For Sale'"
            />
          </div>
        </div>
        <div v-if="isActive || isActiveSwap" class="shop-wrapper__row">
          <div class="shop-wrapper__row--grid">
            <ShopItem
              v-for="game in getGamesForSwap"
              :key="game.id"
              :title="game.boardgames_id.bg_name"
              :user="game.users_id.first_name"
              :gb-id="game.boardgames_id.bg_atlas_id"
              :thumburl="game.boardgames_id.bg_image"
              :buyOrSwap="'swap'"
              :forSaleOrSwap="'For swap'"
            />
          </div>
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
      newCategory: '',
      categories: [],
      filteredForSale: [],
      filtering: false,
      loader: false,
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
  watch: {},
  created() {
    /*
    this.$axios(this.$config.gbURL + '/search', {
      params: {
        client_id: this.$config.gbClientId,
      },
    })
      .then((response) => {
        this.atlasGames = response.data.games
        console.log(this.atlasGames)
      })
      .catch((e) => {
        console.error(e)
      })
    */
    this.$axios('/items/category')
      .then((response) => {
        this.categories = response.data.data
        console.log(response.data.data)
      })
      .catch((e) => {
        console.error(e)
      })
  },
  methods: {
    toggleAllItems() {
      this.isActive = true
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
    filterBy(name, categoryId) {
      this.loader = true
      this.filtering = true
      this.newCategory = name
      this.$axios(this.$config.gbURL + '/search', {
        params: {
          client_id: this.$config.gbClientId,
          categories: categoryId,
        },
      })
        .then((response) => {
          this.loader = false
          const gamesAtlas = response.data.games
          const gamesForSale = this.$store.state.boardgames.gamesForSale
          const gamesForSaleFiltered = gamesForSale.filter(
            (game) => game.bg_atlas_id === gamesAtlas.id
          )
          this.filteredForSale = gamesForSaleFiltered
          console.log(this.newCategory)
        })
        .catch((e) => {
          console.error(e)
        })
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
.filter-buttons__categories {
  width: 200px;
  margin: auto;
  background-color: $bluegreen;
  height: 300px;
  overflow-y: scroll;
  &-dropdown {
    button {
      background-color: white;
      border: 1px solid $black;
      margin: 0;
      display: block;
      width: 100%;
      padding: 1em 0;
    }
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
