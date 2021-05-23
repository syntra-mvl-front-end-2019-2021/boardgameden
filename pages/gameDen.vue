<template>
  <div>
    <div v-for="game in results" :key="game.attendees" class="avent">
      <span>attendees: {{ game.attendees }}</span> |
      <!-- <span>boardgame: {{ game.boardgame.bg_name }}</span> |
      <span>Location: {{ game.location }}</span> |
      <span>user: {{ game.user.first_name }}</span>
      //-->
    </div>
    <NuxtLink to="/event">register event</NuxtLink>
  </div>
</template>
<script>
export default {
  name: 'Gameden',
  data() {
    return {
      results: [],
    }
  },
  computed: {
    boardgameden() {
      return this.$store.state['evenement/boardgamedens']
    },
  },
  created() {
    this.$axios
      .get(`/items/boardgame_dens?fields[]=attendees.users_id.last_name`, {
        headers: { Authorization: '' },
      })
      .then((response) => {
        console.log(response)
        this.results.value = response.data.data
      })
  },
  methods: {},
}
</script>
<style lang="scss">
.avent {
  padding-top: 6em;
  justify-content: center;
  align-content: center;
  margin: auto;
}
</style>
