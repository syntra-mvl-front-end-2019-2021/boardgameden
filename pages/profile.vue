<template>
  <section class="container">
    <div class="profile">
      <h2>Welcome, {{ user.user_name }}</h2>
      <div class="profile_avatar">
        <img v-if="avatar" :src="avatar" alt="avatar" />
      </div>
      <div class="profile_content">
        <div v-if="user" class="profile_content_user">
          <span>First name: {{ user.first_name }}</span>
          <span>Last name: {{ user.last_name }}</span>
          <span>Email: {{ user.email }}</span>
          <span>Location: {{ user.location }}</span>
          <NuxtLink to="/edit_profile" class="button-link__orange"
            >Edit Profile</NuxtLink
          >
        </div>
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
  display: flex;
  align-items: center;
}

.profile {
  margin: auto;
  &_avatar {
    position: absolute;
    display: block;
    img {
      border-radius: 10px;
    }
  }
  &_content {
    width: 80%;
    position: relative;
    left: 400px;
    h2 {
      margin: 0;
    }

    &_user {
      display: flex;
      flex-direction: column;
    }
  }
  .button-link__orange {
    margin-top: 20px;
    width: 20%;
  }
}
</style>
