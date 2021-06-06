<template>
  <div class="c-slider__slides">
    <button
      class="c-slider__slides__btn c-slider__slides__btn--left"
      @click="clickLeft"
    ></button>
    <div
      v-if="games"
      ref="slider"
      class="c-slider__slides-container"
      @scroll="sliderScroll"
    >
      <div
        v-for="game in games"
        :key="1 + game.bg_atlas_id"
        class="c-slider__slide-item"
      >
        <GameComp :game="game" />
      </div>
      <div
        v-for="game in games"
        :key="2 + game.bg_atlas_id"
        class="c-slider__slide-item"
      >
        <GameComp :game="game" />
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
  props: {
    games: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sliderWidth: 0,
      slideWidth: 0,
      currentSlide: 0,
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
  &__slides {
    position: relative;
    width: 100%;
    padding: 2rem;

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
      color: $orange;
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
    width: calc(100% / 3);
    padding: 0 1rem;

    @media screen and (max-width: $medium) {
      width: calc(100% / 2);
    }

    @media screen and (max-width: $small) {
      width: calc(100%);
    }
  }
}
</style>
