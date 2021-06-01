<template>
  <main>
    <div class="registerPage_form">
      <FormulateForm
        v-model="formData"
        :form-errors="formErrors"
        @submit="saveProfile"
      >
        <div class="formulate-form__inputs">
          <FormulateInput
            type="text"
            name="user_name"
            label="Username"
            validation-name="Username"
            validation="required"
          />
          <FormulateInput
            type="text"
            name="first_name"
            label="First Name"
            validation-name="First Name"
          />
          <FormulateInput
            type="text"
            name="last_name"
            label="Last Name"
            validation-name="Last Name"
          />
          <FormulateInput type="date" name="birthdate" label="Birthdate" />
          <FormulateInput
            type="email"
            name="email"
            label="E-mailadres"
            validation-name="E-mailadres"
            validation="required|email"
          />
          <FormulateInput
            type="image"
            name="avatar"
            label="Select an image to upload"
            :uploader="uploader"
            help="Select a png, jpg or gif to upload."
          />
          <FormulateErrors />
          <FormulateInput
            type="submit"
            class="button-link__orange"
            name="Save"
            @click="saveProfile"
          />
        </div>
      </FormulateForm>
    </div>
  </main>
</template>

<script>
export default {
  name: 'EditProfile',
  middleware: 'auth',
  data() {
    return {
      formErrors: [],
      formData: {
        user_name: '',
        first_name: '',
        last_name: '',
        birthdate: '',
        email: '',
        avatar: null,
      },
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    minDate() {
      const curDate = new Date()
      curDate.setFullYear(curDate.getFullYear() - 18)

      return curDate.toISOString().substr(0, 10)
    },
    avatar() {
      if (!this.user.avatar) {
        return false
      }

      return this.avatarUrl(this.user.avatar.id)
    },
  },
  created() {
    this.formData = {
      user_name: this.$auth.user.user_name,
      first_name: this.$auth.user.first_name,
      last_name: this.$auth.user.last_name,
      birthdate: this.$auth.user.birthdate,
      email: this.$auth.user.email,
      avatar: this.avatar
        ? [{ url: this.avatar, id: this.user.avatar.id }]
        : [],
    }
  },
  methods: {
    avatarUrl(id) {
      return (
        this.$config.baseURL +
        '/assets/' +
        id +
        '?width=250&height=250&fit=cover'
      )
    },
    uploader(file, progress, error) {
      const formData = new FormData()
      formData.append('file', file)

      return this.$axios('/files', {
        method: 'POST',
        data: formData,
      })
        .then((response) => {
          console.log(response)
          progress(100)

          return {
            url: this.avatarUrl(response.data.data.id),
            id: response.data.data.id,
          }
        })
        .catch((e) => {
          console.error(e)
          error(e.message)
        })
    },
    saveProfile(data) {
      if (data.avatar) {
        data.avatar = data.avatar[0]
      } else {
        data.avatar = null
      }

      return this.$axios('/users/' + this.$auth.user.id, {
        method: 'PATCH',
        data,
        header: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          return this.resetUser()
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.addingGame = false
        })
    },
    resetUser() {
      return this.$axios('/users/me?fields=*.*.*')
        .then((response) => {
          this.$auth.setUser(response.data.data)
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
}
</script>
<style lang="scss">
main {
  @include flexCenter();

  width: 100%;
  // height: 100vh;
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
        flex-direction: column;
        justify-content: space-between;
        .addIMG {
          width: 100%;
          height: 400px;
          background: #ea5d30;
        }
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
          justify-content: space-between;
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
