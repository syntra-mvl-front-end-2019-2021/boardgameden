<template>
  <section class="s-search">
    <form class="form form__search" @submit.prevent="submit">
      <div class="c-autocomplete">
        <label for="search"></label>
        <input
          id="search"
          v-model="searchQuery"
          type="text"
          placeholder="Search your game"
          name="search"
          autocomplete="off"
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
          <div
            v-for="game in games"
            :key="game.id"
            class="c-autocomplete__dropdown-item"
            @click="addgame(game)"
          >
            <img
              class="game-img"
              :src="game.thumb_url"
              alt="game picture"
              width="50px"
              height="50px"
            />
            {{ game.name }}
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'AtlasSearch',

  data() {
    return {
      games: [],
      addingGame: false,
      searchQuery: '',
      timeOut: null,
      searching: false,
      noResult: false,
    }
  },
  created() {},
  methods: {
    addgame(game) {
      return this.$axios('/items/boardgames', {
        method: 'GET',
        params: {
          filter: {
            bg_atlas_id: {
              _eq: game.id,
            },
          },
        },
      })
        .then((response) => {
          if (response.data.data.length > 0) {
            return response.data.data[0].id
          }

          return this.$axios('/items/boardgames', {
            method: 'POST',
            data: {
              bg_atlas_id: game.id,
              bg_name: game.name,
              bg_description: game.description_preview,
              bg_min_players: game.min_players,
              bg_max_players: game.max_players,
              bg_min_playtime: game.min_playtime,
              bg_max_playtime: game.max_playtime,
              bg_atlas_rank: game.rank,
              bg_thumb_url: game.thumb_url,
            },
            header: {
              'Content-Type': 'application/json',
            },
          }).then((response) => {
            // console.log(result)
            return response.data.data.id
          })
        })
        .then((directusId) => {
          this.addingGame = false
          console.log(directusId)
          this.$router.push('/game/' + directusId)
        })
        .catch((error) => {
          this.addingGame = false
          console.error(error)
        })
    },
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
      this.$axios(
        'http://phpstack-266425-1848208.cloudwaysapps.com/api/search',
        {
          method: 'GET',
          params: {
            name: this.searchQuery,
            client_id: 'KrUdcULOvp',
            limit: 15,
            fuzzy_match: true,
          },
        }
      )
        .then((result) => {
          // console.log(result.data.games)
          this.games = result.data.games
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
}
</script>

<style lang="scss" scoped>
.add-btn {
  margin-left: auto;
}
.s-search {
  @include flexCenter();
  position: relative;
  max-width: 700px;
  height: 50px;
  margin: auto;
  background: #ea5c30;
  border-radius: 15px;
  padding: 1rem 1rem;

  box-shadow: rgba(50, 50, 105, 0.15) 0 2px 5px 0,
    rgba(0, 0, 0, 0.05) 0 1px 1px 0;
  .form {
    @include flexCenter();
    width: 100%;
    // justify-content: space-around;
    height: 100%;
    padding: 0 1rem;

    input {
      padding: 0.2rem 0.2rem 0.2rem 0;
      border: none;
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
  @include flexCenter();
  justify-content: space-evenly;
  width: 100%;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;

  &__search {
    width: 100%;
  }
  &__city,
  &__radius {
    width: 20%;
  }
  &__dropdown {
    cursor: pointer;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    max-height: 400px;
    overflow-y: auto;

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
        bottom: 50%;
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
      display: flex;
      justify-content: first baseline;
      align-items: center;
      width: 100%;
      // padding: 0.5rem 1rem;
      text-align: left;
      border: none;
      // border-bottom: 1px solid $orange;
      font-size: 1rem;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      img {
        margin-right: 10rem;
        // width: 100px;
        // height: 100px;
        border-bottom-left-radius: 15px;
      }
    }
  }

  &__submit {
    display: block;
    background: transparent;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    color: black;
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
