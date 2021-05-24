<template>
  <div>
    <h2>EVENT</h2>
    <section class="container gameden">
      <div v-for="game in results" :key="game.user" class="avent">
        <p>attendees: {{ game.attendees }}</p>

        <p>boardgame: {{ game.boardgame.bg_name }}</p>

        <p>Location: {{ game.location }}</p>

        <p>user: {{ game.user.first_name }}</p>
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
  data() {
    return {
      results: [],
      attendees: [],
    }
  },
  computed: {
    boardgameden() {
      return this.$store.state['evenement/boardgamedens']
    },
  },
  created() {
    this.$axios
      .get(
        `/items/boardgame_dens?fields[]=user.first_name,location,boardgame.bg_name,attendees.users_id.last_name`,
        {
          headers: { Authorization: '' },
        }
      )
      .then((response) => {
        console.log(response)
        this.results = response.data.data
      })
  },
  methods: {
    getAttendees(attendeesArray) {
      return attendeesArray.map((attendee) => attendee.last_name).join(',')
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
    padding-top: 6em;
    justify-content: center;
    align-content: center;
    margin: auto;
  }
  .button-link__orange {
    float: right;
  }
}
</style>
