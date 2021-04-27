<template>
  <div class="hero">
    <div class="logo">
      <svg
        class="bigBlueBackgroundOne"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 377 435"
        stroke-linejoin="round"
      >
        <path
          class="blue"
          d="M188.1 0l188.1 108.6 0 217.2 -188.1 108.6 -188.1-108.6 0-217.2 188.1-108.6Z"
        />
      </svg>
      <svg
        class="bigOrangeBackgroundOne"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 377 435"
        stroke-linejoin="round"
      >
        <path
          class="orange"
          d="M188.1 0l188.1 108.6 0 217.2 -188.1 108.6 -188.1-108.6 0-217.2 188.1-108.6Z"
        />
      </svg>
      <svg
        class="bigBlueBackgroundTwo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 377 435"
        stroke-linejoin="round"
      >
        <path
          class="blue"
          d="M188.1 0l188.1 108.6 0 217.2 -188.1 108.6 -188.1-108.6 0-217.2 188.1-108.6Z"
        />
      </svg>
      <svg
        class="bigOrangeBackgroundTwo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 377 435"
        stroke-linejoin="round"
      >
        <path
          class="orange"
          d="M188.1 0l188.1 108.6 0 217.2 -188.1 108.6 -188.1-108.6 0-217.2 188.1-108.6Z"
        />
      </svg>
      <svg
        class="bigBlueBackgroundThree"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 377 435"
        stroke-linejoin="round"
      >
        <path
          class="blue"
          d="M188.1 0l188.1 108.6 0 217.2 -188.1 108.6 -188.1-108.6 0-217.2 188.1-108.6Z"
        />
      </svg>
      <svg
        class="bigOrangeBackgroundThree"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 377 435"
        stroke-linejoin="round"
      >
        <path
          class="orange"
          d="M188.1 0l188.1 108.6 0 217.2 -188.1 108.6 -188.1-108.6 0-217.2 188.1-108.6Z"
        />
      </svg>

      <img class="logo_img" src="~/assets/images/logo.png" alt="" />
    </div>
    <!-- <img src="~/assets/images/name.png" alt="" /> -->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import { timeline, TimelineMax } from 'gsap'

export default {
  name: 'ImproveHero',
  // mounted() {
  //   const ScrollMagic = require('scrollMagic')
  //   this.$options.controller = new ScrollMagic.Controller()
  //   const Timeline = new TimelineMax()

  //   Timeline.to('.bigBlueBackgroundOne', 1, {
  //     x: -100,
  //     y: -100,
  //   })
  //     .to('.bigBlueBackgroundTwo', 1, { x: -200 })
  //     .to('.bigBlueBackgroundThree', 1, { x: -100, y: 100 })

  //   // eslint-disable-next-line no-unused-vars
  //   const scene = new ScrollMagic.Scene({
  //     triggerElement: 'form',
  //     duration: '300%',
  //     triggerHook: 0,
  //   })
  //     .addIndicators()
  //     .setTween(timeline)
  //     .setPin('.home-page')

  //     .addTo(this.$options.controller)
  // },
  // destroyed() {
  //   this.$options.controller.destroy()
  // },
}
</script>

<style lang="scss" scoped>
.hero {
  @include flexCenter;
  height: 80vh;
  width: 100%;
  padding-top: 8rem;
  background: linear-gradient(360deg, #ffffff 1%, rgba(129, 203, 235, 0.7));
  z-index: -1;
  .logo {
    @include flexCenter;
    flex-direction: column;
    justify-content: space-around;
    width: 500px;
    height: 80%;
    position: relative;

    svg {
      position: absolute;
      width: 120px;
      &:nth-child(1) {
        top: 20%;
        left: 0%;
        top: 20%;
        left: 0.8rem;
        .blue {
          fill: rgba(129, 203, 235);
        }
      }
      &:nth-child(2) {
        top: 20%;
        right: 0;
        top: 20%;
        right: 0.5rem;
        .orange {
          fill: #ea5b30;
        }
      }
      &:nth-child(3) {
        // top: 35%;
        // left: -10rem;
        top: 38%;
        left: -3rem;
        .blue {
          fill: rgba(129, 203, 235, 0.815);
        }
      }
      &:nth-child(4) {
        top: 35%;
        right: -10rem;
        top: 38%;
        right: -3rem;
        .orange {
          fill: #ea5b30c4;
        }
      }
      &:nth-child(5) {
        // left: -30rem;
        // top: 15%;
        left: 1rem;
        bottom: 20%;
        .blue {
          fill: rgba(129, 203, 235, 0.733);
        }
      }
      &:nth-child(6) {
        // top: 15%;
        // right: -30rem;
        bottom: 20%;
        right: 1rem;

        .orange {
          fill: #ea5b30b2;
        }
      }
    }
  }
}
</style>
