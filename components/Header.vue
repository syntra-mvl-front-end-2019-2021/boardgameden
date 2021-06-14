<template>
  <header
    :class="{
      'navigation-background__colored': scrollIndex > 70,
    }"
  >
    <div class="nav-dropdown">
      <div class="nav-dropdown__logo">
        <img class="logo_img" src="~/assets/images/logoStripped.png" alt="" />
      </div>
      <div class="nav-dropdown__button" @click="openDropDown">
        <span
          :class="{
            open: dropDownOpen,
          }"
        ></span>
      </div>
      <div class="nav-dropdown__list">
        <ul
          :class="{
            open: dropDownOpen,
          }"
          @click="openDropDown"
        >
          <NuxtLink to="/">
            <img src="~/assets/images/logoStripped.png" />
          </NuxtLink>
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/shop">Shop</NuxtLink>
          <NuxtLink to="/gameDen">PLAY!</NuxtLink>
          <NuxtLink to="/faq">FAQ</NuxtLink>
          <NuxtLink to="/contact">Contact</NuxtLink>
        </ul>
      </div>
    </div>
    <div class="inner_header container">
      <nav class="inner_header--nav-items">
        <NuxtLink to="/">
          <img src="~/assets/images/logoStripped.png" />
        </NuxtLink>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/shop">Shop</NuxtLink>
        <NuxtLink to="/gameDen">PLAY!</NuxtLink>
        <NuxtLink to="/faq">FAQ</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </nav>
      <div class="inner_header--login-items">
        <a v-if="isLoggedIn" @click="profile">{{ $auth.user.user_name }}</a>
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
  middleware: ['auth'],
  data() {
    return {
      scrollIndex: null,
      dropDownOpen: false,
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
    profile() {
      this.$router.push('/profile')
    },
    updateScroll() {
      this.scrollIndex = window.scrollY
    },
    openDropDown() {
      this.dropDownOpen = !this.dropDownOpen
      if (this.dropDownOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },
  },
  created() {
    console.log('route = ' + this.$route.name)
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
  .nav-dropdown {
    display: none;
    @media screen and (max-width: $medium) {
      display: block;
    }
    &__logo {
      display: inline-block;
      height: 50px;
      margin-top: 10px;
      margin-left: 40px;
      img {
        height: 100%;
      }
    }
    &__button {
      width: 60px;
      height: 60px;
      float: right;
      margin-right: 21px;
      z-index: 5;
      position: relative;
      span {
        transition: all 0.3s ease-in-out;
        display: block;
        width: 35px;
        height: 4px;
        background-color: $orange;
        position: absolute;
        top: 30px;
        border-radius: 5px;
        &:before,
        &:after {
          content: '';
          position: absolute;
          width: 35px;
          background-color: $orange;
          height: 4px;
          border-radius: 5px;
          transition: all 0.3s ease-in-out;
        }
        &:before {
          transform: translateY(-8px);
        }
        &:after {
          transform: translateY(8px);
        }
      }
      span.open {
        transform: translateX(-50px);
        background: transparent;
        &:before {
          transform: rotate(45deg) translate(35px, -35px);
        }
        &:after {
          transform: rotate(-45deg) translate(35px, 35px);
        }
      }
    }
    &__list {
      z-index: 4;
      ul {
        transition: $transition-normal;
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-color: $blue;
        transform: translateY(calc(-100% - 70px));
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        a {
          text-align: center;
          color: white;
          font-weight: 600;
          font-size: 1.3em;
        }
      }
      ul.open {
        transform: translateY(-70px);
      }
    }
  }
  .inner_header {
    @media screen and (max-width: $medium) {
      display: none;
    }
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
