<template>
  <div class="hero">
    <svg
      class="bigBlueBackground"
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
      class="bigOrangeBackground"
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
      class="bigBlueBackground"
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
      class="bigOrangeBackground"
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
      class="bigBlueBackground"
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
      class="bigOrangeBackground"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 377 435"
      stroke-linejoin="round"
    >
      <path
        class="orange"
        d="M188.1 0l188.1 108.6 0 217.2 -188.1 108.6 -188.1-108.6 0-217.2 188.1-108.6Z"
      />
    </svg>
    <div class="logo">
      <img src="~/assets/images/logo.png" alt="" />
      <img src="~/assets/images/name.png" alt="" />
    </div>
  </div>
</template>

<script>
import { TimelineMax } from 'gsap'
export default {
  name: 'ImproveHero',
  mounted() {
    const ScrollMagic = require('scrollMagic')

    this.$options.controller = new ScrollMagic.Controller()
    const Timeline = new TimelineMax()

    Timeline.to('.bigBlueBackground', 8, { x: 500 })
  },
  destroyed() {
    this.$options.controller.destroy()
  },
}
</script>

<style lang="scss" scoped>
.hero {
  @include flexCenter;
  height: 90vh;
  width: 100%;
  padding-top: 8rem;
  background: linear-gradient(360deg, #ffffff 1%, rgba(129, 203, 235, 0.7));
  position: relative;
  z-index: -1;
  .logo {
    @include flexCenter;
    flex-direction: column;
    justify-content: space-around;
    width: 500px;
    height: 80%;
  }

  svg {
    position: absolute;
    width: 120px;
    &:nth-child(1) {
      top: 20%;
      left: 35%;

      transform: translate(-35%, -10%);
      .blue {
        fill: rgba(129, 203, 235);
      }
    }
    &:nth-child(2) {
      top: 20%;
      right: 35%;
      transform: translate(35%, -10%);

      .orange {
        fill: #ea5b30;
      }
    }
    &:nth-child(3) {
      top: 35%;
      left: 25%;

      transform: translate(-30%, -25%);

      .blue {
        fill: rgba(129, 203, 235, 0.815);
      }
    }
    &:nth-child(4) {
      top: 35%;
      right: 25%;
      transform: translate(30%, -25%);

      .orange {
        fill: #ea5b30c4;
      }
    }
    &:nth-child(5) {
      left: 10%;
      top: 15%;
      .blue {
        fill: rgba(129, 203, 235, 0.733);
      }
    }
    &:nth-child(6) {
      top: 15%;
      right: 10%;

      .orange {
        fill: #ea5b30b2;
      }
    }
  }
}
</style>
