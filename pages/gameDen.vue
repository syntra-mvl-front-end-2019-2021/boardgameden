<template>
  <section class="container_gameden">
    <div class="event_page__form">
      <h2>EVENT</h2>
      <div v-for="game in results" :key="game.id" class="avent">
        <div>
          <span
            v-for="attendee in game.attendees"
            :key="'at_' + attendee.users_id"
          >
            {{ attendee.attendees.users_id }},
          </span>

          <button type="button" @click="attend(game)">Attend</button>

          <FormulateForm :form-errors="formErrors" @submit="submit">
            <FormulateInput
              type="group"
              name="attendees"
              :repeatable="true"
              label=""
              add-label="+ Add Attendee"
              :value="game.attendees"
            >
              <FormulateInput
                :options="usersOptions"
                type="select"
                placeholder="Select an attendees"
                name="users_id"
                label="attendee"
                value="users_id"
              />
            </FormulateInput>
            <FormulateInput :value="game.id" type="hidden" name="gameId" />
            <FormulateErrors />
            <FormulateInput name="submit" type="submit" />
          </FormulateForm>
        </div>
        <p>boardgame: {{ game.boardgame.bg_name }}</p>

        <p>Location: {{ game.location }}</p>

        <p>organizer: {{ game.user.first_name }}</p>
      </div>

      <NuxtLink class="button-link__orange" to="/event"
        >register event</NuxtLink
      >
    </div>
  </section>
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
          gameId: '',
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
        `/items/boardgame_dens?fields[]=id,user.first_name,location,boardgame.bg_name,attendees.users_id,boargame_dens.id`,
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
    attend(game) {
      return this.$axios('/items/boardgame_dens/' + game.id, {
        method: 'PATCH',
        data: {
          attendees: { create: [{ users_id: this.$auth.user.id.last_name }] },
        },
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
    submit(data) {
      data.user = this.currentUser.id
      return this.$axios('/items/boardgame_dens/' + data.gameId, {
        method: 'PATCH',
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
  },
}
</script>
<style lang="scss">
.container_gameden {
  max-width: 100%;
  height: 100%;
  margin: auto;
  background: linear-gradient(rgba(129, 203, 235, 0.767), #ffffff 100%);
  .button-link__orange {
    float: right;
  }
  &__form {
    @include flexCenter();
    flex-direction: column;
    height: 100%;
    text-align: center;
    flex: 1;
    width: 100%;
    max-width: 1200px;
    h2 {
      display: inline;
    }
    p {
      box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
      -webkit-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
      -moz-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
    }
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
}
</style>
