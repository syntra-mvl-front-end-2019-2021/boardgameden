<template>
  <div class="home-page">
    <Hero />
    <HomePageSearch />
    <div v-if="isLoggedIn" class="players">
      <div class="players_text">
        <h1>We <span>connect</span> players</h1>
      </div>
      <NuxtLink to="/gameDen" class="players_join" @click="notify"
        >Join them!</NuxtLink
      >
    </div>
    <GameOfTheMonth />
    <section class="c-collection">
      <h2>Collection</h2>
      <Slider :games="games" />
    </section>
  </div>
</template>

<script>
import HomePageSearch from '../components/HomePageSearch.vue'
import GameOfTheMonth from '../components/GameOfTheMonth.vue'
import Hero from '~/components/Hero.vue'

export default {
  name: 'GamePage',
  components: { HomePageSearch, GameOfTheMonth, Hero },
  data() {
    return {
      // baseURL: 'https://api.boardgameatlas.com/api/',
      games: [],
    }
  },
  computed: {
    location() {
      return this.$auth.user.location
    },
    isLoggedIn() {
      return this.$auth.loggedIn
    },
  },
  created() {
    this.$axios('/items/boardgames')
      .then((response) => {
        this.games = response.data.data
      })

      .catch((e) => {
        console.error(e)
      })
  },
  methods: {
    notify() {
      this.$root.$emit('notify', 'Dit is een belangrijke melding')
    },
  },
}
</script>

<style lang="scss">
.players {
  @include flexCenter();
  flex-direction: column;
  height: 250px;
  width: 100%;
  &_text {
    margin: auto;
  }
  &_join {
    width: 150px;
    height: 50px;
    background: transparent;
    border: 2px solid #ea5c30;
    font-size: 1.2rem;
    font-weight: bold;
    color: #ea5c30;
    display: block;
    padding: 0.5rem 1rem;
  }
}
.c-collection {
  // width: 90%;
  @include flexCenter();
  flex-direction: column;
  justify-content: space-around;
  padding: 6rem 0 10rem;
  // height: 750px;
  margin: 10rem auto;
  background-color: rgba($orange, 0.8);
  transform: skewY(-7deg);

  h2 {
    transform: skewY(7deg);
    color: $bluegreen;
  }
}
</style>
