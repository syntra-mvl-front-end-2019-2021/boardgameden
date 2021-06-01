<template>
  <div class="home-page">
    <Hero />
    <HomePageSearch />
    <div v-if="isLoggedIn" class="players">
      <div class="players_text">
        <h1>
          There are <span>#</span> players in <span>{{ location }}</span>
        </h1>
      </div>
      <button class="players_join" @click="notify">Join them!</button>
    </div>
    <GameOfTheMonth />
    <section class="c-collection">
      <h2>Collection</h2>
      <div class="c-collection__slides">
        <button
          class="c-collection__slides__btn c-collection__slides__btn--left"
          @click="clickLeft"
        ></button>
        <div
          v-if="games"
          ref="slider"
          class="c-collection__slides--gameComponents"
          @scroll="sliderScroll"
        >
          <GameComp
            v-for="game in games"
            :key="1 + game.bg_atlas_id"
            :gb-id="game.bg_atlas_id"
            :gb-name="game.bg_name"
          />
          <GameComp
            v-for="game in games"
            :key="2 + game.bg_atlas_id"
            :gb-id="game.bg_atlas_id"
            :gb-name="game.bg_name"
          />
        </div>
        <button
          class="c-collection__slides__btn c-collection__slides__btn--right"
          @click="clickRight"
        ></button>
      </div>
    </section>
  </div>
</template>

<script>
import GameComp from '../components/GameComp.vue'
import HomePageSearch from '../components/HomePageSearch.vue'
import GameOfTheMonth from '../components/GameOfTheMonth.vue'
import Hero from '~/components/Hero.vue'

export default {
  name: 'GamePage',
  components: { GameComp, HomePageSearch, GameOfTheMonth, Hero },
  data() {
    return {
      // baseURL: 'https://api.boardgameatlas.com/api/',
      sliderWidth: 0,
      slideWidth: 0,
      currentSlide: 0,
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
    activeSlide() {
      return this.slides[this.currentSlide]
    },
    slidesPerPage() {
      return Math.round(this.sliderWidth / this.slideWidth)
    },
    numberOfPages() {
      return this.slides.length + 1 - this.slidesPerPage
    },
  },
  watch: {
    games(newVal) {
      this.$nextTick(() => {
        if (newVal.length) {
          this.calcWidths()
        }
      })
    },
  },
  created() {
    this.$axios('/items/boardgames')
      .then((response) => {
        // console.log(response)
        this.games = response.data.data
      })

      .catch((e) => {
        console.error(e)
      })
  },
  mounted() {
    window.addEventListener('resize', this.calcWidths)
  },
  unmounted() {
    window.removeEventListener('resize', this.calcWidths)
  },
  methods: {
    notify() {
      this.$root.$emit('notify', 'Dit is een belangrijke melding')
    },
    calcWidths() {
      if (this.$refs.slider.children[0]) {
        this.sliderWidth = this.$refs.slider.offsetWidth
        this.slideWidth = this.$refs.slider.children[0].offsetWidth
      }
    },
    clickLeft() {
      this.$refs.slider.scrollLeft =
        this.$refs.slider.scrollLeft - this.slideWidth
    },
    clickRight() {
      this.$refs.slider.scrollLeft =
        this.$refs.slider.scrollLeft + this.slideWidth
    },
    slideTo(slideIndex) {
      this.$refs.slider.scrollLeft = slideIndex * this.slideWidth
    },
    sliderScroll(event) {
      const scrollPos = event.target.scrollLeft
      if (scrollPos === 0) {
        this.currentSlide = 0
      }
      if (scrollPos % this.slideWidth === 0) {
        this.currentSlide = scrollPos / this.slideWidth
      }
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
  }
}
.c-collection {
  width: 90%;
  @include flexCenter();
  flex-direction: column;
  justify-content: space-around;
  padding: 6rem 0;
  height: 750px;
  margin: auto;

  &__slides {
    position: relative;
    width: 100%;
    @include flexCenter();
    margin: 2rem 0 2rem;

    .game-comp__loading {
      position: relative;
      height: 20rem;

      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1rem;
        margin-left: -1rem;
        border-top: 3px solid rgba(255, 255, 255, 0.2);
        border-right: 3px solid rgba(255, 255, 255, 0.2);
        border-bottom: 3px solid rgba(255, 255, 255, 0.2);
        border-left: 3px solid $orange;
        animation: load8 1.1s infinite linear;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
      }
    }

    &--gameComponents {
      display: grid;
      grid-template-columns: repeat(6, calc((100% - 3rem) / 3));
      grid-column-gap: 2rem;
      overflow-x: scroll;
      // width: 70%;
      scroll-snap-type: x mandatory;
      overflow: -moz-scrollbars-none;
      -ms-overflow-style: none;
      margin: auto;

      &::-webkit-scrollbar {
        width: 0 !important;
        display: none;
      }
    }

    &__btn {
      width: 48px;
      height: 48px;
      color: #ea5c30;
      position: absolute;
      top: 50%;
      margin-top: -31px;
      cursor: pointer;
      border-top: none;
      border-right: none;
      background-color: transparent;

      &--right {
        border-bottom: 6px solid;
        border-left: 6px solid;
        transform: rotate(-135deg) translateY(3rem);
        right: 0;
      }

      &--left {
        border-bottom: 6px solid;
        border-left: 6px solid;
        transform: rotate(45deg) translateX(-3rem);
        left: 0;
      }
    }
  }
}
</style>
