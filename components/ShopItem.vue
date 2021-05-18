<template>

  <div>
    <div class="shop-item">
      <p>Item:</p>
      <strong>{{ title }}</strong>

  <div class="shop-item">
    <div>
      <NuxtLink :to="'/game/' + gbId" class="button-link__orange">
        {{ title }}
      </NuxtLink>

      <button class="button-link__orange" @click="openModal">
        Buy or Swap
      </button>
    </div>
    <div
      :class="{
        'shop-modal': true,
        open: showModal,
      }"

      <p>
        <textarea

          id=""


          name=""
          cols="30"
          rows="10"
          placeholder="Hey! I would like to purchase this item"
        ></textarea>
        Buy <strong> {{ title }} </strong> from <strong> {{ user }} </strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopItem',
  props: {
    title: { type: String, required: true },
    user: { type: String, required: true },
    gbId: { type: String, required: true },
  },
  data() {
    return {
      games: {},
      showModal: false,
    }
  },
  methods: {
    openModal() {
      this.showModal = !this.showModal
    },
  },
}
</script>

<style lang="scss">
.shop-modal {
  display: none;
  position: fixed;
  z-index: 10;
  background-color: $orange;
  width: 500px;
  height: 250px;
  top: calc(50vh - 125px);
  left: calc(50vw - 250px);
  padding: 2em;
  border-radius: 2em;
  box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
  -webkit-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
  -moz-box-shadow: 1px -7px 22px 0px rgba(171, 171, 171, 0.87);
  p {
    color: white;
  }
}

.shop-modal.open {
  display: block;
}

.shop-item {
  width: 200px;
  border: solid $orange 1px;
  border-radius: 10px;
  padding: 2em;
  margin: 1em;
}
</style>
