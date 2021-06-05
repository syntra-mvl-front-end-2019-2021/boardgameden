<template>
  <div v-if="atlasGame">
    <!-- <h3 class="game-title">{{ game.bg_name }}</h3> -->
    <div class="collection-item">
      <button type="button" class="remove_btn" @click="removeFromCollection">
        X
      </button>
      <div class="collection-item_card">
        <h4 class="game-title">{{ game.bg_name }}</h4>
        <img
          class="game-img"
          :src="atlasGame.thumb_url"
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
  },
  data() {
    return {
      atlasGame: [],
    }
  },
  created() {
    this.$axios(this.$config.gbURL + '/search', {
      params: {
        client_id: this.$config.gbClientId,
        ids: this.game.bg_atlas_id,
      },
    })
      .then((response) => {
        if (!response.data.games) {
          throw new Error('could not find game')
        }
        this.atlasGame = response.data.games[0]
        console.log('data=' + response.data.games[0])
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    removeFromCollection() {
      this.$axios(
        '/item/' +
          this.$auth.user.id +
          '?fields=boardgames[' +
          this.game.id +
          ']',
        {
          method: 'DELETE',
          header: {
            'Content-Type': 'application/json',
          },
          data: {
            boardgames_id: this.game.id,
            users_id: this.$auth.user.id,
            is_swappable: false,
            is_for_sale: false,
          },
        }
      )
        .then(() => {
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
