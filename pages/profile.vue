<template>
  <section class="container">
    <div class="profile">
      <div class="profile_avatar">
        <img
          :src="$config.baseURL + '/assets/' + $auth.user.avatar.id"
          alt="avatar"
        />
      </div>
      <div class="profile_content">
        <h2>Welcome, {{ $auth.user.user_name }}</h2>
        <ul v-if="$auth.user">
          <li>First name: {{ $auth.user.first_name }}</li>
          <li>Last name: {{ $auth.user.last_name }}</li>
          <li>Email: {{ $auth.user.email }}</li>
          <li>Location: {{ $auth.user.location }}</li>
          <NuxtLink to="/edit_profile">Edit Profile</NuxtLink>
        </ul>
      </div>
      <Collection />

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
                {{ game.bg_name }}
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
      </section>
      <section class="collection">
        <ShopItem />
      </section>
    </div>
  </section>
</template>

<script>
import Collection from '~/components/Collection'

export default {
  name: 'ProfilePage',
  components: { Collection },
  middleware: ['auth'],

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
}
</script>

<style scoped lang="scss">
.profile {
  margin: auto;
  .profile_avatar {
    position: absolute;
    display: block;
    #img {
      border-radius: 50%x;
    }
  }
  .profile_content {
    position: relative;
    left: 400px;
  }
}
</style>
