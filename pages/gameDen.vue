<template>
  <section class="container_gameden">
    <h2>Event</h2>
    <NuxtLink class="button-link__orange register" to="/event"
      >Register event</NuxtLink
    >
    <div class="event_page__form">
      <div v-for="game in results" :key="game.id" class="event">
        <div>
          <p>{{ game.user.first_name }} is playing..</p>
          <p>{{ game.date | transformdate }}</p>
        </div>

        <div class="event__form">
          <NuxtLink :to="'/game/' + game.id" class="button-link__game">
            <h3>{{ game.boardgame.bg_name }}</h3>
          </NuxtLink>
          <p>with</p>
          <div class="event__form-container">
            <p
              v-for="attendee in game.attendees"
              :key="'at_' + attendee.users_id"
              class="event__form-container-attendees"
            >
              {{ attendee.users_id.last_name }}
            </p>
          </div>
          <button
            class="button-link__orange"
            type="button"
            @click="attend(game)"
          >
            Attend
          </button>
          <FormulateForm>
            <FormulateErrors />
          </FormulateForm>
        </div>
        <p>Location: {{ game.location }}</p>
      </div>
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
        `/items/boardgame_dens?fields[]=id,user.first_name,location,boardgame.bg_name,boardgame.bg_atlas_id,attendees.users_id.avatar,attendees.users_id.last_name,boargame_dens.id,date`,
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
      return this.$axios('/items/boardgame_dens/' + this.game.id, {
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
  @include flexCenter();
  flex-direction: column;
  .button-link__orange.register {
    border: 2px solid $orange;
    padding: 1em 2em;
    border-radius: 5px;
    transition: $transition-normal;
    margin: 2em 0;
    background-color: $orange;
    color: white;
    font-weight: bolder;

    &:hover {
      background-color: white;
      color: $orange;
    }
  }
  .event_page__form {
    @include flexCenter();
    justify-content: space-around;
    text-align: left;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    max-width: 1200px;
    margin: auto;
    height: 100%;

    h3 {
      font-size: 1.5rem;
      margin: 1em 0 0;
    }
  }
  .event {
    width: 25%;
    margin: 2em;
    align-self: flex-start;

    p {
      font-size: 0.9em;
      font-weight: bold;
      font-style: italic;
    }
    :nth-child(1) {
      @include flexCenter();
      justify-content: space-between;
    }
    :nth-child(3) {
      text-align: center;
    }

    &__form {
      border: 1px solid $orange;
      border-radius: 10px;
      // padding: 2em;
      @include flexCenter();
      flex-direction: column;
      &-container {
        @include flexCenter();
        flex-wrap: wrap;
        padding: 2em;
        // justify-content: space-around;
        text-align: center;
        .event__form-container-attendees {
          @include flexCenter();
          width: 120px;
          height: 60px;
          flex: 1 1 100px;
          background: #ea5b30d5;
          justify-content: space-evenly;
          border: 1px solid white;
          margin: 0.5em;
          transition: $transition-normal;
          cursor: pointer;
          color: white;

          &:hover {
            background: white;
            border: 1px solid $orange;
            color: $orange;
          }
        }
      }

      .button-link__orange {
        width: 100%;
        border-radius: unset;
        color: white;
        background-color: $orange;
        border: none;
        border-top: 1px solid $orange;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        padding: 0.5em 1em;
        transition: $transition-normal;
        font-size: 1.2em;
        // font-weight: bold;
        // font-style: italic;
        &:hover {
          background-color: white;
          color: $orange;
        }
      }
    }
  }
}
</style>
