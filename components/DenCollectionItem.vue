<template>
  <article class="c-den-item">
    <span class="item_title">Boardgame: {{ den.boardgame.bg_name }}</span>
    <span>Location: {{ den.location }}</span>
    <span>Date: {{ den.date }}</span>
    <span>Attendees: {{ den.attendees.users_id }}</span>
    <NuxtLink
      :to="'/items/boardgame_dens/' + den.id"
      class="button-link__orange c-den-btn"
    >
      Edit Den
    </NuxtLink>
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

<style lang="scss">
.c-den-item {
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-color: $orange;
  border-radius: 5px;
  margin-bottom: 50px;
  padding: 20px;
}
.item_title {
  font-weight: 20px;
}

.c-den-btn {
  margin-top: 20px;
}
</style>
