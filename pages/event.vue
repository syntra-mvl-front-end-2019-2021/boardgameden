<template>
  <section class="event_page">
    <div class="event_page__form">
      <h1>PLAY!</h1>
      <FormulateForm
        v-model="formData"
        :form-errors="formErrors"
        @submit="submit"
      >
        <FormulateInput
          class="round-input-decorator"
          type="text"
          name="location"
          label="location"
        />
        <FormulateInput
          :options="boardgameDensOptions"
          type="select"
          placeholder="Select an board game"
          name="boardgame"
          label="boardgame"
        />
        <FormulateInput
          class="round-input-decorator"
          type="group"
          name="attendees"
          :repeatable="true"
          label=""
          add-label="+ Add Attendee"
        >
          <FormulateInput
            class="round-input-decorator"
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
  </section>
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
        return { label: users.last_name, value: users.id }
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
.event_page {
  @include flexCenter();
  max-width: 100%;
  height: 100vh;
  margin: auto;
  background: linear-gradient(rgba(129, 203, 235, 0.767), #ffffff 100%);
  &__form {
    @include flexCenter();
    flex-direction: column;
    height: 100%;
    text-align: center;
    flex: 1;
    width: 100%;
    max-width: 1200px;
    h1 {
      color: #ea5d30;
    }
  }
  label {
    font-size: 0.8em;
    color: rgb(98, 196, 238);
    padding: 0 4px;
    transform: translate(0, -8px);
    white-space: nowrap;
  }
  .gameden-form--hidden {
    display: none;
  }
}
</style>
