<template>
  <div>
    <!-- <h3 class="game-title">{{ game.bg_name }}</h3> -->
    <div class="collection-item">
      <button
        type="button"
        class="remove_btn"
        @click="addGameForSwap(game.id, userId)"
      >
        S
      </button>
      <button type="button" class="remove_btn" @click="removeFromCollection">
        X
      </button>
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
    isSwappable: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {}
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
        this.game.bg_name + 'was successfully added to the SWAP list.'
      )
    },
    notifyUserSell() {
      this.$root.$emit(
        'notify',
        this.game.bg_name + 'was successfully added to the For Sale list.'
      )
    },
    addGameForSwap(gameId, userGameId) {
      console.log(gameId, userGameId)
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
}
</style>
