<template>
  <div class="s-month-game">
    <h2>Game of the month!</h2>
    <div class="month-game">
      <div class="round-input-decorator">
        <div class="round-input-border-left"></div>
        <span class="round-input-label-text"><h3>Brass: Birmingham</h3></span>
        <div class="round-input-border-right"></div>
      </div>
      <div class="month-game__img">
        <img src="~/assets/images/BrassBIDlx_Boxfront_Orig.jpg" alt="" />
      </div>
      <div class="month-game__details">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac eros
          luctus, faucibus ante eget, tristique tortor. Quisque gravida
          scelerisque semper. Proin sit amet enim eget leo venenatis mattis id
          non dolor.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameOfTheMonth',
  data() {
    return {}
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/imports/mixins';

.s-month-game {
  @include flexCenter();
  flex-direction: column;
  padding-top: 5rem;
  min-height: 700px;
  justify-content: space-around;

  .month-game__img {
    height: 300px;
    width: 300px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .month-game {
    width: 60%;
    margin: auto;
    padding: 4rem;
    @include flexCenter();
    justify-content: space-between;
    position: relative;
    .round-input-decorator {
      position: absolute;
      top: -1rem;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      border-bottom: 1px solid #ea5d30;
      border-radius: 10px;
    }

    .round-input-label-text {
      font-size: 0.8em;
      padding: 0 4px;
      transform: translate(0, -30px);
      white-space: nowrap;
      h3 {
        color: #3d3d3d;
      }
    }

    .round-input-border-left {
      flex: 0 0 10px;
      box-sizing: border-box;
      height: 100%;
      border-radius: 10px 0 0 10px;
      border: 1px solid #ea5d30;
      border-right: none;
    }
    .round-input-border-right {
      flex: 1 0 50px;
      border-radius: 0 10px 10px 0;
      border: 1px solid #ea5d30;
      border-left: none;
      border-bottom: none;
    }
    &__details {
      width: 50%;

      max-width: 75ch;
    }
  }
}
</style>
