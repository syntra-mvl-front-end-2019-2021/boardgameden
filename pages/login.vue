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
          <div class="round-input-container">
            <div class="round-input-decorator">
              <div class="round-input-border-left"></div>
              <label for="email" class="round-input-label-text">E-Mail</label>
              <div class="round-input-border-right"></div>
            </div>
            <input id="email" v-model="email" type="text" value="email" />
          </div>
        </div>
        <div>
          <div class="round-input-container">
            <div class="round-input-decorator">
              <div class="round-input-border-left"></div>
              <label for="password" class="round-input-label-text"
                >Wachtwoord</label
              >
              <div class="round-input-border-right"></div>
            </div>
            <input
              id="password"
              v-model="password"
              type="password"
              value="password"
            />
          </div>
        </div>
        <div class="choice"></div>
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
      return {
        email: this.email,
        password: this.password,
      }
    },
  },
  methods: {
    login() {
      this.$auth.loginWith('local', { data: this.loginBody })
    },
  },
}
</script>

<style scoped lang="scss">
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
      .round-input-container {
        @include flexCenter();
        display: inline-block;
        position: relative;
        margin: 10px 0;
        flex-direction: column;
        width: 100%;
        color: rgba(129, 203, 235);
        .round-input-decorator {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-flow: row nowrap;
        }

        .round-input-label-text {
          font-size: 0.8em;
          color: rgb(98, 196, 238);
          padding: 0 4px;
          transform: translate(0, -8px);
          white-space: nowrap;
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
        }

        input {
          height: 30px;
          position: relative;
          font-size: 1em;
          padding: 13px 20px 13px 15px;
          min-width: 250px;
          border: none;
          background: none;
          border-radius: 10px;
          border-bottom: 1px solid #ea5d30;
          outline: none;
          &:focus {
            box-shadow: 1px 1px 3px 0 #ea5f3094;
          }
        }
      }
    }
    button {
      background: rgba(129, 203, 235);
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 8px;
      outline: none;
      cursor: pointer;
      &:focus {
        box-shadow: 1px 1px 3px 0 rgba(129, 203, 235);
      }
    }
  }
  .bigBlueBackground {
    position: absolute;
    width: 700px;
    height: 700px;
    left: -5rem;
    top: -25rem;
    transform: rotate(135deg);
    pointer-events: none;
    .blue {
      fill: rgba(129, 203, 235);
      width: 500px;
      height: 500px;
    }
  }
  .bigOrangeBackground {
    position: absolute;
    top: -20rem;
    right: 15rem;
    width: 500px;
    height: 500px;
    transform: rotate(-135deg);
    .orange {
      fill: #ea5b30be;
    }
  }
}
</style>
