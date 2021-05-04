<template>
  <footer class="c-footer">
    <div class="c-footer__nav">
      <a href="">Contact</a>
      <a href="">FAQ</a>
      <a href="">Contact</a>
      <a href="">About</a>
      <a href="">Privacy</a>
      <a href="">Houserules</a>
    </div>
    <div class="c-footer__icons">
      <div class="c-footer__icon"></div>
      <div class="c-footer__icon"></div>
      <div class="c-footer__icon"></div>
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
  height: 300px;
  width: 100%;
  background: linear-gradient(#ffffff, rgba(129, 203, 235, 0.767) 100%);
  position: relative;
  &__nav {
    @include flexCenter;
    justify-content: space-evenly;
    width: 100%;
    max-width: 1000px;
    a {
      color: black;
      font-weight: 600;
    }
  }
  &__icons {
    @include flexCenter;
    justify-content: space-evenly;
    width: 30%;
    margin: 0 auto;
  }

  &__icon {
    width: 20px;
    height: 20px;
    background: white;
    @include flexCenter;
  }

  &__logo {
    width: 200px;
    img {
      width: 100%;
    }
  }
}
</style>
