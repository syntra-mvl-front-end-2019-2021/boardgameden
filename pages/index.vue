<template>
  <div class="container">
    <NuxtLink to="/Faq">Faq page</NuxtLink>
    <NuxtLink to="/houseRules">House Rules</NuxtLink>

    <h1>Home</h1>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>

<style lang="scss">
.container {
  height: 2000px; //testHeight
  h1 {
    color: $blue;
  }
}
</style>
