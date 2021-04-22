<template>
  <div>
    <h1>Profile</h1>
    <ul v-if="$auth.user">
      <li>email: {{ $auth.user.email }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ProfilePage',
  computed: {
    auth() {
      return this.$auth
    },
  },
}
</script>

<style></style>
