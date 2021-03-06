<template>
  <div class="shop-item">
    <div>
      <span class="shop-item__label">{{ forSaleOrSwap }}</span>
      <span class="shop-item__label-from">from {{ user }}</span>
      <NuxtLink :to="'/game/' + gbId" class="button-link__game">
        {{ title }}
      </NuxtLink>
      <!-- <p>image link id: {{ thumburl }}</p> -->
      <img class="game-img" :src="thumburl" alt="game picture" />
      <h1 v-if="$route.params.id">{{ user }}</h1>
      <button class="button-link__orange" @click="openModal">Get it!</button>
    </div>
    <div
      id=""
      :class="{
        'shop-modal': true,
        open: showModal,
      }"
    >
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
          {{ buyOrSwap }} <strong> {{ title }} </strong>
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
    gbId: { type: Number, required: true },
    thumburl: { type: String, required: true },
    buyOrSwap: { type: String, required: true },
    forSaleOrSwap: { type: String, required: true },
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
    notifyUser() {
      this.$root.$emit('notify', 'Uw bericht werd met succes verzonden.')
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
          this.notifyUser()
          this.formValues.message = ''
          this.showModal = !this.showModal
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
  min-width: 300px;
  height: 200px;
  position: relative;
  padding: 2em;
  margin: 1em;
  flex: 1;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 0 rgba(171, 171, 171, 0.2);
  -webkit-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.2);
  -moz-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.2);
  overflow: hidden;
  &__label {
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.5em;
    background-color: $orange;
    font-size: 1.2em;
    font-weight: $normal;
    line-height: 1em;
  }
  &__label-from {
    color: white;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5em;
    background-color: $blue;
    font-size: 1em;
    font-weight: $bold;
    line-height: 1em;
  }
  &:hover {
    img {
      opacity: 0.6;
    }
    .button-link__game {
      font-size: 1.8em;
    }
  }
  img {
    display: inline-block;
    position: absolute;
    z-index: -5;
    top: 0;
    left: 0;
    width: 100%;
    transition: all 0.2s;
  }
  .button-link__orange {
    display: block;
  }
  .button-link__game {
    color: white;
    font-size: 1.6em;
    font-weight: $bold;
    margin: 0.7em 0;
    display: block;
    text-shadow: 3px 3px 3px $black;
    transition: $transition-normal;
  }
}
</style>
