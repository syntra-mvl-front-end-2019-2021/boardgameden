<template>
  <div>
    <h2>Play!</h2>
    <h1>
      {{ tittle }}
    </h1>
    <button @click="toggle = !toggle">created event</button>
    <FormulateForm v-if="toggle" v-model="formData" @submit="submit">
      <FormulateInput
        type="text"
        name="Event"
        label="Event"
        validation-name="Event"
        validation="required"
      />
      <FormulateInput
        type="text"
        name="Boardgame"
        label="Boardgame"
        validation-name="Boardgame"
      
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
        name="User"
        label="User"
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
        User: '',
        tittle: '',
        Date: '',
        Location: '',
        Event: '',
        Boardgame: '',
      },
      toggle: false,
    }
  },
  methods: {},
}
</script>
