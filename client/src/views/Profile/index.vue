<template>
  <div>
    <div class="profile-header" :style="{ backgroundImage: userBackground }">
      <div class="view-counter" v-if="profileGetter.counters">
        <i class="fas fa-eye"></i>
<!--        {{profileGetter.counters.views}}-->
      </div>
    </div>
    <div class="row wrapp">
      <div class="col-12 col-md-3 profile-card" >
        <profile-card :profile="profileGetter"/>
      </div>
        <div class="col-12 col-md-9 profile-content">
          <div class="col-12">
            <switch-video></switch-video>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProfileCard from './Card/index'
import switchVideo from './Card/switchVideo'

export default {
  components: {
    ProfileCard,
    switchVideo
  },
  computed: {
    ...mapGetters({ profileGetter: 'profile/profileGetter' }),
    userBackground () {
      return this.profileGetter.user_background ? 'url(' + this.profileGetter.user_background + ')' : 'url(https://i.ytimg.com/vi/DiS7ZMwTA0I/maxresdefault.jpg)'
    },
    nickname () {
      return this.$route.params.nickname
    }
  },
  mounted () {
    this.uploadProfile(this.nickname)
  },
  methods: {
    ...mapActions({ uploadProfile: 'profile/uploadProfile' })
  }
}
</script>

<style lang="scss" scoped>
  .wrapp {
    height: 500px;
  }
  .profile-header {
    background-position: center;
    background-size: cover;
    height: 200px;
    position: relative;
    .view-counter {
      position: absolute;
      display: flex;
      align-items: center;
      font-size: 13px;
      font-weight: 500;
      top: 25px;
      border-radius: 20px 0 0 20px;
      right: 0;
      padding: 5px;
      background-color: white;
      .fa-eye {
        margin-right: 5px;
        color: blue;
      }
    }
  }
  .profile-content {
    background-color: #9C27B0;
  }
</style>
