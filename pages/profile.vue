<template>
  <section class="container">
    <div class="profile">
      <div class="profile_avatar">
        <img v-if="avatar" :src="avatar" alt="avatar" />
      </div>
      <div class="profile_content">
        <h2>Welcome, {{ user.user_name }}</h2>
        <div v-if="user" class="profile_content_user">
          <span>First name: {{ user.first_name }}</span>
          <span>Last name: {{ user.last_name }}</span>
          <span>Email: {{ user.email }}</span>
          <span>Location: {{ user.location }}</span>
          <NuxtLink to="/edit_profile" class="button-link__orange"
            >Edit Profile</NuxtLink
          >
        </div>
      </div>
      <!-- <section class="s-search">
        <form class="form__search__collection" @submit.prevent="submit">
          <div class="c-autocomplete">
            <label for="search"></label>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search your game"
              name="search"
              @input="submit"
            />
            <div v-if="noResult" class="c-autocomplete__dropdown">
              <button
                class="c-autocomplete__dropdown-item"
                disabled
                type="button"
              >
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
                <NuxtLink :to="'/game/' + gbId" @submit="submit">{{
                  game.bg_name
                }}</NuxtLink>
              </button>
            </div>
          </div>
          <NuxtLink
            :to="'/game/' + gbId"
            class="button-link__orange"
            @submit="submit"
            >Search</NuxtLink
          >
        </form>
      </section> -->
      <AtlasSearch />
      <Collection />
      <!-- <section class="collection">
        <CollectionItem
          v-for="game in getBoardGames"
          :key="game.id"
          :game="game"
        />
      </section> -->
    </div>
  </section>
</template>

<script>
import AtlasSearch from '../components/AtlasSearch'
import Collection from '~/components/Collection'

export default {
  name: 'ProfilePage',
  components: { AtlasSearch, Collection },
  middleware: ['auth'],
  props: {},
  data() {
    return {
      games: [],
      searchQuery: '',
      timeOut: null,
      searching: false,
      noResult: false,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    avatar() {
      if (!this.user.avatar) {
        return false
      }

      return (
        this.$config.baseURL +
        '/assets/' +
        this.user.avatar.id +
        '?width=250&height=300&fit=cover'
      )
    },
  },
  getBoardGames() {
    return this.$store.state.boardgames
  },
  created() {
    this.$axios(this.$config.gbURL + '/search', {
      params: {
        client_id: this.$config.gbClientId,
        ids: this.gbId,
      },
    })
      .then((response) => {
        if (!response.data.games) {
          throw new Error('could not find game')
        }
        this.game = response.data.games[0]
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.loading = false
      })
  },
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
}
</script>

<style scoped lang="scss">
.form__search__collection {
  display: flex;
  align-items: center;
}

.profile {
  margin: auto;
  &_avatar {
    position: absolute;
    display: block;
    img {
      border-radius: 10px;
    }
  }
  &_content {
    width: 80%;
    position: relative;
    left: 400px;
    h2 {
      margin: 0;
    }

    &_user {
      display: flex;
      flex-direction: column;
    }
  }
  .button-link__orange {
    margin-top: 20px;
    width: 20%;
  }
}
</style>
