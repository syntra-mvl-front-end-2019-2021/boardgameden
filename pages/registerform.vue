<template>
  <div>
    <form @submit.prevent="login">
      <div>
        <label for="username">username</label>
        <input v-model="username" name="username" placeholder="username" />
      </div>
      <div>
        <label for="password">password</label>
        <input
          v-model="password"
          name="password"
          placeholder="password"
          type="password"
        />
      </div>
      <div>
        <label for="firstName">first name</label>
        <input v-model="firstName" name="firstName" placeholder="first name" />
      </div>
      <div>
        <label for="lastName">last name</label>
        <input v-model="lastName" name="lastName" placeholder="last name" />
      </div>
      <div>
        <label for="age">age</label>
        <input v-model="age" name="age" placeholder="age" type="number" />
      </div>
      <div>
        <label for="email">email</label>
        <input v-model="age" name="email" placeholder="email" type="email" />
      </div>
      <div>
        <label for="address">address</label>
        <input v-model="address" name="address" placeholder="address" />
      </div>
      <input type="submit" value="register" />
    </form>
  </div>
</template>
<script>
export default {
  name: 'Registerform',
}
</script>
