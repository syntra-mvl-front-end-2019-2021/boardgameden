<template>
  <header
    :class="{
      'navigation-background__colored': scrollIndex > 70,
    }"
  >
    <div class="inner_header container">
      <nav class="inner_header--nav-items">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/shop">Shop</NuxtLink>
        <NuxtLink to="/gameDen">PLAY!</NuxtLink>
        <NuxtLink to="/faq">FAQ</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </nav>
      <div class="inner_header--login-items">
        <a v-if="isLoggedIn" @click="logout">Logout</a>
        <a v-else @click="redirect">Login</a>
        <NuxtLink to="/register">Register</NuxtLink>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      scrollIndex: null,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn
    },
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    redirect() {
      this.$router.push('/login')
    },
    updateScroll() {
      this.scrollIndex = window.scrollY
    },
  },
}
</script>

<style lang="scss">
header.navigation-background__colored {
  background-color: rgba(255, 255, 255, 1);
  transition: all 0.3s ease-in-out;
  box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
  -webkit-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
  -moz-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
}
header {
  transition: all 0.3s ease-in-out;
  position: fixed;
  z-index: 10000;
  width: 100%;
  left: 0;
  right: 0;
  height: 70px;
  .inner_header {
    @include flexCenter;
    justify-content: space-between;
    position: fixed;
    left: 0;
    right: 0;
    &--nav-items {
      @include flexCenter;
      justify-content: space-evenly;
      width: 450px;
      height: 70px;

      a {
        color: $orange;
        text-decoration: none;
        position: relative;
        line-height: 50px;
      }

      a::after {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: $orange;
        content: '';
        opacity: 0;
        -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
        -moz-transition: opacity 0.3s, -moz-transform 0.3s;
        transition: opacity 0.3s, transform 0.3s;
        -webkit-transform: translateY(10px);
        -moz-transform: translateY(10px);
        transform: translateY(10px);
      }

      a:hover::after {
        opacity: 1;
      }
    }
    &--login-items {
      a {
        padding: 0 1em;
        color: #3a3939;
        transition: all 0.2s ease-in-out;
        &:hover {
          color: $orange;
        }
        &:first-child {
          border-right: 1px solid $black;
        }
      }
    }
  }
}
</style>
