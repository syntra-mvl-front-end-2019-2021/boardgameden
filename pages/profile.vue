<template>
  <div>
    <h1>Profile123</h1>
    <ul v-if="userData">
      <li>email: {{ userData.email }}</li>
    </ul>
    <Collection />
    <h3>test</h3>
    <h2>{{ game.name }}</h2>
  </div>
</template>

<script>

export default {
  name: 'ProfilePage',
  components: [Collection],
  middleware: ['auth'],
}
</script>

<style></style>
