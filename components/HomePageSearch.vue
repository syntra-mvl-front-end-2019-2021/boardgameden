<template>
  <section class="s-search">
    <form class="form form__search" @submit.prevent="submit">
      <div class="c-autocomplete">
        <label for="search"></label>
        <input
          id="search"
          v-model="searchQuery"
          type="text"
          placeholder="Zoek je avontuur"
          name="search"
          @input="submit"
        />
        <div v-if="noResult" class="c-autocomplete__dropdown">
          <button class="c-autocomplete__dropdown-item" disabled type="button">
            No games found
          </button>
        </div>
        <div
          v-else
          :class="{
            'c-autocomplete__dropdown': true,
            'c-autocomplete__dropdown--loading': searching,
          }"
        >
          <button
            v-for="game in games"
            :key="game.id"
            class="c-autocomplete__dropdown-item"
            type="button"
          >
            {{ game.bg_name }}
          </button>
        </div>
      </div>
      <NuxtLink :to="'/shop/'" class="c-autocomplete__submit" @submit="submit">
        Search
      </NuxtLink>
      <!-- <button type="submit" @submit="submit">zoek</button> -->
    </form>
  </section>
</template>

<script>
export default {
  name: 'HomepageSearch',
  middleware: 'auth',

  data() {
    return {
      games: [],
      searchQuery: '',
      timeOut: null,
      searching: false,
      noResult: false,
    }
  },
  computed: {},
  methods: {
    submit() {
      if (this.timeOut) {
        clearTimeout(this.timeOut)
      }

      if (!this.searchQuery) {
        this.noResult = false
        this.games = []
        return
      }

      this.timeOut = setTimeout(() => {
        this.searchGames()
      }, 1000)
    },

    searchGames() {
      this.searching = true
      this.$axios('/items/boardgames', {
        method: 'GET',
        params: { filter: { bg_name: { _contains: this.searchQuery } } },
      })
        .then((result) => {
          this.games = result.data.data
          this.noResult = this.games.length === 0
        })
        .catch((error) => {
          this.games = []
          this.noResult = true
          console.log(error.response)
        })
        .finally(() => {
          this.searching = false
        })
    },
  },
  // mounted() {
  //   this.$store.dispatch('GET_GAMES')
  // },
  // methods: {
  // search() {
  //   // todo search games
  //   console.log(this.searchinput)
  // },
  //   submit(event) {
  //     const id = this.get_game_id_user_search()
  //     this.$router.push('shop/' + id)
  //   },
  // },
  //   created() {
  //     this.$axios(this.$config.baseURL + '/search', {
  //       params: {
  //         ids: this.board_games.bg_atlas_id,
  //       },
  //     })
  //       .then((response) => {
  //         if (!response.data.games) {
  //           throw new Error('could not find game')
  //         }
  //         this.board_games = response.data.games
  //       })
  //       .catch((e) => {
  //         console.error(e)
  //       })
  //       .finally(() => {
  //         this.loading = false
  //       })
  //   },
  //   methods: {
  //     submit(event) {
  //       this.get_game_id_user_search()
  //       this.$router.push('shop/' + this.id)
  //     },

  //     get_game_id_user_search() {
  //       if (this.searchinput !== '') {
  //         const result = this.board_games.find(
  //           (item) => item.bg_name === this.searchinput
  //         )
  //         console.log(result.bg_atlas_id)
  //         return this.id === result.bg_atlas_id
  //       }
  //     },

  //     get_all_games_to_local_storage() {},
  //   },
  // }
  // get_all_games_to_local_storage() {
  //       axios
  //         .get('http://206.81.26.160/items/boardgames')
  //         .then((response) => {
  //           this.board_games = response.data.data
  //         })
  //         .catch((error) => {
  //           console.log(error)
  //         })
  //     },
}
</script>

<style lang="scss" scoped>
.s-search {
  @include flexCenter();
  max-width: 700px;
  height: 50px;
  margin: auto;
  background: #ea5c30;
  border-radius: 15px;

  box-shadow: rgba(50, 50, 105, 0.15) 0 2px 5px 0,
    rgba(0, 0, 0, 0.05) 0 1px 1px 0;
  .form {
    @include flexCenter();
    width: 100%;
    justify-content: space-around;
    height: 100%;
    padding: 0 1rem;
    &__search {
      width: 40%;
    }
    &__city,
    &__radius {
      width: 20%;
    }

    input {
      padding: 0.2rem 0.2rem 0.2rem 0;
      border: none;
      border-right: white 3px solid;
      width: 100%;
      color: white;
      outline: none;
      background: none;
    }

    ::placeholder {
      color: white;
      font-size: 1rem;
    }
  }
}

.c-autocomplete {
  position: relative;
  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;

    &--loading {
      min-height: 2rem;

      &:before {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(205, 199, 199, 0.8);
      }

      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -0.75rem;
        margin-left: -0.75rem;
        border-top: 2px solid rgba(255, 255, 255, 0.7);
        border-right: 2px solid rgba(255, 255, 255, 0.7);
        border-bottom: 2px solid rgba(255, 255, 255, 0.7);
        border-left: 2px solid $orange;
        animation: load8 1.1s infinite linear;
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    &-item {
      color: black;
      display: block;
      width: 100%;
      padding: 0.5rem 1rem;
      text-align: left;
      border: none;
      border-bottom: 1px solid slategrey;
    }
  }

  &__submit {
    display: block;
    background: transparent;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    color: white;
    outline: none;
    background: none;
  }
}

@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
