<template>
  <div>
    <p>{{ den.date }}</p>

    <article class="c-den-item">
      <h3 class="item_title">{{ den.boardgame.bg_name }}</h3>
      <span>Attendees: {{ den.attendees.users_id }}</span>
      <NuxtLink
        :to="'/items/boardgame_dens/' + den.id"
        class="button-link__orange c-den-btn"
      >
        Edit Den
      </NuxtLink>
      <p>Location: {{ den.location }}</p>
    </article>
  </div>
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
  p {
    font-size: 1em;
    padding-top: 1em;
  }
}
.item_title {
  font-weight: 20px;
}

.c-den-btn {
  margin-top: 20px;
}
</style>
