<template>
  <div class="loginPage">
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
    <div class="loginpage_form">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label>
            <p>E-mail</p>
            <input v-model="email" type="text" value="email" />
          </label>
        </div>
        <div>
          <label>
            <p>Wachtwoord</p>
            <input v-model="password" type="password" value="password" />
          </label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    loginBody() {
      return JSON.stringify({
        email: this.email,
        password: this.password,
      })
    },
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', this.loginBody)
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/styles/imports/mixins';

.loginPage {
  @include flexCenter();
  width: 100%;
  height: 100vh;
  position: relative;
  .loginpage_form {
    @include flexCenter();
    flex-direction: column;
    height: 500px;
    text-align: center;
    h1 {
      color: #ea5d30;
    }
    form {
      height: 250px;
      @include flexCenter();
      flex-direction: column;

      justify-content: space-around;
      label {
        @include flexCenter();
        flex-direction: column;
        width: 100%;
        color: rgba(129, 203, 235);

        input {
          width: 250px;
          height: 30px;
          padding: 6px 8px;
          border: 2px solid #ea5d30;
          border-radius: 8px;
        }
        p {
          margin-right: auto;
          margin-bottom: 0.5rem;
        }
      }
    }
    button {
      background: none;
      border: 3px rgba(129, 203, 235) solid;
      border-radius: 8px;
      padding: 0.5rem 1rem;
    }
  }
  .bigBlueBackground {
    position: absolute;
    width: 700px;
    height: 700px;
    left: -5rem;
    top: -25rem;
    transform: rotate(135deg);

    .blue {
      fill: rgba(129, 203, 235);
      width: 500px;
      height: 500px;
    }
  }
  .bigOrangeBackground {
    position: absolute;

    top: -20rem;
    right: -5rem;
    width: 500px;
    height: 500px;
    transform: rotate(-135deg);

    .orange {
      fill: #ea5b30be;
    }
  }
}
</style>
