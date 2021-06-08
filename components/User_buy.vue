<template>
  <div v-if="$auth.loggedIn" class="shop-wrapper">
    <div class="shop-wrapper__row">
      <h3>Buy:</h3>
      <div class="shop-wrapper__row--grid">
        <User
          v-for="games in getGamesForSale"
          :key="games.id"
          :title="games.boardgames_id.bg_name"
          :user="games.users_id.first_name"
          :gb-id="games.boardgames_id.bg_atlas_id"
          :avatar="games.users_id.avatar"
        />
      </div>
    </div>
    <div class="shop-wrapper__row">
      <h3>Swap:</h3>
      <div class="shop-wrapper__row--grid">
        <User
          v-for="games in getGamesForSwap"
          :key="games.id"
          :title="games.boardgames_id.bg_name"
          :user="games.users_id.first_name"
          :gb-id="games.boardgames_id.bg_atlas_id"
          :avatar="games.users_id.avatar"
        />
      </div>
    </div>
  </div>
</template>

<script>
import User from '@/components/User.vue'

export default {
  name: 'UserSwaps',
  components: { User },

  data() {
    return {
      isActive: true,
      isActiveBuy: false,
    }
  },
  fetch() {
    this.$store.dispatch('boardgames/getGamesForSale')
    this.$store.dispatch('boardgames/getGamesForSwap')
  },
  computed: {
    getGamesForSale() {
      return this.$store.state.boardgames.gamesForSale.filter((games) => {
        return games.boardgames_id.bg_atlas_id.match(this.$route.params.id)
      })
    },
    getGamesForSwap() {
      return this.$store.state.boardgames.gamesForSwap.filter((games) => {
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

  margin: 3em;
  &__row {
    width: 100%;
    &--grid {
      @include flexCenter;
      width: 100%;
      margin: 2em 0;
      flex-wrap: wrap;
    }
  }
}
.game-login__form {
  padding: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
