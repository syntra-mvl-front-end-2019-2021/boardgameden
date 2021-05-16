<template>
  <div>
    <div class="bg-triangle"></div>
    <section class="container">
      <h2>House Rules</h2>
      <div class="house-rules">
        <div class="house-rules__intro">
          <div class="intro-text">
            <h3>Safe place</h3>
            <p>
              Our goal is to connect people with the same passion and have an
              awesome time together. In order to do so we feel obligated to
              share with you our code of conduct. These days we see too much
              intolerant conversations circling the internet and even hateful
              messages. Please be aware that we are all here to have a great
              time and so inappropriate behaviour will not be tolerated.
            </p>
          </div>
          <div class="intro-images">
            <img
              class="image image-1"
              src="~/assets/images/respect.jpg"
              alt=""
            />
            <img
              class="image image-2"
              src="~/assets/images/connected.jpg"
              alt=""
            />
          </div>
        </div>
        <div class="house-rules__rules">
          <h3>Rules of play before the game</h3>
          <div class="rules">
            <div class="rules-animation">
              <div class="rules-animation__circle red"></div>
              <div class="rules-animation__circle blue">R</div>
              <div class="rules-animation__circle green">U</div>
              <div class="rules-animation__circle yellow"></div>
              <div class="rules-animation__circle orange"></div>
              <div class="rules-animation__circle purple">L</div>
              <div class="rules-animation__circle pink">E</div>
              <div class="rules-animation__circle coral"></div>
              <div class="rules-animation__circle gray"></div>
              <div class="rules-animation__circle lightgreen">S</div>
            </div>
            <div class="rules-text">
              <div class="rules-text__do">
                <h4>&#9829; Please do</h4>
                <ul>
                  <li>get to know each other and meet</li>
                  <li>share your knowledge of new games</li>
                  <li>communicate with respect to one another</li>
                </ul>
              </div>
              <div class="rules-text__dont">
                <h4>&#9760; Please do not</h4>
                <ul>
                  <li>behave inappropriate</li>
                  <li>share any personal information if you don't want to</li>
                  <li>Lorem ipsum dolor sit amet</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Houserules',
}
</script>

<style lang="scss">
ul li {
  line-height: 30px;
}
p {
  line-height: 30px;
}

h3 {
  margin-bottom: 2rem;
}

.bg-triangle {
  width: 100%;
  height: 1200px;
  background-color: $blue;
  clip-path: polygon(0 20%, 45% 50%, 0 100%);
  position: absolute;
}
.house-rules {
  width: 90%;
  margin: auto;
  margin-top: 3rem;

  .house-rules__intro {
    display: flex;
    justify-content: space-between;
    height: 60vh;
    margin-bottom: 3rem;
    position: relative;

    .intro-text {
      width: 49%;
    }

    .intro-images {
      width: 49%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      position: relative;
      top: -100px;

      .image {
        height: 80%;
        width: 80%;
        clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
        position: relative;

        @media screen and (max-width: $xl) {
          height: 70%;
          width: 70%;
        }
      }

      .image-1 {
        top: 50%;
      }

      .image-2 {
        left: -160px;
      }
    }
  }

  .house-rules__rules {
    position: relative;

    .rules {
      display: flex;
      justify-content: space-between;
      .rules-text {
        width: 45%;

        .rules-text__do {
          margin-bottom: 2rem;
        }
      }

      .rules-animation {
        width: 45%;
        position: relative;

        &__circle {
          clip-path: circle(50%);
          width: 120px;
          height: 120px;
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .red {
          background-color: rgba(255, 0, 0, 0.7);
          position: absolute;
          left: 90px;
        }

        .blue {
          background-color: rgba(0, 0, 255, 0.7);
          width: 70px;
          height: 70px;
          position: absolute;
          top: 110px;
          left: 130px;
        }

        .green {
          background-color: rgba(0, 128, 0, 0.7);
          width: 60px;
          height: 60px;
          position: absolute;
          top: 85px;
          left: 180px;
        }

        .yellow {
          background-color: rgba(255, 255, 0, 0.7);
          width: 100px;
          height: 100px;
          position: absolute;
          left: 200px;
          top: 10px;
        }

        .orange {
          background-color: rgba(255, 166, 0, 0.7);
          position: absolute;
          top: 165px;
          left: 80px;
        }

        .purple {
          background-color: rgba(128, 0, 128, 0.7);
          width: 70px;
          height: 70px;
          position: absolute;
          top: 100px;
          left: 230px;
        }

        .pink {
          background-color: rgba(255, 192, 203, 0.7);
          position: absolute;
          top: 30px;
          left: 280px;
          width: 150px;
          height: 150px;
        }

        .coral {
          background-color: rgba(255, 127, 80, 0.6);
          position: absolute;
          top: 135px;
          left: 175px;
          width: 90px;
          height: 90px;
        }

        .gray {
          background-color: rgba(128, 128, 128, 0.6);
          position: absolute;
          top: 150px;
          left: 240px;
          width: 150px;
          height: 150px;
        }

        .lightgreen {
          background-color: rgba(144, 238, 144, 0.6);
          position: absolute;
          top: 145px;
          left: 370px;
          width: 110px;
          height: 110px;
        }
      }
    }
  }
}
</style>
