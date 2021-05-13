<template>
  <div>
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
              time and so inappropriate behaviour will not be tolerated. You can
              find the
            </p>
          </div>
          <div class="intro-images">
            <img class="image-1" src="~/assets/images/respect.jpg" alt="" />
            <img class="image-2" src="~/assets/images/connected.jpg" alt="" />
          </div>
        </div>
        <div class="house-rules__rules">
          <h3>Rules of play before the game</h3>
          <div>
            <h4>Please do</h4>
            <ul>
              <li>get to know each other and meet</li>
              <li>share your knowledge of new games</li>
              <li>communicate with respect to one another</li>
            </ul>
          </div>
          <div>
            <h4>Please do not</h4>
            <ul>
              <li>bahave inappropriate</li>
              <li>share any personal information if you don't want to</li>
              <li>Lorem ipsum dolor sit amet</li>
            </ul>
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
.house-rules {
  width: 90%;
  margin: auto;

  .house-rules__intro {
    display: flex;

    .intro-text {
      width: 60%;
    }

    .intro-images {
      width: 40%;
      display: flex;

      .image-1 {
        width: 50%;
      }

      .image-2 {
        width: 50%;
      }
    }
  }
}
</style>
