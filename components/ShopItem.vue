<template>
  <div class="shop-item">
    <div>
      <NuxtLink :to="'/game/' + gbId" class="button-link__game">
        {{ title }}
      </NuxtLink>
      <p>image link id: {{ thumburl }}</p>
      <img class="game-img" :src="thumburl" alt="game picture" />
      <button class="button-link__orange" @click="openModal">
        Buy or Swap
      </button>
    </div>
    <div
      id=""

      :class="{
        'shop-modal': true,
        open: showModal,
      }"
       <textarea

    >
      <div v-if="submit">
        <p>Your request has succesfully been sent.</p>
      </div>
      <div
        v-if="$auth.loggedIn"
        :class="{
          'shop-modal__form': true,
          hidden: submit,
        }"
      >
        <div class="shop-modal__form--close" @click="openModal">
          <span></span>
        </div>
        <p>
          Buy <strong> {{ title }} </strong>
        </p>
        <p>
          from <strong> {{ user }} </strong>
        </p>
        <FormulateForm
          v-model="formValues"
          class="shop-modal__form--data"
          :form-errors="formErrors"
          @submit="createQuestion"
        >
          <FormulateInput
            class="shop-modal__form--data-element"
            type="text"
            name="first_name"
            label="first_name"
          />
          <FormulateInput
            class="shop-modal__form--data-element"
            type="text"
            name="last_name"
            label="last_name"
          />
          <FormulateInput
            class="shop-modal__form--data-element"
            type="text"
            name="email"
            label="email:"
          />
          <FormulateInput
            class="shop-modal__form--data-element"
            type="text"
            name="message"
            label="message:"
          />
          <FormulateInput
            class="shop-modal__form--data-submit"
            name="submit"
            type="submit"
          />
          <FormulateErrors />
        </FormulateForm>
      </div>
      <div v-else class="shop-modal__form">
        <div class="shop-modal__form--close" @click="openModal">
          <span></span>
        </div>
        <NuxtLink to="/login" class="shop-modal__form--message"
          >Please log in first</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopItem',
  middleware: 'auth',
  props: {
    title: { type: String, required: true },
    user: { type: String, required: true },
    gbId: { type: String, required: true },
    thumburl: { type: String, required: true },
  },
  data() {
    return {
      games: {},
      showModal: false,
      submit: false,
      formErrors: [],
      formValues: {
        first_name: '',
        last_name: '',
        email: '',
        message: '',
      },
    }
  },
  computed: {
    dataBody() {
      return JSON.stringify({
        first_name: this.formValues.first_name,
        last_name: this.formValues.last_name,
        email: this.formValues.email,
        question: this.formValues.message,
      })
    },
  },
  methods: {
    openModal() {
      this.showModal = !this.showModal
      if (this.$auth.loggedIn) {
        this.formValues.first_name = this.$auth.user.first_name
        this.formValues.last_name = this.$auth.user.last_name
        this.formValues.email = this.$auth.user.email
      }
    },
    createQuestion() {
      this.$axios('/items/contact_form_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: this.dataBody,
      })
        .then((response) => {
          // TODO: notify user
          console.log(response.data)
          this.submit = true
        })
        .catch((err) => {
          alert(err)
        })
    },
  },
}
</script>

<style lang="scss">
.shop-modal {
  display: none;
  position: fixed;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  &__form.hidden {
    display: none;
  }
  &__form {
    background-color: $orange;
    padding: 3em;
    border-radius: 10px;
    position: relative;
    width: 500px;
    &--data {
      margin: 2em 0 0 0;
      &-element {
        .formulate-input-element {
          max-width: 100%;
          background-color: #fff;
          border: none;
          border-radius: 5px;
        }
      }
      &-submit {
        .formulate-input-element--submit {
          button {
            background-color: $bluegreen;
            border: none;
          }
        }
      }
    }
    &--close {
      position: absolute;
      top: 15px;
      right: 10px;
      height: 30px;
      width: 30px;
      border-radius: 2px;
      span {
        display: block;
        width: 25px;
        height: 4px;
        background-color: $bluegreen;
        border-radius: 5px;
        transform: rotate(45deg);
        margin-top: 13px;
        margin-left: 3px;
        &:after {
          content: '';
          position: absolute;
          width: 25px;
          background-color: $bluegreen;
          height: 4px;
          border-radius: 5px;
          transition: all 0.3s ease-in-out;
          transform: rotate(90deg);
        }
      }
    }
    &--message {
      color: white;
    }
    p {
      color: white;
      font-size: 2em;
    }
  }
}

.shop-modal.open {
  display: flex;
  align-items: center;
  justify-content: center;
}

.shop-item {
  min-width: 400px;
  padding: 2em;
  margin: 1em;
  flex: 1;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 0px rgba(171, 171, 171, 0.2);
  //-webkit-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
  //-moz-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
  .button-link__orange {
    display: block;
    margin: 2em 0 0 0;
  }
  .button-link__game {
    color: $black;
    font-size: 1.5em;
    font-weight: $normal;
    margin: 0.7em 0;
    display: block;
  }
}
</style>
