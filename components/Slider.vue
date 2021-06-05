<template>
  <div class="c-slider__slides">
    <button
      class="c-slider__slides__btn c-slider__slides__btn--left"
      @click="clickLeft"
    ></button>
    <div
      v-if="atlasGames"
      ref="slider"
      class="c-slider__slides-container"
      @scroll="sliderScroll"
    >
      <!-- <div
        v-for="game in games"
        :key="1 + game.bg_atlas_id"
        class="c-slider__slide-item"
      >
        <GameComp :gb-id="game.bg_atlas_id" :gb-name="game.bg_name" />
      </div> -->
      <!-- <div
        v-for="game in games"
        :key="2 + game.bg_atlas_id"
        class="c-slider__slide-item"
      >
        <GameComp :gb-id="game.bg_atlas_id" :gb-name="game.bg_name" />
      </div> -->
      <div
        v-for="atlasGame in atlasGames"
        :key="atlasGame.id"
        class="c-slider__slide-item"
      >
        <div v-if="loading" class="game-comp__loading"></div>
        <div v-if="!loading && atlasGame">
          <GameComp
            :atlas-id="atlasGame.id"
            :atlas-name="atlasGame.name"
            :atlas-source="atlasGame.image_url"
          />
        </div>
      </div>
    </div>
    <button
      class="c-slider__slides__btn c-slider__slides__btn--right"
      @click="clickRight"
    ></button>
  </div>
</template>

<script>
import GameComp from '../components/GameComp.vue'

export default {
  name: 'Slider',
  components: { GameComp },
  // props: {
  //   games: {
  //     type: Array,
  //     required: true,
  //   },
  // },
  data() {
    return {
      sliderWidth: 0,
      slideWidth: 0,
      currentSlide: 0,
      atlasGames: [],
      loading: true,
    }
  },

  computed: {
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
  mounted() {
    window.addEventListener('resize', this.calcWidths)
  },
  unmounted() {
    window.removeEventListener('resize', this.calcWidths)
  },
  created() {
    this.$axios(
      'http://phpstack-266425-1848208.cloudwaysapps.com/api/search/',
      {
        params: {
          client_id: this.$config.gbClientId,
          // ids: this.gbId,
          ids: this.$route.params.id,
          // name: this.gbName,
        },
      }
    )
      .then((response) => {
        // console.log(response.data)
        if (!response.data.games) {
          throw new Error('could not find game')
        }
        this.atlasGames = response.data.games
        console.log(this.atlasGames)
        console.log(this.loading)
      })
      .catch((e) => {
        // console.error(e)
      })
      .finally(() => {
        this.loading = false
        console.log(this.loading)
      })
  },
  methods: {
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
.c-slider {
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

  &__slides {
    position: relative;
    width: 80%;
    padding: 2rem;
    transform: skewY(7deg);

    &-container {
      display: flex;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
      overflow: -moz-scrollbars-none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        width: 0 !important;
        display: none;
      }
    }

    &__btn {
      width: 30px;
      height: 30px;
      color: white;
      position: absolute;
      top: 50%;
      margin-top: -15px;
      cursor: pointer;
      border-top: none;
      border-right: none;
      background-color: transparent;
      border-bottom: 6px solid;
      border-left: 6px solid;

      &--right {
        transform: rotate(-135deg);
        right: 0.5rem;
      }

      &--left {
        transform: rotate(45deg);
        left: 0.5rem;
      }
    }
  }

  &__slide-item {
    box-sizing: border-box;
    flex-shrink: 0;
    width: calc(100% / 4);
    padding: 0 1rem;

    @media screen and (max-width: $xl) {
      width: calc(100% / 3);
    }

    @media screen and (max-width: $large) {
      width: calc(100% / 2);
    }

    @media screen and (max-width: $medium) {
      width: calc(100%);
    }

    @media screen and (max-width: $small) {
      width: calc(100%);
    }
  }
}
</style>
