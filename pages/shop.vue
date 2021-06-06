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
      <div v-for="game in atlasGames" :key="game.id">
        <div>{{ game.name }}</div>
        <div
          class="filter-buttons__categories-dropdown"
          v-for="category in game.categories"
          :key="category.id"
        >
          <button @click="filteredItems(category.id)">
            {{ category.id }}
          </button>
        </div>
      </div>
    </div>
    <div class="shop-wrapper">
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
      atlasGames: [],
      newCategory: '',
      filteredByCategory: [],
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
    filteredItems(newEl) {
      this.newCategory = newEl
      this.$axios(this.$config.gbURL + '/search', {
        params: {
          client_id: this.$config.gbClientId,
          categories: newEl,
        },
      })
        .then((response) => {
          const filtered = response.data.games
          const boardgames = this.$store.state.boardgames.gamesForSale
          const results = boardgames.filter(
            ({ id: id1 }) =>
              !filtered.every(({ boardgame_id: id2 }) => id2 === id1)
          )
          this.filteredByCategory = results
          console.log(results)
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
