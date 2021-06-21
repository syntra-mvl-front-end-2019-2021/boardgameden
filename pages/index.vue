<template>
  <div class="home-page">
    <Hero />
    <HomePageSearch />
    <div v-if="isLoggedIn" class="players">
      <div class="players_text">
        <h2>
          Go meet other boardgame enthusiasts and play elsewhere than
          <span>{{ location }}.</span>
        </h2>
      </div>
      <NuxtLink to="/gameDen" class="players_join" @click="notify"
        >Join them here!</NuxtLink
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
  // watch: {
  //   sortedGames() {
  //     return this.games.sort(function (a, b) {
  //       const aSort = a.date_created
  //       const bSort = b.date_created
  //       console.log(a)
  //       return aSort - bSort
  //     })
  //   },
  // },
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
  width: 100%;
  // height: 450px;
  background-color: rgba($bluegreen, 0.8);
  margin: 5rem 0;
  padding: 3rem 0;

  &_text {
    margin: auto;
    width: 50%;
    text-align: center;
    margin-bottom: 2rem;

    h2 {
      color: white;

      span {
        color: $orange;
      }
    }
  }
  &_join {
    text-align: center;
    background-color: $orange;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    display: block;
    padding: 1rem 4rem;
    transition: all 0.8s ease-in-out;

    &:hover {
      background-color: white;
      color: $orange;
    }
  }
}
.c-collection {
  @include flexCenter();
  flex-direction: column;
  justify-content: space-around;

  padding: 6rem 0 10rem;

  margin: 10rem auto;
  background-color: rgba($orange, 0.8);
  transform: skewY(-7deg);

  h2 {
    transform: skewY(7deg);
    color: $bluegreen;
  }
}

@media screen and (max-width: $medium) {
  .players_text {
    h2 {
      font-size: 36px;
    }
  }
}
</style>
