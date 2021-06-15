<template>
  <div>
    <!-- <h3 class="game-title">{{ game.bg_name }}</h3> -->
    <div class="collection-item">
      <div class="collection-item_btn">
        <button
          type="button"
          class="remove_btn"
          @click="addGameForSwap(game.id, userId, game.is_swappable)"
        >
          Swap
        </button>
        <button
          type="button"
          class="remove_btn"
          @click="addGameForSale(game.id, userId, game.is_for_sale)"
        >
          Sell
        </button>
        <button type="button" class="remove_btn" @click="removeFromCollection">
          X
        </button>
      </div>
      <div class="collection-item_card">
        <h4 class="game-title">{{ game.bg_name }}</h4>
        <img
          class="game-img"
          :src="game.bg_thumb_url"
          alt="game picture"
          width="auto"
          height="150px"
        />
        <NuxtLink :to="'/game/' + game.id" class="button-link__orange">
          More Info
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectionItem',
  props: {
    game: {
      type: Object,
      required: true,
    },
    userGameId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      is_swappable: false,
      is_for_sale: false,
    }
  },
  computed: {
    userId() {
      return this.$auth.user.id
    },
  },

  methods: {
    notifyUserRemove() {
      this.$root.$emit(
        'notify',
        this.game.bg_name + 'was successfully removed from your collection.'
      )
    },
    notifyUserSwap() {
      this.$root.$emit(
        'notify',
        this.game.bg_name + 'was successfully added to your SWAP list.'
      )
    },
    notifyUserSell() {
      this.$root.$emit(
        'notify',
        this.game.bg_name + 'was successfully added to the your SELL list.'
      )
    },
    addGameForSwap(gameId, userGameId, isSwappable) {
      console.log(gameId, userGameId, this.game.is_swappable)
      this.$axios('items/boardgames_directus_users/' + this.game.is_swappable, {
        method: 'PATCH',
      })
        .then(() => {
          this.user.game.is_swappable = true
          return this.resetUser()
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          // this.addingGame = false
        })
    },
    addGameForSale(gameId, userGameId, isForSale) {
      console.log(gameId, userGameId, this.game.is_for_sale)
      this.$axios('items/boardgames_directus_users/' + this.game.is_for_sale, {
        method: 'PATCH',
      })
        .then(() => {
          this.user.game.is_for_sale = true
          return this.resetUser()
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          // this.addingGame = false
        })
    },
    removeFromCollection() {
      this.$axios('items/boardgames_directus_users/' + this.userGameId, {
        method: 'DELETE',
      })
        .then(() => {
          this.notifyUserRemove()
          return this.resetUser()
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          // this.addingGame = false
        })
    },
    resetUser() {
      return this.$axios('/users/me?fields=*.*.*')
        .then((response) => {
          this.$auth.setUser(response.data.data)
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
}
</script>

<style lang="scss">
.remove_btn {
  margin: -50px 130px;
  padding: 0;
  width: 10px;
  height: 20px;
  text-align: center;
  border: none;
  background: none;
  cursor: pointer;
  color: $orange;
  font-size: 2em;
}
.collection-item {
  width: 200px;
  border: solid $orange 1px;
  border-radius: 10px;
  padding: 2em;
  margin: 1em;

  &_card {
    display: flex;
    flex-direction: column;
    padding: 0.5em;
  }
  // &_btn {
  //   // display: flex;
  // }
}
</style>
