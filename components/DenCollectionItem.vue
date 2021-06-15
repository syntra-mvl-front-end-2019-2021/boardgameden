<template>
  <article class="c-den-item">
    {{ den.id }}
  </article>
</template>

<script>
export default {
  name: 'DenCollectionItem',
  props: {
    den: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped></style>
