<template>
  <section class="c-contactPage">
    <Logo class="c-contactPage__logo" />
    <div v-if="$auth.loggedIn" class="c-contactPage__form container">
      <h2>Hey {{ $auth.user.user_name }}, let us know!</h2>
      <form @submit.prevent="createQuestion" @submit="resetForm">
        <div class="c-contactPage__form-inputs">
          <div class="column-1">
            <input v-model="firstname" type="text" placeholder="First Name" />
            <input v-model="lastname" type="text" placeholder="Last name" />
          </div>
          <div class="column-2">
            <input v-model="email" type="text" placeholder="E-mail" />
            <textarea v-model="question" placeholder="Your question"></textarea>
            <button type="submit" class="button-link__orange">Ask</button>
          </div>
        </div>
      </form>
    </div>
    <div v-if="!$auth.loggedIn" class="not-logged-in container">
      <h2>Let us know!</h2>
      <NuxtLink to="/login" class="button-link__black">
        Please log in first
      </NuxtLink>
    </div>
  </section>
</template>
<script>
// import Logo from '~/components/Logo'
export default {
  name: 'Contact',
  // components: { Logo },

  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      question: '',
    }
  },
  computed: {
    questionBody() {
      return JSON.stringify({
        first_name: this.firstname,
        last_name: this.lastename,
        email: this.email,
        question: this.question,
      })
    },
    isLoggedIn() {
      return this.$store.getters['faq/isLoggedIn']
    },
  },
  created() {
    if (this.$auth.loggedIn) {
      this.firstname = this.$auth.user.first_name
      this.lastname = this.$auth.user.last_name
      this.email = this.$auth.user.email
    }
  },
  methods: {
    createQuestion() {
      this.$axios('/items/contact_form_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: this.questionBody,
      })
        .then((response) => {
          // TODO: notify user
          console.log(response.data)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    resetForm(event) {
      event.target.reset()
    },
  },
}
</script>

<style lang="scss">
.c-contactPage {
  .not-logged-in {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    .button-link__black {
      margin: auto;
    }
  }
  @include flexCenter();
  max-width: 100%;
  height: 100vh;
  margin: auto;
  background: linear-gradient(rgba(129, 203, 235, 0.767), #ffffff 100%);
  &__logo {
    position: absolute;
    opacity: 0.3;
  }
  &__form {
    position: absolute;
    top: 200px;
    flex-direction: column;
    text-align: center;
    width: 700px;
    flex: 1;
    @media screen and (max-width: $large) {
      top: 100px;
    }
    &-inputs {
      width: 800px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      @media screen and (max-width: $large) {
        flex-direction: column;
        width: 100%;
        margin: auto;
      }
      .column-1,
      .column-2 {
        width: 380px;
        @media screen and (max-width: $large) {
          width: 100%;
        }
      }
      input,
      textarea {
        background-color: rgba($color: #000000, $alpha: 0);
        color: $orange;
        border: none;
        outline: none;
        position: relative;
        display: block;
        border-radius: 5px;
        border-bottom: 1px solid $orange;
        width: 100%;
        margin: 2em 0;
        padding: 1em;
        font-weight: $normal;
        font-size: 1.3rem;
        background-color: rgba(255, 255, 255, 0.3);
      }
      ::placeholder {
        color: $black;
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
