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
import Collection from '~/components/Collection'

export default {
  name: 'ProfilePage',
  components: { Collection },
  middleware: ['auth'],
}
</script>

<style></style>
