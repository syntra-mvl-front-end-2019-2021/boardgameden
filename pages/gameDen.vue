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
        v-model="value"
        :options="boardGames"
        type="select"
        placeholder="Select an board game"
        name="boardgame"
        label="boardgame"
      />
      <FormulateInput type="text" name="location" label="location" />
      <FormulateInput
        v-model="value"
        :options="attendees"
        type="select"
        placeholder="Select an attendees"
        label="attendees"
        name="attendees"
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
        user: '',
        location: '',
        boardgame: '',
        attendees: '',
      },
      toggle: false,
    }
  },
  computed: {
    boardGames() {
      return this.$store.getters['boardgames/getBoardGames'].map(function (
        boardGame
      ) {
        return { label: boardGame.bg_name, value: boardGame.id }
      })
    },
    attendees() {
      return this.$store.getters['users/getUsers'].map(function (users) {
        return { label: users.first_name, value: users.id }
      })
    },
  },
  created() {
    this.$store.dispatch('boardgames/getBoardGames',{}),
      this.$store.dispatch('users/getUsers',{})
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
    getEvent(data) {
      return this.$axios('/items/boardgame_dens', {
        method: 'GET',
        data,
      })
        .then((response) => {
          console.log(response)
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
