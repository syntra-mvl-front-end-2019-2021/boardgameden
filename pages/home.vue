<template>
  <div class="home-page">
    <HomePageSearch />
    <div class="players">
      <div class="players_text">
        <h1>There are <span>#</span>in <span>City</span></h1>
      </div>
      <button class="players_join">Join them!</button>
    </div>
    <GameOfTheMonth />
    <section class="s-newest-swaps">
      <h2>Collection</h2>
      <div class="c-slides">
        <button
          class="c-slides__btn c-slides__btn--left"
          @click="clickLeft"
        ></button>
        <div ref="slider" class="c-slides__container" @scroll="sliderScroll">
          <GameComp :url="game.image_url" :title="game.name" />
          <GameComp :url="game.image_url" :title="game.name" />
          <GameComp :url="game.image_url" :title="game.name" />
        </div>

        <button
          class="c-slides__btn c-slides__btn--right"
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
export default {
  name: 'GamePage',
  components: { GameComp, HomePageSearch, GameOfTheMonth },
  data() {
    return {
      baseURL: 'https://api.boardgameatlas.com/api/',
      sliderWidth: 0,
      slideWidth: 0,
      currentSlide: 0,
      // games: [],
      game: {},
      // categories: this.game.categories,
    }
  },
  created() {
    fetch(this.baseURL + 'search?client_id=JLBr5npPhV', {
      // &ids=i5Oqu5VZgP
      method: 'GET',
      headers: {},
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('could not fetch userdata')
        }
        return response.json()
      })
      .then((result) => {
        console.log(result)
        // this.games = result.games
        this.game = result.games[0]
        console.log(result.games)
        console.log(this.game.categories)
      })
      .catch(() => {})
  },
  methods: {
    calcWidths() {
      this.sliderWidth = this.$refs.slider.offsetWidth
      this.slideWidth = this.$refs.slider.children[0].offsetWidth
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
@import '~/assets/styles/imports/mixins';
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
.s-newest-swaps {
  width: 100%;
  @include flexCenter();
  flex-direction: column;
  justify-content: space-around;
  padding: 6rem 0;
  height: 750px;

  .c-slides {
    position: relative;
    width: 100%;
    // overflow-x: hidden;
    margin: 2rem 0 2rem;

    &__container {
      display: grid;
      grid-template-columns: repeat(6, calc((100% - 3rem) / 3));
      grid-column-gap: 1.5rem;
      // overflow-x: scroll;
      width: 70%;
      // scroll-snap-type: x mandatory;
      // overflow: -moz-scrollbars-none;
      // -ms-overflow-style: none;
      // scrollbar-color: transparent transparent;
      margin: auto;

      &::-webkit-scrollbar {
        width: 0 !important;
        display: none;
      }
    }

    .c-slides__btn {
      width: 48px;
      height: 48px;
      color: #ea5c30;
      position: absolute;
      top: 50%;
      margin-top: -31px;
      cursor: pointer;
      border-top: none;
      border-right: none;
      background-color: white;

      &--right {
        border-bottom: 6px solid;
        border-left: 6px solid;
        transform: rotate(-135deg);
        right: 2rem;
      }

      &--left {
        border-bottom: 6px solid;
        border-left: 6px solid;
        transform: rotate(45deg);
        left: 2rem;
      }
    }
  }
}
</style>
