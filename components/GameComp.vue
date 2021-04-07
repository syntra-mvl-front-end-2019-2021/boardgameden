<template>
  <div>
    <!-- https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1540147295104 -->
    <img :src="url" alt="" />
    <p>{{ category }}</p>
    <p>Rating</p>
    <p>Username</p>
    <p>Location</p>
    <button class="play-btn">PLAY</button>
    <div class="collection-btns">
      <button class="swap-btn">SWAP!</button>
      <button class="buy-btn">BUY!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameComp',
  props: {
    category: {
      type: Array,
      required: true,
    },
    url: {
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

<style scoped>
.play-btn {
  width: 100%;
  margin-bottom: 1rem;
  height: 3rem;
}

.swap-btn,
.buy-btn {
  width: calc((100% - 1rem) / 2);
  height: 3rem;
}

.collection-btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
