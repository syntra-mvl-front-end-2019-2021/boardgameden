<template>
  <div>
    <!-- <h3 class="game-title">{{ game.bg_name }}</h3> -->
    <div class="collection-item">
      <div class="collection-item_btn">
        <button
          v-if="!game.is_for_sale"
          type="button"
          class="button-link__orange"
          @click="addGameForSale()"
        >
          Sell
        </button>
        <button
          v-if="!game.is_swappable"
          type="button"
          class="button-link__orange"
          @click="addGameForSwap()"
        >
          Swap
        </button>
      </div>
      <div class="collection-item_card">
        <h4 class="game-title">{{ game.boardgames_id.bg_name }}</h4>
        <img
          class="game-img"
          :src="game.boardgames_id.bg_thumb_url"
          alt="game picture"
          width="auto"
          height="150px"
        />
        <NuxtLink
          :to="'/game/' + game.boardgames_id.id"
          class="button-link__orange collectionItemBtn"
        >
          More Info
        </NuxtLink>
      </div>
      <p v-if="game.is_swappable" class="label">
        Swappable<button
          v-if="game.is_swappable"
          type="button"
          class="removeSale_btn"
          @click="removeGameForSwap()"
        >
          X
        </button>
      </p>
      <p v-if="game.is_for_sale" class="label">
        For Sale
        <button
          v-if="game.is_for_sale"
          type="button"
          class="removeSale_btn"
          @click="removeGameForSale()"
        >
          X
        </button>
      </p>
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
        this.game.boardgames_id.bg_name +
          ' was successfully removed from your collection.'
      )
    },
    notifyUserSwap() {
      this.$root.$emit(
        'notify',
        this.game.boardgames_id.bg_name +
          ' was successfully added to your SWAP collection.'
      )
    },
    notifyUserRemoveSwap() {
      this.$root.$emit(
        'notify',
        this.game.boardgames_id.bg_name +
          ' was successfully removed off your SWAP collection.'
      )
    },
    notifyUserSell() {
      this.$root.$emit(
        'notify',
        this.game.boardgames_id.bg_name +
          ' was successfully added to the your SELL collection.'
      )
    },
    notifyUserRemoveSell() {
      this.$root.$emit(
        'notify',
        this.game.boardgames_id.bg_name +
          ' was successfully removed off your SELL collection.'
      )
    },
    addGameForSwap() {
      this.$axios('items/boardgames_directus_users/' + this.game.id, {
        method: 'PATCH',
        data: {
          is_swappable: true,
        },
      })
        .then(() => {
          this.notifyUserSwap()
          return this.resetUser()
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          // this.addingGame = false
        })
    },
    removeGameForSwap() {
      this.$axios('items/boardgames_directus_users/' + this.game.id, {
        method: 'PATCH',
        data: {
          is_swappable: false,
        },
      })
        .then(() => {
          this.notifyUserRemoveSwap()
          return this.resetUser()
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          // this.addingGame = false
        })
    },
    addGameForSale() {
      this.$axios('items/boardgames_directus_users/' + this.game.id, {
        method: 'PATCH',
        data: {
          is_for_sale: true,
        },
      })
        .then(() => {
          this.notifyUserSell()
          return this.resetUser()
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          // this.addingGame = false
        })
    },
    removeGameForSale() {
      this.$axios('items/boardgames_directus_users/' + this.game.id, {
        method: 'PATCH',
        data: {
          is_for_sale: false,
        },
      })
        .then(() => {
          this.notifyUserRemoveSell()
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
      this.$axios('items/boardgames_directus_users/' + this.game.id, {
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
.removeSale_btn {
  color: white;
  border: none;
  background-color: $orange;
  cursor: pointer;
}
.label {
  border-color: $orange;
  border: 1px solid;
  border-radius: 5px;
  background: $orange;
  color: white;
  font-size: 1.5em;
  width: 100px;
}
.collectionItemBtn {
  margin: 20px;
}
.game-img {
  height: 150px;
  width: 150px;
}
.game-title {
  text-align: center;
  height: 4em;
}
.remove_btn {
  margin: -90px 150px;
  padding-bottom: 40px;
  // width: 20px;
  // height: 30px;
  text-align: center;
  border: none;
  background: none;
  cursor: pointer;
  color: $orange;
  font-size: 3em;
}
.collection-item {
  height: 450px;
  width: 200px;
  border: solid $orange 1px;
  border-radius: 10px;
  padding: 1em;
  margin: 1em;

  &_card {
    display: flex;
    flex-direction: column;
    align-content: center;
    // padding: 1em;
  }

  &_btn {
    // margin-bottom: 10px;
    padding: 5px;
    font-size: 0.5em;
    text-align: center;
  }
}
</style>
