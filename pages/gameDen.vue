<template>
  <div>
    <h2>Play!</h2>
    <button @click="toggle = !toggle">created event</button>
    <FormulateForm
      v-if="toggle"
      v-model="formData"
      :form-errors="formErrors"
      @submit="submit"
    >
      <FormulateInput
        type="text"
        name="Event"
        label="Event"
        validation-name="Event"
        validation=""
      />
      <FormulateInput
        type="text"
        name="Boardgame"
        label="Boardgame"
        validation-name="Boardgame"
      />
      <FormulateInput
        type="date"
        name="Date"
        label="Date"
        :validation="'required|before:' + minDate"
      />
      <FormulateInput
        type="text"
        name="Location"
        label="Location"
        validation=""
      />
      <FormulateInput
        type="text"
        name="User"
        label="User"
        validation-name="User
        "
        validation=""
      />
      <FormulateInput type="hidden" name="role" />
      <FormulateErrors />
      <FormulateInput type="submit" name="Submit" />
    </FormulateForm>
  </div>
</template>
<script>
export default {
  name: 'Gameevent',
  middleware: 'auth',
  data() {
    return {
      formErrors: [],
      formData: {
        User: '',
        Date: '',
        Location: '',
        Event: '',
        Boardgame: '',
        attendees: '',
        role: '1eb0baf8-fbfb-40a6-b706-6146e6ffc1f0',
      },
      toggle: false,
    }
  },
  computed: {
    minDate() {
      const curDate = new Date()
      curDate.setFullYear(curDate.getFullYear() - 18)

      return curDate.toISOString().substr(0, 10)
    },
  },
  methods: {
    submit(data) {
      return this.$axios('/items/boardgame_dens', {
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
