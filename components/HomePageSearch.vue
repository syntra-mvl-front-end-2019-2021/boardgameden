<template>
  <section class="s-search">
    <form class="form">
      <div class="form__search">
        <label for="search"></label>
        <input
          id="search"
          type="text"
          placeholder="Zoek je avontuur"
          name="search"
        />
      </div>
      <div class="form__city">
        <label for="city"></label>
        <input id="city" type="text" placeholder="City" name="city" />
      </div>
      <div class="form__radius">
        <label for="radius"></label>
        <select id="radius" required name="radius">
          <option value="" disabled selected>Radius</option>

          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
        </select>
      </div>
      <button type="submit">Fetch</button>
    </form>
  </section>
</template>

<script>
export default {
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/imports/mixins';

.s-search {
  @include flexCenter();
  max-width: 700px;
  height: 50px;
  margin: auto;
  background: #ea5c30;
  border-radius: 15px;

  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  .form {
    @include flexCenter();
    width: 100%;
    justify-content: space-around;
    height: 100%;
    padding: 0 1rem;
    &__search {
      width: 40%;
    }
    &__city,
    &__radius {
      width: 20%;
    }

    input {
      padding: 0.2rem 0.2rem 0.2rem 0;
      border: none;
      border-right: white 3px solid;
      width: 100%;
      color: white;
      outline: none;
      background: none;
    }

    ::placeholder {
      color: white;
      font-size: 1rem;
    }

    button,
    select {
      height: 100%;
      background: transparent;
      font-size: 1rem;
      cursor: pointer;
      border: none;
      color: white;
      outline: none;
      background: none;
    }
    select:required:invalid {
      color: white;
    }
    option {
      color: black;
    }
  }
}
</style>
