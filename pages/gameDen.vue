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
        label="boardgames"
      />
      <FormulateInput
        type="text"
        name="location"
        label="location"
      />
      <FormulateInput
        v-model="value"
        :options="attendees"
        type="select"
        placeholder="Select an attendees"
        label="user"
      />
      <FormulateInput type="hidden" name="role" />
      <FormulateErrors />
      <FormulateInput type="submit" name="Submit" />
    </FormulateForm>
  </div>
</template>
<script>
import vSelect from 'vue-select'
export default {
  name: 'Gameevent',
  middleware: 'auth',
  data() {
    return {
      formErrors: [],
      formData: {
        user: '',
        first_Name: '',
        location: '',
        boardgame: '',
        attendees: '',
        bg_name: '',
        id: '',
        role: '1eb0baf8-fbfb-40a6-b706-6146e6ffc1f0',
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
      return this.$store.getters['users/getUsers'].map(function (user) {
        return { label: user.first_name, value: user.id }
      })
    },
  },
  created() {
    this.$store.dispatch('boardgames/getBoardGames', {}),
      this.$store.dispatch('users/getUsers', {})
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
