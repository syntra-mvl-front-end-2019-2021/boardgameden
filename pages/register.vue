<template>
  <main>
    <div class="registerPage_form">
      <h1>Register</h1>
      <FormulateForm
        v-model="formData"
        :form-errors="formErrors"
        @submit="submit"
      >
        <div class="formulate-form__inputs">
          <div class="formulate-form__inputs__username">
            <FormulateInput
              type="text"
              name="user_name"
              label="Username"
              validation="required|alphanumeric"
            />

            <FormulateInput
              type="password"
              name="password"
              label="Password"
              validation="required"
            />
            <FormulateInput
              type="password"
              name="passwordConfirm"
              label="Confirm Password"
              validation-name="Confirm Password"
              validation="required|confirm:password"
            />
          </div>
          <div class="formulate-form__inputs__names">
            <FormulateInput
              type="text"
              name="first_name"
              label="First Name"
              validation-name="First Name"
              validation="required"
            />
            <FormulateInput
              type="text"
              name="last_name"
              label="Last Name"
              validation-name="Last Name"
              validation="required"
            />
            <FormulateInput
              type="date"
              name="birthdate"
              label="Birthdate"
              :validation="'required|before:' + minDate"
            />
            <FormulateInput
              type="email"
              name="email"
              label="email"
              validation-name="E-mailadres"
              validation="required|email"
            />
            <FormulateInput type="hidden" name="role" />
            <FormulateErrors />
            <FormulateInput type="submit" name="Submit" />
          </div>
        </div>
      </FormulateForm>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Registerform',

  data() {
    return {
      formErrors: [],
      formData: {
        user_name: '',
        password: '',
        first_name: '',
        last_name: '',
        birthdate: '',
        email: '',
        role: '1eb0baf8-fbfb-40a6-b706-6146e6ffc1f0',
      },
    }
  },
  computed: {
    minDate() {
      const curDate = new Date()
      curDate.setFullYear(curDate.getFullYear() - 18)

      return curDate.toISOString().substr(0, 10)
    },
  },
  created() {},
  methods: {
    submit(data) {
      return this.$axios('/users', {
        method: 'POST',
        data,
      })
        .then((response) => {
          // TODO: notify user
          this.$router.push('/thanks')
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error.response)
          if (error.response && error.response.data.errors) {
            this.formErrors = error.response.data.errors.map(
              (val) => val.message
            )
          }

          this.formErrors = ['Could not save user, try again']
        })
    },
  },
}
</script>
<style lang="scss">
main {
  @include flexCenter();

  width: 100%;
  padding-top: 7rem;
  position: relative;
  .registerPage_form {
    @include flexCenter();
    flex-direction: column;
    text-align: center;
    max-width: 1200px;
    margin: auto;
    width: 100%;
    h1 {
      color: #ea5d30;
      margin: 0 auto 2rem;
    }
    .formulate-form {
      width: 80%;
      height: 100%;
      @include flexCenter();
      flex-direction: column;

      &__inputs {
        width: 100%;
        height: 100%;
        @include flexCenter();
        justify-content: space-between;
        .formulate-input {
          // height: 30px;
          font-size: 1em;
          min-width: 450px;

          // padding: 13px 20px 13px 15px;
          // min-width: 450px;
          input {
            min-width: 450px;
          }
          .formulate-input-element--submit {
            margin: auto;
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
        }
        &__username {
          // margin-top: auto;
          @include flexCenter();
          flex-direction: column;
          justify-content: space-evenly;
          margin-bottom: auto;
        }
        &__names {
          margin-bottom: auto;
          flex-direction: column;
          height: 50%;
          @include flexCenter();
          justify-content: space-evenly;
        }
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
    pointer-events: none;
    .orange {
      fill: #ea5b30be;
    }
  }
}
</style>
