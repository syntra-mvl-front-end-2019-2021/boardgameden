<template>
  <div>
      <strong>${{game.name}}</strong>
  </div>
</template>

<script>
export default {
    props: ["game"],

    mounted() {
        this.$store.dispatch('getGame', this.name);
    }
};
</script>

<style>

</style>