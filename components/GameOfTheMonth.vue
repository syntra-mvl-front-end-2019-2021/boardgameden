<template>
  <div class="s-month-game">
    <h2>Game of the month!</h2>
    <div class="month-game">
      <h3>Brass: Birmingham</h3>
      <div class="month-game-content">
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
            revolution, between the years of 1770-1870. As in its predecessor,
            you must develop, build, and establish your industries and network,
            in an effort to exploit low or high market demands.
          </p>
        </div>
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
  margin: auto;
  width: 70%;

  h2 {
    margin-bottom: 3rem;
  }

  .month-game {
    border: 15px solid $orange;
    border-radius: 5px;
    padding: 2rem;
    text-align: center;

    h3 {
      margin-bottom: 2rem;
    }

    .month-game-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media screen and (max-width: $large) {
        display: flex;
        flex-direction: column;
      }

      .month-game__img {
        width: 50%;

        @media screen and (max-width: $large) {
          width: 60%;
          margin-bottom: 2rem;
        }

        img {
          width: 100%;
        }
      }

      .month-game__details {
        width: 45%;

        @media screen and (max-width: $large) {
          width: 100%;
        }

        p {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
