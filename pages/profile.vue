<template>
  <section class="container">
    <h2><span>Welcome, </span> {{ user.user_name }}</h2>

    <div class="profile">
      <div class="profile_content">
        <div class="profile_content-avatar">
          <img v-if="avatar" :src="avatar" alt="avatar" />
          <div class="profile_edit-button">
            <NuxtLink to="/edit_profile" class="button-link__orange"
              >Edit Profile</NuxtLink
            >
          </div>
        </div>
        <ul v-if="user" class="profile_content_user">
          <li>First name: {{ user.first_name }}</li>
          <li>Last name: {{ user.last_name }}</li>
          <li>Email: {{ user.email }}</li>
          <li>Location: {{ user.location }}</li>
        </ul>
      </div>

      <div class="atlas-search">
        <AtlasSearch />
      </div>
      <Collection />
    </div>
  </section>
</template>

<script>
import AtlasSearch from '../components/AtlasSearch'
import Collection from '~/components/Collection'

export default {
  name: 'ProfilePage',
  components: { AtlasSearch, Collection },
  middleware: ['auth'],
  props: {},
  data() {
    return {
      games: [],
      searchQuery: '',
      timeOut: null,
      searching: false,
      noResult: false,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    avatar() {
      if (!this.user.avatar) {
        return false
      }

      return (
        this.$config.baseURL +
        '/assets/' +
        this.user.avatar.id +
        '?width=250&height=300&fit=cover'
      )
    },
  },
}
</script>

<style scoped lang="scss">
.atlas-search {
  margin: 100px 0 30px 100px;
}
.form__search__collection {
  @include flexCenter();
}
h2 {
  span {
    color: $blue;
  }

}
.profile {
  margin: auto;
  @include flexCenter();
  justify-content: space-evenly;
  align-items: unset;
  flex-direction: column;
  &_edit-button {
    width: 100%;
    height: 60px;
    @include flexCenter();
    margin: auto;
  }
  &_content {
    @include flexCenter();
    justify-content: space-evenly;
    width: 80%;
    margin: auto;
    padding-top: 5em;

    &-avatar {
      img {
        border-radius: 10px;
      }
    }
    &_user {
      padding: unset;
      margin-bottom: auto;
      flex: 1 1 300px;
      max-width: 300px;
      height: 200px;
      li {
        list-style: none;
        margin-bottom: 2rem;
        font-size: 1.5em;
      }
    }
  }
}
.button-link__orange {
  text-align: center;
  margin-top: 20px;
  width: 250px;
  margin-right: auto;
}
</style>
