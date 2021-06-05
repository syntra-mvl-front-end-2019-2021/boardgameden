<template>
  <div>
    <section class="container gameden">
      <h2>EVENT</h2>
      <div v-for="game in results" :key="game.id" class="avent">
        <p>
          attendees:
          <span
            v-for="attendee in game.attendees"
            :key="'at_' + attendee.users_id"
          >
            {{ attendee.users_id.last_name }},
          </span>
          <FormulateForm :form-errors="formErrors" @submit="submit">
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
        </p>
        <p>boardgame: {{ game.boardgame.bg_name }}</p>

        <p>Location: {{ game.location }}</p>

        <p>organizer: {{ game.user.first_name }}</p>
      </div>

      <NuxtLink class="button-link__orange" to="/event"
        >register event</NuxtLink
      >
    </section>
  </div>
</template>
<script>
export default {
  name: 'Gameden',
  middleware: 'auth',
  data() {
    return {
      formErrors: [],
      results: [],
      attendees: [],
      formData: [
        {
          attendees: '',
        },
      ],
    }
  },
  computed: {
    currentUser() {
      return this.$auth.user
    },
    users() {
      return this.$store.state.users.users
    },
    usersOptions() {
      return this.users.map(function (users) {
        return { label: users.last_name, value: users.id }
      })
    },
  },
  created() {
    this.formData.user = this.currentUser.id
    this.$store.dispatch('users/getUsers')
    this.$axios
      .get(
        `/items/boardgame_dens?fields[]=user.first_name,location,boardgame.bg_name,attendees.users_id.last_name`,
        {
          headers: { Authorization: '' },
        }
      )
      .then((response) => {
        console.log(this.results)
        this.results = response.data.data
      })
  },
  methods: {
    submit(data) {
      data.user = this.currentUser.id
      return this.$axios(
        '/items/boardgame_dens?fields[]=attendees.users_id.last_name',
        {
          method: 'PATCH',
          data,
        }
      )
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
  },
}
</script>
<style lang="scss">
section.gameden {
  h2 {
    display: inline;
  }
  p {
    box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
    -webkit-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
    -moz-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
  }
  .avent {
    padding: 2em;
    margin: 2em 0;
    justify-content: center;
    align-content: center;
    border-radius: 10px;
    box-shadow: 1px 2px 2px 0 rgba(171, 171, 171, 0.87);
    // -webkit-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
    // -moz-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
  }
  .button-link__orange {
    float: right;
  }
}
</style>
