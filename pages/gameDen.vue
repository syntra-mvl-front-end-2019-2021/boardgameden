<template>
  <div>
    <h2>Play!</h2>

    <button @click="boardgamedens">Add boardgameden</button>
    <ul id="example-1">
      <li v-for="item in boardgamedens" :key="item.boardgamedens">
        {{ item.boardgamedens }}
      </li>
    </ul>
    <button @click="toggle = !toggle">created event</button>
    <button @click="toggle = !toggle">create event</button>
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

        placeholder="Select a board game"
        label="boardgames"
      />
      <FormulateInput
        type="text"
        name="location"
        label="location"

      />
      <FormulateInput
        v-model="value"
        :options="attenDees"
        type="select"
        placeholder="Select an attendees"
        label="attendees"
        name="attendees"
      />
      <FormulateInput type="text" name="location" label="location" />

      <FormulateInput type="hidden" name="role" />
      <FormulateErrors />
      <FormulateInput type="submit" name="Submit" />
    </FormulateForm>
  </div>
</template>
<script>
export default {
  name: 'Gameden',
  middleware: 'auth',
  data() {
    return {
      boardgamedens: '',
      formErrors: [],
      formData: {
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
    attenDees() {
      return this.$store.getters['users/getUsers'].map(function (users) {
        return { label: users.first_name, value: users.id }
      })
    },
    boardgamedens() {
      return this.$store.getters['boardgamedens/ getBoardgameden']
    },
  },
  created() {
    this.$store.dispatch('boardgames/getBoardGames', {}),
      this.$store.dispatch('users/getUsers', {}),
      this.$store.dispatch('boardgameden/getBoardgameden', {})
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
