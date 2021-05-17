<template>
  <footer class="c-footer">
    <div class="c-footer__nav">
      <NuxtLink to="/contact">Contact</NuxtLink>
      <NuxtLink to="/faq">FAQ</NuxtLink>
      <NuxtLink to="/houserules">Houserules</NuxtLink>
    </div>

    <div class="c-footer__find-us">
      <p class="social-media__where-to-find">Where are we hiding?</p>
      <div class="c-footer__social-media">
        <a
          href="https://en.wikipedia.org/wiki/Facebook"
          class="fa fa-facebook"
          target="blank"
          rel="noreferrer noopener"
        ></a>
        <a
          href="https://en.wikipedia.org/wiki/LinkedIn"
          class="fa fa-instagram"
          target="blank"
          rel="noreferrer noopener"
        ></a>
        <a
          href="https://en.wikipedia.org/wiki/Twitter"
          class="fa fa-twitter"
          target="blank"
          rel="noreferrer noopener"
        ></a>
      </div>
    </div>

    <div class="c-footer__logo">
      <img src="~/assets/images/name.png" alt="" />
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Hero',
}
</script>

<style lang="scss" scoped>
.c-footer {
  @include flexCenter;
  flex-direction: column;
  justify-content: space-evenly;
  // height: 300px;
  width: 100%;
  background: linear-gradient(#ffffff, rgba(129, 203, 235, 0.767) 100%);
  position: relative;
  margin-top: 5rem;
  &__nav {
    @include flexCenter;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
    margin-bottom: 3rem;
    a {
      text-align: center;
      padding: 1rem 0;
      width: 500px;
      color: $orange;
      font-weight: 600;
      border-bottom: solid 1px $bluegreen;

      &:last-child {
        border: none;
      }
    }
  }

  .social-media__where-to-find {
    color: $bluegreen;
    font-weight: $bold;
  }

  &__social-media {
    text-align: center;
    margin: 0.5rem 0 3rem 0;
  }

  .fa {
    background-color: $orange;
    color: white;
    width: 2rem;
    height: 2rem;
    text-decoration: none;
    border-radius: 50%;
    padding-top: 7px;
    margin-right: 0.2rem;
  }

  &__logo {
    width: 200px;
    margin-bottom: 2rem;
    img {
      width: 100%;
    }
  }
}
</style>
