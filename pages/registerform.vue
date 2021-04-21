<template>
  <div id="app">
    <form @submit.prevent="login">
      <div>
        <label for="username">username</label>
        <input name="username" v-model="username" placeholder="username">
      </div>
      <div>
        <label for="password">password</label>
        <input name="password" v-model="password" placeholder="password" type="password">
      </div>
      <div>
        <label for="firstName">first name</label>
        <input name="firstName" v-model="firstName" placeholder="first name">
      </div>
      <div>
        <label for="lastName">last name</label>
        <input name="lastName" v-model="lastName" placeholder="last name">
      </div>
      <div>
        <label for="age">age</label>
        <input name="age" v-model="age" placeholder="age" type="number">
      </div>
      <div>
        <label for="email">email</label>
        <input name="email" v-model="age" placeholder="email" type="email">
      </div>
      <div>
        <label for="address">address</label>
        <input name="address" v-model="address" placeholder="address">
      </div>
      <input type="submit" value="register">
    </form>
  </div>
</template>
<script>
export default {
  name:'registerform',
}
</script>

