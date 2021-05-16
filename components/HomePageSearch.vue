<template>
  <section class="s-search">
    <form class="form form__search" @submit.prevent="submit">
      <label for="search"></label>
      <input
        id="search"
        v-model.trim="searchinput"
        type="text"
        placeholder="Zoek je avontuur"
        name="search"
      />
      <!-- <div class="form__city">
        <label for="city"></label>
        <input id="city" type="text" placeholder="City" name="city" />
      </div>
      <div class="form__radius">
        <label for="radius"></label>
        <select id="radius" required name="radius">
          <option value="" disabled selected>Radius</option>

          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
        </select>
      </div> -->
      <button type="submit" @submit="submit">zoek</button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'HomepageSearch',
  middleware: 'auth',

  data() {
    return {
      searchinput: '',
      board_games: [],
    }
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
  computed: {
    boardgames() {
      // eslint-disable-next-line camelcase
      return this.board_games.filter((filtered_game) => {
        return filtered_game.title.match(this.searchinput)
      })
    },
  },
  created() {
    this.$axios(this.$config.baseURL + '/search', {
      params: {
        ids: this.board_games.bg_atlas_id,
      },
    })
      .then((response) => {
        if (!response.data.games) {
          throw new Error('could not find game')
        }
        this.board_games = response.data.games
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    submit(event) {
      this.get_game_id_user_search()
      this.$router.push('shop/' + this.id)
    },

    get_game_id_user_search() {
      if (this.searchinput !== '') {
        const result = this.board_games.find(
          (item) => item.bg_name === this.searchinput
        )
        console.log(result.bg_atlas_id)
        return this.id === result.bg_atlas_id
      }
    },

    get_all_games_to_local_storage() {},
  },
}
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
//   },
</script>

<style lang="scss" scoped>
@import '~/assets/styles/imports/mixins';

.s-search {
  @include flexCenter();
  max-width: 700px;
  height: 50px;
  margin: auto;
  background: #ea5c30;
  border-radius: 15px;

  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
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

    button,
    select {
      height: 100%;
      background: transparent;
      font-size: 1rem;
      cursor: pointer;
      border: none;
      color: white;
      outline: none;
      background: none;
    }
    select:required:invalid {
      color: white;
    }
    option {
      color: black;
    }
  }
}
.test {
  width: 100vh;
  height: 100vh;
  background: white;
  position: absolute;
  z-index: 10000;
}
</style>
