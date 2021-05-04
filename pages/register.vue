<template>

  <main>
    <FormulateForm
      v-model="formData"
      :form-errors="formErrors"
      @submit="submit"
    >
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
        label="E-mailadres"
        validation-name="E-mailadres"
        validation="required|email"
      />
      <FormulateInput type="hidden" name="role" />
      <FormulateErrors />
      <FormulateInput type="submit" name="Submit" />
    </FormulateForm>
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
  created() {
    this.formData.birthdate = this.minDate
  },
  methods: {
    submit(data) {
      return this.$axios('/users', {
        method: 'POST',
        data,
      })
        .then(() => {
          this.$router.push('/login')
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
