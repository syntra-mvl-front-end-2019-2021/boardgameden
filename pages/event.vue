<template>
  <div>
    <h2>PLAY!</h2>
    <FormulateForm
      v-model="formData"
      :form-errors="formErrors"
      @submit="submit"
    >
      <FormulateInput type="text" name="location" label="location" />
      <FormulateInput
        :options="boardgameDensOptions"
        type="select"
        placeholder="Select an board game"
        name="boardgame"
        label="boardgame"
      />
      <FormulateInput
        type="group"
        name="attendees"
        :repeatable="true"
        label="Who is going to attend?"
        add-label="+ Add Attendee"
      >
        <FormulateInput
          :options="usersOptions"
          type="select"
          placeholder="Select an attendees"
          name="users_id"
          label="attendees"
        />
      </FormulateInput>
      <FormulateErrors />
      <FormulateInput name="submit" type="submit" />
    </FormulateForm>
  </div>
</template>
<script>
export default {
  name: 'Event',
  middleware: 'auth',
  data() {
    return {
      formErrors: [],
      formData: {
        location: '',
        boardgame: '',
        attendees: '',
      },
    }
  },
  computed: {
    boardgames() {
      return this.$store.state.boardgames.boardgames
    },
    users() {
      return this.$store.state.users.users
    },
    currentUser() {
      return this.$auth.user
    },
    boardgameDensOptions() {
      return this.boardgames.map(function (boardGame) {
        return { label: boardGame.bg_name, value: boardGame.id }
      })
    },
    usersOptions() {
      return this.users.map(function (users) {
        return { label: users.first_name, value: users.id }
      })
    },
  },
  created() {
    this.formData.user = this.currentUser.id
    this.$store.dispatch('boardgames/getBoardGames')
    this.$store.dispatch('users/getUsers')
  },
  methods: {
    addElement() {
      this.attendees.push({
        value: '',
      })
    },
    submit(data) {
      data.user = this.currentUser.id

      return this.$axios('/items/boardgame_dens', {
        method: 'POST',
        data,
      })
        .then(() => {
          //  TODO: do something
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
    resetForm(event) {
      event.target.reset()
    },
  },
}
</script>

<style lang="scss">
.gameden-form--hidden {
  display: none;
}
</style>
