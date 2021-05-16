<template>
  <div>
    <div v-for="name in boardgameden" :key="name.user" class="event">
      <span>Attendees: {{ name.attendees }}</span> |
      <span>boardgame: {{ name.boardgame }}</span> |
      <span>Location: {{ name.location }}</span> |
      <span>user: {{ name.user }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Event',
  data() {
    return {
      result: [],
    }
  }, 
   computed: {
      boardgameden() {
      return this.$store.state.boardgamedens.boardgamedens
    },
/*
      boardgames() {
      return this.$store.state.boardgames.boardgames
    },
        users() {
      return this.$store.state.users.users
    },
     boardgameDensOptions() {
      return this.boardgames.map(function (boardGame) {
        return boardGame.bg_name
      })
    },
  usersOptions() {
      return this.users.map(function (users) {
        return  users.first_name
      })
    }*/
   }, 
  created() {
      this.$store.dispatch('boargamedens/getBoardgameden', {})
  },
}
</script>
<style lang="scss">
.event {
  margin-top: 5em;
}
</style>
