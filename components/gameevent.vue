<template>
<div>
  <h1>
{{tittle}}
  </h1>
     <FormulateForm
      v-model="formData"
      @submit="submit"
    >
      <FormulateInput
        type="text"
        name="user_name"
        label="Username"
        validation="required|alphanumeric"
      />
      <FormulateInput
        type="text"
        name="tittle"
        label="tittle"
        validation-name="tittle"
        validation="required"
      />
      <FormulateInput type="hidden" name="role" />
      <FormulateErrors />
      <FormulateInput type="submit" name="Submit" />
    </FormulateForm>
    </div>
</template>
<script>
export default {
  name: 'gameevent',
    data() {
    return {
      formErrors: [],
      formData: {
        user_name: '',
        first_name: '',
        tittle: '',
    
      },
    }
  },
}
</script>

