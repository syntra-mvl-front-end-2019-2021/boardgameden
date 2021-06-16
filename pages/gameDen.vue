<template>
  <section class="container_gameden">
    <h2>EVENT</h2>

    <div class="event_page__form">
      <div v-for="game in results" :key="game.id" class="event">
        <p>Organizer: {{ game.user.first_name }}</p>

        <div class="event__form">
          <!--
          <span
            v-for="attendee in game.attendees"
            :key="'at_' + attendee.users_id"
          >
            {{ attendee.users_id.last_name }},
          </span>
          -->
          <h3>{{ game.boardgame.bg_name }}</h3>
          <button type="button" @click="attend(game)">Attend</button>
          <FormulateForm>
            <FormulateErrors />
          </FormulateForm>
        </div>

        <p>date: {{ game.date | transformdate }}</p>
        <p>Location: {{ game.location }}</p>

        <!-- <p>organizer: {{ game.user.first_name }}</p> -->
      </div>

      <!-- <NuxtLink class="button-link__orange" to="/event"
        >register event</NuxtLink
      > -->
    </div>
  </section>
</template>
<script>
export default {
  name: 'Gameden',
  filters: {
    transformdate(value) {
      const myDate = new Date(value)

      return (
        myDate.getDate().toString().padStart(2, 0) +
        '-' +
        (myDate.getMonth() + 1).toString().padStart(2, 0) +
        '-' +
        myDate.getFullYear()
      )
    },
  },
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
        `/items/boardgame_dens?fields[]=id,user.first_name,location,boardgame.bg_name,attendees.users_id.last_name,boargame_dens.id,date`,
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
          attendees: { create: [{ users_id: this.$auth.user.id }] },
        },
      })
        .then(() => {
          //  TODO: do something
          this.$router.push('/Gameden')
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
      return this.$axios('/items/boardgame_dens/' + game.id, {
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
  // max-width: 100%;
  // height: 100%;
  // margin: auto;
  // background: linear-gradient(rgba(129, 203, 235, 0.767), #ffffff 100%);
  .event_page__form {
    @include flexCenter();
    justify-content: space-around;
    text-align: left;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1200px;
    margin: auto;
    height: 100%;
    h3 {
      font-size: 1.5rem;
    }
  }
  .event {
    width: 25%;
    margin: 2em;
    p {
      font-size: 0.9em;
      font-weight: bold;
      font-style: italic;
    }
    :nth-chilf(5) {
      text-align: center;
    }
    &__form {
      border: 1px solid $orange;
      padding: 2em;
      text-align: center;
    }
  }
}
</style>
