<template>
  <div>
    <h2>Shop</h2>
    <div class="c-shopItems">
      <div
        v-for="item in shopItems"
        :key="item.bg_atlas_id"
        class="c-shopItems_item"
      >
        {{ item.bg_atlas_id }}
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Shop',

  data() {
    return {
      shopItems: [],
      baseURL: process.env.BASE_URL,
    }
  },
  created() {
    axios
      .get(this.baseURL + '/items/boardgames')
      .then((response) => {
        this.shopItems = response.data.data
        console.log(this.shopItems)
      })
      // eslint-disable-next-line node/handle-callback-err
      .catch((error) => {
        console.log(error.message)
      })
  },
}
</script>
<style lang="scss">
.c-shopItems {
  height: 100vh;
  width: 100%;
  &_item {
    width: 100px;
    height: 100px;
    background: $orange;
  }
}
</style>
