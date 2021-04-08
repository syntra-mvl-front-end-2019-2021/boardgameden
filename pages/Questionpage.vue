<template>
  <div>
    <h1>My question</h1>
    <form @submit.prevent="login">
      <div>
        <label>
          First Name*
          <input v-model="firstname" type="text" />
        </label>
      </div>
      <div>
        <label>
          Last Name*
          <input v-model="lastename" type="text" />
        </label>
      </div>
      <div>
        <label>
          E-mailadres*
          <input v-model="email" type="email" />
        </label>
      </div>
      <div>
        Your question*
        <textarea v-model="textarea" placeholder=""></textarea>
      </div>
      <div>
        <button typenn="submit">Submit</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Faqquestion',
  data() {
    return {
      firstname: '',
      lastename: '',
      email: '',
      textarea: '',
    }
  },
}
</script>
<style scoped></style>
