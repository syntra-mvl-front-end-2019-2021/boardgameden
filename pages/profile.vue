<template>
  <div>
    <h1>Profile</h1>
    <ul v-if="$auth.user">
      <li>email: {{ $auth.user.email }}</li>
    </ul>

    <Collection />
  </div>
</template>
<script>
export default {
  name: 'ProfilePage',
  middleware: ['auth'],
}
</script>

<style></style>
