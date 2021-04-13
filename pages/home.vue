<template>
  <div class="home-page">
    <h1>Home Page</h1>
    <section class="s-search">
      <form>
        <label for="search"></label>
        <input id="search" type="text" placeholder="Search.." name="search" />

        <label for="city"></label>
        <input id="city" type="text" placeholder="City" name="city" />

        <label for="radius"></label>
        <input id="radius" type="text" placeholder="Radius" name="radius" />

        <button type="submit">Fetch</button>
      </form>
    </section>
    <div class="s-month-game"></div>
    <div class="s-newest-swaps"></div>
    <div class="s-newest-sells"></div>
  </div>
</template>

<script>
// import GameComp from '../components/GameComp.vue'
export default {
  name: 'GamePage',
  //   components: { GameComp },
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style lang="scss">
.home-page {
  width: 80%;
  margin: auto;
  h1 {
    margin-bottom: 2rem;
  }
}
</style>
