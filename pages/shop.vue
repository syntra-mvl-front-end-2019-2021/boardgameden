<template>
  <div>
    <h2>Shop</h2>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Shop',

  data() {
    return {
      shopItems: [],
    }
  },
  created() {
    axios
      .get('http://206.81.26.160/items/boardgames')
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
<style></style>
