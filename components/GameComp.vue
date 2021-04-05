<template>
  <div>
    <img src="" alt="" />
    <p>{{ category }}</p>
    <p>Rating</p>
    <p>Username</p>
    <p>Location</p>
    <button>PLAY</button>
    <div>
      <button>SWAP!</button>
      <button>BUY!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameComp',
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      game: {},
    }
  },

  methods: {},
}
</script>

<style scoped></style>
