import authService from '@/services/auth'

export default {
  actions: {
    // Request to the database
    updateProfile (ctx, editedData) {
      /* const profileData = {
        nickname: 'Elon Mask',
        bio: 'My name is Elon and I like SoftServe company! My name is Elon and I like SoftServe company!',
        avatar_url: 'https://amp.businessinsider.com/images/5d4ae5ea100a2411da63051d-750-562.jpg',
        status: 'My name is Elon and I like SoftServe company!',
        user_background: 'https://amp.businessinsider.com/images/5d4ae5ea100a2411da63051d-750-562.jpg', // 'https://images.alphacoders.com/805/805180.jpg',
        interests: ['nature', 'football', 'flowers'],
        likedPosts: ['postId_1', 'postId_2'],
        saved: {
          'profilesId': ['profileId_1', 'profileId_2'],
          'postIds': ['postId1', 'postId2']
        },
        followers: ['followerID'],
        following: ['followingID'],
        is_following: true,
        counters: {
          views: '139',
          postsCount: '18',
          followersCount: '84',
          followingCount: '85'
        },
        socialAccounts: [
          { type: 'youtube', link: 'https://youtube.com' },
          { type: 'facebook', link: 'https://facebook.com' },
          { type: 'instagram', link: 'https://instagram.com' }
        ]
      } */
      // ctx.commit('updateProfile', profileData)
      return authService.updateProfile(editedData)
        .then((response) => {
          ctx.commit('updateProfile', response.data.myProfile)
        })
    },
    getProfile (ctx) {
      return authService.getProfile()
        .then((response) => {
          ctx.commit('updateProfile', response.data.myProfile)
        })
    }
  },
  mutations: {
    updateProfile (state, profileData) {
      state.profile = profileData
    }
  },
  state: {
    profile: {}
  },
  getters: {
    profileGetter (state) {
      return state.profile
    }
  }
}
