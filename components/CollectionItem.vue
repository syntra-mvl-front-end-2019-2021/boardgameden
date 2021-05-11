<template>
  <div>
    <strong>{{ game.bg_atlas_id }}</strong>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },

  created() {
    this.$axios
      .get(
        `https://www.boardgameatlas.com/api/game/${this.game.bg_atlas_id}/basegame?client_id=KrUdcULOvp`,
        {
          headers: { Authorization: '' },
        }
      )
      .then((response) => {
        console.log(response)
      })
  },
}
</script>

<style></style>
