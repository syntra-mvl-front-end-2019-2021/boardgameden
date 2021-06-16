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
        <img
          class="game-img"
          src="~/assets/images/BrassBIDlx_Boxfront_Orig.jpg"
          alt="game picture"
        />
      </div>
      <div class="month-game__details">
        <p>
          Brass: Birmingham is an economic strategy game sequel to Martin
          Wallace's 2007 masterpiece, Brass. Birmingham tells the story of
          competing entrepreneurs in Birmingham during the industrial
          revolution, between the years of 1770-1870.
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
  justify-content: space-around;
  margin: 10rem 0 15rem 0;
  h2 {
    margin-bottom: 4rem;
  }
  .month-game {
    width: 60%;
    margin: 0 auto;
    padding: 2rem;
    @include flexCenter();
    justify-content: space-between;
    position: relative;
    flex-wrap: wrap;

    @media screen and (max-width: 1100px) {
      flex-direction: column;
    }

    @media screen and (max-width: 800px) {
      width: 50%;
    }

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
      width: 60%;
      margin: auto;

      max-width: 75ch;

      @media screen and (max-width: 1100px) {
        width: 100%;
      }
    }

    &__img {
      @media screen and (max-width: 1100px) {
        width: 200px;
        object-fit: cover;
      }
    }
  }
}
.month-game__img {
  width: 200px;
  height: 200px;
  position: relative;
  padding: 2em;
  margin: 1em;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 0 rgba(171, 171, 171, 0.2);
  -webkit-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.2);
  -moz-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.2);
  overflow: hidden;
  &:hover {
    img {
      opacity: 0.6;
    }
    .button-link__game {
      font-size: 2.3em;
    }
  }
  img {
    display: inline-block;
    position: absolute;
    z-index: -5;
    top: 0;
    left: 0;
    width: 100%;
    transition: all 0.2s;
    object-fit: contain;
  }
  .button-link__orange {
    display: block;
    margin: 2em 0 0 0;
  }
  .button-link__game {
    color: white;
    font-size: 2em;
    font-weight: $bold;
    margin: 0.7em 0;
    display: block;
    text-shadow: 3px 3px 3px $black;
    transition: $transition-normal;
  }
}
</style>
