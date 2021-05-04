<template>
  <div>
    <h1>
      {{ tittle }}
    </h1>
    <FormulateForm v-model="formData" @submit="submit">
      <FormulateInput
        type="text"
        name="Event"
        label="Event"
        validation-name="Event"
        validation="required"
      />
      <FormulateInput
        type="text"
        name="Game"
        label="Game"
        validation-name="game"
        validation="required"
      />
      <FormulateInput
        type="date"
        name="Date"
        label="Date"
        :validation="'required|before:' + minDate"
      />
      <FormulateInput
        type="text"
        name="Location"
        label="Location"
        validation="required|alphanumeric"
      />
      <FormulateInput
        type="text"
        name="user_name"
        label="Username"
        validation="required|alphanumeric"
      />
      <FormulateInput type="hidden" name="role" />
      <FormulateErrors />
      <FormulateInput type="submit" name="Submit" />
    </FormulateForm>
  </div>
</template>
<script>
export default {
  name: 'Gameevent',
  data() {
    return {
      formErrors: [],
      formData: {
        User_name: '',
        tittle: '',
        Date: '',
        Location: '',
        Event: '',
      },
    }
  },
}
</script>
