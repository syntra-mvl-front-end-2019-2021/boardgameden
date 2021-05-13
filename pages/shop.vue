<template>
  <section class="container">
    <h2>Shop</h2>
    <div class="shop-wrapper">
      <ShopItem
        v-for="game in games"
        :key="game.bg_atlas_id"
        :title="games.game01.title"
        :user="games.game01.user"
      />
    </div>
  </section>
</template>
<script>
import ShopItem from '@/components/ShopItem.vue'
export default {
  name: 'Shop',
  components: { ShopItem },
  data() {
    return {
      games: {
        game01: {
          title: 'Root',
          user: 'admin',
        },
        game02: {
          title: 'Root',
          user: 'admin',
        },
        game03: {
          title: 'Root',
          user: 'admin',
        },
        game04: {
          title: 'Root',
          user: 'admin',
        },
      },
    }
  },
  /*
  created() {
    this.$axios('/collections/boardgames_directus_users')
      .then((response) => {
        console.log(response.data)
        this.games = response.data.data
      })
      .catch((e) => {
        console.error(e)
      })
  },
  */
}
</script>
<style style="scss">
.shop-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 3em 0;
}
</style>
