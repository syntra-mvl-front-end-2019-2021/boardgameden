<template>
  <div>
    <!-- <h3 class="game-title">{{ game.bg_name }}</h3> -->
    <div class="collection-item">
      <div class="collection-item_btn">
        <button
          v-if="!game.is_swappable"
          type="button"
          class="swap_btn"
          @click="addGameForSwap()"
        >
          Swap
        </button>
        <button
          v-if="!game.is_for_sale"
          type="button"
          class="sell_btn"
          @click="addGameForSale()"
        >
          Sell
        </button>
      </div>
      <h4 class="game-title">{{ game.boardgames_id.bg_name }}</h4>

      <div class="collection-item_card">
        <div class="game-image">
          <img
            class="game-img_item"
            :src="game.boardgames_id.bg_thumb_url"
            alt="game picture"
          />
        </div>

        <NuxtLink
          :to="'/game/' + game.boardgames_id.id"
          class="button-link__orange"
        >
          More Info
        </NuxtLink>
      </div>
      <button type="button" class="remove_btn" @click="removeFromCollection">
        Remove
      </button>
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
          'was successfully removed from your collection.'
      )
    },
    notifyUserSwap() {
      this.$root.$emit(
        'notify',
        this.game.boardgames_id.bg_name +
          'was successfully added to your SWAP list.'
      )
    },
    notifyUserSell() {
      this.$root.$emit(
        'notify',
        this.game.boardgames_id.bg_name +
          'was successfully added to the your SELL list.'
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
.remove_btn {
  width: 100%;
  border-radius: unset;
  color: white;
  background-color: $orange;
  border: none;
  border-top: 1px solid $orange;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 1em 1.5em;
  transition: $transition-normal;
  font-size: 1.2em;
  // font-weight: bold;
  // font-style: italic;
  &:hover {
    background-color: white;
    color: $orange;
  }
}
.collection-item {
  flex: 1 1 600px;
  width: 300px;
  border: solid $orange 1px;
  border-radius: 10px;
  margin: 1em;
  height: 600px;
  @include flexCenter();
  justify-content: space-between;
  flex-direction: column;
  h4 {
    font-size: 1.2em;
  }
  &_btn {
    @include flexCenter();
    height: 30px;
    width: 100%;
    background-color: $orange;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .sell_btn,
    .swap_btn {
      width: 100%;
      height: 100%;
      border-radius: unset;
      color: white;
      background-color: $orange;
      border: none;
      // border-bottom: 1px solid $orange;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      transition: $transition-normal;
      font-size: 1.2em;
      &:hover {
        background-color: white;
        color: $orange;
      }
    }
  }
  &_card {
    @include flexCenter();
    justify-content: space-evenly;
    flex-direction: column;
    height: 75%;

    .game-image {
      @include flexCenter();

      width: 200px;
      max-height: 300px;
      height: 300px;
      overflow: hidden;
      img {
        width: 100%;
        object-fit: fill;
        object-position: right bottom;
      }
    }
  }
}
</style>
