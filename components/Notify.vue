<template>
  <div class="notification__container">
    <div
      v-for="(notification, index) in notifications"
      :key="index"
      class="notification"
    >
      <button
        class="notification__close-btn"
        @click="removeNotification(index)"
      >
        close
      </button>
      <p class="notification__text">{{ notification }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notify',
  data() {
    return {
      timeOut: 4000,
      highIndex: 1,
      notifications: {},
    }
  },
  mounted() {
    this.$root.$on('notify', (notification) => {
      this.addNotification(notification)
    })
  },
  methods: {
    addNotification(notification) {
      const curIndex = this.highIndex

      this.$set(this.notifications, curIndex, notification)
      setTimeout(() => {
        this.removeNotification(curIndex)
      }, this.timeOut)
      this.highIndex++
    },
    removeNotification(index) {
      this.$delete(this.notifications, index)
    },
  },
}
</script>

<style scoped lang="scss">
.notification {
  &__container {
    position: fixed;
    bottom: 0;
    right: 1rem;
    width: calc(100% - 2rem);
    max-width: 400px;
    height: 0;
    z-index: 5000;
    display: flex;
    flex-direction: column-reverse;
  }

  background-color: lightgray;
  padding: 1rem;
  position: relative;
  margin-bottom: 1rem;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);

  &__close-btn {
    display: block;
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    background-color: darkslategray;
    color: transparent;
    border-radius: 50%;
    border: none;
    outline: none;

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 12px;
      background-color: #fff;
      margin-top: -6px;
      margin-left: -1px;
    }

    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
}
</style>
