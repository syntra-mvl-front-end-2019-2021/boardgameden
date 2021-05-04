<template>
  <div>
<<<<<<< HEAD
    <h1>Profile123</h1>
    <ul v-if="userData">
      <li>email: {{ userData.email }}</li>
=======
    <h1>Profile</h1>
    <ul v-if="$auth.user">
      <li>email: {{ $auth.user.email }}</li>
>>>>>>> efefc65cb8ae84b4a363a20f15ce676ef2962419
    </ul>
    <Collection />
    <h3>test</h3>
    <h2>{{ game.name }}</h2>
  </div>
</template>

<script>
<<<<<<< HEAD
=======
import Collection from '~/components/Collection'
>>>>>>> efefc65cb8ae84b4a363a20f15ce676ef2962419

export default {
  name: 'ProfilePage',
  components: [Collection],
  middleware: ['auth'],
}
</script>

<style></style>
